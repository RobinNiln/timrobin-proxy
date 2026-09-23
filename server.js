const https = require('https');
const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENAI_API_KEY    = process.env.OPENAI_API_KEY;

// Model routing per tool
// Detta är den ENDA plats du behöver ändra för att byta modell per verktyg.
// Vill du senare testa en annan modell för ett verktyg: ändra bara dess rad.
// (Att lägga till en helt ny leverantör, t.ex. Gemini, kräver också en ny
//  call-funktion längre ner – se callAnthropic/callOpenAI som mönster.)
const TOOL_MODELS = {
  'market-pulse': { provider: 'anthropic', model: 'claude-sonnet-4-6' },
  'the-brief':    { provider: 'anthropic', model: 'claude-sonnet-4-6' },
  'newsroom':     { provider: 'anthropic', model: 'claude-sonnet-4-6' },
  'native':       { provider: 'anthropic', model: 'claude-sonnet-4-6' },
  'dist':         { provider: 'anthropic', model: 'claude-sonnet-4-6' },
  'ad-copy':      { provider: 'anthropic', model: 'claude-sonnet-4-6' },
};

const DEFAULT_MODEL = { provider: 'anthropic', model: 'claude-sonnet-4-6' };

function callAnthropic(messages, model, res) {
  if (!ANTHROPIC_API_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Anthropic API key not configured' }));
    return;
  }

  const payload = JSON.stringify({ model, max_tokens: 8000, messages });

  const options = {
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const apiReq = https.request(options, proxyRes => {
    let data = '';
    proxyRes.on('data', chunk => data += chunk);
    proxyRes.on('end', () => {
      res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  });

  apiReq.on('error', err => {
    if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Upstream error', detail: err.message }));
  });

  apiReq.write(payload);
  apiReq.end();
}

function callOpenAI(messages, model, res) {
  if (!OPENAI_API_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'OpenAI API key not configured' }));
    return;
  }

  const payload = JSON.stringify({ model, max_tokens: 8000, messages });

  const options = {
    hostname: 'api.openai.com',
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  const apiReq = https.request(options, proxyRes => {
    let data = '';
    proxyRes.on('data', chunk => data += chunk);
    proxyRes.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (parsed.choices && parsed.choices[0]) {
          const normalized = {
            content: [{ type: 'text', text: parsed.choices[0].message.content }]
          };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(normalized));
        } else {
          res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      } catch {
        res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  });

  apiReq.on('error', err => {
    if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Upstream error', detail: err.message }));
  });

  apiReq.write(payload);
  apiReq.end();
}

// ── Hämtar rå HTML för en URL via callback (bygger inte HTTP-svar själv) ─────
// cb(err, { html, finalUrl }). Följer upp till 4 omdirigeringar. Används av
// både enkel- och multi-sida-hämtningen.
function fetchRaw(targetUrl, cb, redirectsLeft) {
  if (redirectsLeft === undefined) redirectsLeft = 4;
  let parsed;
  try { parsed = new URL(targetUrl); }
  catch { return cb(new Error('Ogiltig URL')); }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return cb(new Error('Fel protokoll'));
  }
  const lib = parsed.protocol === 'http:' ? require('http') : https;
  const options = {
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'http:' ? 80 : 443),
    path: parsed.pathname + parsed.search,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MavaBot/1.0; +https://mava.se)',
      'Accept': 'text/html,application/xhtml+xml'
    }
  };
  const r = lib.request(options, pr => {
    if ([301,302,303,307,308].includes(pr.statusCode) && pr.headers.location) {
      pr.resume();
      if (redirectsLeft <= 0) return cb(new Error('För många omdirigeringar'));
      return fetchRaw(new URL(pr.headers.location, parsed).href, cb, redirectsLeft - 1);
    }
    if (pr.statusCode >= 400) { pr.resume(); return cb(new Error('HTTP ' + pr.statusCode)); }
    const ctype = pr.headers['content-type'] || '';
    if (ctype && ctype.indexOf('html') === -1 && ctype.indexOf('text') === -1) {
      pr.resume(); return cb(new Error('Inte HTML'));
    }
    let html = '', bytes = 0; const MAX = 3 * 1024 * 1024;
    pr.on('data', c => { bytes += c.length; if (bytes <= MAX) html += c; else pr.destroy(); });
    pr.on('end', () => cb(null, { html: html, finalUrl: parsed.href }));
  });
  r.on('error', err => cb(err));
  r.setTimeout(15000, () => { r.destroy(new Error('Timeout')); });
  r.end();
}

