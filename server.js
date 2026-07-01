const https = require('https');
const PORT = process.env.PORT || 3000;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENAI_API_KEY    = process.env.OPENAI_API_KEY;
const ACCESS_PASSWORD   = process.env.ACCESS_PASSWORD || 'timrobin2024';

// Model routing per tool
const TOOL_MODELS = {
  'market-pulse': { provider: 'anthropic', model: 'claude-sonnet-4-20250514' },
  'the-brief':    { provider: 'openai',    model: 'gpt-4o' },
  'newsroom':     { provider: 'anthropic', model: 'claude-sonnet-4-20250514' },
  'native':       { provider: 'anthropic', model: 'claude-sonnet-4-20250514' },
  'ad-copy':      { provider: 'openai',    model: 'gpt-4o' },
};

const DEFAULT_MODEL = { provider: 'anthropic', model: 'claude-sonnet-4-20250514' };

function callAnthropic(messages, model, res) {
  if (!ANTHROPIC_API_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Anthropic API key not configured' }));
    return;
  }

  const payload = JSON.stringify({ model, max_tokens: 4000, messages });

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

  const payload = JSON.stringify({ model, max_tokens: 4000, messages });

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

require('http').createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Tool-Id, X-Access-Password');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
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

    // Password check (accepts header or body field)
    const provided = req.headers['x-access-password'] || parsed.password || '';
    if (ACCESS_PASSWORD && provided !== ACCESS_PASSWORD) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }

    const toolId  = req.headers['x-tool-id'] || parsed.tool_id || '';
    const routing = TOOL_MODELS[toolId] || DEFAULT_MODEL;

    console.log(`Tool: ${toolId || 'default'} → ${routing.provider}/${routing.model}`);

    if (routing.provider === 'openai') {
      callOpenAI(parsed.messages, routing.model, res);
    } else {
      callAnthropic(parsed.messages, routing.model, res);
    }
  });
}).listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