// Plockar ut interna undersidor ur startsidans HTML och prioriterar de mest
// värdefulla för en AI-synlighetsanalys (om, tjänster, kontakt, priser ...).
function pickSubpages(html, baseUrl, max) {
  const base = new URL(baseUrl);
  const found = {};                       // href -> true (avdubblering)
  const re = /<a\s[^>]*href\s*=\s*["']([^"'#?]+)[^"']*["'][^>]*>(.*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let href = m[1].trim();
    const anchorText = m[2].replace(/<[^>]+>/g, ' ').toLowerCase();
    let u;
    try { u = new URL(href, base); } catch { continue; }
    if (u.hostname !== base.hostname) continue;          // bara samma sajt
    if (!/^https?:$/.test(u.protocol)) continue;
    const path = u.pathname.replace(/\/$/, '').toLowerCase();
    if (path === '' || path === '/') continue;           // hoppa startsidan
    if (/\.(jpg|jpeg|png|gif|svg|webp|pdf|zip|mp4|css|js|ico)$/i.test(path)) continue;
    // Skippa sidor som sällan tillför AI-analys.
    if (/(cookie|integritet|privacy|villkor|terms|logga-?ut|logout|login|logga-?in|wp-admin|feed|tag\/|kategori\/|category\/)/i.test(path)) continue;
    const key = u.origin + u.pathname.replace(/\/$/, '');
    if (found[key]) continue;
    // Prioritetspoäng: högre = viktigare för AI-synlighet.
    let score = 1;
    const hay = path + ' ' + anchorText;
    if (/(om-?oss|about|vilka-?vi|foretaget|var-?historia)/i.test(hay)) score = 10;
    else if (/(tjanst|service|erbjud|vad-?vi-?gor|losningar|solutions)/i.test(hay)) score = 9;
    else if (/(produkt|sortiment|utbud|product)/i.test(hay)) score = 8;
    else if (/(pris|prices|pricing|kostnad|paket)/i.test(hay)) score = 7;
    else if (/(kontakt|contact|hitta-?oss|besok)/i.test(hay)) score = 6;
    else if (/(fraga|faq|vanliga-?fragor|hjalp)/i.test(hay)) score = 6;
    else if (/(kund|case|referens|recension|omdome)/i.test(hay)) score = 5;
    // Grundare sidväg (färre snedstreck) = oftast viktigare.
    const depth = (u.pathname.match(/\//g) || []).length;
    score += Math.max(0, 3 - depth);
    found[key] = { url: u.origin + u.pathname, score: score };
  }
  const list = Object.keys(found).map(k => found[k]);
  list.sort((a, b) => b.score - a.score);
  return list.slice(0, max).map(x => x.url);
}

// Hämtar en hel sajt: startsida + upp till (max-1) undersidor, slår ihop texten.
function fetchSite(startUrl, res, max) {
  max = max || 6;
  fetchRaw(startUrl, (err, first) => {
    if (err) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Kunde inte hämta startsidan: ' + err.message }));
      return;
    }
    const startText = htmlToText(first.html);
    const subs = pickSubpages(first.html, first.finalUrl, max - 1);
    const pages = [{ url: first.finalUrl, text: startText }];

    if (subs.length === 0) {
      return finishSite(res, pages);
    }
    // Hämta undersidorna i följd; hoppa över de som strular.
    let i = 0;
    function next() {
      if (i >= subs.length) return finishSite(res, pages);
      const su = subs[i++];
      fetchRaw(su, (e, r) => {
        if (!e && r) {
          const t = htmlToText(r.html);
          if (t && t.length > 40) pages.push({ url: su, text: t });
        }
        next();
      });
    }
    next();
  });
}

function finishSite(res, pages) {
  // Slå ihop till en text, märkt per sida, och beskär till en rimlig helhet.
  let combined = '';
  const perPage = Math.floor(18000 / pages.length);
  pages.forEach(p => {
    combined += '\n\n===== SIDA: ' + p.url + ' =====\n' + p.text.slice(0, perPage);
  });
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    text: combined.trim().slice(0, 20000),
    pages: pages.map(p => p.url),
    url: pages[0] ? pages[0].url : ''
  }));
}

// ── Hämta en hemsida och strippa den till läsbar text ───────────────────────
// Används av AI Radar: användaren anger en URL, vi hämtar sidan här på servern
// (webbläsare blockeras av CORS för andra domäner, men en server får hämta fritt)
// och skickar tillbaka ren text. Följer upp till 4 omdirigeringar.
function fetchPage(targetUrl, res, redirectsLeft) {
  if (redirectsLeft === undefined) redirectsLeft = 4;

  let parsed;
  try { parsed = new URL(targetUrl); }
  catch {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ogiltig URL' }));
    return;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'URL måste börja med http:// eller https://' }));
    return;
  }

  const lib = parsed.protocol === 'http:' ? require('http') : https;
  const options = {
    hostname: parsed.hostname,
    port: parsed.port || (parsed.protocol === 'http:' ? 80 : 443),
    path: parsed.pathname + parsed.search,
    method: 'GET',
    headers: {
      // Låtsas vara en vanlig webbläsare – vissa sajter avvisar annars.
      'User-Agent': 'Mozilla/5.0 (compatible; MavaBot/1.0; +https://mava.se)',
      'Accept': 'text/html,application/xhtml+xml'
    }
  };

  const pageReq = lib.request(options, pageRes => {
    // Följ omdirigeringar (301/302/303/307/308).
    if ([301, 302, 303, 307, 308].includes(pageRes.statusCode) && pageRes.headers.location) {
      if (redirectsLeft <= 0) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'För många omdirigeringar' }));
        return;
      }
      pageRes.resume(); // släng kroppen
      const next = new URL(pageRes.headers.location, parsed).href;
      fetchPage(next, res, redirectsLeft - 1);
      return;
    }

    if (pageRes.statusCode >= 400) {
      pageRes.resume();
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Sidan svarade med fel (' + pageRes.statusCode + ')' }));
      return;
    }

    const ctype = pageRes.headers['content-type'] || '';
    if (ctype && ctype.indexOf('html') === -1 && ctype.indexOf('text') === -1) {
      pageRes.resume();
      res.writeHead(415, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Sidan är inte en vanlig webbsida (' + ctype + ')' }));
      return;
    }

    let html = '';
    let bytes = 0;
    const MAX = 3 * 1024 * 1024; // stanna vid 3 MB råtext
    pageRes.on('data', chunk => {
      bytes += chunk.length;
      if (bytes <= MAX) html += chunk;
      else pageRes.destroy();
    });
    pageRes.on('end', () => {
      const text = htmlToText(html);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ text: text, url: parsed.href }));
    });
  });

  pageReq.on('error', err => {
    if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Kunde inte hämta sidan', detail: err.message }));
  });
  pageReq.setTimeout(15000, () => { pageReq.destroy(); });
  pageReq.end();
}

// Strippar HTML till läsbar text. Enkelt men robust: tar bort skript/stil,
// gör rubriker och stycken till radbrytningar, och rensar taggar och blanksteg.
function htmlToText(html) {
  let t = html;
  t = t.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  t = t.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  t = t.replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ');
  t = t.replace(/<!--[\s\S]*?-->/g, ' ');
  // Behåll struktur: rubriker, stycken, listpunkter och radbrytningar → nyrad.
  t = t.replace(/<\/(h[1-6]|p|div|li|section|article|header)>/gi, '\n');
  t = t.replace(/<br\s*\/?>/gi, '\n');
  t = t.replace(/<li[^>]*>/gi, '• ');
  // Ta bort alla övriga taggar.
  t = t.replace(/<[^>]+>/g, ' ');
  // Avkoda vanliga HTML-entiteter.
  t = t.replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
       .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
       .replace(/&auml;/gi,'ä').replace(/&ouml;/gi,'ö').replace(/&aring;/gi,'å')
       .replace(/&Auml;/gi,'Ä').replace(/&Ouml;/gi,'Ö').replace(/&Aring;/gi,'Å');
  // Städa blanksteg: max en tom rad, trimma varje rad.
  t = t.replace(/[ \t]+/g, ' ');
  t = t.split('\n').map(l => l.trim()).filter(Boolean).join('\n');
  t = t.replace(/\n{3,}/g, '\n\n');
  return t.slice(0, 20000); // rimlig gräns för AI-analysen
}

require('http').createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Tool-Id, X-Access-Password');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // AI Radar: hämta och strippa en hemsida till text.
  if (req.method === 'POST' && req.url === '/api/fetch-page') {
    let pbody = '';
    req.on('data', c => pbody += c);
    req.on('end', () => {
      let pj;
      try { pj = JSON.parse(pbody); }
      catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      if (process.env.ACCESS_PASSWORD) {
        const provided = req.headers['x-access-password'] || pj.password || '';
        if (provided !== process.env.ACCESS_PASSWORD) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }
      }
      fetchPage(pj.url || '', res);
    });
    return;
  }

  // AI Radar djup: hämta startsida + undersidor och slå ihop.
  if (req.method === 'POST' && req.url === '/api/fetch-site') {
    let sbody = '';
    req.on('data', c => sbody += c);
    req.on('end', () => {
      let sj;
      try { sj = JSON.parse(sbody); }
      catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      if (process.env.ACCESS_PASSWORD) {
        const provided = req.headers['x-access-password'] || sj.password || '';
        if (provided !== process.env.ACCESS_PASSWORD) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
          return;
        }
      }
      const max = Math.min(6, Math.max(1, parseInt(sj.max, 10) || 6));
      fetchSite(sj.url || '', res, max);
    });
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/analyze') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    let parsed;
    try { parsed = JSON.parse(body); }
    catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    // Optional password check: only enforced if ACCESS_PASSWORD env var is set.
    // If no env var is configured, all requests pass (matches original behaviour).
    if (process.env.ACCESS_PASSWORD) {
      const provided = req.headers['x-access-password'] || parsed.password || '';
      if (provided !== process.env.ACCESS_PASSWORD) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }
    }

    const toolId  = req.headers['x-tool-id'] || parsed.tool_id || '';
    const routing = TOOL_MODELS[toolId] || DEFAULT_MODEL;

    console.log(`Tool: ${toolId || 'default'} -> ${routing.provider}/${routing.model}`);

    if (routing.provider === 'openai') {
      callOpenAI(parsed.messages, routing.model, res);
    } else {
      callAnthropic(parsed.messages, routing.model, res);
    }
  });
}).listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
