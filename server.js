<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mava – AI-verktyg för marknadsförare</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#C9A84C;--gold-light:#E8C97A;--gold-dim:rgba(201,168,76,0.15);
  --t50:#E1F5EE;--t100:#9FE1CB;--t600:#0F6E56;--t800:#085041;
  --a50:#FAEEDA;--a100:#FAC775;--a600:#854F0B;
  --g50:#F1EFE8;--g100:#D3D1C7;--g600:#5F5E5A;
  --bg:#fff;--bgs:#F7F6F2;--tx:#1a1a1a;--txm:#5F5E5A;
  --bd:rgba(0,0,0,0.12);--r:12px;--rs:8px
}
html{scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fff;color:#1d1d1f;min-height:100vh}
body.app-mode{background:#FBFAF7}

/* Mava logo lockup (symbol + wordmark) */
.mava-logo{display:inline-flex;align-items:center;gap:9px;cursor:pointer;text-decoration:none;background:none;border:none;padding:0;font-family:inherit}
.mava-logo img{border-radius:22%;display:block;flex-shrink:0}
.mava-logo .mava-word{font-weight:700;letter-spacing:-0.02em;line-height:1}
.mava-logo.on-light .mava-word{color:#2C2520}
.mava-logo.on-dark .mava-word{color:#fff}

/* Footer CTA side fillers (wide screens only) */
.footer-cta-wrap{position:relative}
.footer-side{position:absolute;top:64px;bottom:0;width:calc((100% - 1100px) / 2 - 3rem - 20px);overflow:hidden;display:none}
.footer-side.left{left:3rem}
.footer-side.right{right:3rem}
.footer-side .sep-top{position:absolute;top:0;left:10px;right:10px;height:1px;background:#d3d0ca}
.footer-side .sep-bottom{position:absolute;bottom:0;left:10px;right:10px;height:1px;background:#d3d0ca}
.footer-side .sep-outer{position:absolute;top:10px;bottom:10px;width:1px;background:#d3d0ca}
.footer-side .sep-inner{position:absolute;top:10px;bottom:10px;width:1px;background:#d3d0ca}
.footer-side.left .sep-outer{left:0}
.footer-side.left .sep-inner{right:0}
.footer-side.right .sep-outer{right:0}
.footer-side.right .sep-inner{left:0}
.footer-side .side-img{position:absolute;top:10px;bottom:10px;left:10px;right:10px;background-size:cover}
.footer-side.left .side-img{background-image:url('images/footer-side-left.jpg');background-position:left center}
.footer-side.right .side-img{background-image:url('images/footer-side-right.jpg');background-position:right center}
@media(min-width:1400px){.footer-side{display:block}}

/* ─── LANDING ─── */
#landing{display:block}

/* NAV */
.site-nav{
  position:absolute;top:0;left:0;right:0;z-index:10;
  display:flex;align-items:center;justify-content:space-between;
  padding:2rem 3rem;
}
@media(max-width:640px){.site-nav{padding:1.5rem}}
.nav-wordmark{
  font-size:13px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;
  color:rgba(255,255,255,0.9)
}
.nav-wordmark span{color:var(--gold)}
.nav-logo{height:52px;width:auto}
.nav-login{
  font-size:13px;font-weight:500;letter-spacing:0.06em;
  color:rgba(255,255,255,0.6);background:none;border:none;
  cursor:pointer;font-family:inherit;transition:color 0.2s;
  display:flex;align-items:center;gap:6px
}
.nav-login:hover{color:#fff}
.nav-login svg{width:12px;height:12px}

/* HERO */
.hero{
  position:relative;height:100vh;min-height:600px;
  display:flex;flex-direction:column;justify-content:flex-end;
  overflow:hidden
}
.hero-bg{
  position:absolute;inset:0;
  background-size:cover;background-position:center 40%;
  transform:scale(1.03);
  transition:transform 8s ease-out
}
.hero-bg.loaded{transform:scale(1)}
.hero-vignette{
  position:absolute;inset:0;
  background:linear-gradient(
    to bottom,
    rgba(0,0,0,0.15) 0%,
    rgba(0,0,0,0.05) 35%,
    rgba(0,0,0,0.5) 65%,
    rgba(0,0,0,0.92) 100%
  )
}
.hero-content{
  position:relative;z-index:2;
  padding:0 3rem 4.5rem;
  max-width:900px
}
@media(max-width:640px){.hero-content{padding:0 1.5rem 3rem}}

.hero-kicker{
  font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;
  color:var(--gold);margin-bottom:1.5rem;
  display:flex;align-items:center;gap:10px
}
.hero-kicker::before{content:'';display:block;width:24px;height:1px;background:var(--gold)}

.hero-h1{
  font-size:clamp(2.4rem,5vw,4.8rem);
  font-weight:700;
  line-height:1.08;
  letter-spacing:-0.03em;
  color:#fff;
  margin-bottom:1.75rem;
  max-width:820px
}
.hero-h1 em{
  font-style:normal;
  color:transparent;
  -webkit-text-stroke:1px rgba(255,255,255,0.5)
}

.hero-lead{
  font-size:clamp(1rem,1.5vw,1.15rem);
  color:rgba(255,255,255,0.6);
  line-height:1.75;
  max-width:480px;
  margin-bottom:2.5rem
}

.hero-actions{display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap}

.btn-primary{
  background:var(--gold);color:#0a0a0a;
  border:none;border-radius:3px;
  padding:15px 32px;
  font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;
  cursor:pointer;font-family:inherit;
  transition:background 0.15s,transform 0.1s;
  display:inline-flex;align-items:center;gap:10px
}
.btn-primary:hover{background:var(--gold-light)}
.btn-primary:active{transform:scale(0.98)}
.btn-primary svg{width:14px;height:14px}

.btn-ghost{
  background:none;border:1px solid rgba(255,255,255,0.25);border-radius:3px;
  padding:14px 28px;font-size:14px;font-weight:500;letter-spacing:0.04em;
  color:rgba(255,255,255,0.7);cursor:pointer;font-family:inherit;
  transition:all 0.15s
}
.btn-ghost:hover{border-color:rgba(255,255,255,0.6);color:#fff}

@keyframes bounce{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(8px)}
}

/* SCROLL INDICATOR */
.scroll-hint{
  position:absolute;bottom:2rem;right:3rem;z-index:2;
  display:flex;flex-direction:column;align-items:center;gap:6px;
  color:rgba(255,255,255,0.3);font-size:11px;letter-spacing:0.1em;text-transform:uppercase
}
.scroll-line{width:1px;height:48px;background:rgba(255,255,255,0.15);animation:breathe 2.5s ease-in-out infinite;will-change:opacity;isolation:isolate}
@keyframes breathe{0%,100%{opacity:0.15}50%{opacity:0.7}}

/* ─── DARK INTRO SECTION ─── */
.section-dark{
  background:#0d0d0d;
  padding:6rem 3rem;
  border-top:1px solid rgba(255,255,255,0.06)
}
@media(max-width:640px){.section-dark{padding:4rem 1.5rem}}
.section-dark-inner{max-width:960px;margin:0 auto}

.eyebrow{
  font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;
  color:var(--gold);margin-bottom:1.25rem;
  display:flex;align-items:center;gap:10px
}
.eyebrow::before{content:'';display:block;width:20px;height:1px;background:var(--gold)}

.big-statement{
  font-size:clamp(2.8rem,5.5vw,5.5rem);
  font-weight:700;letter-spacing:-0.03em;
  line-height:1.05;color:#fff;
  max-width:900px;margin-bottom:1.75rem
}
.big-statement em{font-style:normal;color:rgba(255,255,255,0.4)}

.statement-lead{
  font-size:19px;line-height:1.75;
  color:rgba(255,255,255,0.5);
  max-width:520px
}

/* HORIZONTAL RULE */
.rule{height:1px;background:rgba(255,255,255,0.07);margin:4rem 0}

/* STEPS – dark version */
.steps-dark{
  display:grid;grid-template-columns:repeat(3,1fr);gap:0;
  border:1px solid rgba(255,255,255,0.08);border-radius:4px;overflow:hidden
}
@media(max-width:640px){.steps-dark{grid-template-columns:1fr}}
.step-d{
  padding:2.5rem 2rem;
  border-right:1px solid rgba(255,255,255,0.08)
}
.step-d:last-child{border-right:none}
@media(max-width:640px){.step-d{border-right:none;border-bottom:1px solid rgba(255,255,255,0.08)}}

.step-d-num{
  font-size:11px;font-weight:700;letter-spacing:0.15em;color:var(--gold);
  margin-bottom:1.25rem;opacity:0.7
}
.step-d-title{font-size:17px;font-weight:600;color:#fff;margin-bottom:0.6rem;line-height:1.3}
.step-d-desc{font-size:14px;line-height:1.7;color:rgba(255,255,255,0.45)}

/* ─── LIGHT SECTION ─── */
.section-light{
  background:#f8f7f3;
  padding:6rem 3rem;
  border-top:1px solid rgba(0,0,0,0.06)
}
@media(max-width:640px){.section-light{padding:4rem 1.5rem}}
.section-light-inner{max-width:960px;margin:0 auto}

.eyebrow-dark{
  font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;
  color:#C9A84C;margin-bottom:1.25rem;
  display:flex;align-items:center;gap:10px
}
.eyebrow-dark::before{content:'';display:block;width:20px;height:1px;background:#C9A84C}

.big-statement-dark{
  font-size:clamp(1.6rem,3vw,2.6rem);font-weight:700;letter-spacing:-0.02em;
  line-height:1.2;color:#0a0a0a;max-width:680px;margin-bottom:3rem
}

.pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem}
@media(max-width:640px){.pillars{grid-template-columns:1fr;gap:2rem}}
.pillar{}
.pillar-icon{
  width:44px;height:44px;background:#fff;border:0.5px solid rgba(0,0,0,0.1);
  border-radius:6px;display:flex;align-items:center;justify-content:center;
  margin-bottom:1.25rem
}
.pillar-title{font-size:17px;font-weight:700;color:#0a0a0a;margin-bottom:0.6rem}
.pillar-desc{font-size:14px;line-height:1.75;color:#5F5E5A}
.pillar-rule{width:32px;height:2px;background:var(--gold);margin-bottom:1rem}

/* ─── FULL-BLEED CTA SECTION ─── */
.section-cta{
  background:#0a0a0a;padding:7rem 3rem;text-align:center;
  border-top:1px solid rgba(255,255,255,0.06)
}
@media(max-width:640px){.section-cta{padding:5rem 1.5rem}}
.section-cta-inner{max-width:680px;margin:0 auto}
.section-cta .eyebrow{justify-content:center}
.section-cta .eyebrow::before{display:none}
.cta-h2{
  font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.025em;
  line-height:1.1;color:#fff;margin-bottom:1.25rem
}
.cta-sub{font-size:16px;line-height:1.8;color:rgba(255,255,255,0.5);margin-bottom:2.5rem}
.cta-note{
  margin-top:1.5rem;font-size:13px;color:rgba(255,255,255,0.25);
  letter-spacing:0.04em
}

/* FOOTER */
.site-footer{
  background:#050505;padding:2rem 3rem;
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;
  border-top:1px solid rgba(255,255,255,0.05)
}
.footer-brand{font-size:12px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.3)}
.footer-brand span{color:var(--gold)}
.footer-copy{font-size:12px;color:rgba(255,255,255,0.7)}

/* ─── LOGIN ─── */
#login-screen{display:none;min-height:100vh;background:#0a0a0a;align-items:center;justify-content:center;padding:1.5rem}
.login-card{
  background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:6px;
  padding:3rem 2.5rem;width:100%;max-width:400px;text-align:center
}
.login-logo{
  width:52px;height:52px;background:var(--gold);border-radius:4px;
  display:flex;align-items:center;justify-content:center;
  font-weight:700;font-size:15px;color:#0a0a0a;letter-spacing:1px;margin:0 auto 1.5rem
}
.login-card h1{font-size:22px;font-weight:700;margin-bottom:0.4rem;color:#fff}
.login-card p{font-size:14px;color:rgba(255,255,255,0.4);margin-bottom:2rem;line-height:1.6}
.login-card input{
  width:100%;font-family:inherit;font-size:14px;
  background:#fff;border:1px solid rgba(0,0,0,0.15);
  border-radius:4px;padding:13px 16px;color:#1a1a1a;margin-bottom:1rem;
  text-align:center;letter-spacing:0.05em
}
.login-card input::placeholder{color:rgba(0,0,0,0.3);letter-spacing:0.03em}
.login-card input:focus{outline:none;border-color:var(--gold)}
.login-btn{
  width:100%;background:var(--gold);color:#0a0a0a;border:none;border-radius:4px;
  padding:14px;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;
  cursor:pointer;font-family:inherit;transition:background 0.15s
}
.login-btn:hover{background:var(--gold-light)}
.login-error{font-size:13px;color:#F09595;margin-top:0.75rem;display:none}

/* ─── APP ─── */
#app{display:none;background:#F5F3EE;color:#2C2520;margin:0}
header{
  background:#fff;color:#2C2520;
  padding:1rem 2rem;
  margin:0;
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;
  border-bottom:1px solid rgba(180,155,110,0.2)
}
.header-brand{display:flex;align-items:center;gap:12px}
.header-logo{
  display:flex;align-items:center;
}
.header-title{font-size:15px;font-weight:600;color:#2C2520}
.header-sub{font-size:12px;color:#9A8570;margin-top:2px}
.header-badge{
  background:#F5F3EE;border:1px solid rgba(180,155,110,0.3);
  color:#9A8570;font-size:12px;padding:5px 13px;border-radius:20px
}

.container{max-width:680px;margin:0 auto;padding:2rem 1.5rem 3rem}

.form-section-label{
  font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;
  color:#aaa;margin:0 0 1rem
}

.form-block{
  background:#fff;border:none;border-radius:0;
  padding:0;margin-bottom:1rem
}

.form-block-title{
  font-size:17px;font-weight:700;color:#2C2520;
  margin-bottom:0.25rem
}
.form-block-desc{
  font-size:13px;color:#888;margin-bottom:1.75rem;line-height:1.5
}

.field{display:flex;flex-direction:column;gap:8px;margin-bottom:1.6rem}
.field:last-child{margin-bottom:0}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.6rem}
.field-row:last-child{margin-bottom:0}
@media(max-width:560px){.field-row{grid-template-columns:1fr}}

.field-label{
  font-size:15px;font-weight:500;color:#2a2520;margin-bottom:2px;line-height:1.4
}
.field-hint{font-size:12px;color:#b5b0a8;margin-bottom:6px}

input,textarea,select{
  font-family:inherit;font-size:14.5px;
  background:#FDFCFA;border:1.5px solid #F0EEE8;
  border-radius:14px;padding:14px 16px;color:#1a1a1a;
  transition:border-color 0.15s,background 0.15s;width:100%
}
input::placeholder,textarea::placeholder{color:#b5b0a8}
input:focus,textarea:focus,select:focus{
  outline:none;border-color:#D4A857;background:#fff
}
textarea{resize:vertical;min-height:88px;line-height:1.65}

.opt-grid{
  display:flex;flex-wrap:wrap;
  gap:8px;margin-bottom:10px
}
.opt-btn{
  background:#FDFCFA;border:1.5px solid #F0EEE8;
  border-radius:100px;padding:10px 17px;
  font-size:13.5px;font-weight:500;color:#5a5650;
  font-family:inherit;text-align:left;line-height:1.3;
  cursor:pointer;transition:all 0.15s;user-select:none;
  white-space:nowrap
}
.opt-btn:hover{border-color:#E8C878}
.opt-btn.on{
  background:#2a2520;border-color:#2a2520;
  color:#fff;font-weight:600
}

.tag-grid{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.tag-btn{
  background:#F9F8F6;border:1px solid rgba(0,0,0,0.1);
  border-radius:20px;padding:7px 14px;
  font-size:13px;font-weight:500;color:#333;
  font-family:inherit;cursor:pointer;transition:all 0.12s;user-select:none
}
.tag-btn:hover{border-color:#C9A84C;background:#fff}
.tag-btn.on{background:#2C2520;border-color:#2C2520;color:#fff;font-weight:600}

.field-extra{
  font-size:13px;color:#aaa;margin-bottom:6px;
  display:flex;align-items:center;gap:6px
}
.field-extra::before{content:'';display:block;flex:1;height:1px;background:rgba(0,0,0,0.08)}
.field-extra::after{content:'';display:block;flex:1;height:1px;background:rgba(0,0,0,0.08)}

.cta-btn{
  background:#2a2520;color:#fff;border:none;border-radius:100px;
  padding:16px 28px;font-size:15px;font-weight:600;
  cursor:pointer;transition:background 0.15s,transform 0.1s;
  width:100%;font-family:inherit;letter-spacing:0.01em
}
.cta-btn:hover{background:#433a30}
.cta-btn:active{transform:scale(0.99)}
.cta-btn:disabled{opacity:0.35;cursor:not-allowed;transform:none}

.loading-state{text-align:center;padding:3rem 2rem;display:none}
.spinner{width:36px;height:36px;border:3px solid rgba(0,0,0,0.1);border-top-color:#C9A84C;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 1rem}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-state p{color:#5F5E5A;font-size:14px}
#stream-preview{display:none;background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:1.75rem;margin-bottom:1rem}
#stream-preview h2{font-size:15px;font-weight:600;margin-bottom:1rem;color:#2C2520}
#stream-text{font-size:14px;line-height:1.8;color:#4A3F35;white-space:pre-wrap;font-family:inherit;min-height:80px}
.cur{display:inline-block;width:2px;height:1em;background:#C9A84C;animation:blink 0.8s infinite;vertical-align:text-bottom;margin-left:2px}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
#result-section{display:none}
.rc{background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:1.75rem;margin-bottom:1rem}
.rh{display:flex;align-items:center;gap:10px;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid rgba(0,0,0,0.07)}
.ri{width:36px;height:36px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.ri.te{background:var(--t50)} .ri.am{background:var(--a50)}
.rh h2{font-size:16px;font-weight:600;color:#2C2520}
.rh p{font-size:13px;color:#5F5E5A;margin-top:2px}
.chgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:10px;margin-top:0.75rem}
.chcard{background:#F9F8F6;border:1px solid rgba(0,0,0,0.08);border-radius:6px;padding:12px}
.chcard .chn{font-size:13px;font-weight:600;color:#2C2520}
.prio{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;padding:2px 8px;border-radius:10px;display:inline-block}
.ph{background:var(--t50);color:var(--t600)} .pm{background:var(--a50);color:var(--a600)} .pl{background:var(--g50);color:var(--g600)}
.ctaf{background:#2C2520;border-radius:10px;padding:1.75rem;color:#fff;text-align:center;margin-top:1.5rem}
.ctaf h3{font-size:18px;font-weight:700;margin-bottom:0.5rem}
.ctaf p{font-size:14px;color:rgba(255,255,255,0.5);margin-bottom:1.25rem;line-height:1.6}
.ctaf-btn{background:var(--gold);color:#0a0a0a;border:none;border-radius:6px;padding:12px 28px;font-size:14px;font-weight:700;letter-spacing:0.04em;cursor:pointer;font-family:inherit}
.ctaf-btn:hover{background:var(--gold-light)}
.err{background:#FFF0F0;border:1px solid #F09595;border-radius:6px;padding:12px 16px;font-size:13px;color:#791F1F;margin-top:1rem;display:none}
.reset-btn{background:none;border:1.5px solid #F0EEE8;border-radius:100px;padding:10px 20px;font-size:13px;cursor:pointer;color:#a8a39a;font-family:inherit;margin-top:1rem;transition:all 0.15s}
.reset-btn:hover{border-color:#2a2520;color:#2a2520}
.saved-banner{background:var(--t50);border:1px solid var(--t100);border-radius:6px;padding:10px 14px;font-size:13px;color:var(--t800);margin-bottom:1rem;display:none;align-items:center;gap:8px}

/* ─── ACTION BAR ─── */
.action-bar{
  background:#F5F3EE;border-top:1px solid rgba(0,0,0,0.08);
  padding:1rem 1.5rem;
  margin:0 0 0;
}
.action-bar-inner{
  max-width:720px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap
}
.action-bar-label{font-size:13px;color:#888;font-weight:500}
.action-bar-btns{display:flex;gap:8px;flex-wrap:wrap}
.action-bar-btn{
  display:flex;align-items:center;gap:6px;
  background:#fff;border:1px solid rgba(0,0,0,0.12);border-radius:6px;
  padding:8px 14px;font-size:13px;font-weight:500;color:#333;
  cursor:pointer;font-family:inherit;transition:all 0.15s
}
.action-bar-btn:hover{border-color:#C9A84C;color:#2C2520}

/* ─── NEW CTA BLOCK ─── */
.ctaf-new{
  background:#2C2520;
  padding:2.5rem 1.5rem;
  margin:0 0 0;
}
.ctaf-new-inner{
  max-width:720px;margin:0 auto;
  display:grid;grid-template-columns:auto 1fr auto;gap:2rem;align-items:center;
}
@media(max-width:680px){.ctaf-new-inner{grid-template-columns:1fr;text-align:center}}
.ctaf-logo-wrap{
  display:flex;align-items:center;justify-content:center;
  width:80px;height:80px;background:rgba(255,255,255,0.05);
  border-radius:12px;border:1px solid rgba(255,255,255,0.08);
  flex-shrink:0
}
@media(max-width:680px){.ctaf-logo-wrap{width:60px;height:60px;margin:0 auto}}
.ctaf-new-text h3{
  font-size:18px;font-weight:700;color:#fff;margin-bottom:0.5rem;letter-spacing:-0.01em
}
.ctaf-new-text p{
  font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:0.75rem
}
.ctaf-new-bullets{
  display:flex;gap:1rem;flex-wrap:wrap
}
@media(max-width:680px){.ctaf-new-bullets{justify-content:center}}
.ctaf-new-bullets span{
  font-size:12px;color:rgba(255,255,255,0.45);font-weight:500
}
.ctaf-new-cta{
  display:flex;flex-direction:column;align-items:center;gap:8px;flex-shrink:0
}
.ctaf-btn-primary{
  background:#C9A84C;color:#0a0a0a;border:none;border-radius:8px;
  padding:14px 24px;font-size:14px;font-weight:700;cursor:pointer;
  font-family:inherit;white-space:nowrap;letter-spacing:0.02em;
  transition:background 0.15s;min-width:200px
}
.ctaf-btn-primary:hover{background:#E8C97A}
.ctaf-sub{font-size:11px;color:rgba(255,255,255,0.3);text-align:center}

/* ─── EMAIL MODAL ─── */
#email-modal{
  display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);
  z-index:9999;align-items:center;justify-content:center
}
#email-modal.open{display:flex}
.email-modal-box{
  background:#fff;border-radius:12px;padding:2rem;width:90%;max-width:420px
}
.email-modal-box h3{font-size:16px;font-weight:700;margin-bottom:0.5rem;color:#2C2520}
.email-modal-box p{font-size:13px;color:#666;margin-bottom:1.25rem;line-height:1.6}
.email-modal-box input{
  width:100%;border:1px solid rgba(0,0,0,0.15);border-radius:6px;
  padding:10px 14px;font-size:14px;font-family:inherit;margin-bottom:0.75rem
}
.email-modal-box input:focus{outline:none;border-color:#C9A84C}
.email-modal-row{display:flex;gap:8px}
.email-modal-send{
  flex:1;background:#2C2520;color:#fff;border:none;border-radius:6px;
  padding:10px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit
}
.email-modal-cancel{
  background:#fff;color:#666;border:1px solid rgba(0,0,0,0.12);border-radius:6px;
  padding:10px 16px;font-size:13px;cursor:pointer;font-family:inherit
}
.email-modal-note{font-size:11px;color:#aaa;margin-top:8px;text-align:center}


/* ─── ADDITIONAL MOBILE FIXES ─── */
@media(max-width:640px){
  .statement-lead{max-width:100%}
  .hero-actions{gap:1rem}
  .btn-primary,.btn-ghost{padding:13px 22px;font-size:13px}
  .action-bar-inner{flex-direction:column;align-items:flex-start;gap:0.75rem}
  .action-bar-btns{width:100%}
  .action-bar-btn{flex:1;justify-content:center}
  .chgrid{grid-template-columns:1fr 1fr}
  .rh h2{font-size:15px}
  .ctaf-new{padding:2rem 1.25rem}
  .container{padding:1.5rem 1rem}
  .form-block{padding:1.5rem}
  header{padding:0.875rem 1.25rem}
  .cta-h2{letter-spacing:-0.02em}
}
@media(max-width:400px){
  .chgrid{grid-template-columns:1fr}
  .action-bar-btn{font-size:12px;padding:8px 10px}
}

@media print {
  #landing, header, .saved-banner, .action-bar, .ctaf-new, .reset-btn, #email-modal { display:none !important; }
  #app { display:block !important; background:#fff; }
  #result-section { display:block !important; }
  .rc { break-inside:avoid; }
}


/* ─── MULTI-STEP FORM ─── */
.form-progress{display:flex;gap:5px;margin-bottom:2.25rem}
.fp-step{display:none}
.fp-dot{height:4px;flex:1;border-radius:4px;background:#F0EEE8;transition:background 0.3s}
.fp-dot.done,.fp-dot.active{background:linear-gradient(90deg,#D4A857,#E8C878)}
.fp-dot.pending{background:#F0EEE8}
.fp-label{display:none}
.fp-line{display:none}

.fstep{display:none}
.fstep.active{display:block}
.fstep-header{display:flex;flex-direction:column;margin-bottom:6px}
.fstep-counter{font-size:12px;color:#C4A576;font-weight:700;letter-spacing:0.04em;margin-bottom:10px;order:-1}
.fstep-title{font-size:27px;font-weight:600;color:#1a1a1a;letter-spacing:-0.02em;line-height:1.25}
.fstep-sub{font-size:14px;color:#8A8680;margin-bottom:2.25rem;line-height:1.55;margin-top:6px}

.chip-group{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;margin-bottom:4px}
.chip{padding:10px 18px;border-radius:100px;font-size:13.5px;font-weight:500;cursor:pointer;border:1.5px solid #F0EEE8;background:#FDFCFA;color:#5a5650;transition:all 0.15s;user-select:none;font-family:inherit;line-height:1}
.chip:hover{border-color:#E8C878}
.chip.on{background:#2a2520;border-color:#2a2520;color:#fff;font-weight:600}

.budget-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:8px}
@media(max-width:480px){.budget-grid{grid-template-columns:repeat(2,1fr)}}
.budget-card{padding:18px 12px;border-radius:18px;font-size:13.5px;font-weight:500;cursor:pointer;border:1.5px solid #F0EEE8;background:#FDFCFA;color:#5a5650;text-align:center;transition:all 0.15s;font-family:inherit;line-height:1.4}
.budget-card:hover{border-color:#E8C878}
.budget-card.on{background:#2a2520;border-color:#2a2520;color:#fff}

.form-divider{height:1px;background:#F0EEE8;margin:2rem 0}

.fnav{display:flex;align-items:center;justify-content:flex-end;margin-top:2.5rem;gap:0.75rem}
.fnav-next{background:#2a2520;color:#fff;border:none;border-radius:100px;padding:14px 28px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.15s;letter-spacing:0.01em}
.fnav-next:hover{background:#433a30}
.fnav-back{background:none;border:none;padding:12px 4px;font-size:13px;cursor:pointer;color:#b5b0a8;font-family:inherit;transition:color 0.15s;margin-right:auto}
.fnav-back:hover{color:#2a2520}

.fstep-summary{background:#FDFCFA;border:1.5px solid #F0EEE8;border-radius:18px;padding:1.4rem 1.6rem;margin-top:1.5rem}
.fstep-summary-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C4A576;margin-bottom:12px}
.fstep-summary-row{display:flex;align-items:flex-start;gap:9px;font-size:13.5px;color:#5a5650;margin-bottom:8px;line-height:1.55}
.fstep-summary-row:last-child{margin-bottom:0}
.fstep-summary-dot{width:6px;height:6px;border-radius:50%;background:#D4A857;flex-shrink:0;margin-top:6px}


/* Force hide app on load */
#app{display:none}

/* ── Typewriter cursor ── */
.tw-cursor{
  display:inline-block;
  color:#C9A84C;
  font-weight:300;
  animation:tw-blink 0.9s step-end infinite;
  margin-left:2px;
}
@keyframes tw-blink{0%,100%{opacity:1}50%{opacity:0}}

/* ── Scroll reveal ── */
.reveal{
  opacity:0;
  transform:translateY(32px);
  transition:opacity 0.75s ease, transform 0.75s ease;
}
.reveal.visible{
  opacity:1;
  transform:translateY(0);
}

/* ── Parallax hero bg ── */
.hero-bg{
  will-change:transform;
}

/* ─── ABOUT PAGE ─── */
#about-page{display:none;background:#0a0a0a;color:#fff;min-height:100vh}
.about-nav{display:flex;align-items:center;justify-content:space-between;padding:2rem 3rem;border-bottom:1px solid rgba(255,255,255,0.06)}
@media(max-width:640px){.about-nav{padding:1.5rem}}
.about-hero{padding:6rem 3rem 4rem;max-width:900px;margin:0 auto}
@media(max-width:640px){.about-hero{padding:4rem 1.5rem 3rem}}
.about-divider{border:none;border-top:1px solid rgba(255,255,255,0.08);margin:0}
.about-people{padding:5rem 3rem;max-width:900px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:3rem}
@media(max-width:640px){.about-people{grid-template-columns:1fr;padding:3rem 1.5rem}}
.about-person{display:flex;flex-direction:column;gap:1.25rem}
.about-avatar-wrap{display:flex;align-items:center;gap:1rem}
.about-avatar{width:56px;height:56px;border-radius:50%;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.25);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:#C9A84C;flex-shrink:0}
.about-person-name{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.01em}
.about-person-title{font-size:13px;color:rgba(255,255,255,0.45);margin-top:2px}
.about-person-bio{font-size:14px;color:rgba(255,255,255,0.65);line-height:1.75}
.about-person-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:0.5rem}
.about-ptag{font-size:11px;font-weight:600;letter-spacing:0.06em;padding:4px 10px;border-radius:100px;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.5);border:1px solid rgba(255,255,255,0.08)}
.about-what{padding:5rem 3rem;max-width:900px;margin:0 auto}
@media(max-width:640px){.about-what{padding:3rem 1.5rem}}
.about-two-col{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;margin-top:3rem;margin-bottom:3rem}
@media(max-width:640px){.about-two-col{grid-template-columns:1fr;gap:2rem}}
.about-quote-block{font-size:clamp(1.2rem,2vw,1.5rem);font-weight:700;color:#fff;line-height:1.45;letter-spacing:-0.02em;border-left:3px solid #C9A84C;padding-left:1.5rem;border-radius:0}
.about-quote-block em{color:#C9A84C;font-style:normal}
.about-logo-box{display:flex;align-items:center;justify-content:center;}
.about-logo-box img{height:52px;width:auto}
.about-body-text{display:flex;flex-direction:column;gap:1.25rem}
.about-body-text p{font-size:14px;color:rgba(255,255,255,0.6);line-height:1.8}
.about-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:0.75rem}
.about-pill{font-size:12px;font-weight:600;letter-spacing:0.05em;padding:5px 12px;border-radius:100px;border:1px solid rgba(201,168,76,0.3);color:rgba(201,168,76,0.8)}
.about-cta{padding:5rem 3rem;max-width:900px;margin:0 auto;text-align:center}
@media(max-width:640px){.about-cta{padding:3rem 1.5rem}}
.about-cta-h{font-size:clamp(1.6rem,3vw,2.4rem);font-weight:700;color:#fff;letter-spacing:-0.02em;margin-bottom:1rem}
.about-cta-sub{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:2rem;max-width:480px;margin-left:auto;margin-right:auto}
.about-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#C9A84C;color:#0a0a0a;font-size:14px;font-weight:700;padding:14px 28px;border-radius:8px;border:none;cursor:pointer;letter-spacing:0.02em;font-family:inherit;transition:background 0.15s}
.about-cta-btn:hover{background:#E8C97A}
.about-cta-note{font-size:12px;color:rgba(255,255,255,0.25);margin-top:1rem}

/* ─── NATIVE AUTO REACH ─── */
#native-page{display:none}
body.native-mode{background:#FBFAF7}
.native-header{background:#fff;border-bottom:1px solid rgba(0,0,0,0.08);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.native-header-brand{display:flex;align-items:center;gap:12px}
.native-header-title{font-size:15px;font-weight:600;color:#2C2520}
.native-header-sub{font-size:12px;color:#9A8570}
.native-container{max-width:760px;margin:0 auto;padding:2rem 1.5rem 4rem}
.native-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#9A8570;margin-bottom:1rem;margin-top:2rem}
.native-field{margin-bottom:1.6rem}
.native-field label{display:block;font-size:15px;font-weight:500;color:#2a2520;margin-bottom:8px;line-height:1.4}
.native-field label span{font-weight:400;color:#b5b0a8;font-size:12px;margin-left:4px}
.native-input,.native-textarea,.native-select{width:100%;padding:14px 16px;border:1.5px solid #F0EEE8;border-radius:14px;font-size:14.5px;font-family:inherit;color:#1a1a1a;background:#FDFCFA;outline:none;transition:border-color 0.15s}
.native-input::placeholder,.native-textarea::placeholder{color:#b5b0a8}
.native-input:focus,.native-textarea:focus,.native-select:focus{border-color:#D4A857;background:#fff}
.native-textarea{min-height:100px;resize:vertical;line-height:1.6}
.native-media-grid{margin-bottom:0.5rem}
.native-media-card{border:1.5px solid #F0EEE8;border-radius:16px;padding:14px;cursor:pointer;transition:all 0.15s;background:#FDFCFA;user-select:none}
.native-media-card:hover{border-color:#E8C878}
.native-media-card.selected{border-color:#2a2520;background:#2a2520}
.native-media-card.selected .native-media-name{color:#fff}
.native-media-card.selected .native-media-group,.native-media-card.selected .native-media-reach{color:rgba(255,255,255,0.55)}
.native-media-card input[type=checkbox]{display:none}
.native-media-name{font-size:13.5px;font-weight:600;color:#2a2520;margin-bottom:2px}
.native-media-group{font-size:11px;color:#a8a39a;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.06em}
.native-media-reach{font-size:11px;color:#5a5650}
.native-media-check{width:16px;height:16px;border-radius:5px;border:1.5px solid #E0DCD2;margin-bottom:6px;display:flex;align-items:center;justify-content:center}
.native-media-card.selected .native-media-check{background:#D4A857;border-color:#D4A857}
.native-budget-wrap{display:flex;align-items:center;gap:12px}
.native-budget-wrap .native-input{max-width:200px}
.native-budget-note{font-size:12px;color:#a8a39a;margin-top:6px}
.native-analyze-btn{width:100%;padding:16px;background:#2a2520;color:#fff;border:none;border-radius:100px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;transition:background 0.15s;margin-top:1.5rem}
.native-type-grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.native-type-btn{padding:9px 16px;border:1.5px solid #F0EEE8;background:#fff;border-radius:100px;font-size:13px;font-weight:500;color:#5a5650;cursor:pointer;font-family:inherit;transition:all 0.15s}
.native-type-btn:hover{border-color:#E8C878}
.native-type-btn.on{background:#2a2520;color:#fff;border-color:#2a2520}
.native-type-hint{font-size:12.5px;color:#9A8570;line-height:1.55;margin-top:10px;min-height:1.2em}
.native-analyze-btn:hover{background:#433a30}
.native-analyze-btn:disabled{opacity:0.4;cursor:not-allowed}
.native-loading{text-align:center;padding:3rem 1rem;display:none}
.native-loading-text{font-size:15px;color:#8a8680;margin-top:1rem}
.native-result{display:none;background:#fff;border:1.5px solid #F0EEE8;border-radius:18px;padding:2rem;margin-top:1.5rem}
.native-result-headline{font-size:24px;font-weight:600;color:#1a1a1a;line-height:1.3;margin-bottom:1rem;letter-spacing:-0.02em}
.native-result-ingress{font-size:16px;color:#4A3F35;line-height:1.7;font-style:italic;border-left:3px solid #D4A857;padding-left:1rem;margin-bottom:1.5rem}
.native-result-body{font-size:15px;color:#2a2520;line-height:1.85}
.native-result-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:2rem;padding-top:1.5rem;border-top:1px solid #F0EEE8}
.native-action-btn{display:flex;align-items:center;gap:7px;padding:11px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;border:1.5px solid #F0EEE8;background:#fff;color:#2a2520;transition:all 0.15s}
.native-action-btn:hover{border-color:#E8C878}
.native-action-btn.primary{background:#2a2520;color:#fff;border-color:#2a2520}
.native-action-btn.primary:hover{background:#433a30}
.native-budget-dist{background:#FDFCFA;border:1.5px solid #F0EEE8;border-radius:14px;padding:1.25rem;margin-top:1.5rem}
.native-budget-dist-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#C4A576;margin-bottom:1rem}
.native-budget-row{display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #F0EEE8;font-size:13px;color:#2a2520}
.native-budget-row:last-child{border-bottom:none}
.native-budget-bar-wrap{width:100px;height:6px;background:#F0EEE8;border-radius:3px;margin:0 12px}
.native-budget-bar{height:100%;background:#D4A857;border-radius:3px}
.native-new-btn{background:none;border:1.5px solid #F0EEE8;border-radius:100px;padding:10px 20px;font-size:13px;font-weight:500;color:#a8a39a;cursor:pointer;font-family:inherit;margin-top:1rem;display:block;width:100%;text-align:center;transition:all 0.15s}
.native-new-btn:hover{border-color:#2a2520;color:#2a2520}

/* ─── TOOLS HUB PAGE ─── */
#tools-page{display:none;background:#F5F3EE;color:#2C2520;min-height:100vh}
.tools-nav{display:flex;align-items:center;justify-content:space-between;padding:2rem 3rem;border-bottom:1px solid rgba(0,0,0,0.08)}
@media(max-width:640px){.tools-nav{padding:1.5rem}}
.tools-hero{padding:5rem 3rem 3rem;max-width:960px;margin:0 auto}
@media(max-width:640px){.tools-hero{padding:3rem 1.5rem 2rem}}
.tools-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#e8e4db;border:1px solid #e8e4db;border-radius:12px;overflow:hidden;width:100%;margin:0 0 4rem}
@media(max-width:700px){.tools-grid{grid-template-columns:1fr}}
.tool-card{background:#fdfcfa;padding:2rem;cursor:default;transition:background 0.15s;position:relative;display:flex;flex-direction:column;gap:0;min-height:280px}
.tool-card:hover{background:#f7f4ee}
.tool-card:hover .tool-card-cta{opacity:1}
.tool-card-num{font-size:11px;font-weight:700;letter-spacing:0.12em;color:#c9c2b5;margin-bottom:1.25rem}
.tool-card-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;flex-shrink:0}
.tool-card-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#b0a795;margin-bottom:4px}
.tool-card-title{font-size:18px;font-weight:700;color:#2C2520;letter-spacing:-0.01em;margin-bottom:8px}
.tool-card-desc{font-size:13px;color:#8a7d6d;line-height:1.65;margin-bottom:1.25rem}
.tool-card-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:auto}
.tool-card-tag{font-size:10px;font-weight:600;letter-spacing:0.05em;padding:3px 8px;border-radius:4px;background:#f2efe8;color:#9a8f7d;border:1px solid #ebe7de}
.tool-card-cta{position:absolute;top:2rem;right:2rem;width:28px;height:28px;border-radius:50%;border:1px solid rgba(0,0,0,0.12);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.15s}
.tool-card-btn{display:inline-flex;align-items:center;gap:6px;margin-top:1.25rem;padding:9px 16px;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:6px;font-size:12px;font-weight:600;color:#9c7d2e;cursor:pointer;font-family:inherit;transition:all 0.15s;letter-spacing:0.04em;width:auto;align-self:flex-start}
.tool-card-btn:hover{background:rgba(201,168,76,0.2);border-color:rgba(201,168,76,0.5)}

/* Wide selling cards for tools page */
.tools-sell{max-width:900px;margin:0 auto 4rem;display:flex;flex-direction:column;gap:16px;padding:0 1.5rem}
.tsell-card{background:#fff;border:1px solid #e8e4db;border-radius:16px;overflow:hidden;display:grid;grid-template-columns:220px 1fr;transition:box-shadow 0.2s,transform 0.2s}
.tsell-card:hover{box-shadow:0 8px 30px rgba(44,37,32,0.08);transform:translateY(-2px)}
.tsell-img{position:relative;min-height:180px;background-size:cover;background-position:center}
.tsell-img-badge{position:absolute;top:14px;left:14px;background:rgba(255,255,255,0.92);font-size:10px;font-weight:700;letter-spacing:0.06em;padding:5px 11px;border-radius:20px}
.tsell-body{padding:1.5rem 1.75rem;display:flex;flex-direction:column}
.tsell-title{font-size:20px;font-weight:700;color:#2C2520;letter-spacing:-0.01em;margin-bottom:7px}
.tsell-desc{font-size:14px;color:#8a7d6d;line-height:1.6;margin-bottom:16px}
.tsell-gets-label{font-size:12px;font-weight:700;color:#2C2520;margin-bottom:8px}
.tsell-tags{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px}
.tsell-tag{font-size:11px;font-weight:600;padding:4px 10px;border-radius:14px}
.tsell-btn{align-self:flex-start;margin-top:auto;display:inline-flex;align-items:center;gap:7px;background:#2C2520;color:#fff;border:none;border-radius:22px;padding:10px 20px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.2s}
.tsell-btn:hover{background:#453a30}
@media(max-width:640px){.tsell-card{grid-template-columns:1fr}.tsell-img{min-height:140px}}

/* ─── DISTRIBUTION PLANNER ─── */
#dist-page{display:none}
body.dist-mode{background:#F5F3EE}
.dist-header{background:#fff;border-bottom:1px solid rgba(0,0,0,0.08);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.dist-container{max-width:760px;margin:0 auto;padding:2rem 1.5rem 4rem}
.dist-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#9A8570;margin-bottom:1rem;margin-top:2rem;padding-top:1rem;border-top:1px solid rgba(0,0,0,0.07)}
.dist-section-title:first-of-type{border-top:none;margin-top:0;padding-top:0}
.dist-field{margin-bottom:1.25rem}
.dist-field label{display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px}
.dist-field label span{font-weight:400;color:#9A8570;font-size:12px;margin-left:4px}
.dist-input,.dist-textarea,.dist-select{width:100%;padding:10px 14px;border:1px solid rgba(0,0,0,0.12);border-radius:8px;font-size:14px;font-family:inherit;color:#2C2520;background:#fff;outline:none;transition:border-color 0.15s}
.dist-input:focus,.dist-textarea:focus,.dist-select:focus{border-color:#C9A84C}
.dist-textarea{min-height:90px;resize:vertical;line-height:1.6}
.dist-channel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:10px;margin-bottom:0.5rem}
.dist-ch{border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:12px;cursor:pointer;background:#fff;transition:all 0.15s;user-select:none}
.dist-ch.sel{border-color:#C9A84C;background:rgba(201,168,76,0.06)}
.dist-ch-icon{font-size:18px;margin-bottom:6px}
.dist-ch-name{font-size:13px;font-weight:600;color:#2C2520;margin-bottom:3px}
.dist-ch-desc{font-size:11px;color:#9A8570;line-height:1.4}
.dist-analyze-btn{width:100%;padding:14px;background:#2C2520;color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.02em;transition:background 0.15s;margin-top:1.5rem}
.dist-analyze-btn:hover{background:#4A3F35}
.dist-analyze-btn:disabled{opacity:0.4;cursor:not-allowed}
.dist-loading{text-align:center;padding:3rem 1rem;display:none}
.dist-result{display:none;margin-top:1.5rem}
.dist-result-card{background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:10px;padding:1.75rem;margin-bottom:1rem}
.dist-result-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C9A84C;margin-bottom:0.75rem}
.dist-result-title{font-size:17px;font-weight:700;color:#2C2520;margin-bottom:0.75rem}
.dist-result-text{font-size:14px;color:#4A3F35;line-height:1.8}
.dist-channel-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06);font-size:14px;color:#2C2520}
.dist-channel-row:last-child{border-bottom:none}
.dist-bar-wrap{flex:1;margin:0 12px;height:6px;background:rgba(0,0,0,0.07);border-radius:3px}
.dist-bar{height:100%;background:#C9A84C;border-radius:3px}
.dist-result-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:1.5rem}
.dist-action-btn{display:flex;align-items:center;gap:7px;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;border:1px solid rgba(0,0,0,0.12);background:#fff;color:#2C2520;transition:all 0.15s}
.dist-action-btn:hover{border-color:#C9A84C}
.dist-action-btn.primary{background:#2C2520;color:#fff;border-color:#2C2520}
.dist-new-btn{background:none;border:1px solid rgba(0,0,0,0.12);border-radius:8px;padding:10px 20px;font-size:13px;font-weight:500;color:#5F5E5A;cursor:pointer;font-family:inherit;margin-top:1rem;display:block;width:100%;text-align:center;transition:all 0.15s}
.dist-new-btn:hover{border-color:#C9A84C;color:#2C2520}

/* ─── AD COPY GENERATOR ─── */
#adcopy-page{display:none}
body.adcopy-mode{background:#FBFAF7}
.adcopy-header{background:#fff;border-bottom:1px solid rgba(0,0,0,0.08);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.adcopy-container{max-width:760px;margin:0 auto;padding:2rem 1.5rem 4rem}
.adcopy-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#C4A576;margin-bottom:1rem;margin-top:2rem;padding-top:1rem;border-top:1px solid #F0EEE8}
.adcopy-section-title:first-of-type{border-top:none;margin-top:0;padding-top:0}
.adcopy-field{margin-bottom:1.6rem}
.adcopy-field label{display:block;font-size:15px;font-weight:500;color:#2a2520;margin-bottom:8px;line-height:1.4}
.adcopy-field label span{font-weight:400;color:#b5b0a8;font-size:12px;margin-left:4px}
.adcopy-input,.adcopy-textarea,.adcopy-select{width:100%;padding:14px 16px;border:1.5px solid #F0EEE8;border-radius:14px;font-size:14.5px;font-family:inherit;color:#1a1a1a;background:#FDFCFA;outline:none;transition:border-color 0.15s}
.adcopy-input::placeholder,.adcopy-textarea::placeholder{color:#b5b0a8}
.adcopy-input:focus,.adcopy-textarea:focus,.adcopy-select:focus{border-color:#D4A857;background:#fff}
.adcopy-textarea{min-height:90px;resize:vertical;line-height:1.6}
.adcopy-analyze-btn{width:100%;padding:16px;background:#2a2520;color:#fff;border:none;border-radius:100px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;transition:background 0.15s;margin-top:1.5rem}
.adcopy-analyze-btn:hover{background:#433a30}
.adcopy-analyze-btn:disabled{opacity:0.4;cursor:not-allowed}
.adcopy-loading{text-align:center;padding:3rem 1rem;display:none}
.adcopy-result{display:none;margin-top:1.5rem}
.adcopy-new-btn{background:none;border:1.5px solid #F0EEE8;border-radius:100px;padding:10px 20px;font-size:13px;font-weight:500;color:#a8a39a;cursor:pointer;font-family:inherit;margin-top:1rem;display:block;width:100%;text-align:center;transition:all 0.15s}
.adcopy-new-btn:hover{border-color:#2a2520;color:#2a2520}

/* ─── AD GENERATOR (upload, format chips, canvas results) ─── */
.adgen-upload-zone{position:relative;border:1.5px dashed #E0DCD2;border-radius:18px;padding:2rem;text-align:center;cursor:pointer;background:#FDFCFA;transition:border-color 0.15s}
.adgen-upload-zone:hover{border-color:#D4A857}
.adgen-upload-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.adgen-preview-img{display:none;max-width:100%;max-height:200px;border-radius:14px;margin-top:1rem}
.adgen-format-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(155px,1fr));gap:10px;margin-bottom:0.5rem}
.adgen-fmt{border:1.5px solid #F0EEE8;border-radius:16px;padding:14px;cursor:pointer;background:#FDFCFA;transition:all 0.15s;user-select:none}
.adgen-fmt:hover{border-color:#E8C878}
.adgen-fmt.sel{border-color:#2a2520;background:#2a2520}
.adgen-fmt.sel .adgen-fmt-name{color:#fff}
.adgen-fmt.sel .adgen-fmt-size{color:rgba(255,255,255,0.55)}
.adgen-fmt-name{font-size:13.5px;font-weight:600;color:#2a2520;margin-bottom:2px}
.adgen-fmt-size{font-size:11.5px;color:#a8a39a}
.adgen-result-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.25rem;margin-top:1rem}
.adgen-result-card{background:#fff;border:1.5px solid #F0EEE8;border-radius:18px;padding:1.25rem}
.adgen-result-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C4A576;margin-bottom:0.75rem}
.adgen-canvas-wrap{display:flex;align-items:center;justify-content:center;background:#FDFCFA;border-radius:12px;overflow:hidden;margin-bottom:0.75rem}
.adgen-canvas-wrap canvas{max-width:100%;height:auto}
.adgen-dl-btn{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:10px 14px;border-radius:100px;font-size:12.5px;font-weight:600;cursor:pointer;font-family:inherit;border:1.5px solid #F0EEE8;background:#fff;color:#2a2520;transition:all 0.15s}
.adgen-dl-btn:hover{border-color:#E8C878}
.adcopy-format-block{background:#fff;border:1.5px solid #F0EEE8;border-radius:18px;padding:1.75rem;margin-bottom:1rem}
.adcopy-format-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C4A576;margin-bottom:0.5rem}
.adcopy-variant{background:#FDFCFA;border-radius:14px;padding:1rem 1.25rem;margin-bottom:0.75rem}
.adcopy-variant-num{font-size:11px;font-weight:700;color:#a8a39a;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px}
.adcopy-variant-headline{font-size:15px;font-weight:600;color:#2a2520;margin-bottom:4px}
.adcopy-variant-body{font-size:13px;color:#4A3F35;line-height:1.6}
.adcopy-variant-cta{display:inline-block;margin-top:6px;font-size:12px;font-weight:600;color:#C4A576}
.adcopy-action-btn{display:flex;align-items:center;gap:7px;padding:11px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;border:1.5px solid #F0EEE8;background:#fff;color:#2a2520;transition:all 0.15s}
.adcopy-action-btn:hover{border-color:#E8C878}

/* ─── TOOLBOX SPLIT SECTION ─── */
.tb-split{position:relative;overflow:hidden;background:#0a0a0a;min-height:1000px}
.tb-left{position:relative;z-index:1;padding:7rem 4rem 7rem 4rem;max-width:1000px}
@media(max-width:768px){
  .tb-split{min-height:auto}
  .tb-left{padding:4rem 1.5rem 3rem}
  .tb-left > div[style*="grid-template-columns"]{grid-template-columns:1fr !important}
}
.tb-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;margin-bottom:2.5rem}
@media(max-width:480px){.tb-grid{grid-template-columns:1fr}}
.tb-card{background:#0d0d0d;padding:1.25rem 1.5rem;display:flex;flex-direction:column}
.tb-card-border{border-top:1px solid rgba(255,255,255,0.08)}
@media(min-width:641px){
  .tb-card{padding:1.5rem}
  .tb-card .tc-num{font-size:10px;margin-bottom:0.5rem}
  .tb-card .tc-icon{width:30px;height:30px;margin-bottom:0.6rem}
  .tb-card .tc-title{font-size:16px;font-weight:700;margin-bottom:5px}
  .tb-card .tc-desc{font-size:13px;margin-bottom:0.85rem}
}
.tb-card-btn{display:inline-flex;align-items:center;gap:5px;padding:7px 12px;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:5px;font-size:11px;font-weight:700;color:#C9A84C;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;font-family:inherit;width:auto;align-self:flex-start;transition:all 0.15s}
.tb-card-btn:hover{background:rgba(201,168,76,0.15);border-color:rgba(201,168,76,0.4)}

/* ─── MOBILE FIXES ─── */
@media(max-width:768px){
  /* Varför 3-col → 1-col */
  .varfor-grid{grid-template-columns:1fr !important;gap:2rem !important}
  /* Toolbox list rows – stack button below text */
  .tb-list-row{flex-wrap:wrap !important}
  .tb-list-row .tb-card-btn{margin-top:8px}
}

@media(max-width:640px){
  /* Nav – hide "Om oss" on small screens, keep Toolbox + Login */
  .nav-om-oss{display:none}
  .site-nav{padding:1.25rem 1.5rem}
  .nav-logo{height:36px}

  /* Hero */
  .hero{min-height:90vh}
  .hero-content{padding:2rem 1.5rem 3rem}
  .hero-h1{font-size:clamp(1.75rem,7vw,2.4rem);line-height:1.08}
  .hero-lead{font-size:14px;max-width:100%}
  .hero-actions{flex-direction:column;align-items:flex-start;gap:10px}
  .btn-primary,.btn-ghost{width:100%;justify-content:center}
  .scroll-hint{display:none}

  /* Sections */
  .section-dark{padding:4rem 1.5rem}
  .section-light{padding:4rem 1.5rem}
  .big-statement{font-size:clamp(1.6rem,6vw,2rem)}
  .big-statement-dark{font-size:clamp(1.6rem,6vw,2rem)}
  .statement-lead{font-size:14px}

  /* Varför section padding */
  .varfor-section{padding:4rem 1.5rem !important}

  /* Pillars */
  .pillars{grid-template-columns:1fr;gap:2rem}

  /* Steps */
  .steps-dark{grid-template-columns:1fr;gap:2rem}

  /* CTA section */
  .section-cta{padding:4rem 1.5rem}
  .section-cta .btn-primary{width:100%;justify-content:center}

  /* Footer */
  .site-footer{padding:2rem 1.5rem;flex-direction:column;gap:1rem;text-align:center}
  footer .footer-grid{grid-template-columns:1fr !important;gap:2rem !important}

  /* Forms inside tools */
  .native-container,.dist-container,.adcopy-container{padding:1.5rem 1rem 3rem}
  .native-header,.dist-header,.adcopy-header{padding:1rem}
  .dist-channel-grid,.adcopy-format-grid{grid-template-columns:1fr 1fr}

  /* Tool result actions */
  .native-result-actions,.dist-result-actions,.adcopy-result-actions{flex-direction:column}
  .native-action-btn,.dist-action-btn,.adcopy-action-btn{width:100%;justify-content:center}

  /* Toolbox undersidan */
  .tools-hero{padding:3rem 1.5rem 1.5rem}
}

@media(max-width:480px){
  /* Tools grid 1 col */
  .tools-grid{grid-template-columns:1fr}
  .tool-card{min-height:auto}

  /* Budget grid */
  .budget-grid{grid-template-columns:repeat(2,1fr) !important}

  /* Native media accordion full width */
  .native-media-grid{gap:0}

  /* Ad copy formats 1 col */
  .adcopy-format-grid{grid-template-columns:1fr 1fr}
  .dist-channel-grid{grid-template-columns:1fr 1fr}
}

/* ─── NEWSROOM ─── */
#newsroom-page{display:none}
body.newsroom-mode{background:#FBFAF7}
.newsroom-header{background:#fff;border-bottom:1px solid rgba(0,0,0,0.08);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.newsroom-header-brand{display:flex;align-items:center;gap:12px}
.newsroom-header-title{font-size:15px;font-weight:600;color:#2C2520}
.newsroom-header-sub{font-size:12px;color:#9A8570}
.newsroom-container{max-width:760px;margin:0 auto;padding:2rem 1.5rem 4rem}
.newsroom-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#C4A576;margin-bottom:1rem;margin-top:2rem;padding-top:1rem;border-top:1px solid #F0EEE8}
.newsroom-section-title:first-of-type{border-top:none;margin-top:0;padding-top:0}
.newsroom-field{margin-bottom:1.6rem}
.newsroom-field label{display:block;font-size:15px;font-weight:500;color:#2a2520;margin-bottom:8px;line-height:1.4}
.newsroom-field label span{font-weight:400;color:#b5b0a8;font-size:12px;margin-left:4px}
.newsroom-input,.newsroom-textarea,.newsroom-select{width:100%;padding:14px 16px;border:1.5px solid #F0EEE8;border-radius:14px;font-size:14.5px;font-family:inherit;color:#1a1a1a;background:#FDFCFA;outline:none;transition:border-color 0.15s}
.newsroom-input::placeholder,.newsroom-textarea::placeholder{color:#b5b0a8}
.newsroom-input:focus,.newsroom-textarea:focus,.newsroom-select:focus{border-color:#D4A857;background:#fff}
.newsroom-textarea{min-height:100px;resize:vertical;line-height:1.6}
.newsroom-type-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:0.5rem}
.newsroom-type{border:1.5px solid #F0EEE8;border-radius:16px;padding:14px 16px;cursor:pointer;background:#FDFCFA;transition:all 0.15s;user-select:none}
.newsroom-type:hover{border-color:#E8C878}
.newsroom-type.sel{border-color:#2a2520;background:#2a2520}
.newsroom-type.sel .newsroom-type-name{color:#fff}
.newsroom-type.sel .newsroom-type-desc{color:rgba(255,255,255,0.6)}
.newsroom-type-icon{font-size:20px;margin-bottom:6px}
.newsroom-type-name{font-size:13.5px;font-weight:600;color:#2a2520;margin-bottom:2px}
.newsroom-type-desc{font-size:11.5px;color:#a8a39a;line-height:1.4}
.newsroom-media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:0.5rem}
.newsroom-media{border:1.5px solid #F0EEE8;border-radius:16px;padding:14px 16px;cursor:pointer;background:#FDFCFA;transition:all 0.15s;user-select:none}
.newsroom-media:hover{border-color:#E8C878}
.newsroom-media.sel{border-color:#2a2520;background:#2a2520}
.newsroom-media.sel .newsroom-media-name{color:#fff}
.newsroom-media.sel .newsroom-media-desc{color:rgba(255,255,255,0.6)}
.newsroom-media-name{font-size:13.5px;font-weight:600;color:#2a2520;margin-bottom:2px}
.newsroom-media-desc{font-size:11.5px;color:#a8a39a;line-height:1.4}
.newsroom-generate-btn{width:100%;padding:16px;background:#2a2520;color:#fff;border:none;border-radius:100px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;transition:background 0.15s;margin-top:1.5rem}
.newsroom-generate-btn:hover{background:#433a30}
.newsroom-generate-btn:disabled{opacity:0.4;cursor:not-allowed}
.newsroom-loading{text-align:center;padding:3rem 1rem;display:none}
.newsroom-loading-text{font-size:15px;color:#8a8680;margin-top:1rem}
.newsroom-result{display:none;margin-top:1.5rem}
.newsroom-result-card{background:#fff;border:1.5px solid #F0EEE8;border-radius:18px;padding:2rem;margin-bottom:1rem}
.newsroom-result-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C4A576;margin-bottom:0.5rem}
.newsroom-result-headline{font-size:24px;font-weight:600;color:#1a1a1a;line-height:1.3;margin-bottom:1rem;letter-spacing:-0.02em}
.newsroom-result-ingress{font-size:15px;color:#4A3F35;line-height:1.75;font-style:italic;border-left:3px solid #D4A857;padding-left:1rem;margin-bottom:1.5rem}
.newsroom-result-body{font-size:14px;color:#2a2520;line-height:1.9}
.newsroom-result-boilerplate{margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid #F0EEE8;font-size:13px;color:#a8a39a;line-height:1.7;font-style:italic}
.newsroom-result-quote{background:#FDFCFA;border-left:3px solid #D4A857;padding:1rem 1.25rem;border-radius:0 14px 14px 0;margin:1.25rem 0;font-size:14px;color:#2a2520;line-height:1.7;font-style:italic}
.newsroom-contact-block{background:#FDFCFA;border:1.5px solid #F0EEE8;border-radius:14px;padding:1rem 1.25rem;margin-top:1.25rem;font-size:13px;color:#5a5650;line-height:1.8}
.newsroom-contact-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#C4A576;margin-bottom:6px}
.newsroom-result-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:2rem;padding-top:1.5rem;border-top:1px solid #F0EEE8}
.nr-extra-block{background:#fff;border:1.5px solid #F0EEE8;border-radius:18px;padding:1.5rem;margin-bottom:1rem}
.nr-extra-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C4A576;margin-bottom:1rem}
.nr-extra-row{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:#2a2520;line-height:1.6;padding:6px 0}
.nr-extra-tag{font-size:11px;font-weight:600;color:#9A8570;background:#F5F3EE;padding:2px 8px;border-radius:4px;white-space:nowrap;flex-shrink:0}
.nr-extra-text{font-size:14px;color:#2a2520;line-height:1.75}

/* Bibliotek */
.lib-filter{background:#fff;border:1px solid #e0dcd3;color:#8a7d6d;font-size:13px;font-weight:600;padding:7px 14px;border-radius:20px;cursor:pointer;font-family:inherit;transition:all 0.15s}
.lib-filter.active{background:#2C2520;color:#fff;border-color:#2C2520}
.lib-card{background:#fff;border:1px solid #e8e4db;border-radius:14px;padding:1.25rem 1.5rem;margin-bottom:12px;display:flex;align-items:center;gap:1rem}
.lib-card-tool{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#C9A84C;margin-bottom:4px}
.lib-card-title{font-size:16px;font-weight:600;color:#2C2520;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lib-card-date{font-size:12px;color:#9A8570}
.lib-card-actions{display:flex;gap:6px;flex-shrink:0}
.lib-btn{background:#F5F3EE;border:1px solid #e0dcd3;color:#5F5E5A;font-size:12px;font-weight:600;padding:7px 12px;border-radius:8px;cursor:pointer;font-family:inherit;transition:all 0.15s}
.lib-btn:hover{background:#ebe7de}
.lib-btn-open{background:#2C2520;color:#fff;border-color:#2C2520}
.lib-btn-open:hover{background:#453a30}
.lib-btn-del:hover{background:#FCEBEB;color:#A32D2D;border-color:#f0d0d0}
@media(max-width:600px){.lib-card{flex-direction:column;align-items:flex-start}.lib-card-actions{width:100%}}

/* Höger sidopanel (endast inloggad) */
#side-panel{position:fixed;top:0;right:0;height:100vh;width:60px;background:#fff;border-left:1px solid #e8e4db;z-index:200;display:none;flex-direction:column;transition:width 0.2s ease;overflow:hidden}
#side-panel.expanded{width:230px}
.sp-toggle{display:flex;align-items:center;gap:12px;padding:18px 18px;background:none;border:none;cursor:pointer;font-family:inherit;border-bottom:1px solid #f0eee8}
.sp-toggle svg{flex-shrink:0}
.sp-links{display:flex;flex-direction:column;padding:8px 0;flex:1}
.sp-link{display:flex;align-items:center;gap:14px;padding:12px 19px;background:none;border:none;cursor:pointer;font-family:inherit;font-size:14px;color:#5F5E5A;white-space:nowrap;text-align:left;transition:background 0.12s}
.sp-link:hover{background:#F5F3EE}
.sp-link svg{flex-shrink:0;width:20px;height:20px;stroke:#8a7d6d}
.sp-link-text{opacity:0;transition:opacity 0.15s}
#side-panel.expanded .sp-link-text{opacity:1}
.sp-link.active{color:#2C2520;font-weight:600}
.sp-link.active svg{stroke:#C9A84C}
.sp-foot{border-top:1px solid #f0eee8;padding:8px 0}
/* Skjut in sidornas innehåll så panelen inte täcker det */
body.has-panel #tools-page,body.has-panel #library-page,body.has-panel #brand-page,body.has-panel #plan-page,body.has-panel #billing-page{padding-right:60px}
@media(max-width:600px){#side-panel{width:0}#side-panel.expanded{width:200px}body.has-panel #tools-page,body.has-panel #library-page,body.has-panel #brand-page,body.has-panel #plan-page,body.has-panel #billing-page{padding-right:0}}
.newsroom-action-btn{display:flex;align-items:center;gap:7px;padding:11px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;border:1.5px solid #F0EEE8;background:#fff;color:#2a2520;transition:all 0.15s}
.newsroom-action-btn:hover{border-color:#E8C878}
.newsroom-action-btn.primary{background:#2a2520;color:#fff;border-color:#2a2520}
.newsroom-action-btn.primary:hover{background:#433a30}
.newsroom-new-btn{background:none;border:1.5px solid #F0EEE8;border-radius:100px;padding:10px 20px;font-size:13px;font-weight:500;color:#a8a39a;cursor:pointer;font-family:inherit;margin-top:1rem;display:block;width:100%;text-align:center;transition:all 0.15s}
.newsroom-new-btn:hover{border-color:#2a2520;color:#2a2520}
.newsroom-error{display:none;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:14px;padding:12px 16px;font-size:13px;color:#991B1B;margin-top:1rem}
@media(max-width:640px){
  .newsroom-type-grid{grid-template-columns:1fr 1fr}
  .newsroom-media-grid{grid-template-columns:1fr 1fr}
}

/* ─── THE BRIEF ─── */
#brief-page{display:none}
body.brief-mode{background:#FBFAF7}
.brief-header{background:#fff;border-bottom:1px solid rgba(0,0,0,0.08);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.brief-header-brand{display:flex;align-items:center;gap:12px}
.brief-header-title{font-size:15px;font-weight:600;color:#2C2520}
.brief-header-sub{font-size:12px;color:#9A8570}
.brief-container{max-width:760px;margin:0 auto;padding:2rem 1.5rem 4rem}
.brief-section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#9A8570;margin-bottom:1rem;margin-top:2rem;padding-top:1rem;border-top:1px solid rgba(0,0,0,0.07)}
.brief-section-title:first-of-type{border-top:none;margin-top:0;padding-top:0}
.brief-field{margin-bottom:1.6rem}
.brief-field label{display:block;font-size:15px;font-weight:500;color:#2a2520;margin-bottom:8px;line-height:1.4}
.brief-field label span{font-weight:400;color:#b5b0a8;font-size:12px;margin-left:4px}
.brief-input,.brief-textarea,.brief-select{width:100%;padding:14px 16px;border:1.5px solid #F0EEE8;border-radius:14px;font-size:14.5px;font-family:inherit;color:#1a1a1a;background:#FDFCFA;outline:none;transition:border-color 0.15s}
.brief-input::placeholder,.brief-textarea::placeholder{color:#b5b0a8}
.brief-input:focus,.brief-textarea:focus,.brief-select:focus{border-color:#D4A857;background:#fff}
.brief-textarea{min-height:90px;resize:vertical;line-height:1.6}
.brief-goal-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-bottom:0.5rem}
.brief-goal{border:1.5px solid #F0EEE8;border-radius:16px;padding:14px 16px;cursor:pointer;background:#FDFCFA;transition:all 0.15s;user-select:none}
.brief-goal:hover{border-color:#E8C878}
.brief-goal.sel{border-color:#2a2520;background:#2a2520}
.brief-goal.sel .brief-goal-name{color:#fff}
.brief-goal.sel .brief-goal-desc{color:rgba(255,255,255,0.6)}
.brief-goal-icon{font-size:20px;margin-bottom:6px}
.brief-goal-name{font-size:13.5px;font-weight:600;color:#2a2520;margin-bottom:2px}
.brief-goal-desc{font-size:11.5px;color:#a8a39a;line-height:1.4}
.brief-generate-btn{width:100%;padding:16px;background:#2a2520;color:#fff;border:none;border-radius:100px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;letter-spacing:0.01em;transition:background 0.15s;margin-top:1.5rem}
.brief-generate-btn:hover{background:#433a30}
.brief-generate-btn:disabled{opacity:0.4;cursor:not-allowed}
.brief-loading{text-align:center;padding:3rem 1rem;display:none}
.brief-loading-text{font-size:15px;color:#8a8680;margin-top:1rem}
.brief-result{display:none;margin-top:1.5rem}
.brief-result-card{background:#fff;border:1.5px solid #F0EEE8;border-radius:18px;padding:2rem;margin-bottom:1rem}
.brief-result-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C4A576;margin-bottom:0.5rem}
.brief-result-title{font-size:24px;font-weight:600;color:#1a1a1a;line-height:1.3;margin-bottom:1.5rem;letter-spacing:-0.02em}
.brief-section{margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid #F0EEE8}
.brief-section:last-of-type{border-bottom:none;margin-bottom:0;padding-bottom:0}
.brief-section-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C4A576;margin-bottom:8px}
.brief-section-content{font-size:14px;color:#2a2520;line-height:1.8}
.brief-section-content p,.mp-md p,.newsroom-result-body p,.newsroom-result-boilerplate p,.native-result-body p{margin:0 0 0.9em}
.brief-section-content p:last-child,.mp-md p:last-child,.newsroom-result-body p:last-child,.newsroom-result-boilerplate p:last-child,.native-result-body p:last-child{margin-bottom:0}
.brief-section-content strong,.mp-md strong,.newsroom-result-body strong,.native-result-body strong{font-weight:700;color:#1a1a1a}
.brief-section-content .md-sub,.mp-md .md-sub,.newsroom-result-body .md-sub{font-size:13px;font-weight:700;color:#6b5d47;margin:1.2em 0 0.5em;letter-spacing:-0.01em}
.brief-section-content .md-sub:first-child,.mp-md .md-sub:first-child,.newsroom-result-body .md-sub:first-child{margin-top:0}
.brief-section-content .md-list,.mp-md .md-list,.newsroom-result-body .md-list{margin:0.4em 0 0.9em;padding-left:1.3em}
.brief-section-content .md-list li,.mp-md .md-list li,.newsroom-result-body .md-list li{margin-bottom:0.45em;padding-left:0.2em}
.brief-section-content .md-list li::marker,.mp-md .md-list li::marker,.newsroom-result-body .md-list li::marker{color:#C9A84C}
.brief-section-content .md-list li:last-child,.mp-md .md-list li:last-child,.newsroom-result-body .md-list li:last-child{margin-bottom:0}
.brief-kpi-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;margin-top:4px}
.brief-kpi{background:#FDFCFA;border:1.5px solid #F0EEE8;border-radius:14px;padding:12px 16px}
.brief-kpi-name{font-size:12px;font-weight:700;color:#2a2520;margin-bottom:2px}
.brief-kpi-value{font-size:12px;color:#a8a39a;line-height:1.5}
.brief-timeline{display:flex;flex-direction:column;gap:6px;margin-top:4px}
.brief-timeline-row{display:flex;align-items:center;gap:10px;font-size:13px;color:#2a2520}
.brief-timeline-dot{width:8px;height:8px;border-radius:50%;background:#D4A857;flex-shrink:0}
.brief-result-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:2rem;padding-top:1.5rem;border-top:1px solid #F0EEE8}
.brief-action-btn{display:flex;align-items:center;gap:7px;padding:11px 20px;border-radius:100px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;border:1.5px solid #F0EEE8;background:#fff;color:#2a2520;transition:all 0.15s}
.brief-action-btn:hover{border-color:#E8C878}
.brief-action-btn.primary{background:#2a2520;color:#fff;border-color:#2a2520}
.brief-action-btn.primary:hover{background:#433a30}
.brief-new-btn{background:none;border:1.5px solid #F0EEE8;border-radius:100px;padding:10px 20px;font-size:13px;font-weight:500;color:#a8a39a;cursor:pointer;font-family:inherit;margin-top:1rem;display:block;width:100%;text-align:center;transition:all 0.15s}
.brief-new-btn:hover{border-color:#2a2520;color:#2a2520}
.brief-error{display:none;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:14px;padding:12px 16px;font-size:13px;color:#991B1B;margin-top:1rem}
@media(max-width:640px){
  .brief-goal-grid{grid-template-columns:1fr 1fr}
}
</style>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</head>
<body>
<aside id="side-panel">
  <button class="sp-toggle" onclick="toggleSidePanel()" title="Meny">
    <svg id="sp-toggle-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#2C2520" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h14M4 11h14M4 16h14"/></svg>
    <span class="sp-link-text" style="font-weight:700;color:#2C2520">Meny</span>
  </button>
  <nav class="sp-links">
    <button class="sp-link" data-page="tools-page" onclick="goToTools()"><svg viewBox="0 0 22 22" fill="none" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="12" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="12" width="7" height="7" rx="1.5"/><rect x="12" y="12" width="7" height="7" rx="1.5"/></svg><span class="sp-link-text">Verktyg</span></button>
    <button class="sp-link" data-page="library-page" onclick="goToLibrary()"><svg viewBox="0 0 22 22" fill="none" stroke-width="1.8" stroke-linecap="round"><path d="M4 4h5v14H4zM9 4h5v14H9z"/><path d="M14 5l4 1-2 13-4-1"/></svg><span class="sp-link-text">Bibliotek</span></button>
    <button class="sp-link" data-page="brand-page" onclick="goToBrandProfile()"><svg viewBox="0 0 22 22" fill="none" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="8" r="3.5"/><path d="M4 19c0-3.5 3-6 7-6s7 2.5 7 6"/></svg><span class="sp-link-text">Min profil</span></button>
    <button class="sp-link" data-page="plan-page" onclick="goToPlan()"><svg viewBox="0 0 22 22" fill="none" stroke-width="1.8" stroke-linecap="round"><path d="M11 2l2.5 5.5L19 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/></svg><span class="sp-link-text">Min plan</span></button>
    <button class="sp-link" data-page="billing-page" onclick="goToBilling()"><svg viewBox="0 0 22 22" fill="none" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="5" width="18" height="12" rx="2"/><path d="M2 9h18"/></svg><span class="sp-link-text">Betalning</span></button>
  </nav>
  <div class="sp-foot">
    <button class="sp-link" onclick="authLogout()"><svg viewBox="0 0 22 22" fill="none" stroke-width="1.8" stroke-linecap="round"><path d="M8 3H4v16h4"/><path d="M14 7l4 4-4 4M18 11H8"/></svg><span class="sp-link-text">Logga ut</span></button>
  </div>
</aside>
<div id="landing">

  <!-- NAV -->
  <nav class="site-nav" style="position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(255,255,255,0);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:0.5px solid rgba(0,0,0,0);padding:0 3rem;height:64px;display:flex;align-items:center;justify-content:space-between;transition:background 0.3s,border-color 0.3s">
    <button class="mava-logo on-dark" id="nav-logo" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:40px;width:40px"><span class="mava-word" style="font-size:24px">Mava</span></button>
    <div style="display:flex;align-items:center;gap:1.25rem">
      <button class="auth-when-out" onclick="goToAuth()" style="background:none;border:none;color:#fff;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit">Logga in</button>
      <button class="auth-when-in" onclick="goToTools()" style="display:none;background:none;border:none;color:#fff;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit">Till appen →</button>
      <button onclick="goToTools()" style="background:#fff;color:#1d1d1f;border:none;border-radius:20px;padding:8px 20px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.3s,color 0.3s" id="nav-btn-testa">Testa nu</button>
    </div>
  </nav>

  <!-- HERO -->
  <div style="height:100vh;min-height:600px;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <video autoplay muted loop playsinline poster="images/hero-poster.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%">
      <source src="images/hero.webm" type="video/webm">
      <source src="images/hero.mp4" type="video/mp4">
    </video>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.55)"></div>
    <div style="position:relative;z-index:1;max-width:780px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:1.25rem">AI-verktyg för marknadsförare</div>
      <h1 style="font-size:clamp(2.8rem,6vw,5.5rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:1.25rem">Gör din marknadsföring bättre på minuter</h1>
      <p style="font-size:clamp(16px,2vw,20px);color:rgba(255,255,255,0.65);line-height:1.7;max-width:520px;margin:0 auto 2.5rem">Fem verktyg som täcker hela flödet – från analys och brief till färdiga artiklar, effektfulla annonser och pressreleaser.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button onclick="document.getElementById('balk-market-pulse').scrollIntoView({behavior:'smooth'})" style="background:#fff;color:#1d1d1f;border:none;border-radius:24px;padding:13px 28px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">Utforska verktygen</button>
      </div>
    </div>
    <div onclick="document.getElementById('balk-market-pulse').scrollIntoView({behavior:'smooth'})" style="position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer">
      <span style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);font-weight:500">Scrolla</span>
      <div style="animation:bounce 1.8s ease-in-out infinite">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.7"><path d="M11 4v14M4 13l7 7 7-7"/></svg>
      </div>
    </div>
  </div>

  <!-- BALK 1: Market Pulse -->
  <div id="balk-market-pulse" style="position:relative;height:100vh;min-height:560px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/stock.jpg');background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45)"></div>
    <div style="position:relative;z-index:1;max-width:640px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:0.75rem">Verktyg 1</div>
      <h2 style="font-size:clamp(2.2rem,5vw,4.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.9rem">Market Pulse</h2>
      <p style="font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,0.75);line-height:1.65;max-width:480px;margin:0 auto 1.75rem">Prioriterad kanalstrategi och konkreta rekommendationer för var ni ska synas – genererad på sekunder.</p>
      <button onclick="goToToolLogin('app')" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1d1d1f;border:none;border-radius:24px;padding:12px 26px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">Testa Market Pulse <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 7h10M6 3l4 4-4 4"/></svg></button>
    </div>
  </div>
  <div id="balk-the-brief" style="position:relative;height:100vh;min-height:560px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/kontor.png');background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45)"></div>
    <div style="position:relative;z-index:1;max-width:640px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:0.75rem">Verktyg 2</div>
      <h2 style="font-size:clamp(2.2rem,5vw,4.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.9rem">The Brief</h2>
      <p style="font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,0.75);line-height:1.65;max-width:480px;margin:0 auto 1.75rem">Komplett kampanjbrief med mål, målgrupp, kanaler, budget och tidslinje – redo att skicka till byrå eller internt team.</p>
      <button onclick="goToToolLogin('brief')" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1d1d1f;border:none;border-radius:24px;padding:12px 26px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">Testa The Brief <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 7h10M6 3l4 4-4 4"/></svg></button>
    </div>
  </div>
  <div id="balk-newsroom" style="position:relative;height:100vh;min-height:560px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/newsroom.jpeg');background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45)"></div>
    <div style="position:relative;z-index:1;max-width:640px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:0.75rem">Verktyg 3</div>
      <h2 style="font-size:clamp(2.2rem,5vw,4.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.9rem">Newsroom</h2>
      <p style="font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,0.75);line-height:1.65;max-width:480px;margin:0 auto 1.75rem">Professionella pressreleaser på minuter – redo att skicka till svenska redaktioner.</p>
      <button onclick="goToToolLogin('newsroom')" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1d1d1f;border:none;border-radius:24px;padding:12px 26px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">Testa Newsroom <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 7h10M6 3l4 4-4 4"/></svg></button>
    </div>
  </div>
  <div id="balk-native" style="position:relative;height:100vh;min-height:560px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/nativeautoreach.jpeg');background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45)"></div>
    <div style="position:relative;z-index:1;max-width:640px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:0.75rem">Verktyg 4</div>
      <h2 style="font-size:clamp(2.2rem,5vw,4.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.9rem">Native Auto Reach</h2>
      <p style="font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,0.75);line-height:1.65;max-width:480px;margin:0 auto 1.75rem">Redaktionellt skrivna nativeartiklar redo för publicering hos Schibsted, Bonnier, Stampen och NTM.</p>
      <button onclick="goToToolLogin('native')" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1d1d1f;border:none;border-radius:24px;padding:12px 26px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">Testa Native Auto Reach <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 7h10M6 3l4 4-4 4"/></svg></button>
    </div>
  </div>
  <div id="balk-adgen" style="position:relative;height:100vh;min-height:560px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/adgenerator.png');background-size:cover;background-position:center top"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.45)"></div>
    <div style="position:relative;z-index:1;max-width:640px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:0.75rem">Verktyg 5</div>
      <h2 style="font-size:clamp(2.2rem,5vw,4.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.9rem">AdStudio</h2>
      <p style="font-size:clamp(15px,1.8vw,18px);color:rgba(255,255,255,0.75);line-height:1.65;max-width:480px;margin:0 auto 1.75rem">Ladda upp en bild, fyll i budskap – få färdiga annonser för Meta, LinkedIn och display på sekunder.</p>
      <button onclick="goToToolLogin('adcopy')" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1d1d1f;border:none;border-radius:24px;padding:12px 26px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">Testa AdStudio <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 7h10M6 3l4 4-4 4"/></svg></button>
    </div>
  </div>

    <!-- FOOTER -->
  <!-- CTA-BILD-BLOCK -->
  <div class="footer-cta-wrap" style="padding:64px 3rem 0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
    <div class="footer-side left">
      <div class="side-img"></div>
      <div class="sep-top"></div><div class="sep-bottom"></div>
      <div class="sep-outer"></div><div class="sep-inner"></div>
    </div>
    <div class="footer-side right">
      <div class="side-img"></div>
      <div class="sep-top"></div><div class="sep-bottom"></div>
      <div class="sep-outer"></div><div class="sep-inner"></div>
    </div>
    <div style="max-width:1100px;margin:0 auto;position:relative;padding:10px">
      <div style="position:absolute;top:0;left:10px;right:10px;height:1px;background:#d3d0ca"></div>
      <div style="position:absolute;bottom:0;left:10px;right:10px;height:1px;background:#d3d0ca"></div>
      <div style="position:absolute;left:0;top:10px;bottom:10px;width:1px;background:#d3d0ca"></div>
      <div style="position:absolute;right:0;top:10px;bottom:10px;width:1px;background:#d3d0ca"></div>
      <div style="position:relative;overflow:hidden;min-height:340px;display:flex;align-items:center">
        <div style="position:absolute;inset:0;background-image:url('images/footer-cta.jpg');background-size:cover;background-position:center"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,14,8,0.72) 0%,rgba(20,14,8,0.45) 45%,rgba(20,14,8,0.15) 100%)"></div>
        <div style="position:relative;z-index:1;padding:3.5rem 3rem;max-width:560px">
          <h2 style="font-size:clamp(1.9rem,3.5vw,2.8rem);font-weight:700;color:#fff;letter-spacing:-0.02em;line-height:1.1;margin:0 0 1rem">Mava gör din vardag lite enklare och hjälper dig att nå fler</h2>
          <p style="font-size:clamp(15px,1.6vw,17px);color:rgba(255,255,255,0.8);line-height:1.6;margin:0 0 2rem;max-width:420px">Fem verktyg som täcker hela flödet – och hjälper dig spara både tid och pengar.</p>
          <button onclick="goToTools()" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1d1d1f;border:none;border-radius:24px;padding:13px 28px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">Kom igång <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 7h10M6 3l4 4-4 4"/></svg></button>
        </div>
      </div>
    </div>
  </div>

  <footer style="background:#f5f5f7;border-top:0.5px solid #e8e8ed;padding:64px 3rem 40px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
    <div style="max-width:680px;margin:0 auto">
      <button class="mava-logo on-light" onclick="goToLanding()" style="margin-bottom:12px"><img src="images/mava-symbol.png" alt="Mava" style="height:32px;width:32px"><span class="mava-word" style="font-size:20px">Mava</span></button>
      <p style="font-size:14px;color:#9a9a9a;margin-bottom:28px;line-height:1.6">AI-verktyg för marknadsförare</p>
      <div style="width:32px;height:1px;background:#C9A84C;margin:0 auto 28px"></div>
      <div style="display:flex;gap:24px;justify-content:center;flex-wrap:wrap;margin-bottom:40px">
        <button onclick="goToToolLogin('app')" style="background:none;border:none;font-size:13px;color:#9a9a9a;cursor:pointer;font-family:inherit;padding:0">Market Pulse</button>
        <button onclick="goToToolLogin('brief')" style="background:none;border:none;font-size:13px;color:#9a9a9a;cursor:pointer;font-family:inherit;padding:0">The Brief</button>
        <button onclick="goToToolLogin('newsroom')" style="background:none;border:none;font-size:13px;color:#9a9a9a;cursor:pointer;font-family:inherit;padding:0">Newsroom</button>
        <button onclick="goToToolLogin('native')" style="background:none;border:none;font-size:13px;color:#9a9a9a;cursor:pointer;font-family:inherit;padding:0">Native Auto Reach</button>
        <button onclick="goToToolLogin('adcopy')" style="background:none;border:none;font-size:13px;color:#9a9a9a;cursor:pointer;font-family:inherit;padding:0">AdStudio</button>
      </div>
      <div style="border-top:0.5px solid #e0e0e0;padding-top:24px;display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:12px;color:#bbb">© 2026 Mava</div>
        <a href="mailto:hello@rtnorth.se" style="font-size:12px;color:#bbb;text-decoration:none">hello@rtnorth.se</a>
      </div>
    </div>
  </footer>

</div>

<div id="tools-page">
  <nav class="tools-nav">
    <button class="mava-logo on-light" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:28px;width:28px"><span class="mava-word" style="font-size:18px">Mava</span></button>
    <div style="display:flex;gap:1.25rem;align-items:center">
      <button class="auth-when-in" onclick="goToLibrary()" style="display:none;font-size:13px;color:#8a7d6d;cursor:pointer;background:none;border:none;font-family:inherit">Bibliotek</button>
      <button class="auth-when-in" onclick="goToBrandProfile()" style="display:none;font-size:13px;color:#8a7d6d;cursor:pointer;background:none;border:none;font-family:inherit">Min profil</button>
      <button class="auth-when-in" onclick="authLogout()" style="display:none;font-size:13px;color:#8a7d6d;cursor:pointer;background:none;border:none;font-family:inherit">Logga ut</button>
      <button onclick="goToLanding()" style="font-size:13px;color:#8a7d6d;cursor:pointer;display:flex;align-items:center;gap:6px;background:none;border:none;font-family:inherit">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 7H3M6 3l-4 4 4 4"/></svg>
        Till startsidan
      </button>
    </div>
  </nav>
  <div class="tools-hero">
    <div style="display:flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#C9A84C;margin-bottom:1.5rem">
      <span style="display:block;width:24px;height:1px;background:#C9A84C"></span>
      Mava
    </div>
    <h1 style="font-size:clamp(2rem,4vw,3.2rem);font-weight:700;letter-spacing:-0.03em;line-height:1.1;color:#2C2520;margin-bottom:1rem;max-width:600px">Fem AI-verktyg. Ett integrerat flöde.</h1>
    <p style="font-size:15px;color:#8a7d6d;line-height:1.75;max-width:520px">Från kampanjbrief och distributionsplan till nativeartikel, annonscopy, pressrelease och kampanjanalys – konkreta resultat på minuter.</p>
  </div>
  <div class="tools-sell">
    <div class="tsell-card">
      <div class="tsell-img" style="background-image:linear-gradient(135deg,rgba(15,110,86,0.85),rgba(29,158,117,0.5)),url('images/stock.jpg')"><span class="tsell-img-badge" style="color:#0F6E56">STEG 1 · ANALYS</span></div>
      <div class="tsell-body">
        <div class="tsell-title">Market Pulse</div>
        <div class="tsell-desc">En färdig marknadsanalys av ditt bolag och din bransch, med prioriterad kanalstrategi och konkreta quick wins du kan agera på direkt.</div>
        <div class="tsell-gets-label">Du får:</div>
        <div class="tsell-tags"><span class="tsell-tag" style="color:#0F6E56;background:rgba(29,158,117,0.1)">Kanalstrategi</span><span class="tsell-tag" style="color:#0F6E56;background:rgba(29,158,117,0.1)">Budgetförslag</span><span class="tsell-tag" style="color:#0F6E56;background:rgba(29,158,117,0.1)">Quick wins</span></div>
        <button class="tsell-btn" onclick="goToToolLogin('app')">Testa nu <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6h8M6 2l4 4-4 4"/></svg></button>
      </div>
    </div>
    <div class="tsell-card">
      <div class="tsell-img" style="background-image:linear-gradient(135deg,rgba(156,125,46,0.85),rgba(201,168,76,0.5)),url('images/kontor.png')"><span class="tsell-img-badge" style="color:#9c7d2e">STEG 2 · BRIEF</span></div>
      <div class="tsell-body">
        <div class="tsell-title">The Brief</div>
        <div class="tsell-desc">En komplett kampanjbrief redo att skicka till byrå eller team – med mål, målgrupp, budget i kronor, tidslinje och mätbara KPI:er.</div>
        <div class="tsell-gets-label">Du får:</div>
        <div class="tsell-tags"><span class="tsell-tag" style="color:#9c7d2e;background:rgba(201,168,76,0.12)">Budgetfördelning</span><span class="tsell-tag" style="color:#9c7d2e;background:rgba(201,168,76,0.12)">Tidslinje</span><span class="tsell-tag" style="color:#9c7d2e;background:rgba(201,168,76,0.12)">KPI:er</span></div>
        <button class="tsell-btn" onclick="goToToolLogin('brief')">Testa nu <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6h8M6 2l4 4-4 4"/></svg></button>
      </div>
    </div>
    <div class="tsell-card">
      <div class="tsell-img" style="background-image:linear-gradient(135deg,rgba(24,95,165,0.85),rgba(55,138,221,0.5)),url('images/newsroom.jpeg')"><span class="tsell-img-badge" style="color:#185FA5">STEG 3 · PR</span></div>
      <div class="tsell-body">
        <div class="tsell-title">Newsroom</div>
        <div class="tsell-desc">En redaktionellt gångbar pressrelease – plus fem rubrikvinklar, en journalistpitch, förslag på ämnesrader och en ärlig PR-bedömning.</div>
        <div class="tsell-gets-label">Du får:</div>
        <div class="tsell-tags"><span class="tsell-tag" style="color:#185FA5;background:rgba(55,138,221,0.1)">Pressrelease</span><span class="tsell-tag" style="color:#185FA5;background:rgba(55,138,221,0.1)">5 rubrikvinklar</span><span class="tsell-tag" style="color:#185FA5;background:rgba(55,138,221,0.1)">Journalistpitch</span></div>
        <button class="tsell-btn" onclick="goToToolLogin('newsroom')">Testa nu <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6h8M6 2l4 4-4 4"/></svg></button>
      </div>
    </div>
    <div class="tsell-card">
      <div class="tsell-img" style="background-image:linear-gradient(135deg,rgba(153,60,29,0.85),rgba(216,90,48,0.5)),url('images/nativeautoreach.jpeg')"><span class="tsell-img-badge" style="color:#993c1d">STEG 4 · PRODUKTION</span></div>
      <div class="tsell-body">
        <div class="tsell-title">Native Auto Reach</div>
        <div class="tsell-desc">En färdig redaktionell nativeartikel och distributionsplan – klar att publicera hos svenska mediehus som Schibsted och Bonnier.</div>
        <div class="tsell-gets-label">Du får:</div>
        <div class="tsell-tags"><span class="tsell-tag" style="color:#993c1d;background:rgba(216,90,48,0.1)">Nativeartikel</span><span class="tsell-tag" style="color:#993c1d;background:rgba(216,90,48,0.1)">Distributionsplan</span></div>
        <button class="tsell-btn" onclick="goToToolLogin('native')">Testa nu <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6h8M6 2l4 4-4 4"/></svg></button>
      </div>
    </div>
    <div class="tsell-card">
      <div class="tsell-img" style="background-image:linear-gradient(135deg,rgba(83,74,183,0.85),rgba(127,119,221,0.5)),url('images/adgenerator.png')"><span class="tsell-img-badge" style="color:#534AB7">STEG 5 · ANNONS</span></div>
      <div class="tsell-body">
        <div class="tsell-title">AdStudio</div>
        <div class="tsell-desc">Färdiga annonser i 14 äkta format – statiska bilder för sociala medier och HTML5-banners för display, med er egen logga inbäddad.</div>
        <div class="tsell-gets-label">Du får:</div>
        <div class="tsell-tags"><span class="tsell-tag" style="color:#534AB7;background:rgba(127,119,221,0.1)">14 format</span><span class="tsell-tag" style="color:#534AB7;background:rgba(127,119,221,0.1)">HTML5-banners</span><span class="tsell-tag" style="color:#534AB7;background:rgba(127,119,221,0.1)">Sociala format</span></div>
        <button class="tsell-btn" onclick="goToToolLogin('adcopy')">Testa nu <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 6h8M6 2l4 4-4 4"/></svg></button>
      </div>
    </div>
  </div>
</div>

<div id="brand-page" style="display:none;min-height:100vh;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <nav class="tools-nav">
    <button class="mava-logo on-light" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:28px;width:28px"><span class="mava-word" style="font-size:18px">Mava</span></button>
    <div style="display:flex;gap:1.25rem;align-items:center">
      <button onclick="goToTools()" style="background:none;border:none;color:#8a7d6d;font-size:14px;cursor:pointer;font-family:inherit">Verktyg</button>
      <button onclick="goToLibrary()" style="background:none;border:none;color:#8a7d6d;font-size:14px;cursor:pointer;font-family:inherit">Bibliotek</button>
      <button onclick="authLogout()" style="background:none;border:none;color:#8a7d6d;font-size:14px;cursor:pointer;font-family:inherit">Logga ut</button>
    </div>
  </nav>
  <div style="max-width:560px;margin:0 auto;padding:2.5rem 1.5rem">
    <h1 style="font-size:28px;font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin:0 0 0.5rem">Min varumärkesprofil</h1>
    <p style="font-size:14px;color:#8a7d6d;margin:0 0 2rem;line-height:1.6">Fyll i din företagsinfo en gång, så fylls den i automatiskt i verktygen. Du kan alltid ändra den direkt i respektive verktyg.</p>
    <div id="brand-msg" style="display:none;font-size:13px;padding:12px 16px;border-radius:10px;margin-bottom:1.5rem;line-height:1.5"></div>
    <div style="background:#fff;border:1px solid #e8e4db;border-radius:18px;padding:2rem">
      <div style="margin-bottom:1.25rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Företagsnamn</label>
        <input id="brand-company" type="text" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Ex. Björk & Partners AB">
      </div>
      <div style="margin-bottom:1.25rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Bransch</label>
        <input id="brand-industry" type="text" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Ex. Tech, Fastighet, Retail">
      </div>
      <div style="margin-bottom:1.25rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Om företaget</label>
        <textarea id="brand-description" style="width:100%;min-height:90px;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box;resize:vertical" placeholder="Kort beskrivning av vad ni gör, era värderingar och vad som gör er unika."></textarea>
      </div>

      <div style="border-top:1px solid #f0eee8;padding-top:1.5rem;margin-bottom:0.5rem">
        <div style="font-size:13px;font-weight:700;color:#2C2520;margin-bottom:4px">Målgrupp & budskap</div>
        <p style="font-size:12px;color:#8a7d6d;margin:0 0 14px;line-height:1.5">Det här fylls i automatiskt i verktygen och styr hur AI:n skriver – så ni slipper upprepa det varje gång.</p>
      </div>
      <div style="margin-bottom:1.25rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Er vanligaste målgrupp</label>
        <input id="brand-audience" type="text" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Ex. Villaägare 40–65 år i Mälardalen">
      </div>
      <div style="margin-bottom:1.25rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Produkter / tjänster ni säljer</label>
        <textarea id="brand-products" style="width:100%;min-height:70px;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box;resize:vertical" placeholder="Ex. Kvalitetskontrollerade begagnade elbilar, verkstadstjänster, batterikontroll"></textarea>
      </div>
      <div style="margin-bottom:1.25rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Nyckelbudskap / det ni alltid vill få fram</label>
        <textarea id="brand-messages" style="width:100%;min-height:70px;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box;resize:vertical" placeholder="Ex. Trygghet vid begagnatköp, 12 månaders garanti, lokal och personlig service"></textarea>
      </div>
      <div style="margin-bottom:1.25rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Geografiskt område</label>
        <input id="brand-geo" type="text" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Ex. Västerås och Mälardalen">
      </div>
      <div style="margin-bottom:1.75rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Undvik / förbjudna ord</label>
        <input id="brand-avoid" type="text" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Ex. billig, fantastisk, utropstecken">
        <div style="font-size:12px;color:#8a7d6d;margin-top:6px;line-height:1.5">Ord eller uttryck AI:n aldrig ska använda i era texter.</div>
      </div>

      <div style="margin-bottom:1.75rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Önskad ton</label>
        <input id="brand-tone" type="text" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Ex. Professionell och förtroendegivande">
      </div>
      <div style="margin-bottom:1.25rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Hemsida</label>
        <input id="brand-website" type="text" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Ex. www.foretaget.se">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:1.25rem">
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Kontakt-e-post</label>
          <input id="brand-contact-email" type="email" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="kontakt@foretaget.se">
        </div>
        <div>
          <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Telefon</label>
          <input id="brand-contact-phone" type="text" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Ex. 08-123 45 67">
        </div>
      </div>
      <div style="margin-bottom:1.75rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Nyckelpersoner</label>
        <div id="brand-people-list"></div>
        <button type="button" onclick="brandAddPerson()" style="background:none;border:1px dashed #c9c2b5;color:#8a7d6d;font-size:13px;font-weight:600;padding:9px 14px;border-radius:10px;cursor:pointer;font-family:inherit;width:100%;margin-top:6px">+ Lägg till person</button>
      </div>
      <div style="border-top:1px solid #f0eee8;padding-top:1.5rem;margin-bottom:1.5rem">
        <div style="font-size:13px;font-weight:700;color:#2C2520;margin-bottom:4px">Annonsstil</div>
        <p style="font-size:12px;color:#8a7d6d;margin:0 0 14px;line-height:1.5">Styr hur era annonser i AdStudio ser ut, så alla får samma känsla.</p>
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:8px">Layoutstil</label>
        <div id="brand-style-grid" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:1.25rem">
          <div class="brand-style-opt" data-style="overlay" onclick="brandSelectStyle('overlay')" style="border:2px solid #C9A84C;border-radius:10px;padding:10px;cursor:pointer;text-align:center;background:rgba(201,168,76,0.06)">
            <div style="height:40px;border-radius:5px;background:linear-gradient(135deg,#5a4a38,#2C2520);position:relative;margin-bottom:7px;overflow:hidden"><div style="position:absolute;bottom:5px;left:5px;right:5px;height:5px;background:rgba(255,255,255,0.85);border-radius:2px"></div></div>
            <div style="font-size:12px;font-weight:600;color:#2C2520">Helbild</div>
          </div>
          <div class="brand-style-opt" data-style="band" onclick="brandSelectStyle('band')" style="border:2px solid #e0dcd3;border-radius:10px;padding:10px;cursor:pointer;text-align:center">
            <div style="height:40px;border-radius:5px;overflow:hidden;margin-bottom:7px"><div style="height:60%;background:linear-gradient(135deg,#8a7355,#5a4a38)"></div><div style="height:40%;background:#C9A84C"></div></div>
            <div style="font-size:12px;font-weight:600;color:#2C2520">Band</div>
          </div>
          <div class="brand-style-opt" data-style="split" onclick="brandSelectStyle('split')" style="border:2px solid #e0dcd3;border-radius:10px;padding:10px;cursor:pointer;text-align:center">
            <div style="height:40px;border-radius:5px;overflow:hidden;margin-bottom:7px;display:flex"><div style="width:50%;background:linear-gradient(135deg,#8a7355,#5a4a38)"></div><div style="width:50%;background:#C9A84C"></div></div>
            <div style="font-size:12px;font-weight:600;color:#2C2520">Delad</div>
          </div>
        </div>
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:8px">Accentfärg</label>
        <div style="display:flex;align-items:center;gap:12px">
          <input type="color" id="brand-color" value="#C9A84C" onchange="brandUpdateColorPreview()" style="width:52px;height:40px;border:1px solid #e0dcd3;border-radius:8px;cursor:pointer;padding:2px;background:#fff">
          <span id="brand-color-hex" style="font-size:13px;color:#8a7d6d;font-family:monospace">#C9A84C</span>
        </div>
      </div>
      <button id="brand-save-btn" onclick="saveBrandProfile()" style="width:100%;background:#2C2520;color:#fff;border:none;border-radius:22px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit">Spara profil</button>
    </div>
  </div>
</div>

<div id="plan-page" style="display:none;min-height:100vh;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:680px;margin:0 auto;padding:3rem 1.5rem">
    <h1 style="font-size:28px;font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin:0 0 0.5rem">Min plan</h1>
    <p style="font-size:14px;color:#8a7d6d;margin:0 0 2rem">Din nuvarande prenumeration och vad som ingår.</p>

    <!-- Nuvarande plan: Mellan -->
    <div style="background:linear-gradient(135deg,#2C2520,#453a30);border-radius:18px;padding:2rem;color:#fff;margin-bottom:1.5rem">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem">
        <div>
          <div style="font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#C9A84C;margin-bottom:6px">Nuvarande plan</div>
          <div style="font-size:26px;font-weight:700">Mellan</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:26px;font-weight:700">2 500 kr<span style="font-size:14px;font-weight:400;color:rgba(255,255,255,0.6)">/mån</span></div>
          <div style="font-size:12px;color:rgba(255,255,255,0.6)">exkl. moms</div>
        </div>
      </div>
      <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,0.15)">
        <div style="font-size:13px;color:rgba(255,255,255,0.75);margin-bottom:8px">Genereringar denna månad</div>
        <div style="background:rgba(255,255,255,0.15);border-radius:100px;height:8px;overflow:hidden"><div style="background:#C9A84C;height:100%;width:78%"></div></div>
        <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:6px">62 av 80 använda</div>
      </div>
    </div>

    <!-- Uppgraderings-lockelse mot Premium -->
    <div style="background:#fff;border:2px solid #C9A84C;border-radius:18px;padding:1.75rem;margin-bottom:2rem;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;right:0;background:#C9A84C;color:#2C2520;font-size:11px;font-weight:700;letter-spacing:0.05em;padding:5px 14px;border-bottom-left-radius:12px">UPPGRADERA</div>
      <div style="font-size:18px;font-weight:700;color:#2C2520;margin-bottom:6px">Du har Mellan idag – det här får du med Premium</div>
      <p style="font-size:13px;color:#8a7d6d;margin:0 0 1.25rem;line-height:1.5">Du använde 62 av 80 genereringar den här månaden. Med Premium får du nästan dubbelt så många – och mer därtill.</p>
      <div style="display:flex;flex-direction:column;gap:11px;margin-bottom:1.5rem">
        <div style="display:flex;gap:10px;align-items:center;font-size:14px;color:#2a2520"><span style="color:#C9A84C;font-weight:700">+</span> 150 genereringar per månad <span style="color:#9A8570">(mot 80 idag)</span></div>
        <div style="display:flex;gap:10px;align-items:center;font-size:14px;color:#2a2520"><span style="color:#C9A84C;font-weight:700">+</span> Prioriterad support med snabbare svar</div>
        <div style="display:flex;gap:10px;align-items:center;font-size:14px;color:#2a2520"><span style="color:#C9A84C;font-weight:700">+</span> Fler annonsstilar och mallar i AdStudio</div>
        <div style="display:flex;gap:10px;align-items:center;font-size:14px;color:#2a2520"><span style="color:#C9A84C;font-weight:700">+</span> Tidig tillgång till nya verktyg</div>
      </div>
      <button onclick="goToBilling()" style="width:100%;background:#2C2520;color:#fff;border:none;border-radius:22px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;display:flex;align-items:center;justify-content:center;gap:8px">Uppgradera till Premium – 4 000 kr/mån <span style="font-size:16px">→</span></button>
    </div>

    <!-- Alla tre nivåer -->
    <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#C9A84C;margin-bottom:1rem">Alla planer</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:1.5rem">
      <!-- Bas -->
      <div style="background:#fff;border:1px solid #e8e4db;border-radius:14px;padding:1.25rem 1rem">
        <div style="font-size:15px;font-weight:700;color:#2C2520;margin-bottom:3px">Bas</div>
        <div style="font-size:20px;font-weight:700;color:#2C2520;margin-bottom:2px">1 200 kr</div>
        <div style="font-size:11px;color:#9A8570;margin-bottom:14px">per månad</div>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;color:#5F5E5A">
          <div>30 genereringar/mån</div>
          <div>Alla fem verktyg</div>
          <div>Bibliotek</div>
        </div>
      </div>
      <!-- Mellan (nuvarande) -->
      <div style="background:#2C2520;border:1px solid #2C2520;border-radius:14px;padding:1.25rem 1rem;color:#fff;position:relative">
        <div style="position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:#C9A84C;color:#2C2520;font-size:10px;font-weight:700;padding:3px 10px;border-radius:10px;white-space:nowrap">DIN PLAN</div>
        <div style="font-size:15px;font-weight:700;margin-bottom:3px">Mellan</div>
        <div style="font-size:20px;font-weight:700;margin-bottom:2px">2 500 kr</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-bottom:14px">per månad</div>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;color:rgba(255,255,255,0.85)">
          <div>80 genereringar/mån</div>
          <div>Varumärkesprofil</div>
          <div>Auto-ifyllning</div>
        </div>
      </div>
      <!-- Premium -->
      <div style="background:#fff;border:2px solid #C9A84C;border-radius:14px;padding:1.25rem 1rem">
        <div style="font-size:15px;font-weight:700;color:#2C2520;margin-bottom:3px">Premium</div>
        <div style="font-size:20px;font-weight:700;color:#2C2520;margin-bottom:2px">4 000 kr</div>
        <div style="font-size:11px;color:#9A8570;margin-bottom:14px">per månad</div>
        <div style="display:flex;flex-direction:column;gap:8px;font-size:12px;color:#5F5E5A">
          <div>150 genereringar/mån</div>
          <div>Prioriterad support</div>
          <div>Tidig tillgång</div>
        </div>
      </div>
    </div>

    <div style="background:#FBF6E9;border:1px solid #EAD9A8;border-radius:12px;padding:14px 18px;font-size:12px;color:#9c7d2e;text-align:center">Demovy – siffror, planer och priser är exempel. Riktig prenumeration och betalning kopplas in senare.</div>
  </div>
</div>

<div id="billing-page" style="display:none;min-height:100vh;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:640px;margin:0 auto;padding:3rem 1.5rem">
    <h1 style="font-size:28px;font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin:0 0 0.5rem">Betalning</h1>
    <p style="font-size:14px;color:#8a7d6d;margin:0 0 2rem">Betalmetod och fakturahistorik.</p>
    <div style="background:#fff;border:1px solid #e8e4db;border-radius:18px;padding:1.75rem;margin-bottom:1.5rem">
      <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#C9A84C;margin-bottom:1rem">Betalmetod</div>
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:46px;height:30px;background:linear-gradient(135deg,#C9A84C,#9c7d2e);border-radius:6px"></div>
        <div><div style="font-size:14px;font-weight:600;color:#2C2520">•••• •••• •••• 4242</div><div style="font-size:12px;color:#9A8570">Går ut 04/28</div></div>
        <button style="margin-left:auto;background:#F5F3EE;border:1px solid #e0dcd3;color:#5F5E5A;font-size:13px;font-weight:600;padding:8px 14px;border-radius:8px;cursor:pointer;font-family:inherit">Ändra</button>
      </div>
    </div>
    <div style="background:#fff;border:1px solid #e8e4db;border-radius:18px;padding:1.75rem;margin-bottom:1.5rem">
      <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#C9A84C;margin-bottom:1rem">Fakturor</div>
      <div style="display:flex;flex-direction:column;gap:2px">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f0eee8"><div><div style="font-size:14px;color:#2C2520;font-weight:600">Juni 2026</div><div style="font-size:12px;color:#9A8570">Premium – månadsavgift</div></div><div style="display:flex;gap:16px;align-items:center"><span style="font-size:14px;color:#2C2520">4 000 kr</span><span style="font-size:12px;color:#1D9E75;font-weight:600">Betald</span></div></div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f0eee8"><div><div style="font-size:14px;color:#2C2520;font-weight:600">Maj 2026</div><div style="font-size:12px;color:#9A8570">Premium – månadsavgift</div></div><div style="display:flex;gap:16px;align-items:center"><span style="font-size:14px;color:#2C2520">4 000 kr</span><span style="font-size:12px;color:#1D9E75;font-weight:600">Betald</span></div></div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 0"><div><div style="font-size:14px;color:#2C2520;font-weight:600">April 2026</div><div style="font-size:12px;color:#9A8570">Premium – månadsavgift</div></div><div style="display:flex;gap:16px;align-items:center"><span style="font-size:14px;color:#2C2520">4 000 kr</span><span style="font-size:12px;color:#1D9E75;font-weight:600">Betald</span></div></div>
      </div>
    </div>
    <div style="background:#FBF6E9;border:1px solid #EAD9A8;border-radius:12px;padding:14px 18px;font-size:12px;color:#9c7d2e;text-align:center">Demovy – kortuppgifter och fakturor är exempel. Riktig betalning (Stripe) kopplas in senare.</div>
  </div>
</div>

<div id="library-page" style="display:none;min-height:100vh;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <nav class="tools-nav">
    <button class="mava-logo on-light" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:28px;width:28px"><span class="mava-word" style="font-size:18px">Mava</span></button>
    <div style="display:flex;gap:1.25rem;align-items:center">
      <button onclick="goToTools()" style="background:none;border:none;color:#8a7d6d;font-size:14px;cursor:pointer;font-family:inherit">Verktyg</button>
      <button onclick="authLogout()" style="background:none;border:none;color:#8a7d6d;font-size:14px;cursor:pointer;font-family:inherit">Logga ut</button>
    </div>
  </nav>
  <div style="max-width:820px;margin:0 auto;padding:2.5rem 1.5rem">
    <h1 style="font-size:28px;font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin:0 0 0.5rem">Mitt bibliotek</h1>
    <p style="font-size:14px;color:#8a7d6d;margin:0 0 2rem">Alla dina sparade produktioner samlade på ett ställe.</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:1.25rem">
      <input id="library-search" oninput="librarySearch()" placeholder="Sök på namn..." style="flex:1;min-width:180px;padding:10px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box">
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1.5rem">
      <button class="lib-filter active" data-filter="all" onclick="libraryFilter('all')">Alla</button>
      <button class="lib-filter" data-filter="brief" onclick="libraryFilter('brief')">The Brief</button>
      <button class="lib-filter" data-filter="newsroom" onclick="libraryFilter('newsroom')">Newsroom</button>
      <button class="lib-filter" data-filter="market-pulse" onclick="libraryFilter('market-pulse')">Market Pulse</button>
      <button class="lib-filter" data-filter="native" onclick="libraryFilter('native')">Native Auto Reach</button>
      <button class="lib-filter" data-filter="adstudio" onclick="libraryFilter('adstudio')">AdStudio</button>
    </div>
    <div id="library-list"></div>
  </div>
</div>

<div id="auth-page" style="display:none;min-height:100vh;background:#F5F3EE;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <nav class="tools-nav">
    <button class="mava-logo on-light" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:28px;width:28px"><span class="mava-word" style="font-size:18px">Mava</span></button>
  </nav>
  <div style="max-width:420px;margin:0 auto;padding:3rem 1.5rem">
    <div style="background:#fff;border:1px solid #e8e4db;border-radius:18px;padding:2.5rem 2rem">
      <h1 id="auth-title" style="font-size:24px;font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin:0 0 0.5rem;text-align:center">Logga in</h1>
      <p id="auth-sub" style="font-size:14px;color:#8a7d6d;text-align:center;margin:0 0 2rem">Välkommen tillbaka till Mava</p>
      <div id="auth-error" style="display:none;background:#FCEBEB;color:#A32D2D;font-size:13px;padding:10px 14px;border-radius:8px;margin-bottom:1rem"></div>
      <div id="auth-success" style="display:none;background:#E1F5EE;color:#0F6E56;font-size:13px;padding:10px 14px;border-radius:8px;margin-bottom:1rem"></div>
      <div style="margin-bottom:1rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">E-post</label>
        <input id="auth-email" type="email" autocomplete="email" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="namn@foretag.se">
      </div>
      <div style="margin-bottom:1.5rem">
        <label style="display:block;font-size:13px;font-weight:600;color:#2C2520;margin-bottom:6px">Lösenord</label>
        <input id="auth-password" type="password" autocomplete="current-password" style="width:100%;padding:11px 14px;border:1px solid #e0dcd3;border-radius:10px;font-size:14px;font-family:inherit;box-sizing:border-box" placeholder="Minst 6 tecken">
      </div>
      <button id="auth-submit" onclick="authSubmit()" style="width:100%;background:#2C2520;color:#fff;border:none;border-radius:22px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;margin-bottom:1rem">Logga in</button>
      <div style="text-align:center;font-size:13px;color:#8a7d6d">
        <span id="auth-toggle-text">Har du inget konto?</span>
        <button onclick="authToggleMode()" style="background:none;border:none;color:#C9A84C;font-weight:600;cursor:pointer;font-family:inherit;font-size:13px;padding:0" id="auth-toggle-btn">Skapa konto</button>
      </div>
    </div>
  </div>
</div>

<div id="native-page">

  <div style="position:relative;height:42vh;min-height:320px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/nativeautoreach.jpeg');background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.48)"></div>
    <!-- Nav bar -->
    <div style="position:absolute;top:0;left:0;right:0;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;background:rgba(0,0,0,0.15)">
      <button class="mava-logo on-dark" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:26px;width:26px"><span class="mava-word" style="font-size:17px">Mava</span></button>
      <button onclick="goToLanding()" style="font-size:13px;color:rgba(255,255,255,0.75);background:none;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 7H3M6 3l-4 4 4 4"/></svg>
        Tillbaka
      </button>
    </div>
    <!-- Hero text -->
    <div style="position:relative;z-index:1;max-width:600px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:0.6rem">Verktyg 4</div>
      <h1 style="font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.8rem">Native Auto Reach</h1>
      <p style="font-size:clamp(14px,1.6vw,17px);color:rgba(255,255,255,0.7);line-height:1.6;max-width:460px;margin:0 auto">Redaktionellt skrivna nativeartiklar redo för Schibsted, Bonnier, Stampen och NTM.</p>
    </div>
  </div>

  <div class="native-container">

    <div id="native-form-section">
      <div style="margin-bottom:2rem">
        <h1 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin-bottom:0.5rem">Skapa din nativeartikel</h1>
        <p style="font-size:14px;color:#9A8570;line-height:1.6">Fyll i informationen nedan så skapar AI:n en redaktionellt skriven nativeartikel redo för publicering i svenska medier.</p>
      </div>

      <div class="native-section-title">Om företaget</div>

      <div class="native-field">
        <label>Företagsnamn <span>*</span></label>
        <input class="native-input" id="n-company" type="text" placeholder="Ex. Björk & Partners AB">
      </div>
      <div class="native-field">
        <label>Bransch <span>*</span></label>
        <input class="native-input" id="n-industry" type="text" placeholder="Ex. Fastighet, Tech, Hälsa">
      </div>
      <div class="native-field">
        <label>Webbplats <span>valfritt</span></label>
        <input class="native-input" id="n-website" type="text" placeholder="https://www.exempel.se">
      </div>

      <div class="native-section-title">Om kampanjen</div>

      <div class="native-field">
        <label>Typ av artikel <span>*</span></label>
        <div class="native-type-grid" id="native-type-grid">
          <button type="button" class="native-type-btn" onclick="nativeSelectType(this,'Kundcase')">Kundcase</button>
          <button type="button" class="native-type-btn on" onclick="nativeSelectType(this,'Guide')">Guide</button>
          <button type="button" class="native-type-btn" onclick="nativeSelectType(this,'Expertartikel')">Expertartikel</button>
          <button type="button" class="native-type-btn" onclick="nativeSelectType(this,'Erbjudande')">Erbjudande</button>
          <button type="button" class="native-type-btn" onclick="nativeSelectType(this,'Event')">Event</button>
          <button type="button" class="native-type-btn" onclick="nativeSelectType(this,'Varumärkesberättelse')">Varumärkesberättelse</button>
          <button type="button" class="native-type-btn" onclick="nativeSelectType(this,'Lokal artikel')">Lokal artikel</button>
        </div>
        <div class="native-type-hint" id="native-type-hint">Praktiska råd och konkreta steg. Företaget är en trovärdig hjälpare, inte hela berättelsen.</div>
      </div>

      <div class="native-field">
        <label>Beskriv kampanjen <span>*</span></label>
        <textarea class="native-textarea" id="n-campaign" placeholder="Vad handlar kampanjen om? Vad vill ni berätta? Lyft gärna era viktigaste budskap och vad som gör er unika."></textarea>
      </div>
      <div class="native-field">
        <label>Syfte med kampanjen <span>*</span></label>
        <textarea class="native-textarea" id="n-purpose" style="min-height:72px" placeholder="Ex. Öka kännedom om ny tjänst, driva trafik till hemsidan, stärka varumärket som arbetsgivare..."></textarea>
      </div>
      <div class="native-field">
        <label>Målgrupp <span>*</span></label>
        <input class="native-input" id="n-audience" type="text" placeholder="Ex. Villaägare 40–65 år i Mälardalen, småföretagare i Sverige">
      </div>
      <div class="native-field">
        <label>Citat från företaget <span>valfritt – rekommenderas</span></label>
        <textarea class="native-textarea" id="n-quote" style="min-height:72px" placeholder="Lägg gärna in ett eller två citat från en person på företaget. Namn och titel hjälper: 'Vi ser en tydlig efterfrågan... – Anna Svensson, VD'"></textarea>
      </div>
      <div class="native-field">
        <label>Call to action <span>*</span></label>
        <input class="native-input" id="n-cta" type="text" placeholder="Ex. Besök vår hemsida, Boka ett möte, Läs mer på...">
      </div>

      <div class="native-section-title">Budget</div>
      <div class="native-field">
        <label>Total kampanjbudget (SEK) <span>*</span></label>
        <div class="native-budget-wrap">
          <input class="native-input" id="n-budget" type="number" placeholder="Ex. 50000" min="0" step="1000">
          <span style="font-size:13px;color:#9A8570">kr exkl. moms</span>
        </div>
        <div class="native-budget-note">Budgeten fördelas baserat på valda kanalers räckvidd. Förslaget visas i resultatet.</div>
      </div>

      <div id="native-error" style="display:none;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;padding:10px 14px;font-size:13px;color:#991B1B;margin-bottom:1rem"></div>

      <button class="native-analyze-btn" id="native-btn" onclick="generateNative()">
        Skapa nativeartikel →
      </button>
    </div>

    <div class="native-loading" id="native-loading">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#C9A84C" stroke-width="3" stroke-linecap="round">
        <circle cx="18" cy="18" r="14" stroke="rgba(0,0,0,0.08)"/>
        <path d="M18 4a14 14 0 0 1 14 14">
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/>
        </path>
      </svg>
      <div class="native-loading-text">Skriver din nativeartikel...</div>
    </div>

    <div class="native-result" id="native-result">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C9A84C;margin-bottom:1rem">Nativeartikel – klar för publicering</div>
      <div class="native-result-headline" id="native-result-headline"></div>
      <div class="native-result-ingress" id="native-result-ingress"></div>
      <div class="native-result-body" id="native-result-body"></div>

      <div class="native-budget-dist" id="native-budget-dist" style="display:none">
        <div class="native-budget-dist-title">Föreslagen budgetfördelning</div>
        <div id="native-budget-rows"></div>
      </div>

      <div class="native-result-actions">
        <button class="native-action-btn primary" onclick="nativeCopy()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="5" width="8" height="8" rx="1"/><path d="M9 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2"/></svg>
          Kopiera artikel
        </button>
        <button class="native-action-btn" onclick="nativeDownload()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1"/></svg>
          Ladda ner
        </button>
        <button class="native-action-btn" onclick="nativeSendByEmail()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="1" y="3" width="12" height="8" rx="1"/><path d="M1 3l6 5 6-5"/></svg>
          Skicka via e-post
        </button>
        <button class="native-action-btn auth-when-in" style="display:none" id="native-save-btn" onclick="nativeSave()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 2h6l3 3v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M5 2v3h4"/></svg>
          Spara i bibliotek
        </button>
      </div>

      <button class="native-new-btn" onclick="nativeReset()">Skapa en ny artikel</button>
    </div>

  </div>
</div>

<div id="newsroom-page">

  <div style="position:relative;height:42vh;min-height:320px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/newsroom.jpeg');background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.48)"></div>
    <!-- Nav bar -->
    <div style="position:absolute;top:0;left:0;right:0;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;background:rgba(0,0,0,0.15)">
      <button class="mava-logo on-dark" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:26px;width:26px"><span class="mava-word" style="font-size:17px">Mava</span></button>
      <button onclick="goToLanding()" style="font-size:13px;color:rgba(255,255,255,0.75);background:none;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 7H3M6 3l-4 4 4 4"/></svg>
        Tillbaka
      </button>
    </div>
    <!-- Hero text -->
    <div style="position:relative;z-index:1;max-width:600px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:0.6rem">Verktyg 3</div>
      <h1 style="font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.8rem">Newsroom</h1>
      <p style="font-size:clamp(14px,1.6vw,17px);color:rgba(255,255,255,0.7);line-height:1.6;max-width:460px;margin:0 auto">Professionella pressreleaser på minuter – redo att skicka till svenska redaktioner.</p>
    </div>
  </div>

  <div class="newsroom-container">

    <div id="newsroom-form-section">
      <div style="margin-bottom:2rem">
        <h1 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin-bottom:0.5rem">Skapa din pressrelease</h1>
        <p style="font-size:14px;color:#9A8570;line-height:1.6">Fyll i informationen nedan så genererar AI:n en professionell pressrelease redo att skicka till redaktioner.</p>
      </div>

      <div class="newsroom-section-title">Typ av nyhet</div>
      <div class="newsroom-type-grid">
        <div class="newsroom-type" onclick="newsroomSelectType(this,'Produktlansering')">
          <div class="newsroom-type-icon">🚀</div>
          <div class="newsroom-type-name">Produktlansering</div>
          <div class="newsroom-type-desc">Ny produkt eller tjänst</div>
        </div>
        <div class="newsroom-type" onclick="newsroomSelectType(this,'Partnerskap eller avtal')">
          <div class="newsroom-type-icon">🤝</div>
          <div class="newsroom-type-name">Partnerskap</div>
          <div class="newsroom-type-desc">Avtal eller samarbete</div>
        </div>
        <div class="newsroom-type" onclick="newsroomSelectType(this,'Ny medarbetare eller rekrytering')">
          <div class="newsroom-type-icon">👤</div>
          <div class="newsroom-type-name">Rekrytering</div>
          <div class="newsroom-type-desc">Ny person eller roll</div>
        </div>
        <div class="newsroom-type" onclick="newsroomSelectType(this,'Resultat eller milstolpe')">
          <div class="newsroom-type-icon">📈</div>
          <div class="newsroom-type-name">Resultat</div>
          <div class="newsroom-type-desc">Siffror eller milstolpe</div>
        </div>
        <div class="newsroom-type" onclick="newsroomSelectType(this,'Event eller konferens')">
          <div class="newsroom-type-icon">📅</div>
          <div class="newsroom-type-name">Event</div>
          <div class="newsroom-type-desc">Konferens eller aktivitet</div>
        </div>
        <div class="newsroom-type" onclick="newsroomSelectType(this,'Annan nyhet')">
          <div class="newsroom-type-icon">📰</div>
          <div class="newsroom-type-name">Övrigt</div>
          <div class="newsroom-type-desc">Annan typ av nyhet</div>
        </div>
      </div>

      <div class="newsroom-section-title">Om företaget</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div class="newsroom-field">
          <label>Företagsnamn <span>*</span></label>
          <input class="newsroom-input" id="nr-company" type="text" placeholder="Ex. Björk & Partners AB">
        </div>
        <div class="newsroom-field">
          <label>Bransch <span>*</span></label>
          <input class="newsroom-input" id="nr-industry" type="text" placeholder="Ex. Tech, Fastighet, Hälsa">
        </div>
      </div>
      <div class="newsroom-field">
        <label>Kort om företaget <span>*</span></label>
        <textarea class="newsroom-textarea" id="nr-company-desc" style="min-height:72px" placeholder="Ex. Björk & Partners är ett ledande konsultbolag inom hållbar stadsplanering med 120 anställda i Sverige och Norge."></textarea>
      </div>

      <div class="newsroom-section-title">Om nyheten</div>

      <div class="newsroom-field">
        <label>Beskriv nyheten <span>*</span></label>
        <textarea class="newsroom-textarea" id="nr-news" placeholder="Vad har hänt? Beskriv nyheten så detaljerat som möjligt – datum, siffror, bakgrund och varför det är viktigt."></textarea>
      </div>
      <div class="newsroom-field">
        <label>Citat från nyckelperson <span>rekommenderas starkt</span></label>
        <textarea class="newsroom-textarea" id="nr-quote" style="min-height:80px" placeholder="Ex: 'Det här är ett viktigt steg för oss och våra kunder.' – Anna Svensson, VD Björk & Partners&#10;&#10;Namn och titel gör pressreleasen mer trovärdig."></textarea>
      </div>
      <div class="newsroom-field">
        <label>Kontaktperson för media <span>valfritt</span></label>
        <input class="newsroom-input" id="nr-contact" type="text" placeholder="Ex. Johan Berg, PR-ansvarig, 070-123 45 67, johan@foretaget.se">
      </div>

      <div class="newsroom-section-title">Målmedia</div>
      <p style="font-size:13px;color:#9A8570;margin-bottom:1rem;line-height:1.6">Välj vilken typ av media du riktar dig mot – det påverkar ton och vinkel.</p>
      <div class="newsroom-media-grid">
        <div class="newsroom-media sel" onclick="newsroomToggleMedia(this,'Dagstidningar och nyhetsmedier')">
          <div class="newsroom-media-name">Dagstidningar</div>
          <div class="newsroom-media-desc">SVD, DN, Aftonbladet</div>
        </div>
        <div class="newsroom-media" onclick="newsroomToggleMedia(this,'Branschpress och facktidningar')">
          <div class="newsroom-media-name">Branschpress</div>
          <div class="newsroom-media-desc">Fackmedier och branschtidningar</div>
        </div>
        <div class="newsroom-media" onclick="newsroomToggleMedia(this,'Lokala medier')">
          <div class="newsroom-media-name">Lokalmedier</div>
          <div class="newsroom-media-desc">Regionala tidningar</div>
        </div>
        <div class="newsroom-media" onclick="newsroomToggleMedia(this,'Affärsmedia och investerarpress')">
          <div class="newsroom-media-name">Affärsmedia</div>
          <div class="newsroom-media-desc">Breakit, DI, Affärsvärlden</div>
        </div>
      </div>

      <div id="newsroom-error" class="newsroom-error"></div>

      <button class="newsroom-generate-btn" id="newsroom-btn" onclick="generateNewsroom()">
        Generera pressrelease →
      </button>
    </div>

    <div class="newsroom-loading" id="newsroom-loading">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round"><path d="M16 4v4M16 24v4M4 16H8M24 16h4M7.05 7.05l2.83 2.83M22.12 22.12l2.83 2.83M7.05 24.95l2.83-2.83M22.12 9.88l2.83-2.83"><animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="1s" repeatCount="indefinite"/></path></svg>
      <div class="newsroom-loading-text">Skriver pressrelease...</div>
    </div>

    <div class="newsroom-result" id="newsroom-result">
      <div class="newsroom-result-card">
        <div class="newsroom-result-label" id="nr-result-type"></div>
        <div class="newsroom-result-headline" id="nr-result-headline"></div>
        <div class="newsroom-result-ingress" id="nr-result-ingress"></div>
        <div class="newsroom-result-body" id="nr-result-body"></div>
        <div class="newsroom-result-quote" id="nr-result-quote" style="display:none"></div>
        <div class="newsroom-contact-block" id="nr-result-contact" style="display:none">
          <div class="newsroom-contact-label">Kontakt för media</div>
          <div id="nr-result-contact-text"></div>
        </div>
        <div class="newsroom-result-boilerplate" id="nr-result-boilerplate"></div>
      </div>

      <div id="nr-result-extras"></div>

      <div class="newsroom-result-actions">
        <button class="newsroom-action-btn primary" onclick="newsroomCopy()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="4" width="8" height="8" rx="1.5"/><path d="M2 10V2h8"/></svg>
          Kopiera text
        </button>
        <button class="newsroom-action-btn" onclick="newsroomEmail()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="1" y="3" width="12" height="9" rx="1.5"/><path d="M1 3l6 5 6-5"/></svg>
          Skicka via e-post
        </button>
        <button class="newsroom-action-btn auth-when-in" style="display:none" id="newsroom-save-btn" onclick="newsroomSave()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 2h6l3 3v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M5 2v3h4"/></svg>
          Spara i bibliotek
        </button>
      </div>

      <button class="newsroom-new-btn" onclick="newsroomReset()">← Skapa ny pressrelease</button>
    </div>

  </div>
</div>

<div id="brief-page">

  <div style="position:relative;height:42vh;min-height:320px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/kontor.png');background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.48)"></div>
    <!-- Nav bar -->
    <div style="position:absolute;top:0;left:0;right:0;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;background:rgba(0,0,0,0.15)">
      <button class="mava-logo on-dark" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:26px;width:26px"><span class="mava-word" style="font-size:17px">Mava</span></button>
      <button onclick="goToLanding()" style="font-size:13px;color:rgba(255,255,255,0.75);background:none;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 7H3M6 3l-4 4 4 4"/></svg>
        Tillbaka
      </button>
    </div>
    <!-- Hero text -->
    <div style="position:relative;z-index:1;max-width:600px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:0.6rem">Verktyg 2</div>
      <h1 style="font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.8rem">The Brief</h1>
      <p style="font-size:clamp(14px,1.6vw,17px);color:rgba(255,255,255,0.7);line-height:1.6;max-width:460px;margin:0 auto">Komplett kampanjbrief med mål, målgrupp, kanaler, budget och tidslinje.</p>
    </div>
  </div>

  <div class="brief-container">

    <div id="brief-form-section">
      <div style="margin-bottom:2rem">
        <h1 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin-bottom:0.5rem">Skapa din kampanjbrief</h1>
        <p style="font-size:14px;color:#9A8570;line-height:1.6">Fyll i informationen nedan så genererar AI:n en komplett brief redo att skicka till byrå, frilansare eller internt team.</p>
      </div>

      <div class="brief-section-title">Kampanjmål</div>
      <p style="font-size:13px;color:#9A8570;margin-bottom:1rem;line-height:1.6">Välj ett eller flera mål – de styr vad brifen prioriterar.</p>
      <div class="brief-goal-grid">
        <div class="brief-goal" onclick="briefToggleGoal(this,'Ökad varumärkeskännedom')">
          <div class="brief-goal-icon">📣</div>
          <div class="brief-goal-name">Kännedom</div>
          <div class="brief-goal-desc">Fler ska veta vem ni är</div>
        </div>
        <div class="brief-goal" onclick="briefToggleGoal(this,'Leadsgenerering')">
          <div class="brief-goal-icon">🎯</div>
          <div class="brief-goal-name">Leads</div>
          <div class="brief-goal-desc">Fånga nya potentiella kunder</div>
        </div>
        <div class="brief-goal" onclick="briefToggleGoal(this,'Direktförsäljning och konvertering')">
          <div class="brief-goal-icon">💰</div>
          <div class="brief-goal-name">Försäljning</div>
          <div class="brief-goal-desc">Driva köp och konvertering</div>
        </div>
        <div class="brief-goal" onclick="briefToggleGoal(this,'Produktlansering')">
          <div class="brief-goal-icon">🚀</div>
          <div class="brief-goal-name">Lansering</div>
          <div class="brief-goal-desc">Introducera något nytt</div>
        </div>
        <div class="brief-goal" onclick="briefToggleGoal(this,'Kundlojalitet och retention')">
          <div class="brief-goal-icon">🔄</div>
          <div class="brief-goal-name">Lojalitet</div>
          <div class="brief-goal-desc">Behåll och fördjupa relationer</div>
        </div>
        <div class="brief-goal" onclick="briefToggleGoal(this,'Arbetsgivarvarumärke och rekrytering')">
          <div class="brief-goal-icon">👥</div>
          <div class="brief-goal-name">Employer brand</div>
          <div class="brief-goal-desc">Attrahera rätt talang</div>
        </div>
      </div>

      <div class="brief-section-title">Om företaget och kampanjen</div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div class="brief-field">
          <label>Företagsnamn <span>*</span></label>
          <input class="brief-input" id="br-company" type="text" placeholder="Ex. Björk & Partners AB">
        </div>
        <div class="brief-field">
          <label>Bransch <span>*</span></label>
          <input class="brief-input" id="br-industry" type="text" placeholder="Ex. Tech, Fastighet, Retail">
        </div>
      </div>

      <div class="brief-field">
        <label>Vad ska kampanjen kommunicera? <span>*</span></label>
        <textarea class="brief-textarea" id="br-message" placeholder="Beskriv produkten, tjänsten eller budskapet som ska ut. Vad är det unika? Vad skiljer er från konkurrenterna?"></textarea>
      </div>

      <div class="brief-field">
        <label>Målgrupp <span>*</span></label>
        <textarea class="brief-textarea" id="br-audience" style="min-height:72px" placeholder="Ex. Beslutsfattare på medelstora B2B-företag i Sverige, 35–55 år, inom IT och finans."></textarea>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div class="brief-field">
          <label>Geografisk räckvidd <span>*</span></label>
          <select class="brief-input" id="br-reach">
            <option value="">Välj räckvidd...</option>
            <option value="Lokal">Lokal – en ort eller kommun</option>
            <option value="Regional">Regional – ett län eller område</option>
            <option value="Nationell">Nationell – hela Sverige</option>
          </select>
        </div>
        <div class="brief-field">
          <label>Ort / region <span>valfritt</span></label>
          <input class="brief-input" id="br-region" type="text" placeholder="Ex. Norrköping, Östergötland">
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div class="brief-field">
          <label>Total budget <span>*</span></label>
          <div style="display:flex;align-items:center;gap:8px">
            <input class="brief-input" id="br-budget" type="number" placeholder="Ex. 150000" min="0" step="5000" style="max-width:180px">
            <span style="font-size:13px;color:#9A8570;white-space:nowrap">kr exkl. moms</span>
          </div>
        </div>
        <div class="brief-field">
          <label>Kampanjperiod <span>*</span></label>
          <input class="brief-input" id="br-period" type="text" placeholder="Ex. 1 mars – 30 april 2025">
        </div>
      </div>

      <div class="brief-section-title">Ton och begränsningar</div>

      <div class="brief-field">
        <label>Önskad ton och känsla</label>
        <input class="brief-input" id="br-tone" type="text" placeholder="Ex. Professionell men varm, inspirerande, rakt på sak, lekfull">
      </div>

      <div class="brief-field">
        <label>Krav eller begränsningar <span>valfritt</span></label>
        <textarea class="brief-textarea" id="br-constraints" style="min-height:72px" placeholder="Ex. Måste följa grafisk profil, inga konkurrentnamn, GDPR-krav, specifika kanaler som ska inkluderas eller undvikas..."></textarea>
      </div>

      <div class="brief-field">
        <label>Övrigt att känna till <span>valfritt</span></label>
        <textarea class="brief-textarea" id="br-extra" style="min-height:72px" placeholder="Ex. Tidigare kampanjer, lärdomar, specifika KPI:er ni redan har bestämt, vem brifen ska skickas till..."></textarea>
      </div>

      <div id="brief-error" class="brief-error"></div>

      <button class="brief-generate-btn" id="brief-btn" onclick="generateBrief()">
        Generera kampanjbrief →
      </button>
    </div>

    <div class="brief-loading" id="brief-loading">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round"><path d="M16 4v4M16 24v4M4 16H8M24 16h4M7.05 7.05l2.83 2.83M22.12 22.12l2.83 2.83M7.05 24.95l2.83-2.83M22.12 9.88l2.83-2.83"><animateTransform attributeName="transform" type="rotate" from="0 16 16" to="360 16 16" dur="1s" repeatCount="indefinite"/></path></svg>
      <div class="brief-loading-text">Skriver kampanjbrief...</div>
    </div>

    <div class="brief-result" id="brief-result">
      <div class="brief-result-card">
        <div class="brief-result-label" id="br-result-label"></div>
        <div class="brief-result-title" id="br-result-title"></div>

        <div class="brief-section">
          <div class="brief-section-label">Bakgrund</div>
          <div class="brief-section-content" id="br-result-background"></div>
        </div>
        <div class="brief-section">
          <div class="brief-section-label">Mål</div>
          <div class="brief-section-content" id="br-result-goals"></div>
        </div>
        <div class="brief-section">
          <div class="brief-section-label">Målgrupp</div>
          <div class="brief-section-content" id="br-result-audience"></div>
        </div>
        <div class="brief-section">
          <div class="brief-section-label">Budskap och tonalitet</div>
          <div class="brief-section-content" id="br-result-message"></div>
        </div>
        <div class="brief-section">
          <div class="brief-section-label">Kanalrekommendationer</div>
          <div class="brief-section-content" id="br-result-channels"></div>
        </div>
        <div class="brief-section">
          <div class="brief-section-label">Budget</div>
          <div class="brief-section-content" id="br-result-budget"></div>
        </div>
        <div class="brief-section">
          <div class="brief-section-label">Tidslinje</div>
          <div id="br-result-timeline"></div>
        </div>
        <div class="brief-section">
          <div class="brief-section-label">KPI:er och framgångsmått</div>
          <div id="br-result-kpis"></div>
        </div>
        <div class="brief-section" id="br-result-constraints-section" style="display:none">
          <div class="brief-section-label">Krav och begränsningar</div>
          <div class="brief-section-content" id="br-result-constraints"></div>
        </div>
      </div>

      <div class="brief-result-actions">
        <button class="brief-action-btn primary" id="brief-improve-btn" onclick="briefImprove()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 1l1.5 4L13 6.5 8.5 8 7 12.5 5.5 8 1 6.5 5.5 5z"/></svg>
          Gör skarpare med AI
        </button>
        <button class="brief-action-btn" onclick="briefCopy()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="4" width="8" height="8" rx="1.5"/><path d="M2 10V2h8"/></svg>
          Kopiera brief
        </button>
        <button class="brief-action-btn" onclick="briefEmail()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="1" y="3" width="12" height="9" rx="1.5"/><path d="M1 3l6 5 6-5"/></svg>
          Skicka via e-post
        </button>
        <button class="brief-action-btn" id="brief-save-btn" onclick="briefSave()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 2h6l3 3v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M5 2v3h4"/></svg>
          Spara i bibliotek
        </button>
      </div>

      <button class="brief-new-btn" onclick="briefReset()">← Skapa ny brief</button>
    </div>

  </div>
</div>

<div id="adcopy-page">
  <div style="position:relative;height:42vh;min-height:320px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/adgenerator.png');background-size:cover;background-position:center top"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.48)"></div>
    <!-- Nav bar -->
    <div style="position:absolute;top:0;left:0;right:0;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;background:rgba(0,0,0,0.15)">
      <button class="mava-logo on-dark" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:26px;width:26px"><span class="mava-word" style="font-size:17px">Mava</span></button>
      <button onclick="goToTools()" style="font-size:13px;color:rgba(255,255,255,0.75);background:none;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 7H3M6 3l-4 4 4 4"/></svg>
        Tillbaka
      </button>
    </div>
    <!-- Hero text -->
    <div style="position:relative;z-index:1;max-width:600px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:0.6rem">Verktyg 5</div>
      <h1 style="font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.8rem">AdStudio</h1>
      <p style="font-size:clamp(14px,1.6vw,17px);color:rgba(255,255,255,0.7);line-height:1.6;max-width:460px;margin:0 auto">Ladda upp en bild – få färdiga annonser för Meta, LinkedIn och display på sekunder.</p>
    </div>
  </div>
  <div class="adcopy-container">
    <div id="adcopy-form-section">
      <div style="margin-bottom:2rem"><h1 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin-bottom:0.5rem">AdStudio</h1><p style="font-size:14px;color:#9A8570;line-height:1.6">Ladda upp en bild, fyll i kampanjinfo och välj format. AI genererar copy och sätter ihop färdiga annonser redo att ladda ner.</p></div>
      <div class="adcopy-section-title">Annonsens bild</div>
      <div class="adgen-upload-zone" id="adgen-upload-zone"><input type="file" id="adgen-file-input" accept="image/*" onchange="adgenHandleFile(this.files[0])"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#D4A857" stroke-width="1.5" stroke-linecap="round" style="margin-bottom:8px"><rect x="2" y="6" width="28" height="20" rx="3"/><circle cx="11" cy="14" r="3"/><path d="M2 24l7-6 5 5 4-4 7 7"/></svg><div style="font-size:14px;font-weight:600;color:#2C2520;margin-bottom:4px">Klicka eller dra hit en bild</div><div style="font-size:12px;color:#9A8570">JPG, PNG eller WebP</div><img id="adgen-preview" class="adgen-preview-img"></div>
      <div class="adcopy-section-title">Logga <span style="font-weight:400;color:#b5b0a8;font-size:12px;text-transform:none;letter-spacing:0">valfritt</span></div>
      <div class="adgen-upload-zone" id="adgen-logo-zone" style="padding:1.25rem"><input type="file" id="adgen-logo-input" accept="image/png,image/svg+xml,image/webp" onchange="adgenHandleLogo(this.files[0])"><svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="#D4A857" stroke-width="1.5" stroke-linecap="round" style="margin-bottom:6px"><rect x="4" y="4" width="24" height="24" rx="4"/><path d="M11 20l4-6 3 4 2-2 3 4"/></svg><div style="font-size:13px;font-weight:600;color:#2C2520;margin-bottom:3px">Ladda upp er logga</div><div style="font-size:11px;color:#9A8570">Helst PNG med transparent bakgrund</div><img id="adgen-logo-preview" class="adgen-preview-img" style="max-height:60px"></div>
      <div class="adcopy-field" id="adgen-logo-pos-field" style="display:none;margin-top:0.75rem"><label style="font-size:13px">Loggans placering</label><select class="adcopy-select" id="ac-logo-pos"><option value="top-left">Uppe till vänster</option><option value="top-right">Uppe till höger</option><option value="bottom-left">Nere till vänster</option><option value="bottom-right" selected>Nere till höger</option></select></div>
      <div class="adcopy-section-title">Om kampanjen</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem"><div class="adcopy-field"><label>Företag / Varumärke <span>*</span></label><input class="adcopy-input" id="ac-company" type="text" placeholder="Ex. Bilbörsen Linköping"></div><div class="adcopy-field"><label>Produkt / Kampanj <span>*</span></label><input class="adcopy-input" id="ac-product" type="text" placeholder="Ex. Kia PV5, Sommarkampanj"></div></div>
      <div class="adcopy-field"><label>Huvudbudskap <span>*</span></label><textarea class="adcopy-textarea" id="ac-message" style="min-height:72px" placeholder="Vad ska annonsen kommunicera?"></textarea></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem"><div class="adcopy-field"><label>Call to action <span>*</span></label><input class="adcopy-input" id="ac-cta" type="text" placeholder="Ex. Boka provkörning, Läs mer"></div><div class="adcopy-field"><label>Ton</label><select class="adcopy-select" id="ac-tone"><option value="">Välj ton...</option><option>Professionell och förtroendegivande</option><option>Varm och personlig</option><option>Energisk och drivande</option><option>Mjuk och informativ</option></select></div></div>
      <div class="adcopy-field"><label>Referens / stilriktning <span>valfritt</span></label><textarea class="adcopy-textarea" id="ac-reference" style="min-height:72px" placeholder="Klistra in text från en annons du gillar, eller beskriv tonen/stilen du vill efterlikna. Ex: 'Kort och peppig som Nikes annonser' eller klistra in befintlig annonstext."></textarea></div>
      <div class="adcopy-section-title">Välj annonsformat</div>
      <div style="font-size:12px;font-weight:600;color:#9A8570;margin-bottom:8px">Sociala medier</div>
      <div class="adgen-format-grid"><div class="adgen-fmt" onclick="adgenToggleFmt(this,'meta-feed-square')"><div class="adgen-fmt-name">Meta Feed (kvadrat)</div><div class="adgen-fmt-size">1080 × 1080 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'meta-feed-portrait')"><div class="adgen-fmt-name">Meta Feed (porträtt)</div><div class="adgen-fmt-size">1080 × 1350 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'meta-stories')"><div class="adgen-fmt-name">Meta Stories / Reels</div><div class="adgen-fmt-size">1080 × 1920 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'meta-landscape')"><div class="adgen-fmt-name">Meta Landscape</div><div class="adgen-fmt-size">1200 × 628 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'meta-instream')"><div class="adgen-fmt-name">Meta In-stream</div><div class="adgen-fmt-size">1920 × 1080 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'linkedin')"><div class="adgen-fmt-name">LinkedIn</div><div class="adgen-fmt-size">1200 × 628 px</div></div></div>
      <div style="font-size:12px;font-weight:600;color:#9A8570;margin:16px 0 8px">Display / HTML5-banners</div>
      <div class="adgen-format-grid"><div class="adgen-fmt" onclick="adgenToggleFmt(this,'iab-medium')"><div class="adgen-fmt-name">Medium Rectangle</div><div class="adgen-fmt-size">300 × 250 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'iab-large-rect')"><div class="adgen-fmt-name">Large Rectangle</div><div class="adgen-fmt-size">336 × 280 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'iab-leaderboard')"><div class="adgen-fmt-name">Leaderboard</div><div class="adgen-fmt-size">728 × 90 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'iab-billboard')"><div class="adgen-fmt-name">Billboard</div><div class="adgen-fmt-size">970 × 250 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'iab-halfpage')"><div class="adgen-fmt-name">Half Page</div><div class="adgen-fmt-size">300 × 600 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'iab-skyscraper')"><div class="adgen-fmt-name">Wide Skyscraper</div><div class="adgen-fmt-size">160 × 600 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'iab-mobile')"><div class="adgen-fmt-name">Mobile Banner</div><div class="adgen-fmt-size">320 × 50 px</div></div><div class="adgen-fmt" onclick="adgenToggleFmt(this,'iab-mobile-large')"><div class="adgen-fmt-name">Large Mobile Banner</div><div class="adgen-fmt-size">320 × 100 px</div></div></div>
      <div id="adcopy-error" style="display:none;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;padding:10px 14px;font-size:13px;color:#991B1B;margin-bottom:1rem;margin-top:1rem"></div>
      <button class="adcopy-analyze-btn" id="adcopy-btn" onclick="generateAdGen()">Generera annonser →</button>
    </div>
    <div class="adcopy-loading" id="adcopy-loading" style="display:none;text-align:center;padding:3rem 1rem"><div style="font-size:15px;color:#5F5E5A;margin-top:1rem">Genererar annonser...</div></div>
    <div class="adcopy-result" id="adcopy-result" style="display:none;margin-top:1.5rem"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#C9A84C;margin-bottom:0.5rem">Genererade annonser</div><div id="adgen-result-grid" class="adgen-result-grid"></div><button class="adcopy-new-btn" onclick="adgenReset()">← Skapa nya annonser</button></div>
  </div>
</div>

<div id="dist-page">
  <header class="dist-header">
    <div style="display:flex;align-items:center;gap:12px">
      <button class="mava-logo on-light" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:28px;width:28px"><span class="mava-word" style="font-size:18px">Mava</span></button>
      <div>
        <div style="font-size:15px;font-weight:600;color:#2C2520">Distribution Planner</div><!-- hidden -->
        <div style="font-size:12px;color:#9A8570">Powered by AI</div>
      </div>
    </div>
    <button onclick="goToTools()" style="font-size:13px;color:#9A8570;background:none;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 7H3M6 3l-4 4 4 4"/></svg>
      Mava
    </button>
  </header>
  <div class="dist-container">
    <div id="dist-form-section">
      <div style="margin-bottom:2rem">
        <h1 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;color:#2C2520;letter-spacing:-0.02em;margin-bottom:0.5rem">Planera din distribution</h1>
        <p style="font-size:14px;color:#9A8570;line-height:1.6">Beskriv din kampanj och mål – verktyget föreslår en optimal kanalmix med viktad budgetfördelning.</p>
      </div>

      <div class="dist-section-title">Om kampanjen</div>
      <div class="dist-field">
        <label>Företag / Varumärke <span>*</span></label>
        <input class="dist-input" id="d-company" type="text" placeholder="Ex. Björk & Partners AB">
      </div>
      <div class="dist-field">
        <label>Beskriv kampanjen <span>*</span></label>
        <textarea class="dist-textarea" id="d-campaign" placeholder="Vad är kampanjen? Vad vill ni uppnå? Vad erbjuder ni?"></textarea>
      </div>
      <div class="dist-field">
        <label>Kampanjmål <span>*</span></label>
        <select class="dist-select" id="d-goal">
          <option value="">Välj mål...</option>
          <option>Varumärkeskännedom</option>
          <option>Leadsgenerering</option>
          <option>Konvertering / försäljning</option>
          <option>Trafik till hemsida</option>
          <option>Arbetsgivarvarumärke</option>
          <option>Produktlansering</option>
        </select>
      </div>
      <div class="dist-field">
        <label>Målgrupp <span>*</span></label>
        <input class="dist-input" id="d-audience" type="text" placeholder="Ex. Beslutsfattare inom tech, 35–55 år, Stockholm">
      </div>
      <div class="dist-field">
        <label>Geografi <span>*</span></label>
        <input class="dist-input" id="d-geo" type="text" placeholder="Ex. Sverige nationellt, Storstockholm, Göteborg">
      </div>
      <div class="dist-field">
        <label>Kampanjperiod <span>valfritt</span></label>
        <input class="dist-input" id="d-period" type="text" placeholder="Ex. 4 veckor, mars–april">
      </div>

      <div class="dist-section-title">Kanaler att välja bland</div>
      <p style="font-size:13px;color:#9A8570;margin-bottom:1rem;line-height:1.6">Välj de kanaler som är aktuella för er kampanj. AI:n viktar budgeten baserat på era mål.</p>
      <div class="dist-channel-grid" id="dist-channel-grid"></div>

      <div class="dist-section-title">Budget</div>
      <div class="dist-field">
        <label>Total kampanjbudget (SEK) <span>*</span></label>
        <div style="display:flex;align-items:center;gap:12px">
          <input class="dist-input" id="d-budget" type="number" placeholder="Ex. 100 000" style="max-width:200px">
          <span style="font-size:13px;color:#9A8570">kr exkl. moms</span>
        </div>
      </div>

      <div id="dist-error" style="display:none;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;padding:10px 14px;font-size:13px;color:#991B1B;margin-bottom:1rem"></div>
      <button class="dist-analyze-btn" id="dist-btn" onclick="generateDist()">Generera distributionsplan →</button>
    </div>

    <div class="dist-loading" id="dist-loading">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#C9A84C" stroke-width="3" stroke-linecap="round">
        <circle cx="18" cy="18" r="14" stroke="rgba(0,0,0,0.08)"/>
        <path d="M18 4a14 14 0 0 1 14 14"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.9s" repeatCount="indefinite"/></path>
      </svg>
      <div style="font-size:15px;color:#5F5E5A;margin-top:1rem">Skapar din distributionsplan...</div>
    </div>

    <div class="dist-result" id="dist-result">
      <div class="dist-result-card">
        <div class="dist-result-label">Strategisk sammanfattning</div>
        <div class="dist-result-text" id="dist-result-summary"></div>
      </div>
      <div class="dist-result-card">
        <div class="dist-result-label">Rekommenderad kanalmix & budgetfördelning</div>
        <div id="dist-result-channels"></div>
      </div>
      <div class="dist-result-card" id="dist-result-recs-card">
        <div class="dist-result-label">Rekommendationer per kanal</div>
        <div id="dist-result-recs"></div>
      </div>
      <div class="dist-result-actions">
        <button class="dist-action-btn primary" onclick="distCopy()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="5" y="5" width="8" height="8" rx="1"/><path d="M9 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2"/></svg>
          Kopiera plan
        </button>
        <button class="dist-action-btn" onclick="distSend()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="1" y="3" width="12" height="8" rx="1"/><path d="M1 3l6 5 6-5"/></svg>
          Skicka via e-post
        </button>
      </div>
      <button class="dist-new-btn" onclick="distReset()">Skapa en ny plan</button>
    </div>
  </div>
</div>

<div id="app" style="display:none">
  <div style="position:relative;height:42vh;min-height:320px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 2rem">
    <div style="position:absolute;inset:0;background-image:url('images/stock.jpg');background-size:cover;background-position:center"></div>
    <div style="position:absolute;inset:0;background:rgba(0,0,0,0.48)"></div>
    <div style="position:absolute;top:0;left:0;right:0;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;background:rgba(0,0,0,0.15)">
      <button class="mava-logo on-dark" onclick="goToLanding()"><img src="images/mava-symbol.png" alt="Mava" style="height:26px;width:26px"><span class="mava-word" style="font-size:17px">Mava</span></button>
      <button onclick="goToLanding()" style="font-size:13px;color:rgba(255,255,255,0.75);background:none;border:none;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M11 7H3M6 3l-4 4 4 4"/></svg>
        Tillbaka
      </button>
    </div>
    <div style="position:relative;z-index:1;max-width:600px">
      <div style="font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:0.6rem">Verktyg 1</div>
      <h1 style="font-size:clamp(2rem,4vw,3.2rem);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:0.8rem">Market Pulse</h1>
      <p style="font-size:clamp(14px,1.6vw,17px);color:rgba(255,255,255,0.7);line-height:1.6;max-width:460px;margin:0 auto">Prioriterad kanalstrategi och konkreta rekommendationer för var ni ska synas.</p>
    </div>
  </div>

<div class="container">

  <div id="form-section">
    <div id="saved-banner" class="saved-banner">
      <svg width="14" height="14" viewBox="0 0 14 14"><polyline points="1.5,7 5,10.5 12.5,3" fill="none" stroke="#085041" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Din senaste analys visas nedan. Scrolla ner eller gör en ny analys.
    </div>

    <!-- PROGRESS BAR -->
    <div class="form-progress">
      <div class="fp-dot active" id="dot1"></div>
      <div class="fp-dot pending" id="dot2"></div>
      <div class="fp-dot pending" id="dot3"></div>
      <div class="fp-dot pending" id="dot4"></div>
    </div>

    <!-- STEP 1: FÖRETAGET -->
    <div class="fstep active" id="fstep1">
      <div class="fstep-header">
        <div class="fstep-title">Vad gör ert företag?</div>
        <span class="fstep-counter">Fråga 1 av 4</span>
      </div>
      <div class="fstep-sub">Ju mer ni berättar, desto skarpare analys.</div>

      <div class="field-row">
        <div class="field">
          <div class="field-label">Företagsnamn</div>
          <input id="company" type="text" placeholder="t.ex. Svenssons Bygg AB"/>
        </div>
        <div class="field">
          <div class="field-label">Bransch</div>
          <input id="industry" type="text" placeholder="t.ex. Bygg &amp; renovering"/>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Beskriv vad ni gör / säljer</div>
        <textarea id="description" placeholder="t.ex. Vi erbjuder totalentreprenad för villor och BRF:er i Stockholmsregionen..."></textarea>
      </div>

      <div class="field-row">
        <div class="field">
          <div class="field-label">Antal anställda</div>
          <select id="company-size">
            <option value="">Välj storlek...</option>
            <option>Soloföretagare / enmansföretag</option>
            <option>2–10 anställda</option>
            <option>11–50 anställda</option>
            <option>51–200 anställda</option>
            <option>Över 200 anställda</option>
          </select>
        </div>
        <div class="field">
          <div class="field-label">Ungefärlig årsomsättning</div>
          <select id="turnover">
            <option value="">Välj omsättning...</option>
            <option>Under 1 mkr</option>
            <option>1–5 mkr</option>
            <option>5–20 mkr</option>
            <option>20–100 mkr</option>
            <option>Över 100 mkr</option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Webbadress <span style="font-weight:400;color:#aaa">(frivilligt)</span></div>
        <input id="website" type="url" placeholder="https://www.ertforetag.se"/>
      </div>

      <div class="field">
        <div class="field-label">Säsongsvariationer</div>
        <div class="chip-group">
          <button class="chip" data-g="season" data-v="Ingen tydlig säsong">Ingen tydlig säsong</button>
          <button class="chip" data-g="season" data-v="Vår/sommar är högsäsong">Vår/sommar</button>
          <button class="chip" data-g="season" data-v="Höst/vinter är högsäsong">Höst/vinter</button>
          <button class="chip" data-g="season" data-v="Julen är viktig period">Julen</button>
          <button class="chip" data-g="season" data-v="Stor variation beroende på väder eller event">Stor variation</button>
        </div>
      </div>

      <div class="fnav">
        <div></div>
        <button class="fnav-next" onclick="formGoTo(2)">Fortsätt →</button>
      </div>
    </div>

    <!-- STEP 2: MÅLGRUPP -->
    <div class="fstep" id="fstep2">
      <div class="fstep-header">
        <div class="fstep-title">Vem vill ni nå?</div>
        <span class="fstep-counter">Fråga 2 av 4</span>
      </div>
      <div class="fstep-sub">Välj ett eller flera alternativ – ni kan kombinera.</div>

      <div class="field">
        <div class="field-label">Målgrupp</div>
        <div class="chip-group" id="audience-grid">
          <button class="chip" data-g="audience" data-v="Privatpersoner (B2C)">Privatpersoner (B2C)</button>
          <button class="chip" data-g="audience" data-v="Företag (B2B)">Företag (B2B)</button>
          <button class="chip" data-g="audience" data-v="Offentlig sektor">Offentlig sektor</button>
          <button class="chip" data-g="audience" data-v="Unga vuxna 18–35">Unga vuxna 18–35</button>
          <button class="chip" data-g="audience" data-v="Familjer">Familjer</button>
          <button class="chip" data-g="audience" data-v="Seniorer 60+">Seniorer 60+</button>
          <button class="chip" data-g="audience" data-v="Beslutsfattare / chefer">Beslutsfattare / chefer</button>
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <div class="field-label">Geografisk marknad</div>
          <input id="geography" type="text" placeholder="t.ex. Göteborg + kranskommuner"/>
        </div>
        <div class="field">
          <div class="field-label">Beskriv er kund <span style="font-weight:400;color:#aaa">(frivilligt)</span></div>
          <input id="audience-extra" type="text" placeholder="t.ex. Husägare med renoveringsbehov"/>
        </div>
      </div>

      <div class="fnav">
        <button class="fnav-back" onclick="formGoTo(1)">← Tillbaka</button>
        <button class="fnav-next" onclick="formGoTo(3)">Fortsätt →</button>
      </div>
    </div>

    <!-- STEP 3: UTMANINGAR -->
    <div class="fstep" id="fstep3">
      <div class="fstep-header">
        <div class="fstep-title">Vad är er största utmaning?</div>
        <span class="fstep-counter">Fråga 3 av 4</span>
      </div>
      <div class="fstep-sub">Välj det som stämmer – fler val ger bättre analys.</div>

      <div class="field">
        <div class="field-label">Största marknadsföringsutmaning</div>
        <div class="chip-group" id="challenge-opts">
          <button class="chip" data-g="challenge" data-v="Vi är okända utanför vårt eget nätverk">Okända utanför nätverket</button>
          <button class="chip" data-g="challenge" data-v="Svårt att nå nya kunder digitalt">Svårt nå digitalt</button>
          <button class="chip" data-g="challenge" data-v="Hög konkurrens och prispress">Hög konkurrens</button>
          <button class="chip" data-g="challenge" data-v="Vi vet inte vilka kanaler som fungerar för oss">Vet inte vilka kanaler</button>
          <button class="chip" data-g="challenge" data-v="Liten budget och begränsade resurser">Liten budget</button>
          <button class="chip" data-g="challenge" data-v="Vi tappar kunder till konkurrenter">Tappar kunder</button>
          <button class="chip" data-g="challenge" data-v="Svårt att kommunicera vad vi erbjuder">Svårt kommunicera</button>
          <button class="chip" data-g="challenge" data-v="Vi saknar tid för marknadsföring">Saknar tid</button>
        </div>
        <div class="field-extra">eller skriv med egna ord</div>
        <input type="text" id="challenge" placeholder="Frivilligt tillägg..."/>
      </div>

      <div class="form-divider"></div>

      <div class="field">
        <div class="field-label">Vad vill ni uppnå?</div>
        <div class="chip-group" id="goal-opts">
          <button class="chip" data-g="goal" data-v="Fler leads och förfrågningar">Fler leads</button>
          <button class="chip" data-g="goal" data-v="Ökad varumärkeskännedom lokalt">Lokal kännedom</button>
          <button class="chip" data-g="goal" data-v="Fler bokningar eller köp online">Fler bokningar</button>
          <button class="chip" data-g="goal" data-v="Nå en ny målgrupp vi inte når idag">Nå ny målgrupp</button>
          <button class="chip" data-g="goal" data-v="Behålla befintliga kunder och öka lojalitet">Behålla kunder</button>
          <button class="chip" data-g="goal" data-v="Lansera en ny produkt eller tjänst">Lansera nytt</button>
          <button class="chip" data-g="goal" data-v="Synas mer än konkurrenterna">Synas mer</button>
          <button class="chip" data-g="goal" data-v="Bygga förtroende och trovärdighet">Bygga förtroende</button>
        </div>
        <div class="field-extra">eller skriv med egna ord</div>
        <input type="text" id="goal" placeholder="Frivilligt tillägg..."/>
      </div>

      <div class="form-divider"></div>

      <div class="field">
        <div class="field-label">Er styrka / unikhet (USP)</div>
        <div class="chip-group" id="usp-opts">
          <button class="chip" data-g="usp" data-v="Lång erfarenhet och beprövad expertis">Lång erfarenhet</button>
          <button class="chip" data-g="usp" data-v="Personlig service och nära kundrelationer">Personlig service</button>
          <button class="chip" data-g="usp" data-v="Alltid fast och transparent pris">Fast pris</button>
          <button class="chip" data-g="usp" data-v="Snabb leverans och hög tillgänglighet">Snabb leverans</button>
          <button class="chip" data-g="usp" data-v="Hög kvalitet och premiumkänsla">Hög kvalitet</button>
          <button class="chip" data-g="usp" data-v="Lägst pris på marknaden">Lägst pris</button>
          <button class="chip" data-g="usp" data-v="Unik produkt eller metod som ingen annan erbjuder">Unik produkt / metod</button>
          <button class="chip" data-g="usp" data-v="Stark lokal förankring och lokalkännedom">Lokal förankring</button>
        </div>
        <div class="field-extra">eller skriv med egna ord</div>
        <input type="text" id="usp" placeholder="Frivilligt tillägg..."/>
      </div>

      <div class="form-divider"></div>

      <div class="field">
        <div class="field-label">Hur ser konkurrensen ut?</div>
        <div class="chip-group" id="competitors-opts">
          <button class="chip" data-g="competitors" data-v="Många lokala konkurrenter på ungefär samma prisnivå">Många lokala konkurrenter</button>
          <button class="chip" data-g="competitors" data-v="Få konkurrenter – relativt nischad marknad">Få konkurrenter / nischad</button>
          <button class="chip" data-g="competitors" data-v="Stora nationella aktörer med större budgetar">Stora nationella aktörer</button>
          <button class="chip" data-g="competitors" data-v="Konkurrenter syns mer digitalt än vi">Konkurrenter syns mer digitalt</button>
          <button class="chip" data-g="competitors" data-v="Vi är dyrare men levererar högre värde">Vi är dyrare / högre värde</button>
          <button class="chip" data-g="competitors" data-v="Vi är billigare och konkurrerar på pris">Vi konkurrerar på pris</button>
          <button class="chip" data-g="competitors" data-v="Marknaden är mättad och tuff">Mättad / tuff marknad</button>
          <button class="chip" data-g="competitors" data-v="Vi har inget tydligt konkurrensläge ännu">Oklart konkurrensläge</button>
        </div>
        <div class="field-extra">eller skriv med egna ord</div>
        <input type="text" id="competitors" placeholder="Frivilligt tillägg..."/>
      </div>

      <div class="fnav">
        <button class="fnav-back" onclick="formGoTo(2)">← Tillbaka</button>
        <button class="fnav-next" onclick="formGoTo(4)">Fortsätt →</button>
      </div>
    </div>

    <!-- STEP 4: BUDGET -->
    <div class="fstep" id="fstep4">
      <div class="fstep-header">
        <div class="fstep-title">Vad har ni för budget?</div>
        <span class="fstep-counter">Fråga 4 av 4</span>
      </div>
      <div class="fstep-sub">Sista steget – sedan genereras er plan direkt.</div>

      <div class="field">
        <div class="field-label">Månadsbudget för marknadsföring</div>
        <div class="budget-grid">
          <button class="budget-card" data-g="budget" data-v="Under 5 000 kr/mån">Under<br>5 000 kr</button>
          <button class="budget-card" data-g="budget" data-v="5 000–15 000 kr/mån">5 000–<br>15 000 kr</button>
          <button class="budget-card" data-g="budget" data-v="15 000–50 000 kr/mån">15 000–<br>50 000 kr</button>
          <button class="budget-card" data-g="budget" data-v="50 000–150 000 kr/mån">50 000–<br>150 000 kr</button>
          <button class="budget-card" data-g="budget" data-v="Över 150 000 kr/mån">Över<br>150 000 kr</button>
          <button class="budget-card" data-g="budget" data-v="Vet ej / vill diskutera">Vet ej /<br>diskutera</button>
        </div>
      </div>

      <div class="field" style="margin-top:1.25rem">
        <div class="field-label">Vad har ni gjort tidigare? <span style="font-weight:400;color:#aaa">(välj ett eller flera)</span></div>
        <div class="chip-group" id="history-grid">
          <button class="chip" data-g="history" data-v="Google Ads">Google Ads</button>
          <button class="chip" data-g="history" data-v="Meta / Facebook-annonser">Meta / Facebook</button>
          <button class="chip" data-g="history" data-v="SEO / organisk sökning">SEO</button>
          <button class="chip" data-g="history" data-v="Sociala medier organiskt">Sociala medier organiskt</button>
          <button class="chip" data-g="history" data-v="E-postmarknadsföring">E-post</button>
          <button class="chip" data-g="history" data-v="Traditionell media (print, radio)">Print / radio</button>
          <button class="chip" data-g="history" data-v="Nyhetsmedia / PR / pressreleasar">Nyhetsmedia / PR</button>
          <button class="chip" data-g="history" data-v="Mässor / event">Mässor / event</button>
          <button class="chip" data-g="history" data-v="Inget strukturerat">Inget strukturerat</button>
        </div>
      </div>

      <div class="fstep-summary" id="fstep-summary" style="display:none">
        <div class="fstep-summary-title">Redo att analysera</div>
        <div id="fstep-summary-rows"></div>
      </div>

      <div id="error-msg" class="err"></div>

      <div class="fnav" style="flex-direction:column;gap:0.75rem;margin-top:1.5rem">
        <button class="cta-btn" id="analyze-btn" onclick="analyzeMarketing()">Analysera och ta fram marknadsföringsplan →</button>
        <button class="fnav-back" style="width:100%;text-align:center" onclick="formGoTo(3)">← Tillbaka</button>
      </div>
      <button class="reset-btn" id="clear-btn" onclick="clearAll()" style="display:none;width:100%;margin-top:0.75rem;">✕ Rensa och börja om</button>
    </div>

  </div>

  <div class="loading-state" id="loading-state">

    <div class="spinner"></div>
    <p>Analyserar ert företag...</p>
  </div>

  <div id="stream-preview">
    <h2>Genererar er analys...</h2>
    <div id="stream-text"></div>
  </div>

  <div id="result-section">
    <div id="result-content"></div>

    <!-- DOWNLOAD / EMAIL BAR -->
    <div class="action-bar">
      <div class="action-bar-inner">
        <div class="action-bar-label">Spara din plan</div>
        <div class="action-bar-btns">
          <button class="action-bar-btn" onclick="downloadPDF()">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1"/></svg>
            Ladda ner som PDF
          </button>
          <button class="action-bar-btn" onclick="emailResult()">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="12" height="8" rx="1"/><path d="M1 3l6 5 6-5"/></svg>
            Mejla till mig
          </button>
          <button class="action-bar-btn auth-when-in" style="display:none" id="market-save-btn" onclick="marketSave()">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2h6l3 3v7a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/><path d="M5 2v3h4"/></svg>
            Spara i bibliotek
          </button>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div class="ctaf-new">
      <div class="ctaf-new-inner">
        <div class="ctaf-new-text" style="max-width:100%">
          <h3>Klar att gå vidare?</h3>
          <p>Använd analysen ovan för att agera direkt, eller skicka den byråklara sammanfattningen till en byrå som kan genomföra insatserna.</p>
        </div>
        <div class="ctaf-new-cta">
          <button class="ctaf-btn-primary" onclick="goToTools()">Utforska fler verktyg →</button>
          <div class="ctaf-sub">Fem AI-verktyg i Mava</div>
        </div>
      </div>
    </div>

    <div style="text-align:center;padding-bottom:2rem">
      <button class="reset-btn" onclick="resetForm()">← Gör en ny analys</button>
    </div>
  </div>
</div>

<script>
window.addEventListener('load', function(){
  const bg = document.getElementById('hero-bg');
  if(bg) setTimeout(()=>bg.classList.add('loaded'), 100);
});

const PROXY_URL='https://timrobin-proxy-production.up.railway.app/api/analyze';
const STORAGE_KEY='tr_last_result';
const SESSION_KEY='tr_authed';
const ACCESS_PASSWORD='timrobin2024';

/* ── Supabase ──────────────────────────────────────────────────────────── */
const SUPABASE_URL = 'https://hwiwuraghyseqfybtsww.supabase.co';
const SUPABASE_KEY = 'sb_publishable_StWrPh-MqD99VzG08d0IYg_7zVznUk1';
let _sb = null;
function sb() {
  if (!_sb && window.supabase) {
    _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'mava-auth'
      }
    });
  }
  return _sb;
}
let _currentUser = null;

/* ── safeFetch ─────────────────────────────────────────────────────────────
   Gemensam hämtfunktion för alla AI-anrop. Hanterar:
   - Timeout (45 s)
   - HTTP-felkoder med tydliga svenska meddelanden
   - Nätverksfel / proxy nere
   Kastar alltid ett Error med ett användarvänligt .message.
──────────────────────────────────────────────────────────────────────────── */
async function safeFetch(messages, timeoutMs = 80000, toolId = '') {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  // Bygg headers. X-Tool-Id talar om för proxyn vilket verktyg anropet kommer
  // från, så proxyn kan välja rätt modell enligt sin routningstabell.
  // Utan den faller proxyn tillbaka på sin default-modell.
  const headers = {
    'Content-Type': 'application/json',
    'X-Access-Password': ACCESS_PASSWORD
  };
  if (toolId) headers['X-Tool-Id'] = toolId;

  let res;
  try {
    res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ messages }),
      signal: controller.signal
    });
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') {
      throw new Error('Förfrågan tog för lång tid (>' + Math.round(timeoutMs/1000) + ' s). Försök igen – ibland är servern trög en kort stund.');
    }
    throw new Error('Kunde inte nå servern. Kontrollera din uppkoppling och försök igen.');
  }
  clearTimeout(timer);

  if (res.status === 401) throw new Error('Åtkomst nekad. Ladda om sidan och logga in igen.');
  if (res.status === 429) throw new Error('För många förfrågningar just nu. Vänta en stund och försök igen.');
  if (res.status >= 500) throw new Error('Servern svarade med ett fel (' + res.status + '). Försök igen om en liten stund.');
  if (!res.ok)           throw new Error('Oväntat svar från servern (' + res.status + '). Försök igen.');

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('Kunde inte tolka svaret från servern. Försök igen.');
  }

  return data;
}

/* ── showToolError ─────────────────────────────────────────────────────────
   Visar ett felmeddelande med retry-knapp i ett valfritt fel-element.
   retryFn = den funktion som ska köras om användaren klickar "Försök igen".
──────────────────────────────────────────────────────────────────────────── */
const _retryRegistry = {};
function showToolError(errElId, message, retryFn) {
  const el = document.getElementById(errElId);
  if (!el) return;
  let btnHTML = '';
  if (retryFn) {
    const key = errElId + '_retry';
    _retryRegistry[key] = retryFn;
    btnHTML = `<button onclick="_retryRegistry['${key}']()" style="margin-left:12px;padding:4px 12px;border-radius:6px;border:1px solid #FCA5A5;background:#fff;color:#991B1B;font-size:12px;cursor:pointer;font-weight:600">Försök igen</button>`;
  }
  el.innerHTML = '<span>' + message + '</span>' + btnHTML;
  el.style.display = 'block';
}

function goToLanding(){
  hideAll();
  document.getElementById('landing').style.display='block';
  updateSidePanel('landing');
  window.scrollTo({top:0,behavior:'smooth'});
}

function goToAbout(){
  document.getElementById('landing').style.display='none';
  document.getElementById('app').style.display='none';
  document.getElementById('about-page').style.display='block';
  document.body.classList.remove('app-mode');
  window.scrollTo(0,0);
}

function goToLogin(dest){
  const d = dest||'app';
  if(d==='native') goToNative();
  else if(d==='dist') goToDist();
  else if(d==='adcopy') goToAdCopy();
  else if(d==='newsroom') goToNewsroom();
  else if(d==='brief') goToBrief();
  else showApp();
}

function showApp(){
  hideAll();
  document.getElementById('app').style.display='block';
  updateSidePanel('app');
  applyBrandProfileToMarket();
  document.getElementById('result-section').style.display='none';
  document.getElementById('stream-preview').style.display='none';
  document.body.classList.add('app-mode');
  window.scrollTo(0,0);
  loadSaved();
}

sessionStorage.removeItem(SESSION_KEY);

const ps={};
const optSelections={};
const MULTI_GROUPS=['audience','history','challenge','goal','usp','competitors'];

document.querySelectorAll('.tag-btn').forEach(b=>{
  b.addEventListener('click',()=>{
    const g=b.dataset.g;
    if(MULTI_GROUPS.includes(g)){
      b.classList.toggle('on');
      optSelections[g]=Array.from(document.querySelectorAll(`.tag-btn[data-g="${g}"].on`)).map(x=>x.dataset.v);
    } else {
      document.querySelectorAll(`.tag-btn[data-g="${g}"]`).forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      ps[g]=b.dataset.v;
    }
  });
});

document.querySelectorAll('.opt-btn').forEach(b=>{
  b.addEventListener('click',()=>{
    const g=b.dataset.g;
    b.classList.toggle('on');
    optSelections[g]=Array.from(document.querySelectorAll(`.opt-btn[data-g="${g}"].on`)).map(x=>x.dataset.v);
  });
});
document.querySelectorAll('.cbi').forEach(item=>{
  const cb=item.querySelector('input');
  item.addEventListener('click',e=>{if(e.target!==cb)cb.checked=!cb.checked;item.classList.toggle('on',cb.checked);});
  cb.addEventListener('change',()=>item.classList.toggle('on',cb.checked));
});
function getChecked(id){
  return Array.from(document.querySelectorAll(`#${id} input:checked`)).map(c=>c.value).join(', ')||'Ej specificerat';
}
function getTagGroup(key){
  const vals=optSelections[key];
  return Array.isArray(vals)&&vals.length>0?vals.join(', '):'Ej specificerat';
}
function v(id){return document.getElementById(id).value.trim();}

function getField(key){
  const sel=optSelections[key];
  const selStr=Array.isArray(sel)&&sel.length>0?sel.join(', '):'';
  const free=v(key);
  if(selStr&&free) return selStr+' – '+free;
  return selStr||free||'Ej angiven';
}

function buildPrompt(){
  const season=ps['season']||'Ej angiven';
  const budget=ps['budget']||'Ej angiven';
  return `Du är en senior marknadsföringsstrateg från en hybridbyrå som kombinerar kompetens inom mediebyrå, produktionsbyrå och reklambyrå i ett och samma erbjudande.

Du arbetar integrerat med strategi, kreativ produktion, distribution, medieköp och optimering. Du har djup erfarenhet av performance marketing, programmatisk handel, medierådgivning, nyhetsmedia, innehållsdriven tillväxt, konverteringsgenerering och datadriven analys. Du ser aldrig kanal, budskap och genomförande som separata delar, utan som delar av samma system.

VIKTIGT OM MÅLGRUPPEN FÖR DIN ANALYS: Kunden är ofta en direktkund utan djup marknadsföringskompetens – en VD, grundare eller marknadsansvarig på ett mindre eller medelstort bolag. De ska kunna förstå och agera på din analys själva, ELLER ta den vidare till en byrå som genomför insatserna (t.ex. medieköp). Skriv därför så att en kompetent person UTAN marknadsföringsbakgrund förstår exakt vad och varför – utan jargong, utan att vara barnslig. Förklara resonemanget bakom varje råd, inte bara vad de ska göra.

VIKTIGT OM BUDGET: Var ärlig om vad budgeten faktiskt räcker till. Kalibrera dina rekommendationer realistiskt:
- Under 20 000 kr/mån: Fokusera på 1–2 kanaler max, organiskt och låginvesterande arbete, var tydlig att betald räckvidd är begränsad.
- 20 000–75 000 kr/mån: 2–3 kanaler, måttlig betald närvaro möjlig, prioritera hårt.
- 75 000–250 000 kr/mån: Flera kanaler parallellt, meningsfull betald volym, utrymme för test och optimering.
- Över 250 000 kr/mån: Full kanalmix möjlig, men ändå prioritera – mer pengar betyder inte att allt ska göras samtidigt.
Om budget är "Ej angiven", anta att kunden har en begränsad budget och var konservativ i dina rekommendationer.

Dina rekommendationer ska alltid vara konkreta och prioriterade, anpassade efter kundens bransch, storlek, resurser och mognadsnivå, förankrade i affärsmål (inte bara marknadsföringsaktiviteter) och realistiska att genomföra givet budgeten ovan.

Utgå från följande principer: alla kanaler passar inte alla verksamheter. Effekt skapas i samspelet mellan budskap, kanal, timing och uppföljning. Distribution är lika viktig som innehåll. Rätt positionering och tydligt erbjudande slår ofta högre budget. Mätbarhet, testning och iteration är avgörande.

När du analyserar kundens situation ska du: identifiera de 2–3 viktigaste problemen eller möjligheterna, prioritera vad som bör göras först, koppla varje rekommendation till både budskap, kanal och genomförande, skilja på kortsiktiga insatser och mer långsiktiga förbättringar när det är relevant samt ge tydliga, konkreta och affärsdrivna råd.

Anpassa alltid analysen efter den specifika kunden. Låt inte tidigare erfarenheter från vissa branscher styra rekommendationerna om kundens situation kräver något annat.

Undvik fluff, buzzwords och generiska råd som "starta ett nyhetsbrev" eller "optimera er Google-profil" om de inte är specifikt motiverade av just det här caset. Varje rekommendation och quick win ska vara så konkret att den känns skriven för just detta företag – inte något du skulle ge alla.

Var tydlig, skarp och lösningsorienterad. Svara på svenska.

Svara ENBART med ett JSON-objekt i exakt det format som beskrivs nedan – inga extra kommentarer eller text utanför JSON.

FÖRETAGSINFORMATION:
Företag: ${v('company')||'Okänt'}
Bransch: ${v('industry')||'Ej angiven'}
Vad de gör: ${v('description')}${v('website')?'\nWebbplats: '+v('website'):''}
Storlek: ${document.getElementById('company-size').value||'Ej angiven'}
Omsättning: ${document.getElementById('turnover').value||'Ej angiven'}
Säsongsvariationer: ${season}
Målgrupp: ${getTagGroup('audience')}${v('audience-extra')?' ('+v('audience-extra')+')':''}
Geografi: ${v('geography')||'Ej angiven'}
Utmaning: ${getField('challenge')}
Mål: ${getField('goal')}
Styrka/USP: ${getField('usp')}
Konkurrens: ${getField('competitors')}
Tidigare marknadsföring: ${getTagGroup('history')}
Budget: ${budget}

Svara med exakt detta JSON-format:
{
  "summary": "2–3 korta stycken som sammanfattar de viktigaste affärs- och marknadsproblemen samt den övergripande strategin. Separera stycken med tom rad (\\n\\n). Skriv begripligt för en person utan marknadsföringsbakgrund.",
  "prioritized_channels": [{"name":"Kanalnamn","priority":"Hög|Medium|Lägre","reason":"En mening om varför just denna kanal och hur den hänger ihop med övriga insatser, kalibrerad mot angiven budget"}],
  "recommendations": [{"title":"Kort rubrik","description":"Konkret, specifikt råd kopplat till budskap, kanal och exekvering (2–4 meningar). Förklara VARFÖR, inte bara VAD. Om rådet har flera delsteg, använd en punktlista där varje rad börjar med '- '."}],
  "quick_wins": ["Åtgärd 1 – specifik för detta företag","Åtgärd 2 – specifik för detta företag","Åtgärd 3 – specifik för detta företag"],
  "next_step": "En konkret nästa åtgärd de kan ta denna vecka",
  "agency_brief": "Ett kort stycke (3–5 meningar) skrivet som om det skickas direkt till en byrå som ska utföra arbetet – sammanfatta vad som ska göras, för vem, med vilken budget och vilket mål. Skriv professionellt och redo att klistras in i ett mejl."
}

Anpassa antalet kanaler och rekommendationer efter företagets situation, komplexitet och budget – minimum 2, maximum 6 av vardera. Ge inte fler än vad som är motiverat av caset. Håll varje råd konkret, integrerat och anpassat till just detta företag.${season!=='Ej angiven'&&season!=='Ingen tydlig säsong'?' Ta hänsyn till säsongsvariationerna i rekommendationerna.':''}`;
}

async function analyzeMarketing(){
  const btn=document.getElementById('analyze-btn');
  const errEl=document.getElementById('error-msg');
  errEl.style.display='none';
  if(!v('description')){errEl.textContent='Fyll i åtminstone en beskrivning av vad ni gör.';errEl.style.display='block';return;}
  btn.disabled=true;
  document.getElementById('form-section').style.display='none';
  document.getElementById('loading-state').style.display='block';
  try{
    const data = await safeFetch([{role:'user',content:buildPrompt()+brandGuidance()}], 80000, 'market-pulse');
    const raw=data.content.map(i=>i.text||'').join('');
    const cleaned=raw.replace(/```json|```/g,'').trim();
    const result=JSON.parse(cleaned);
    localStorage.setItem(STORAGE_KEY,JSON.stringify(result));
    window._marketResult = result;
    window._marketCompany = (document.getElementById('company') && document.getElementById('company').value) || '';
    document.getElementById('loading-state').style.display='none';
    renderResult(result);
  }catch(err){
    console.error('Analysis error:', err);
    document.getElementById('loading-state').style.display='none';
    document.getElementById('form-section').style.display='block';
    showToolError('error-msg', err.message, analyzeMarketing);
    btn.disabled=false;
  }
}

function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function pc(p){return p==='Hög'?'ph':p==='Medium'?'pm':'pl';}

function renderResult(r){
  const ic=['🎯','📣','✍️','🔗','📱','📈'];
  const ch=(r.prioritized_channels||[]).map(c=>`<div class="chcard"><div class="chn">${c.name}</div><div class="prio ${pc(c.priority)}">${c.priority}</div><div style="font-size:12px;color:#5F5E5A;margin-top:6px;line-height:1.5">${c.reason}</div></div>`).join('');
  const re=(r.recommendations||[]).map((rec,i)=>`<div style="padding:1rem 0;border-bottom:0.5px solid rgba(0,0,0,0.07)"><div style="font-size:14px;font-weight:600;margin-bottom:6px;display:flex;align-items:center;gap:8px"><span style="font-size:16px">${ic[i%ic.length]}</span><span style="color:#2C2520">${rec.title}</span></div><div class="mp-md" style="font-size:14px;line-height:1.7;color:#4A3F35">${mdToHtml(rec.description)}</div></div>`).join('');
  const qw=(r.quick_wins||[]).map(w=>`<div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;border-bottom:0.5px solid rgba(0,0,0,0.07)"><div style="width:20px;height:20px;background:var(--t50);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px"><svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" fill="none" stroke="#0F6E56" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span style="font-size:14px;line-height:1.6;color:#2C2520">${w}</span></div>`).join('');
  document.getElementById('result-content').innerHTML=`
    <div class="rc"><div class="rh"><div class="ri te">📋</div><div><h2>Er marknadsföringsstrategi</h2><p>Anpassad och handlingsbar</p></div></div><div class="mp-md" style="font-size:14px;line-height:1.75;background:#F9F8F6;border-radius:var(--rs);padding:1rem 1.25rem;border-left:3px solid #C9A84C;color:#2C2520">${mdToHtml(r.summary)}</div></div>
    <div class="rc"><div class="rh"><div class="ri te">📡</div><div><h2>Prioriterade kanaler</h2><p>Var ska ni fokusera era resurser?</p></div></div><div class="chgrid">${ch}</div></div>
    <div class="rc"><div class="rh"><div class="ri am">🎯</div><div><h2>Konkreta rekommendationer</h2><p>Så här gör ni det i praktiken</p></div></div><div>${re}</div></div>
    <div class="rc"><div class="rh"><div class="ri te">⚡</div><div><h2>Quick wins – gör nu</h2><p>Tre saker ni kan agera på direkt</p></div></div><div>${qw}</div></div>

    ${r.next_step?`<div style="background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:var(--r);padding:1.25rem 1.5rem;margin-bottom:1rem;display:flex;gap:1rem;align-items:flex-start"><div style="width:32px;height:32px;background:#2C2520;border-radius:var(--rs);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div><div><div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#C9A84C;margin-bottom:4px">Nästa steg denna vecka</div><div style="font-size:14px;line-height:1.6;color:#2C2520;font-weight:500">${r.next_step}</div></div></div>`:''}
    ${r.agency_brief?`<div class="rc"><div class="rh"><div class="ri am">📨</div><div><h2>Redo att skicka till en byrå</h2><p>Kopiera och klistra in i ett mejl</p></div></div><div style="font-size:14px;line-height:1.75;background:#F9F8F6;border-radius:var(--rs);padding:1rem 1.25rem;border-left:3px solid #2C2520;color:#2C2520;margin-bottom:0.75rem">${r.agency_brief}</div><button onclick="navigator.clipboard.writeText(${JSON.stringify(r.agency_brief)}).then(()=>{const b=document.createElement('div');b.style.cssText='position:fixed;bottom:24px;right:24px;background:#0a0a0a;color:#fff;padding:14px 20px;border-radius:8px;font-size:13px;z-index:9999';b.textContent='✓ Kopierat!';document.body.appendChild(b);setTimeout(()=>b.remove(),3000);})" style="background:none;border:1px solid rgba(0,0,0,0.12);border-radius:8px;padding:8px 16px;font-size:13px;font-weight:600;color:#2C2520;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:6px"><svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="4" width="8" height="8" rx="1.5"/><path d="M2 10V2h8"/></svg>Kopiera till byrå</button></div>`:''}`;
  document.getElementById('result-section').style.display='block';
  document.getElementById('result-section').scrollIntoView({behavior:'smooth',block:'start'});
  document.getElementById('clear-btn').style.display='block';
}

function loadSaved(){
  const s=localStorage.getItem(STORAGE_KEY);
  if(s){try{document.getElementById('saved-banner').style.display='flex';renderResult(JSON.parse(s));}catch{}}
}
function resetForm(){
  document.getElementById('result-section').style.display='none';
  document.getElementById('form-section').style.display='block';
  document.getElementById('analyze-btn').disabled=false;
  document.getElementById('saved-banner').style.display='none';
  window.scrollTo({top:0,behavior:'smooth'});
}

function downloadPDF(){
  // Öppna utskrift-dialogen – användaren kan spara som PDF
  window.print();
}

function emailResult(){
  document.getElementById('email-modal').classList.add('open');
}
function closeEmailModal(){
  document.getElementById('email-modal').classList.remove('open');
}
function sendEmail(){
  const email=document.getElementById('email-input').value.trim();
  if(!email||!email.includes('@')){alert('Ange en giltig e-postadress.');return;}
  // Mejlfunktionalitet ej implementerad – visas som placeholdersida
  document.getElementById('email-modal').classList.remove('open');
  const box=document.createElement('div');
  box.style.cssText='position:fixed;bottom:24px;right:24px;background:#0a0a0a;color:#fff;padding:14px 20px;border-radius:8px;font-size:13px;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,0.3)';
  box.textContent='✓ Mejlfunktionen kommer snart – tack för ditt intresse!';
  document.body.appendChild(box);
  setTimeout(()=>box.remove(),4000);
}


/* ─── MULTI-STEP FORM LOGIC ─── */
var formCur = 1;
function formGoTo(n){
  document.getElementById('fstep'+formCur).classList.remove('active');
  document.getElementById('fstep'+n).classList.add('active');
  for(var i=1;i<=4;i++){
    var d=document.getElementById('dot'+i);
    d.className='fp-dot';
    if(i<n){d.classList.add('done');}
    else if(i===n){d.classList.add('active');}
    else{d.classList.add('pending');}
  }
  formCur=n;
  if(n===4) updateFSummary();
  window.scrollTo(0,0);
}

document.addEventListener('click',function(e){
  var b=e.target.closest('.chip,.budget-card');
  if(!b) return;
  var g=b.dataset.g;
  var single=['season','budget'];
  if(single.indexOf(g)>-1){
    document.querySelectorAll('[data-g="'+g+'"]').forEach(function(x){x.classList.remove('on');});
    b.classList.add('on');
  } else {
    b.classList.toggle('on');
  }
  if(formCur===4) updateFSummary();
});

function getChipVals(g){
  return Array.from(document.querySelectorAll('[data-g="'+g+'"].on')).map(function(x){return x.dataset.v;}).join(', ');
}

function updateFSummary(){
  var rows=[
    {l:'Utmaningar', v:getChipVals('challenge')},
    {l:'Mål', v:getChipVals('goal')},
    {l:'Styrkor', v:getChipVals('usp')},
    {l:'Budget', v:getChipVals('budget')}
  ].filter(function(r){return r.v;});
  var box=document.getElementById('fstep-summary');
  var cont=document.getElementById('fstep-summary-rows');
  if(!box||!cont) return;
  if(rows.length===0){box.style.display='none';return;}
  box.style.display='block';
  cont.innerHTML=rows.map(function(r){
    return '<div class="fstep-summary-row"><span class="fstep-summary-dot"></span><span><strong style="font-weight:600">'+r.l+':</strong> '+r.v+'</span></div>';
  }).join('');
}

function clearAll(){
  // Rensa alla textfält och textareas
  document.querySelectorAll('input[type="text"],input[type="number"],textarea').forEach(function(el){el.value='';});
  // Återställ dropdowns
  document.querySelectorAll('select').forEach(function(el){el.selectedIndex=0;});
  // Avmarkera alla val-knappar
  document.querySelectorAll('.opt-btn,.tag-btn').forEach(function(el){el.classList.remove('on');});
  // Nollställ optSelections och ps
  Object.keys(optSelections).forEach(function(k){optSelections[k]=[];});
  Object.keys(ps).forEach(function(k){delete ps[k];});
  // Dölj resultat och rensa-knappen
  document.getElementById('result-section').style.display='none';
  document.getElementById('clear-btn').style.display='none';
  document.getElementById('error-msg').style.display='none';
  // Visa formuläret och återställ analysknappen
  document.getElementById('form-section').style.display='block';
  document.getElementById('analyze-btn').disabled=false;
  // Scrolla upp
  window.scrollTo({top:0,behavior:'smooth'});
}

function openContact(){window.open('mailto:hej@rtnorth.se?subject=Marknadsföringssamtal&body=Hej! Jag har använt ert analysverktyg och vill boka ett strategisamtal.','_blank');}

/* ── Typewriter ── */
(function(){
  var el = document.getElementById('typewriter-text');
  if(!el) return;
  var isMobile = window.innerWidth < 640;
  var full = isMobile
    ? 'Vet du var ditt\nföretag bör synas?'
    : 'Vet du var ditt företag\negentligen bör synas?';
  var i = 0;
  function tick(){
    if(i <= full.length){
      var part = full.slice(0, i);
      el.innerHTML = part.replace('\n', '<br>');
      i++;
      setTimeout(tick, i === 1 ? 600 : 45);
    } else {
      setTimeout(function(){
        var cur = document.querySelector('.tw-cursor');
        if(cur) cur.style.display = 'none';
      }, 2000);
    }
  }
  window.addEventListener('load', function(){ setTimeout(tick, 400); });
})();

/* ── Parallax ── */
(function(){
  var bg = document.getElementById('hero-bg');
  if(!bg) return;
  function onScroll(){
    var y = window.scrollY;
    bg.style.transform = 'translateY(' + (y * 0.12) + 'px)';
  }
  window.addEventListener('scroll', onScroll, {passive:true});
})();

/* ── Scroll reveal ── */
(function(){
  var items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  items.forEach(function(el){ obs.observe(el); });
})();



/* ══════════════════════════════════════════
   NATIVE AUTO REACH
══════════════════════════════════════════ */

const NATIVE_MEDIA = [
  // Schibsted
  {id:'sch-ab',   name:'Aftonbladet',             group:'Schibsted', reach:22000000, weight:220},
  {id:'sch-svd',  name:'Svenska Dagbladet',        group:'Schibsted', reach:4500000,  weight:45},
  {id:'sch-omni', name:'Omni',                     group:'Schibsted', reach:3000000,  weight:30},
  // Bonnier
  {id:'bon-dn',   name:'Dagens Nyheter',           group:'Bonnier',   reach:12000000, weight:120},
  {id:'bon-exp',  name:'Expressen',                group:'Bonnier',   reach:14000000, weight:140},
  {id:'bon-di',   name:'Dagens industri',          group:'Bonnier',   reach:4000000,  weight:40},
  {id:'bon-hd',   name:'Helsingborgs Dagblad',     group:'Bonnier',   reach:900000,   weight:9},
  {id:'bon-skt',  name:'Skånska Dagbladet',        group:'Bonnier',   reach:700000,   weight:7},
  // Stampen
  {id:'sta-gp',   name:'Göteborgs-Posten',         group:'Stampen',   reach:6000000,  weight:60},
  {id:'sta-bl',   name:'Bohusläningen',            group:'Stampen',   reach:700000,   weight:7},
  {id:'sta-ttela',name:'TTELA',                    group:'Stampen',   reach:500000,   weight:5},
  {id:'sta-hn',   name:'Hallands Nyheter',         group:'Stampen',   reach:600000,   weight:6},
  {id:'sta-hp',   name:'Hallandsposten',           group:'Stampen',   reach:500000,   weight:5},
  {id:'sta-at',   name:'Alingsås Tidning',         group:'Stampen',   reach:300000,   weight:3},
  {id:'sta-st',   name:'Strömstads Tidning',       group:'Stampen',   reach:200000,   weight:2},
  // NTM
  {id:'ntm-op',   name:'Östgöta Correspondenten',  group:'NTM',       reach:1200000,  weight:12},
  {id:'ntm-nt',   name:'Norrköpings Tidningar',    group:'NTM',       reach:900000,   weight:9},
  {id:'ntm-gd',   name:'Gefle Dagblad',            group:'NTM',       reach:800000,   weight:8},
  {id:'ntm-dt',   name:'Dalarnas Tidningar',       group:'NTM',       reach:700000,   weight:7},
  {id:'ntm-lt',   name:'Länstidningen Östersund',  group:'NTM',       reach:600000,   weight:6},
  {id:'ntm-fb',   name:'Folkbladet',               group:'NTM',       reach:500000,   weight:5},
];

function goToNative(){
  hideAll();
  document.getElementById('native-page').style.display='block';
  updateSidePanel('native-page');
  applyBrandProfileToNative();
  document.body.classList.add('native-mode');
  window.scrollTo(0,0);
  renderNativeMediaGrid();
}

function renderNativeMediaGrid(){
  const wrap = document.getElementById('native-media-grid');
  if(wrap.children.length) return;
  const groups = [...new Set(NATIVE_MEDIA.map(m=>m.group))];
  groups.forEach(g=>{
    const items = NATIVE_MEDIA.filter(m=>m.group===g);
    const block = document.createElement('div');
    block.style.cssText='border:1px solid rgba(0,0,0,0.1);border-radius:8px;overflow:hidden;margin-bottom:8px;background:#fff';
    const hdr = document.createElement('div');
    hdr.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:12px 14px;cursor:pointer;user-select:none;';
    hdr.innerHTML=`<div style="display:flex;align-items:center;gap:10px"><span style="font-size:14px;font-weight:600;color:#2C2520">${g}</span><span style="font-size:11px;color:#9A8570">${items.length} titlar</span></div><svg class="acc-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#9A8570" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.2s"><path d="M3 5l4 4 4-4"/></svg>`;
    const body = document.createElement('div');
    body.style.cssText='border-top:1px solid rgba(0,0,0,0.07);display:none';
    items.forEach((m,i)=>{
      const row = document.createElement('div');
      row.id='card-'+m.id;
      row.style.cssText='display:flex;align-items:center;justify-content:space-between;padding:10px 14px;cursor:pointer;border-bottom:'+(i<items.length-1?'1px solid rgba(0,0,0,0.06)':'none')+';transition:background 0.1s';
      row.innerHTML=`<div style="display:flex;align-items:center;gap:10px"><div id="check-${m.id}" style="width:16px;height:16px;border-radius:4px;border:1.5px solid rgba(0,0,0,0.2);flex-shrink:0;display:flex;align-items:center;justify-content:center"></div><span style="font-size:13px;font-weight:500;color:#2C2520">${m.name}</span></div><span style="font-size:12px;color:#9A8570">${(m.reach/1000000).toFixed(1)}M sv/mån</span>`;
      row.onmouseenter=()=>{if(!row.classList.contains('sel'))row.style.background='rgba(0,0,0,0.02)'};
      row.onmouseleave=()=>{row.style.background=row.classList.contains('sel')?'rgba(201,168,76,0.05)':''};
      row.onclick=()=>toggleNativeMedia(m.id);
      body.appendChild(row);
    });
    hdr.onclick=()=>{
      const open=body.style.display==='block';
      body.style.display=open?'none':'block';
      hdr.querySelector('.acc-arrow').style.transform=open?'':'rotate(180deg)';
    };
    block.appendChild(hdr);
    block.appendChild(body);
    wrap.appendChild(block);
  });
}


function toggleNativeMedia(id){
  const row = document.getElementById('card-'+id);
  const chk = document.getElementById('check-'+id);
  const active = row.classList.toggle('sel');
  row.style.background = active?'rgba(201,168,76,0.05)':'';
  chk.style.background = active?'#C9A84C':'';
  chk.style.borderColor = active?'#C9A84C':'rgba(0,0,0,0.2)';
  chk.innerHTML = active?'<svg width="9" height="9" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>':'';
}

function getSelectedMedia(){
  return NATIVE_MEDIA.filter(m=>document.getElementById('card-'+m.id)?.classList.contains('sel'));
}

function calcBudgetDist(selected, totalBudget){
  const totalWeight = selected.reduce((s,m)=>s+m.weight,0);
  return selected.map(m=>({
    name: m.name,
    group: m.group,
    amount: Math.round((m.weight/totalWeight)*totalBudget/100)*100,
    pct: Math.round((m.weight/totalWeight)*100)
  }));
}

function renderBudgetDist(dist, totalBudget){
  const wrap = document.getElementById('native-budget-dist');
  const rows = document.getElementById('native-budget-rows');
  if(!dist.length){wrap.style.display='none';return;}
  wrap.style.display='block';
  rows.innerHTML = dist.map(d=>`
    <div class="native-budget-row">
      <span>${d.name}</span>
      <div style="display:flex;align-items:center;gap:8px;flex:1;margin-left:12px">
        <div class="native-budget-bar-wrap"><div class="native-budget-bar" style="width:${d.pct}%"></div></div>
        <span style="font-size:12px;color:#9A8570;white-space:nowrap">${d.pct}%</span>
      </div>
      <span style="font-weight:600;white-space:nowrap">${d.amount.toLocaleString('sv-SE')} kr</span>
    </div>
  `).join('');
}

/* Artikeltyp för Native. Styr vinkel och stil i prompten.
   Hjälptexterna är korta beskrivningar som visas under knapparna. */
let _nativeType = 'Guide';
const NATIVE_TYPE_HINTS = {
  'Kundcase': 'Utgår från en person, ett företag eller en situation. Visar värdet genom ett verkligt exempel.',
  'Guide': 'Praktiska råd och konkreta steg. Företaget är en trovärdig hjälpare, inte hela berättelsen.',
  'Expertartikel': 'Bygger på expertkunskap och förklaringar. Håll det tillgängligt och konkret.',
  'Erbjudande': 'Gör erbjudandet tydligt, men bygg sammanhang och läsarvärde innan du säljer.',
  'Event': 'Tydligt vad, var, när, för vem – och varför läsaren ska bry sig.',
  'Varumärkesberättelse': 'Fokus på människor, syfte, bakgrund, hantverk och vad som gör företaget relevant.',
  'Lokal artikel': 'Plats, närområde och lokal relevans står i centrum för berättelsen.'
};
function nativeSelectType(btn, type){
  _nativeType = type;
  document.querySelectorAll('#native-type-grid .native-type-btn').forEach(function(b){ b.classList.remove('on'); });
  btn.classList.add('on');
  const hint = document.getElementById('native-type-hint');
  if (hint) hint.textContent = NATIVE_TYPE_HINTS[type] || '';
}

async function generateNative(){
  const company   = document.getElementById('n-company').value.trim();
  const industry  = document.getElementById('n-industry').value.trim();
  const website   = document.getElementById('n-website').value.trim();
  const campaign  = document.getElementById('n-campaign').value.trim();
  const purpose   = document.getElementById('n-purpose').value.trim();
  const audience  = document.getElementById('n-audience').value.trim();
  const quote     = document.getElementById('n-quote').value.trim();
  const cta       = document.getElementById('n-cta').value.trim();
  const budgetRaw = document.getElementById('n-budget').value.trim();
  const errEl     = document.getElementById('native-error');
  errEl.style.display='none';

  if(!company||!industry||!campaign||!purpose||!audience||!cta){
    errEl.textContent='Fyll i alla obligatoriska fält (markerade med *).';
    errEl.style.display='block';
    return;
  }
  if(!budgetRaw||isNaN(Number(budgetRaw))||Number(budgetRaw)<=0){
    errEl.textContent='Ange en giltig budget.';
    errEl.style.display='block';
    return;
  }
  const budget = Number(budgetRaw);

  document.getElementById('native-btn').disabled=true;
  document.getElementById('native-form-section').style.display='none';
  document.getElementById('native-loading').style.display='block';

  const systemPrompt = `Du är en erfaren svensk native-redaktör, kommersiell journalist och copywriter som är specialiserad på att skriva nativeartiklar av hög kvalitet för publicering i svenska lokala, regionala och nationella medier.

Ditt uppdrag är att skapa en trovärdig, engagerande och välstrukturerad nativeartikel på svenska. Artikeln ska kännas redaktionell, användbar och relevant för läsaren, samtidigt som den tydligt stödjer annonsörens kommunikationsmål. Den ska INTE kännas som en traditionell annons, ett produktblad eller ett pressmeddelande.

ARTIKELTYP: ${_nativeType}
Anpassa vinkel och stil efter artikeltypen enligt följande:
- Kundcase: utgå från en person, ett företag eller en situation och visa värdet genom ett verkligt exempel.
- Guide: fokusera på praktiska råd och konkreta steg. Företaget ska kännas som en trovärdig hjälpare, inte hela historien.
- Expertartikel: använd expertkunskap, förklaringar och råd. Håll det tillgängligt och konkret.
- Erbjudande: gör erbjudandet tydligt, men bygg sammanhang och läsarvärde innan du säljer.
- Event: ta tydligt med vad, var, när, vem det är för och varför läsaren ska bry sig.
- Varumärkesberättelse: fokusera på människor, syfte, bakgrund, hantverk, värderingar och vad som gör företaget relevant.
- Lokal artikel: gör plats, närområde och lokal relevans central i berättelsen.

VÄLJ EN TYDLIG REDAKTIONELL VINKEL innan du skriver. Artikeln ska byggas kring en enda läsarorienterad idé (t.ex. en nyttoguide, en lokal relevans, ett kundexempel, ett expertråd eller en säsongsvinkel). Välj aldrig en vinkel som inte stöds av underlaget.

TON OCH STIL:
- Skriv på flytande, naturlig svenska i en redaktionell, varm, tydlig och trovärdig ton – som en välskriven redaktionell text.
- Börja med läsaren, inte med annonsören. Använd en tydlig hook tidigt.
- Förklara varför ämnet är relevant nu.
- Var konkret: fakta, exempel och relevanta detaljer slår vaga påståenden.
- Undvik reklamspråk, tomma modeord, uppblåsta påståenden, upprepning av företagsnamnet och för många adjektiv.
- Integrera eventuella citat organiskt i texten – inte som ett separat block. Du får putsa citat lätt för tydlighet, men ändra aldrig deras innebörd.
- Avsluta med ett naturligt nästa steg (call to action) som matchar kampanjens syfte, utan att bli påträngande.

FAKTAREGEL (mycket viktig): Hitta ALDRIG på fakta. Uppfinn aldrig statistik, priser, datum, platser, personer, citat, utmärkelser, certifieringar, kundresultat, partnerskap eller miljö- och hållbarhetspåståenden. Använd endast information som tydligt stöds av underlaget. Om en viktig uppgift saknas, använd hakparentes som [datum saknas] eller [ort saknas] så att användaren kan komplettera.

STRUKTUR:
- Rubrik: specifik, engagerande och lätt att förstå. Skapa nyfikenhet utan clickbait.
- Ingress: cirka 25–35 ord (max ca 190 tecken exkl. mellanslag) som sammanfattar vinkeln och ger läsaren en anledning att läsa vidare.
- Brödtext: tydligt redaktionellt flöde. Inledning (läsarens problem, situation eller möjlighet), mitten (förklaring, nytta, konkreta detaljer och ev. citat), avslutning (naturlig slutsats och call to action).
- Använd korta till medellånga stycken så texten är lätt att skumma på mobil.
- Använd ALDRIG strukturetiketter som "Ingress:", "Brödtext:" eller "Rubrik:" inuti texten – den ska flöda som en artikel.

Principen är: läsaren ska känna att de läser en intressant artikel, och i slutet inse att de också fått veta något viktigt om ett företag. Sälj utan att sälja.

Svara ENBART med ett JSON-objekt i exakt detta format – ingen text utanför JSON:
{
  "headline": "Artikelns rubrik",
  "ingress": "Ingressen, max 190 tecken exkl mellanslag",
  "body": "Brödtexten, ca 2000–2500 tecken exkl mellanslag. Använd \\n\\n för styckeindelning."
}`;

  const userPrompt = `Skriv en nativeartikel baserad på följande information:

Artikeltyp: ${_nativeType}
Företag: ${company}
Bransch: ${industry}${website ? '\nWebbplats: '+website : ''}
Kampanjbeskrivning: ${campaign}
Syfte: ${purpose}
Målgrupp: ${audience}${quote ? '\nCitat från företaget: '+quote : ''}
Call to action: ${cta}
Total kampanjbudget: ${budget.toLocaleString('sv-SE')} kr`;

  try {
    const data = await safeFetch([{role:'user',content:systemPrompt+'\n\n'+userPrompt+brandGuidance()}], 80000, 'native');
    const raw = (data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('');
    const clean = raw.replace(/```json|```/g,'').trim();
    const article = JSON.parse(clean);

    window._nativeCompany = company;
    article.article_type = _nativeType;
    renderNativeArticle(article);

    document.getElementById('native-loading').style.display='none';
    document.getElementById('native-result').style.display='block';
    window.scrollTo({top:0,behavior:'smooth'});

  } catch(e){
    document.getElementById('native-loading').style.display='none';
    document.getElementById('native-form-section').style.display='block';
    document.getElementById('native-btn').disabled=false;
    showToolError('native-error', e.message, generateNative);
  }
}

function renderNativeArticle(article, label) {
  document.getElementById('native-result-headline').textContent = article.headline||'';
  document.getElementById('native-result-ingress').textContent  = article.ingress||'';
  document.getElementById('native-result-body').innerHTML       = mdToHtml(article.body);
  window._nativeArticle = article;
}

function nativeCopy(){
  const a = window._nativeArticle;
  if(!a) return;
  const text = a.headline+'\n\n'+a.ingress+'\n\n'+a.body;
  navigator.clipboard.writeText(text).then(()=>alert('Artikeln kopierad!'));
}

function nativeDownload(){
  const a = window._nativeArticle;
  if(!a) return;
  const text = a.headline+'\n\n'+a.ingress+'\n\n'+a.body;
  const blob = new Blob([text],{type:'text/plain;charset=utf-8'});
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href=url; link.download='nativeartikel.txt'; link.click();
  URL.revokeObjectURL(url);
}

function nativeSendByEmail(){
  const a = window._nativeArticle;
  const c = window._nativeCompany||'';
  if(!a) return;
  const subject = encodeURIComponent('Nativeartikel – '+c);
  const body = encodeURIComponent(
    'Rubrik:\n'+a.headline+'\n\nIngress:\n'+a.ingress+'\n\nBrödtext:\n'+a.body
  );
  window.location.href='mailto:?subject='+subject+'&body='+body;
}

function nativeReset(){
  document.getElementById('native-result').style.display='none';
  document.getElementById('native-form-section').style.display='block';
  document.getElementById('native-btn').disabled=false;
  window.scrollTo(0,0);
}



/* ══════════════════════════════════════════
   TOOLS HUB + NAVIGATION
══════════════════════════════════════════ */

const ALL_PAGES = ['landing','auth-page','library-page','brand-page','plan-page','billing-page','native-page','app','dist-page','adcopy-page','newsroom-page','brief-page','tools-page'];

function hideAll(){
  ALL_PAGES.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.style.display='none';
  });
  document.body.classList.remove('app-mode','native-mode','dist-mode','adcopy-mode','newsroom-mode','brief-mode');
}

function goToTools(){
  hideAll();
  document.getElementById('tools-page').style.display='block';
  setActivePanelLink('tools-page');
  window.scrollTo(0,0);
}

/* ── Auth ──────────────────────────────────────────────────────────────── */
let _authMode = 'login';

function goToAuth(){
  hideAll();
  document.getElementById('auth-page').style.display='block';
  _authMode = 'login';
  authRenderMode();
  window.scrollTo(0,0);
}

function authRenderMode(){
  const login = _authMode === 'login';
  document.getElementById('auth-title').textContent = login ? 'Logga in' : 'Skapa konto';
  document.getElementById('auth-sub').textContent = login ? 'Välkommen tillbaka till Mava' : 'Kom igång med Mava';
  document.getElementById('auth-submit').textContent = login ? 'Logga in' : 'Skapa konto';
  document.getElementById('auth-toggle-text').textContent = login ? 'Har du inget konto?' : 'Har du redan ett konto?';
  document.getElementById('auth-toggle-btn').textContent = login ? 'Skapa konto' : 'Logga in';
  document.getElementById('auth-password').setAttribute('autocomplete', login ? 'current-password' : 'new-password');
  authClearMsg();
}

function authToggleMode(){
  _authMode = _authMode === 'login' ? 'signup' : 'login';
  authRenderMode();
}

function authClearMsg(){
  document.getElementById('auth-error').style.display='none';
  document.getElementById('auth-success').style.display='none';
}

function authShowError(msg){
  const el = document.getElementById('auth-error');
  el.textContent = msg;
  el.style.display='block';
  document.getElementById('auth-success').style.display='none';
}

function authShowSuccess(msg){
  const el = document.getElementById('auth-success');
  el.textContent = msg;
  el.style.display='block';
  document.getElementById('auth-error').style.display='none';
}

async function authSubmit(){
  authClearMsg();
  const email = document.getElementById('auth-email').value.trim();
  const password = document.getElementById('auth-password').value;
  const btn = document.getElementById('auth-submit');

  if (!email) { authShowError('Fyll i din e-postadress.'); return; }
  if (!password || password.length < 6) { authShowError('Lösenordet måste vara minst 6 tecken.'); return; }
  if (!sb()) { authShowError('Kunde inte ansluta till servern. Ladda om sidan och försök igen.'); return; }

  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = _authMode === 'login' ? 'Loggar in...' : 'Skapar konto...';

  try {
    if (_authMode === 'signup') {
      const { data, error } = await sb().auth.signUp({ email, password });
      if (error) throw error;
      if (data.user && !data.session) {
        authShowSuccess('Konto skapat. Kolla din e-post för att bekräfta adressen, logga sedan in.');
        _authMode = 'login';
        authRenderMode();
      } else {
        _currentUser = data.user;
        onAuthChanged();
      }
    } else {
      const { data, error } = await sb().auth.signInWithPassword({ email, password });
      if (error) throw error;
      _currentUser = data.user;
      onAuthChanged();
    }
  } catch (e) {
    let msg = e.message || 'Något gick fel. Försök igen.';
    if (/invalid login credentials/i.test(msg)) msg = 'Fel e-post eller lösenord.';
    else if (/already registered|already been registered/i.test(msg)) msg = 'Det finns redan ett konto med den e-posten. Logga in i stället.';
    else if (/email not confirmed/i.test(msg)) msg = 'Bekräfta din e-postadress först – kolla din inkorg.';
    authShowError(msg);
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

async function authLogout(){
  if (sb()) await sb().auth.signOut();
  _currentUser = null;
  onAuthChanged();
  goToLanding();
}

function onAuthChanged(){
  const authed = !!_currentUser;
  document.querySelectorAll('.auth-when-in').forEach(function(el){ el.style.display = authed ? '' : 'none'; });
  document.querySelectorAll('.auth-when-out').forEach(function(el){ el.style.display = authed ? 'none' : ''; });
  updateSidePanel();
  if (authed) {
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
    goToTools();
  }
}

let _authInited = false;
async function authInit(){
  if (_authInited) return;
  _authInited = true;
  if (!sb()) return;
  const { data } = await sb().auth.getSession();
  _currentUser = (data && data.session) ? data.session.user : null;
  onAuthChanged();
  sb().auth.onAuthStateChange(function(_event, session){
    _currentUser = session ? session.user : null;
    document.querySelectorAll('.auth-when-in').forEach(function(el){ el.style.display = _currentUser ? '' : 'none'; });
    document.querySelectorAll('.auth-when-out').forEach(function(el){ el.style.display = _currentUser ? 'none' : ''; });
    updateSidePanel();
  });
}
window.addEventListener('load', function(){ setTimeout(authInit, 300); });

/* ── Bibliotek ─────────────────────────────────────────────────────────── */

// Sparar en produktion. tool = t.ex. 'brief', title = namn, content = hela resultatobjektet.
async function saveProduction(tool, title, content) {
  if (!_currentUser) { goToAuth(); return { error: 'not-logged-in' }; }
  const { data, error } = await sb().from('productions').insert({
    user_id: _currentUser.id,
    tool: tool,
    title: title,
    content: content
  }).select().single();
  return { data, error };
}

// Hämtar alla produktioner för den inloggade användaren, nyast först.
async function fetchProductions() {
  if (!_currentUser) return { data: [], error: 'not-logged-in' };
  const { data, error } = await sb().from('productions')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data || [], error };
}

async function deleteProduction(id) {
  const { error } = await sb().from('productions').delete().eq('id', id);
  return { error };
}

async function renameProduction(id, newTitle) {
  const { error } = await sb().from('productions').update({ title: newTitle }).eq('id', id);
  return { error };
}

// Sparar The Brief-resultatet från resultatvyn.
async function briefSave() {
  const r = window._briefResult;
  if (!r) return;
  if (!_currentUser) { goToAuth(); return; }
  const btn = document.getElementById('brief-save-btn');
  const suggested = r.campaign_name || (window._briefCompany || 'Brief');
  const title = prompt('Namnge din brief:', suggested);
  if (title === null) return; // avbröt
  if (btn) { btn.disabled = true; btn.textContent = 'Sparar...'; }
  const { error } = await saveProduction('brief', title.trim() || suggested, r);
  if (btn) { btn.disabled = false; btn.innerHTML = '✓ Sparad'; setTimeout(function(){ btn.textContent = 'Spara i bibliotek'; }, 2000); }
  if (error) alert('Kunde inte spara: ' + (error.message || error));
}

// AI-hjälp: skickar den befintliga briefen tillbaka till AI:n med instruktion
// att göra den skarpare, och ritar upp det förbättrade resultatet.
async function briefImprove() {
  const r = window._briefResult;
  if (!r) return;
  const btn = document.getElementById('brief-improve-btn');
  if (btn) { btn.disabled = true; btn.dataset.orig = btn.textContent; btn.textContent = 'Förbättrar...'; }

  // Vi ger AI:n den nuvarande briefen (som JSON-text) och ber om en skarpare version
  // i EXAKT samma struktur, så renderBriefResult kan rita den utan ändringar.
  const prompt = 'Du är en senior marknadsstrateg. Nedan är en befintlig kampanjbrief i JSON-format. ' +
    'Din uppgift är att göra den SKARPARE utan att ändra dess struktur:\n' +
    '- Gör språket mer konkret och direkt. Ta bort svammel, klichéer och tomma superlativ.\n' +
    '- Gör målen och KPI:erna mer specifika och mätbara om de är vaga.\n' +
    '- Skärp budskapet och kanalmotiveringarna. Behåll allt som redan är bra.\n' +
    '- Ändra INTE budgetsummorna eller kampanjperioden.\n' +
    '- Behåll exakt samma JSON-fält och struktur som i originalet.\n\n' +
    'BEFINTLIG BRIEF:\n' + JSON.stringify(r) + '\n\n' +
    'Returnera ENBART det förbättrade JSON-objektet med exakt samma fält och struktur. Ingen text runt omkring, korrekt escapead så det går att parsa.';

  try {
    const data = await safeFetch([{ role: 'user', content: prompt }], 80000, 'the-brief');
    const raw  = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const improved = JSON.parse(clean);

    // Rita om med samma render-funktion. Behåll etikett/företag från förra gången.
    const label = document.getElementById('br-result-label').textContent || '';
    renderBriefResult(improved, label, window._briefCompany || '');

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '✓ Förbättrad';
      setTimeout(function(){ btn.textContent = btn.dataset.orig || 'Gör skarpare med AI'; }, 2000);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {
    if (btn) { btn.disabled = false; btn.textContent = btn.dataset.orig || 'Gör skarpare med AI'; }
    alert('Kunde inte förbättra briefen just nu. Försök igen.');
  }
}

// Generell spara-hjälpare så vi slipper upprepa samma kod för varje verktyg.
// tool = verktygs-id, result = resultatobjektet, defaultTitle = förslag på namn, btnId = knappens id.
async function saveToolResult(tool, result, defaultTitle, btnId) {
  if (!result) return;
  if (!_currentUser) { goToAuth(); return; }
  const btn = btnId ? document.getElementById(btnId) : null;
  const title = prompt('Namnge och spara i biblioteket:', defaultTitle);
  if (title === null) return;
  if (btn) { btn.disabled = true; btn.dataset.orig = btn.textContent; btn.textContent = 'Sparar...'; }
  const { error } = await saveProduction(tool, title.trim() || defaultTitle, result);
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '✓ Sparad';
    const orig = btn.dataset.orig || 'Spara i bibliotek';
    setTimeout(function(){ btn.textContent = orig; }, 2000);
  }
  if (error) alert('Kunde inte spara: ' + (error.message || error));
}

function marketSave() {
  const r = window._marketResult;
  saveToolResult('market-pulse', r, (window._marketCompany || 'Analys') + ' – Market Pulse', 'market-save-btn');
}

function newsroomSave() {
  const r = window._newsroomResult;
  saveToolResult('newsroom', r, (r && r.headline) || 'Pressrelease', 'newsroom-save-btn');
}

function nativeSave() {
  const a = window._nativeArticle;
  saveToolResult('native', a, (a && a.title) || (window._nativeCompany || 'Nativeartikel'), 'native-save-btn');
}

let _libraryItems = [];
let _libraryFilter = 'all';

async function goToLibrary() {
  if (!_currentUser) { goToAuth(); return; }
  hideAll();
  document.getElementById('library-page').style.display = 'block';
  setActivePanelLink('library-page');
  window.scrollTo(0,0);
  document.getElementById('library-list').innerHTML = '<div style="text-align:center;color:#9A8570;padding:3rem">Laddar...</div>';
  const { data, error } = await fetchProductions();
  if (error) {
    document.getElementById('library-list').innerHTML = '<div style="text-align:center;color:#A32D2D;padding:3rem">Kunde inte ladda biblioteket.</div>';
    return;
  }
  _libraryItems = data;
  renderLibrary();
}

const TOOL_LABELS = { brief:'The Brief', newsroom:'Newsroom', 'market-pulse':'Market Pulse', native:'Native Auto Reach', adstudio:'AdStudio' };

function libraryFilter(tool) {
  _libraryFilter = tool;
  document.querySelectorAll('.lib-filter').forEach(function(el){
    el.classList.toggle('active', el.getAttribute('data-filter') === tool);
  });
  renderLibrary();
}

function librarySearch() {
  renderLibrary();
}

function renderLibrary() {
  const search = (document.getElementById('library-search').value || '').toLowerCase();
  const list = document.getElementById('library-list');
  let items = _libraryItems;
  if (_libraryFilter !== 'all') items = items.filter(function(it){ return it.tool === _libraryFilter; });
  if (search) items = items.filter(function(it){ return (it.title || '').toLowerCase().indexOf(search) > -1; });

  if (items.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:#9A8570;padding:3rem;font-size:14px">Inga sparade produktioner än. Skapa något i ett verktyg och tryck "Spara i bibliotek".</div>';
    return;
  }

  list.innerHTML = items.map(function(it){
    const date = new Date(it.created_at).toLocaleDateString('sv-SE', { year:'numeric', month:'short', day:'numeric' });
    const label = TOOL_LABELS[it.tool] || it.tool;
    return '<div class="lib-card">' +
      '<div style="flex:1;min-width:0">' +
        '<div class="lib-card-tool">' + label + '</div>' +
        '<div class="lib-card-title">' + escapeHtmlLib(it.title) + '</div>' +
        '<div class="lib-card-date">' + date + '</div>' +
      '</div>' +
      '<div class="lib-card-actions">' +
        '<button onclick="libraryOpen(\'' + it.id + '\')" class="lib-btn lib-btn-open">Öppna</button>' +
        '<button onclick="libraryRename(\'' + it.id + '\')" class="lib-btn">Byt namn</button>' +
        '<button onclick="libraryDelete(\'' + it.id + '\')" class="lib-btn lib-btn-del">Radera</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function escapeHtmlLib(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function libraryOpen(id) {
  const item = _libraryItems.find(function(it){ return it.id === id; });
  if (!item) return;
  const savedLabel = 'Sparad · ' + new Date(item.created_at).toLocaleDateString('sv-SE');

  if (item.tool === 'brief') {
    goToBrief();
    document.getElementById('brief-form-section').style.display = 'none';
    renderBriefResult(item.content, savedLabel, '');
    document.getElementById('brief-result').style.display = 'block';
    window.scrollTo(0,0);

  } else if (item.tool === 'market-pulse') {
    showApp();
    document.getElementById('form-section').style.display = 'none';
    renderResult(item.content);

  } else if (item.tool === 'newsroom') {
    goToNewsroom();
    document.getElementById('newsroom-form-section').style.display = 'none';
    renderNewsroomResult(item.content, savedLabel);
    document.getElementById('newsroom-result').style.display = 'block';
    window.scrollTo(0,0);

  } else if (item.tool === 'native') {
    goToNative();
    document.getElementById('native-form-section').style.display = 'none';
    renderNativeArticle(item.content, savedLabel);
    document.getElementById('native-result').style.display = 'block';
    window.scrollTo(0,0);

  } else {
    alert('Öppning för det här verktyget är inte inkopplat än.');
  }
}

async function libraryRename(id) {
  const item = _libraryItems.find(function(it){ return it.id === id; });
  if (!item) return;
  const newTitle = prompt('Nytt namn:', item.title);
  if (newTitle === null || !newTitle.trim()) return;
  const { error } = await renameProduction(id, newTitle.trim());
  if (error) { alert('Kunde inte byta namn.'); return; }
  item.title = newTitle.trim();
  renderLibrary();
}

async function libraryDelete(id) {
  if (!confirm('Radera den här produktionen? Det går inte att ångra.')) return;
  const { error } = await deleteProduction(id);
  if (error) { alert('Kunde inte radera.'); return; }
  _libraryItems = _libraryItems.filter(function(it){ return it.id !== id; });
  renderLibrary();
}

/* ── Varumärkesprofil ──────────────────────────────────────────────────── */
let _brandProfile = null;

// Hämtar användarens profil från databasen (om den finns).
async function fetchBrandProfile() {
  if (!_currentUser) return null;
  // maybeSingle() returnerar en rad ELLER null utan att kasta fel om raden saknas
  const { data, error } = await sb().from('brand_profiles')
    .select('*')
    .eq('user_id', _currentUser.id)
    .maybeSingle();
  if (error) { console.log('Profil-hämtning fel:', error); return null; }
  _brandProfile = data;
  return data;
}

async function goToBrandProfile() {
  if (!_currentUser) { goToAuth(); return; }
  hideAll();
  document.getElementById('brand-page').style.display = 'block';
  setActivePanelLink('brand-page');
  window.scrollTo(0,0);
  const p = await fetchBrandProfile();
  document.getElementById('brand-company').value     = (p && p.company) || '';
  document.getElementById('brand-industry').value    = (p && p.industry) || '';
  document.getElementById('brand-description').value = (p && p.description) || '';
  document.getElementById('brand-tone').value        = (p && p.tone) || '';
  document.getElementById('brand-website').value       = (p && p.website) || '';
  document.getElementById('brand-contact-email').value = (p && p.contact_email) || '';
  document.getElementById('brand-contact-phone').value = (p && p.contact_phone) || '';
  document.getElementById('brand-audience').value = (p && p.default_audience) || '';
  document.getElementById('brand-products').value = (p && p.products_services) || '';
  document.getElementById('brand-messages').value = (p && p.key_messages) || '';
  document.getElementById('brand-geo').value = (p && p.geo_area) || '';
  document.getElementById('brand-avoid').value = (p && p.avoid_words) || '';
  // key_people kommer som en lista (array). Rita en rad per person.
  const people = (p && Array.isArray(p.key_people)) ? p.key_people : [];
  renderBrandPeople(people);
  // Annonsstil + accentfärg
  brandSelectStyle((p && p.ad_style) || 'overlay');
  const color = (p && p.ad_color) || '#C9A84C';
  document.getElementById('brand-color').value = color;
  document.getElementById('brand-color-hex').textContent = color.toUpperCase();
}

// Ritar upp person-raderna utifrån en lista. Varje rad har namn + roll + ta bort-knapp.
function renderBrandPeople(people) {
  const list = document.getElementById('brand-people-list');
  list.innerHTML = '';
  if (!people || people.length === 0) { return; }
  people.forEach(function(person){ addBrandPersonRow(person.name || '', person.role || ''); });
}

// Lägger till en tom person-rad (anropas av "+ Lägg till person"-knappen).
function brandAddPerson() {
  addBrandPersonRow('', '');
}

function addBrandPersonRow(name, role) {
  const list = document.getElementById('brand-people-list');
  const row = document.createElement('div');
  row.className = 'brand-person-row';
  row.style.cssText = 'display:flex;gap:8px;margin-bottom:8px;align-items:center';
  row.innerHTML =
    '<input type="text" class="bp-name" value="' + escapeHtmlLib(name) + '" placeholder="Namn" style="flex:1;padding:9px 12px;border:1px solid #e0dcd3;border-radius:8px;font-size:13px;font-family:inherit;box-sizing:border-box">' +
    '<input type="text" class="bp-role" value="' + escapeHtmlLib(role) + '" placeholder="Roll" style="flex:1;padding:9px 12px;border:1px solid #e0dcd3;border-radius:8px;font-size:13px;font-family:inherit;box-sizing:border-box">' +
    '<button type="button" onclick="this.parentElement.remove()" style="background:#F5F3EE;border:1px solid #e0dcd3;color:#A32D2D;width:34px;height:34px;border-radius:8px;cursor:pointer;font-size:16px;flex-shrink:0" title="Ta bort">×</button>';
  list.appendChild(row);
}

// Läser av alla person-rader och bygger ihop dem till en lista igen.
function collectBrandPeople() {
  const rows = document.querySelectorAll('#brand-people-list .brand-person-row');
  const people = [];
  rows.forEach(function(row){
    const name = row.querySelector('.bp-name').value.trim();
    const role = row.querySelector('.bp-role').value.trim();
    if (name || role) people.push({ name: name, role: role });
  });
  return people;
}

// Håller reda på vilken annonsstil kunden valt (overlay/band/split).
let _brandAdStyle = 'overlay';

// Markerar den valda stilrutan och kommer ihåg valet.
function brandSelectStyle(style) {
  _brandAdStyle = style;
  document.querySelectorAll('#brand-style-grid .brand-style-opt').forEach(function(el){
    const selected = el.getAttribute('data-style') === style;
    el.style.borderColor = selected ? '#C9A84C' : '#e0dcd3';
    el.style.background = selected ? 'rgba(201,168,76,0.06)' : 'transparent';
  });
}

// Uppdaterar hex-texten bredvid färgväljaren.
function brandUpdateColorPreview() {
  const val = document.getElementById('brand-color').value;
  document.getElementById('brand-color-hex').textContent = val.toUpperCase();
}

/* ── Sidopanel ─────────────────────────────────────────────────────────── */
let _panelExpanded = false;

function toggleSidePanel() {
  _panelExpanded = !_panelExpanded;
  applyPanelState();
  // Kom ihåg valet till nästa besök. try/catch ifall localStorage är blockerat.
  try { localStorage.setItem('mava-panel', _panelExpanded ? '1' : '0'); } catch(e){}
}

function applyPanelState() {
  const panel = document.getElementById('side-panel');
  if (!panel) return;
  panel.classList.toggle('expanded', _panelExpanded);
}

// Sidor där panelen ska synas (inloggade "app"-sidor, ej landningssidan).
const PANEL_PAGES = ['tools-page','library-page','brand-page','plan-page','billing-page','app','native-page','dist-page','adcopy-page','newsroom-page','brief-page'];

// Visar panelen bara när man är inloggad OCH på en inre app-sida.
function updateSidePanel(currentPage) {
  const panel = document.getElementById('side-panel');
  if (!panel) return;
  // Ta reda på vilken sida som visas just nu om ingen skickades in.
  let page = currentPage;
  if (!page) {
    const visible = ALL_PAGES.find(function(id){
      const el = document.getElementById(id);
      return el && el.style.display !== 'none' && getComputedStyle(el).display !== 'none';
    });
    page = visible || 'landing';
  }
  const show = _currentUser && PANEL_PAGES.indexOf(page) > -1;
  if (show) {
    panel.style.display = 'flex';
    document.body.classList.add('has-panel');
    try { _panelExpanded = localStorage.getItem('mava-panel') === '1'; } catch(e){}
    applyPanelState();
  } else {
    panel.style.display = 'none';
    document.body.classList.remove('has-panel');
  }
}

// Markerar den aktiva länken i panelen utifrån vilken sida som visas.
function setActivePanelLink(pageId) {
  document.querySelectorAll('#side-panel .sp-link[data-page]').forEach(function(el){
    el.classList.toggle('active', el.getAttribute('data-page') === pageId);
  });
  updateSidePanel(pageId);
}

function goToPlan() {
  if (!_currentUser) { goToAuth(); return; }
  hideAll();
  document.getElementById('plan-page').style.display = 'block';
  setActivePanelLink('plan-page');
  window.scrollTo(0,0);
}

function goToBilling() {
  if (!_currentUser) { goToAuth(); return; }
  hideAll();
  document.getElementById('billing-page').style.display = 'block';
  setActivePanelLink('billing-page');
  window.scrollTo(0,0);
}

async function saveBrandProfile() {
  if (!_currentUser) { goToAuth(); return; }
  const btn = document.getElementById('brand-save-btn');
  const profile = {
    user_id: _currentUser.id,
    company: document.getElementById('brand-company').value.trim(),
    industry: document.getElementById('brand-industry').value.trim(),
    description: document.getElementById('brand-description').value.trim(),
    tone: document.getElementById('brand-tone').value.trim(),
    website: document.getElementById('brand-website').value.trim(),
    contact_email: document.getElementById('brand-contact-email').value.trim(),
    contact_phone: document.getElementById('brand-contact-phone').value.trim(),
    default_audience: document.getElementById('brand-audience').value.trim(),
    products_services: document.getElementById('brand-products').value.trim(),
    key_messages: document.getElementById('brand-messages').value.trim(),
    geo_area: document.getElementById('brand-geo').value.trim(),
    avoid_words: document.getElementById('brand-avoid').value.trim(),
    key_people: collectBrandPeople(),
    ad_style: _brandAdStyle,
    ad_color: document.getElementById('brand-color').value,
    updated_at: new Date().toISOString()
  };
  btn.disabled = true; btn.textContent = 'Sparar...';
  // upsert = "uppdatera om raden finns, annars skapa den". Perfekt när det ska
  // finnas exakt en profil per användare.
  const { error } = await sb().from('brand_profiles').upsert(profile);
  btn.disabled = false;
  if (error) {
    btn.textContent = 'Spara profil';
    document.getElementById('brand-msg').style.display = 'block';
    document.getElementById('brand-msg').style.background = '#FCEBEB';
    document.getElementById('brand-msg').style.color = '#A32D2D';
    document.getElementById('brand-msg').textContent = 'Kunde inte spara: ' + (error.message || error);
    return;
  }
  _brandProfile = profile;
  btn.textContent = '✓ Sparad';
  const msg = document.getElementById('brand-msg');
  msg.style.display = 'block';
  msg.style.background = '#E1F5EE';
  msg.style.color = '#0F6E56';
  msg.textContent = 'Din varumärkesprofil är sparad och fylls nu i automatiskt i verktygen.';
  setTimeout(function(){ btn.textContent = 'Spara profil'; }, 2500);
}

// Fyller i ett formulärfält bara om det är tomt (skriv aldrig över det kunden själv skrivit).
function fillIfEmpty(id, value) {
  const el = document.getElementById(id);
  if (el && !el.value && value) el.value = value;
}

/* Bygger ett litet instruktionsblock från varumärkesprofilen som kan klistras
   in i vilken AI-prompt som helst. Detta är "prompt-injektion": informationen
   når AI:n även om det inte finns något synligt formulärfält för den.
   Returnerar tom sträng om profilen saknas eller är tom – då påverkas inget. */
function brandGuidance() {
  const p = _brandProfile;
  if (!p) return '';
  const lines = [];
  if (p.tone)              lines.push('- Ton och röst: ' + p.tone);
  if (p.key_messages)      lines.push('- Nyckelbudskap som helst ska genomsyra texten: ' + p.key_messages);
  if (p.products_services) lines.push('- Produkter/tjänster företaget erbjuder: ' + p.products_services);
  if (p.geo_area)          lines.push('- Geografiskt område företaget verkar i: ' + p.geo_area);
  if (p.avoid_words)       lines.push('- FÖRBJUDNA ord och uttryck – använd ALDRIG dessa: ' + p.avoid_words);
  if (lines.length === 0) return '';
  return '\n\nVARUMÄRKESRIKTLINJER (följ dessa noga):\n' + lines.join('\n');
}

// Auto-fyller The Briefs formulär från den sparade profilen.
async function applyBrandProfileToBrief() {
  if (!_currentUser) return;
  const p = _brandProfile || await fetchBrandProfile();
  if (!p) return;
  fillIfEmpty('br-company', p.company);
  fillIfEmpty('br-industry', p.industry);
  fillIfEmpty('br-tone', p.tone);
  fillIfEmpty('br-audience', p.default_audience);
  fillIfEmpty('br-region', p.geo_area);
  // Budskapsfältet: föreslå produkter + nyckelbudskap som utgångspunkt.
  if (p.key_messages || p.products_services) {
    const parts = [];
    if (p.products_services) parts.push(p.products_services);
    if (p.key_messages) parts.push(p.key_messages);
    fillIfEmpty('br-message', parts.join('. '));
  }
}

async function applyBrandProfileToMarket() {
  if (!_currentUser) return;
  const p = _brandProfile || await fetchBrandProfile();
  if (!p) return;
  fillIfEmpty('company', p.company);
  fillIfEmpty('industry', p.industry);
  fillIfEmpty('description', p.description);
  fillIfEmpty('audience-extra', p.default_audience);
  fillIfEmpty('usp', p.key_messages);
}

async function applyBrandProfileToNative() {
  if (!_currentUser) return;
  const p = _brandProfile || await fetchBrandProfile();
  if (!p) return;
  fillIfEmpty('n-company', p.company);
  fillIfEmpty('n-industry', p.industry);
  fillIfEmpty('n-website', p.website);
  fillIfEmpty('n-audience', p.default_audience);
  // Kampanjfältet: produkter + nyckelbudskap som startpunkt användaren kan finslipa.
  if (p.products_services || p.key_messages) {
    const parts = [];
    if (p.products_services) parts.push(p.products_services);
    if (p.key_messages) parts.push(p.key_messages);
    fillIfEmpty('n-campaign', parts.join('. '));
  }
}

async function applyBrandProfileToNewsroom() {
  if (!_currentUser) return;
  const p = _brandProfile || await fetchBrandProfile();
  if (!p) return;
  fillIfEmpty('nr-company', p.company);
  fillIfEmpty('nr-industry', p.industry);
  // Kontaktperson: använd första nyckelpersonen om den finns
  if (Array.isArray(p.key_people) && p.key_people[0]) {
    const person = p.key_people[0];
    const contactStr = person.name + (person.role ? ', ' + person.role : '') + (p.contact_email ? ', ' + p.contact_email : '');
    fillIfEmpty('nr-contact', contactStr);
  }
}

function goToToolLogin(dest){
  if(dest==='native') goToNative();
  else if(dest==='dist') goToDist();
  else if(dest==='adcopy') goToAdCopy();
  else if(dest==='newsroom') goToNewsroom();
  else if(dest==='brief') goToBrief();
  else showApp();
}

function goToDist(){
  hideAll();
  document.getElementById('dist-page').style.display='block';
  updateSidePanel('dist-page');
  document.body.classList.add('dist-mode');
  window.scrollTo(0,0);
  renderDistChannels();
}

function goToAdCopy(){
  hideAll();
  document.getElementById('adcopy-page').style.display='block';
  updateSidePanel('adcopy-page');
  document.body.classList.add('adcopy-mode');
  window.scrollTo(0,0);
  renderAdCopyFormats();
  // Ladda varumärkesprofilen så bannerstilen (layout + accentfärg) kan tillämpas.
  if (_currentUser && !_brandProfile) fetchBrandProfile();
  applyBrandProfileToAdgen();
}

// Fyller i AdStudios accentfärg-fält från profilen (om ett sådant fält finns), + företag.
async function applyBrandProfileToAdgen() {
  if (!_currentUser) return;
  const p = _brandProfile || await fetchBrandProfile();
  if (!p) return;
  fillIfEmpty('ac-company', p.company);
  const colorField = document.getElementById('ac-color');
  if (colorField && p.ad_color) colorField.value = p.ad_color;
}

function goToNewsroom(){
  hideAll();
  document.getElementById('newsroom-page').style.display='block';
  updateSidePanel('newsroom-page');
  applyBrandProfileToNewsroom();
  document.body.classList.add('newsroom-mode');
  window.scrollTo(0,0);
}

function goToBrief(){
  hideAll();
  document.getElementById('brief-page').style.display='block';
  updateSidePanel('brief-page');
  document.body.classList.add('brief-mode');
  window.scrollTo(0,0);
  applyBrandProfileToBrief();
}

/* ══════════════════════════════════════════
   DISTRIBUTION PLANNER
══════════════════════════════════════════ */

const DIST_CHANNELS = [
  {id:'dc-meta',    icon:'📘', name:'Meta (Facebook & Instagram)', desc:'Bred räckvidd, stark targeting'},
  {id:'dc-linkedin',icon:'💼', name:'LinkedIn',                   desc:'B2B och professionell målgrupp'},
  {id:'dc-google',  icon:'🔍', name:'Google Ads / SEM',           desc:'Sökintention och köpbenägna'},
  {id:'dc-display', icon:'🖼️', name:'Programmatisk display',      desc:'Bred synlighet och retargeting'},
  {id:'dc-native',  icon:'📰', name:'Native / Nyhetsmedia',       desc:'Trovärdighet och redaktionell kontext'},
  {id:'dc-youtube', icon:'▶️', name:'YouTube / Video',            desc:'Berättande och varumärkesbyggande'},
  {id:'dc-email',   icon:'📧', name:'E-post / CRM',               desc:'Befintlig databas och lojalitet'},
  {id:'dc-outdoor', icon:'🏙️', name:'Utomhus / DOOH',            desc:'Geografisk närvaro och volym'},
];

function renderDistChannels(){
  const grid = document.getElementById('dist-channel-grid');
  if(grid.children.length) return;
  DIST_CHANNELS.forEach(ch=>{
    const card = document.createElement('div');
    card.className='dist-ch';
    card.id=ch.id;
    card.innerHTML=`<div class="dist-ch-icon">${ch.icon}</div><div class="dist-ch-name">${ch.name}</div><div class="dist-ch-desc">${ch.desc}</div>`;
    card.onclick=()=>{card.classList.toggle('sel');};
    grid.appendChild(card);
  });
}

function getSelectedDistChannels(){
  return DIST_CHANNELS.filter(ch=>document.getElementById(ch.id)?.classList.contains('sel'));
}

async function generateDist(){
  const company  = document.getElementById('d-company').value.trim();
  const campaign = document.getElementById('d-campaign').value.trim();
  const goal     = document.getElementById('d-goal').value;
  const audience = document.getElementById('d-audience').value.trim();
  const geo      = document.getElementById('d-geo').value.trim();
  const period   = document.getElementById('d-period').value.trim();
  const budget   = document.getElementById('d-budget').value.trim();
  const errEl    = document.getElementById('dist-error');
  errEl.style.display='none';

  if(!company||!campaign||!goal||!audience||!geo||!budget){
    errEl.textContent='Fyll i alla obligatoriska fält.';
    errEl.style.display='block';
    return;
  }
  const selected = getSelectedDistChannels();
  if(!selected.length){
    errEl.textContent='Välj minst en kanal.';
    errEl.style.display='block';
    return;
  }

  document.getElementById('dist-btn').disabled=true;
  document.getElementById('dist-form-section').style.display='none';
  document.getElementById('dist-loading').style.display='block';

  const prompt = `Du är en senior mediastrateg med djup erfarenhet av betald distribution, medieköp och kanalstrategi på den svenska marknaden. Analysera kampanjen nedan och ge ett konkret förslag på distributionsplan med optimal kanalmix och budgetfördelning. Svara på svenska.

Svara ENBART med ett JSON-objekt i detta format – ingen text utanför JSON:
{
  "summary": "2–3 meningar om kampanjens förutsättningar och den övergripande distributionsstrategin",
  "channels": [
    {
      "name": "Kanalnamn",
      "budget_pct": 30,
      "rationale": "Kort motivering varför denna kanal och hur stor andel",
      "tactics": "Konkreta taktiska råd för denna kanal (1–2 meningar)"
    }
  ],
  "overall_recommendations": "2–3 konkreta råd om timing, testning och optimering för hela kampanjen"
}

Kampanjinfo:
Företag: ${company}
Kampanj: ${campaign}
Mål: ${goal}
Målgrupp: ${audience}
Geografi: ${geo}
${period ? 'Period: '+period : ''}
Budget: ${budget} kr
Valda kanaler att fördela på: ${selected.map(c=>c.name).join(', ')}

Fördela budgeten optimalt mellan valda kanaler baserat på mål och målgrupp. Alla procentsatser ska summera till 100.`;

  try {
    const data = await safeFetch([{role:'user',content:prompt}], 80000, 'dist');
    const raw = (data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('');
    const clean = raw.replace(/```json|```/g,'').trim();
    const plan = JSON.parse(clean);

    document.getElementById('dist-result-summary').textContent = plan.summary||'';

    const chHTML = (plan.channels||[]).map(ch=>`
      <div class="dist-channel-row">
        <span style="font-weight:600;min-width:160px">${ch.name}</span>
        <div class="dist-bar-wrap"><div class="dist-bar" style="width:${ch.budget_pct}%"></div></div>
        <span style="font-size:12px;color:#9A8570;min-width:36px;text-align:right">${ch.budget_pct}%</span>
        <span style="font-weight:600;min-width:100px;text-align:right">${Math.round(Number(budget)*ch.budget_pct/100).toLocaleString('sv-SE')} kr</span>
      </div>
      <div style="font-size:13px;color:#5F5E5A;padding:4px 0 10px 0;line-height:1.6">${ch.rationale}</div>
    `).join('');
    document.getElementById('dist-result-channels').innerHTML = chHTML;

    const recHTML = (plan.channels||[]).map(ch=>`
      <div style="padding:0.85rem 0;border-bottom:1px solid rgba(0,0,0,0.07)">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#C9A84C;margin-bottom:4px">${ch.name}</div>
        <div style="font-size:14px;color:#2C2520;line-height:1.7">${ch.tactics}</div>
      </div>
    `).join('') + (plan.overall_recommendations ? `
      <div style="padding:0.85rem 0">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#C9A84C;margin-bottom:4px">Övergripande råd</div>
        <div style="font-size:14px;color:#2C2520;line-height:1.7">${plan.overall_recommendations}</div>
      </div>
    ` : '');
    document.getElementById('dist-result-recs').innerHTML = recHTML;

    window._distPlan = plan;
    window._distCompany = company;
    window._distBudget = budget;

    document.getElementById('dist-loading').style.display='none';
    document.getElementById('dist-result').style.display='block';
    window.scrollTo({top:0,behavior:'smooth'});

  } catch(e){
    document.getElementById('dist-loading').style.display='none';
    document.getElementById('dist-form-section').style.display='block';
    document.getElementById('dist-btn').disabled=false;
    showToolError('dist-error', e.message, generateDist);
  }
}

function distCopy(){
  const p = window._distPlan;
  if(!p) return;
  let text = 'DISTRIBUTIONSPLAN\n\n'+p.summary+'\n\nKANALMIX:\n';
  (p.channels||[]).forEach(ch=>{ text += ch.name+': '+ch.budget_pct+'% – '+ch.rationale+'\n\nTaktik: '+ch.tactics+'\n\n'; });
  if(p.overall_recommendations) text += 'ÖVERGRIPANDE RÅD:\n'+p.overall_recommendations;
  navigator.clipboard.writeText(text).then(()=>alert('Planen kopierad!'));
}

function distSend(){
  const p = window._distPlan;
  const c = window._distCompany||'';
  if(!p) return;
  let body = 'Distributionsplan för '+c+'\n\n'+p.summary+'\n\nKanalmix:\n';
  (p.channels||[]).forEach(ch=>{ body += ch.name+': '+ch.budget_pct+'%\n'; });
  window.location.href='mailto:hello@rtnorth.se?subject='+encodeURIComponent('Distributionsplan – '+c)+'&body='+encodeURIComponent(body);
}

function distReset(){
  document.getElementById('dist-result').style.display='none';
  document.getElementById('dist-form-section').style.display='block';
  document.getElementById('dist-btn').disabled=false;
  window.scrollTo(0,0);
}

/* ══════════════════════════════════════════
   AD COPY GENERATOR
══════════════════════════════════════════ */

const ADCOPY_FORMATS = [
  {id:'fmt-meta-feed',    icon:'📘', name:'Meta – Flöde',          desc:'Facebook & Instagram feed'},
  {id:'fmt-meta-story',   icon:'📱', name:'Meta – Stories & Reels', desc:'Vertikalt format, snappy copy'},
  {id:'fmt-linkedin-feed',icon:'💼', name:'LinkedIn – Flöde',       desc:'Professionell ton, längre text'},
  {id:'fmt-linkedin-msg', icon:'✉️', name:'LinkedIn – Sponsored InMail', desc:'Direkt meddelande'},
  {id:'fmt-google-search',icon:'🔍', name:'Google Ads – Sök',       desc:'Headlines + descriptions'},
  {id:'fmt-display',      icon:'🖼️', name:'Display-banners',        desc:'Headline + korttext'},
  {id:'fmt-html-banner',  icon:'🎨', name:'HTML-banner (300×250)',  desc:'Färdig banner – separat generering'},
];

function renderAdCopyFormats(){
  const grid = document.getElementById('adcopy-format-grid');
  if(grid.children.length) return;
  ADCOPY_FORMATS.forEach(f=>{
    const card = document.createElement('div');
    card.className='adcopy-fmt';
    card.id=f.id;
    card.innerHTML=`<div class="adcopy-fmt-icon">${f.icon}</div><div class="adcopy-fmt-name">${f.name}</div><div class="adcopy-fmt-desc">${f.desc}</div>`;
    card.onclick=()=>card.classList.toggle('sel');
    grid.appendChild(card);
  });
}

function getSelectedFormats(){
  return ADCOPY_FORMATS.filter(f=>document.getElementById(f.id)?.classList.contains('sel'));
}

async function generateAdCopy(){
  const company  = document.getElementById('ac-company').value.trim();
  const product  = document.getElementById('ac-product').value.trim();
  const message  = document.getElementById('ac-message').value.trim();
  const audience = document.getElementById('ac-audience').value.trim();
  const cta      = document.getElementById('ac-cta').value.trim();
  const tone     = document.getElementById('ac-tone').value;
  const errEl    = document.getElementById('adcopy-error');
  errEl.style.display='none';

  if(!company||!product||!message||!audience||!cta){
    errEl.textContent='Fyll i alla obligatoriska fält.';
    errEl.style.display='block';
    return;
  }
  const selected = getSelectedFormats();
  if(!selected.length){
    errEl.textContent='Välj minst ett annonsformat.';
    errEl.style.display='block';
    return;
  }

  document.getElementById('adcopy-btn').disabled=true;
  document.getElementById('adcopy-form-section').style.display='none';
  document.getElementById('adcopy-loading').style.display='block';

  const formatDesc = {
    'Meta – Flöde':             'Primary text (max 125 tecken), Headline (max 40 tecken), Description (max 30 tecken)',
    'Meta – Stories & Reels':   'Kort hooktext (max 30 tecken), Body (max 90 tecken) – snappy och direkt',
    'LinkedIn – Flöde':         'Introductory text (max 150 tecken), Headline (max 70 tecken) – professionell ton',
    'LinkedIn – Sponsored InMail': 'Subject (max 60 tecken), Message body (max 300 tecken) – personlig och direkt',
    'Google Ads – Sök':         '3 Headlines (max 30 tecken vardera), 2 Descriptions (max 90 tecken vardera)',
    'Display-banners':          'Headline (max 25 tecken), Subtext (max 45 tecken)',
    'HTML-banner':              'VIKTIG INSTRUKTION: För detta format ska du ENBART returnera ren HTML-kod för en 300x250px display-banner. Ingen JSON. Bare HTML. Bannern ska ha ett modernt, professionellt utseende med varumärkets budskap, headline, korttext och CTA-knapp. Använd inline CSS. Bakgrundsfärg mörk eller vit beroende på ton.',
  };

  const jsonFormats = selected.filter(f=>f.id!=='fmt-html-banner');
  const htmlBannerSelected = selected.some(f=>f.id==='fmt-html-banner');
  const formatsStr = jsonFormats.map(f=>`${f.name}: ${formatDesc[f.name]||''}`).join('\n');
  if(!jsonFormats.length && htmlBannerSelected){
    // Only HTML banner selected – handle separately
    await generateHtmlBannerOnly({company,product,message,audience,cta,tone});
    return;
  }

  const prompt = `Du är en erfaren copywriter specialiserad på betald annonsering i svenska och nordiska marknader. Du skriver annonscopy som konverterar – med tydliga budskap, rätt ton per kanal och starka call-to-actions.

Skriv annonscopy för följande kampanj. Ge 2–3 varianter per format. Håll dig till de teckenangivna begränsningarna. Svara på svenska.

Svara ENBART med JSON i detta format – ingen text utanför JSON:
{
  "formats": [
    {
      "format": "Formatnamn",
      "variants": [
        {
          "variant": "Variant 1",
          "headline": "...",
          "body": "...",
          "cta": "..."
        }
      ]
    }
  ]
}

Kampanjinfo:
Företag: ${company}
Produkt/tjänst: ${product}
Budskap och USP: ${message}
Målgrupp: ${audience}
Call to action: ${cta}
${tone ? 'Ton: '+tone : ''}

Format att skriva copy för:
${formatsStr}

Viktig anvisning: Anpassa tonen och längden noggrant per format. Meta-copy ska vara engagerande och scrollstoppande. LinkedIn ska vara professionell. Google Ads-headlines ska vara exakt max 30 tecken. Display-text ska vara extrem kort och tydlig.`;

  try {
    const data = await safeFetch([{role:'user',content:prompt}], 80000, 'ad-copy');
    const raw = (data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('');
    const clean = raw.replace(/```json|```/g,'').trim();
    const result = JSON.parse(clean);

    const blocks = (result.formats||[]).map(f=>`
      <div class="adcopy-format-block">
        <div class="adcopy-format-label">${f.format}</div>
        ${(f.variants||[]).map((v,i)=>`
          <div class="adcopy-variant">
            <div class="adcopy-variant-num">Variant ${i+1}</div>
            ${v.headline ? `<div class="adcopy-variant-headline">${v.headline}</div>` : ''}
            ${v.body ? `<div class="adcopy-variant-body">${v.body}</div>` : ''}
            ${v.cta ? `<div class="adcopy-variant-cta">→ ${v.cta}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `).join('');

    document.getElementById('adcopy-result-blocks').innerHTML = blocks;
    window._adcopyResult = result;
    window._adcopyCompany = company;

    document.getElementById('adcopy-loading').style.display='none';
    document.getElementById('adcopy-result').style.display='block';
    window.scrollTo({top:0,behavior:'smooth'});

    // If HTML banner was also selected, generate it separately
    if(htmlBannerSelected){
      generateHtmlBanner({company,product,message,audience,cta,tone});
    }

  } catch(e){
    document.getElementById('adcopy-loading').style.display='none';
    document.getElementById('adcopy-form-section').style.display='block';
    document.getElementById('adcopy-btn').disabled=false;
    showToolError('adcopy-error', e.message, generateAdCopy);
  }
}

function adcopyCopy(){
  const r = window._adcopyResult;
  if(!r) return;
  let text = '';
  (r.formats||[]).forEach(f=>{
    text += f.format.toUpperCase()+'\n';
    (f.variants||[]).forEach((v,i)=>{
      text += `\nVariant ${i+1}:\n`;
      if(v.headline) text += 'Headline: '+v.headline+'\n';
      if(v.body) text += 'Text: '+v.body+'\n';
      if(v.cta) text += 'CTA: '+v.cta+'\n';
    });
    text += '\n';
  });
  navigator.clipboard.writeText(text).then(()=>alert('Copy kopierad!'));
}

function adcopySend(){
  const r = window._adcopyResult;
  const c = window._adcopyCompany||'';
  if(!r) return;
  let body = 'Ad Copy – '+c+'\n\n';
  (r.formats||[]).forEach(f=>{
    body += f.format+'\n';
    (f.variants||[]).forEach((v,i)=>{ body += `Variant ${i+1}: ${v.headline||''} / ${v.body||''}\n`; });
    body += '\n';
  });
  window.location.href='mailto:hello@rtnorth.se?subject='+encodeURIComponent('Ad Copy – '+c)+'&body='+encodeURIComponent(body);
}

async function generateHtmlBanner({company,product,message,audience,cta,tone}){
  const bannerPrompt = `Du är en erfaren webbutvecklare och designer. Skapa en professionell HTML display-banner (300x250px) för följande kampanj. Returnera ENBART ren HTML-kod, inget annat.

Företag: ${company}
Produkt: ${product}
Budskap: ${message}
CTA: ${cta}
${tone?'Ton: '+tone:''}

Krav: Exakt 300x250px, inline CSS, mörk eller ljus bakgrund, tydlig rubrik, korttext och en CTA-knapp. Professionellt utseende. Ingen extern CSS eller JS.`;

  try {
    const data = await safeFetch([{role:'user',content:bannerPrompt}], 80000, 'ad-copy');
    const html = (data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('').replace(/```html|```/g,'').trim();
    window._adcopyBannerHTML = html;

    // Add banner preview and download button to result
    const wrap = document.getElementById('adcopy-result-blocks');
    const bannerBlock = document.createElement('div');
    bannerBlock.className = 'adcopy-format-block';
    bannerBlock.innerHTML = `
      <div class="adcopy-format-label">HTML-banner</div>
      <div style="font-size:13px;color:#9A8570;margin-bottom:1rem">300×250px – redo att ladda ner</div>
      <div style="width:300px;height:250px;border:1px solid rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;background:#fff">
        <iframe srcdoc="${html.replace(/"/g,'&quot;')}" style="width:300px;height:250px;border:none;pointer-events:none" scrolling="no"></iframe>
      </div>
      <button class="adcopy-action-btn" style="margin-top:1rem" onclick="adcopyDownloadBanner()">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M7 1v8M4 6l3 3 3-3M2 10v1a1 1 0 001 1h8a1 1 0 001-1v-1"/></svg>
        Ladda ner HTML-banner
      </button>
    `;
    wrap.appendChild(bannerBlock);
  } catch(e){
    console.error('Banner generation failed:', e);
  }
}

async function generateHtmlBannerOnly({company,product,message,audience,cta,tone}){
  document.getElementById('adcopy-btn').disabled=true;
  document.getElementById('adcopy-form-section').style.display='none';
  document.getElementById('adcopy-loading').style.display='block';
  document.getElementById('adcopy-result-blocks').innerHTML='';
  document.getElementById('adcopy-result').style.display='none';
  await generateHtmlBanner({company,product,message,audience,cta,tone});
  document.getElementById('adcopy-loading').style.display='none';
  document.getElementById('adcopy-result').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}

function adcopyDownloadBanner(){
  const html = window._adcopyBannerHTML;
  if(!html) return;
  const full = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Banner</title></head><body style="margin:0;padding:0">'+html+'</body></html>';
  const blob = new Blob([full],{type:'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href=url; link.download='banner_300x250.html'; link.click();
  URL.revokeObjectURL(url);
}

function adcopyReset(){
  document.getElementById('adcopy-result').style.display='none';
  document.getElementById('adcopy-form-section').style.display='block';
  document.getElementById('adcopy-btn').disabled=false;
  window.scrollTo(0,0);
}

/* ══════════════════════════════════════════
   NEWSROOM
══════════════════════════════════════════ */

let _newsroomType = '';
let _newsroomMedia = ['Dagstidningar och nyhetsmedier'];

function newsroomSelectType(el, type) {
  document.querySelectorAll('.newsroom-type').forEach(t => t.classList.remove('sel'));
  el.classList.add('sel');
  _newsroomType = type;
}

function newsroomToggleMedia(el, media) {
  el.classList.toggle('sel');
  if (el.classList.contains('sel')) {
    if (!_newsroomMedia.includes(media)) _newsroomMedia.push(media);
  } else {
    _newsroomMedia = _newsroomMedia.filter(m => m !== media);
  }
}

function nrv(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

async function generateNewsroom() {
  const company = nrv('nr-company');
  const industry = nrv('nr-industry');
  const companyDesc = nrv('nr-company-desc');
  const news = nrv('nr-news');
  const quote = nrv('nr-quote');
  const contact = nrv('nr-contact');

  const errEl = document.getElementById('newsroom-error');
  errEl.style.display = 'none';

  if (!company) { showToolError('newsroom-error', 'Fyll i företagsnamn.'); return; }
  if (!industry) { showToolError('newsroom-error', 'Fyll i bransch.'); return; }
  if (!companyDesc) { showToolError('newsroom-error', 'Beskriv företaget kort.'); return; }
  if (!news) { showToolError('newsroom-error', 'Beskriv nyheten.'); return; }
  if (!_newsroomType) { showToolError('newsroom-error', 'Välj typ av nyhet.'); return; }
  if (_newsroomMedia.length === 0) { showToolError('newsroom-error', 'Välj minst ett målmedia.'); return; }

  document.getElementById('newsroom-btn').disabled = true;
  document.getElementById('newsroom-form-section').style.display = 'none';
  document.getElementById('newsroom-loading').style.display = 'block';

  const mediaStr = _newsroomMedia.join(', ');

  const prompt = `Du är en mycket erfaren PR-konsult, presschef och journalistisk copywriter med över 20 års erfarenhet av att skriva pressmeddelanden som redaktioner faktiskt kan använda. Du skriver som någon som förstår hur journalister tänker – inte som en marknadsavdelning.

Analysera underlaget och identifiera vad som egentligen är nyheten, varför den är relevant just nu, vilken vinkel som är starkast journalistiskt, vilka som påverkas, och vilka fakta som stärker trovärdigheten. Skriv sedan ett komplett pressmeddelande på svenska.

TON OCH STIL:
- Professionellt, nyhetsmässigt, trovärdigt, konkret och redaktionellt gångbart.
- Variera meningslängden. Skriv med driv och rytm som en människa, inte i det jämna, platta tonläge som avslöjar maskinskriven text.
- Sätt nyheten först, företaget sedan. Börja aldrig med att företaget "är glada" eller "stolta".
- Lyft omvärldsrelevansen: varför ska någon annan än avsändaren bry sig?
- Var konkret: fakta, siffror, platser, datum, personer och konsekvenser slår allmänna påståenden.

FÖRBJUDNA FLOSKLER (använd aldrig): "spännande satsning", "unik möjlighet", "vi är stolta över", "tar nästa steg", "på en resa", "banbrytande", "innovativ lösning", "stärker vårt erbjudande", "framtidens lösning", "i framkant". Använd bara starka värdeord om de styrks av konkreta fakta.

FAKTAREGEL: Hitta aldrig på fakta. Om viktig uppgift saknas, använd hakparentes som [datum saknas] eller [ort saknas] så användaren kan komplettera. Du får göra språkliga förbättringar och dra rimliga slutsatser om vinkel.

CITAT: ${quote ? 'Använd det angivna citatet ordagrant – skriv inte om det.' : 'Skapa ett citat som låter som en verklig person, inte en reklamslogan. Citatet ska tillföra perspektiv, förklaring eller ambition – inte upprepa fakta från brödtexten. Undvik "Vi är stolta/glada".'}

ANPASSA EFTER MÅLMEDIER (${mediaStr}): Lokalmedia → lyft plats, lokal påverkan, konkreta ortsnamn. Branschmedia → trender, utveckling, precис terminologi utan jargong. Riksmedia → bredare samhällsrelevans, hårt nyhetsvärde. Näringslivsmedia → affärslogik, tillväxt, marknad, resultat.

Pressmeddelandet ska vara cirka 2500 tecken.

Nyhetstyp: ${_newsroomType}

FÖRETAGSINFORMATION:
Företag: ${company}
Bransch: ${industry}
Om företaget: ${companyDesc}

NYHETEN:
${news}

${quote ? `ANGIVET CITAT (använd ordagrant):\n${quote}` : ''}
${contact ? `KONTAKTPERSON:\n${contact}` : ''}

Returnera ENBART ett giltigt JSON-objekt med exakt dessa fält och inget annat. Använd \\n\\n mellan styckena. Se till att all text är korrekt escapead så att JSON går att parsa:
{
  "headline": "Rak, konkret nyhetsrubrik – inte reklam",
  "ingress": "2-3 meningar som besvarar vad som händer, vem som står bakom och varför det är relevant",
  "body": "Brödtext i 3-4 stycken, nyheten först. Använd \\n\\n mellan styckena.",
  "quote": "Citatet formaterat som: 'Citattexten' – Namn, Titel, Företag (tom sträng om inget)",
  "boilerplate": "Kort 'Om ${company}'-text som avslutar releasen",
  "contact": "${contact || ''}",
  "alt_headlines": ["Rak nyhetsrubrik", "Lokal vinkel", "Branschvinkel", "Mänsklig/emotionell vinkel", "Affärsmässig vinkel"],
  "pitch": "Kort journalistpitch på 3-5 meningar som säljer in nyheten (inte företaget) till en journalist",
  "subject_lines": ["Ämnesrad 1", "Ämnesrad 2", "Ämnesrad 3", "Ämnesrad 4", "Ämnesrad 5"],
  "assessment": {
    "nyhetsvarde": 3,
    "tydlighet": 3,
    "medial_potential": 3,
    "lokal_relevans": 3,
    "branschrelevans": 3,
    "forslag": ["Konkret förslag på hur nyheten kan vässas", "Förslag 2", "Förslag 3"]
  }
}`;

  try {
    const data = await safeFetch([{ role: 'user', content: prompt + brandGuidance() }], 80000, 'newsroom');
    const raw = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    window._newsroomCompany = company;
    renderNewsroomResult(result, _newsroomType + ' · ' + company);

    document.getElementById('newsroom-loading').style.display = 'none';
    document.getElementById('newsroom-result').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch (e) {
    document.getElementById('newsroom-loading').style.display = 'none';
    document.getElementById('newsroom-form-section').style.display = 'block';
    document.getElementById('newsroom-btn').disabled = false;
    showToolError('newsroom-error', e.message, generateNewsroom);
  }
}

function renderNewsroomResult(result, typeLabel) {
  document.getElementById('nr-result-type').textContent = typeLabel || '';
  document.getElementById('nr-result-headline').textContent = result.headline || '';
  document.getElementById('nr-result-ingress').textContent = result.ingress || '';
  document.getElementById('nr-result-body').innerHTML = mdToHtml(result.body);

  const quoteEl = document.getElementById('nr-result-quote');
  if (result.quote && result.quote.trim()) {
    quoteEl.textContent = result.quote;
    quoteEl.style.display = 'block';
  } else {
    quoteEl.style.display = 'none';
  }

  const contactEl = document.getElementById('nr-result-contact');
  const contactTextEl = document.getElementById('nr-result-contact-text');
  if (result.contact && result.contact.trim()) {
    contactTextEl.textContent = result.contact;
    contactEl.style.display = 'block';
  } else {
    contactEl.style.display = 'none';
  }

  document.getElementById('nr-result-boilerplate').innerHTML = mdToHtml(result.boilerplate);
  renderNewsroomExtras(result);
  window._newsroomResult = result;
}

function renderNewsroomExtras(result) {
  const box = document.getElementById('nr-result-extras');
  if (!box) return;
  function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  let html = '';

  if (Array.isArray(result.alt_headlines) && result.alt_headlines.length) {
    const labels = ['Rak nyhetsrubrik','Lokal vinkel','Branschvinkel','Mänsklig vinkel','Affärsmässig vinkel'];
    html += '<div class="nr-extra-block"><div class="nr-extra-title">Alternativa rubriker</div>';
    result.alt_headlines.forEach(function(h,i){
      html += '<div class="nr-extra-row"><span class="nr-extra-tag">' + esc(labels[i]||('Vinkel '+(i+1))) + '</span><span>' + esc(h) + '</span></div>';
    });
    html += '</div>';
  }

  if (result.pitch && result.pitch.trim()) {
    html += '<div class="nr-extra-block"><div class="nr-extra-title">Journalistpitch</div><div class="nr-extra-text">' + esc(result.pitch) + '</div></div>';
  }

  if (Array.isArray(result.subject_lines) && result.subject_lines.length) {
    html += '<div class="nr-extra-block"><div class="nr-extra-title">Förslag på ämnesrader</div>';
    result.subject_lines.forEach(function(s){
      html += '<div class="nr-extra-row"><span style="color:#C9A84C">›</span><span>' + esc(s) + '</span></div>';
    });
    html += '</div>';
  }

  if (result.assessment && typeof result.assessment === 'object') {
    const a = result.assessment;
    const metrics = [['Nyhetsvärde',a.nyhetsvarde],['Tydlighet',a.tydlighet],['Medial potential',a.medial_potential],['Lokal relevans',a.lokal_relevans],['Branschrelevans',a.branschrelevans]];
    html += '<div class="nr-extra-block"><div class="nr-extra-title">PR-bedömning</div>';
    metrics.forEach(function(m){
      const val = Math.max(0, Math.min(5, parseInt(m[1],10) || 0));
      let dots = '';
      for (let i=0;i<5;i++){ dots += '<span style="width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:3px;background:' + (i<val?'#C9A84C':'#E8E4DB') + '"></span>'; }
      html += '<div class="nr-extra-row" style="justify-content:space-between"><span>' + esc(m[0]) + '</span><span>' + dots + '</span></div>';
    });
    if (Array.isArray(a.forslag) && a.forslag.length) {
      html += '<div style="margin-top:12px;font-size:12px;font-weight:600;color:#9A8570;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px">Så kan nyheten vässas</div>';
      a.forslag.forEach(function(f){
        html += '<div class="nr-extra-row"><span style="color:#C9A84C">›</span><span>' + esc(f) + '</span></div>';
      });
    }
    html += '</div>';
  }

  box.innerHTML = html;
}

function newsroomCopy() {
  const r = window._newsroomResult;
  if (!r) return;
  let text = '';
  text += 'PRESSRELEASE\n\n';
  text += (r.headline || '') + '\n\n';
  text += (r.ingress || '') + '\n\n';
  text += (r.body || '') + '\n\n';
  if (r.quote && r.quote.trim()) text += r.quote + '\n\n';
  text += (r.boilerplate || '') + '\n\n';
  if (r.contact && r.contact.trim()) text += 'Kontakt för media:\n' + r.contact + '\n';
  navigator.clipboard.writeText(text).then(() => alert('Pressreleasen kopierad!'));
}

function newsroomEmail() {
  const r = window._newsroomResult;
  const c = window._newsroomCompany || '';
  if (!r) return;
  let body = 'PRESSRELEASE\n\n' + (r.headline || '') + '\n\n' + (r.ingress || '') + '\n\n' + (r.body || '');
  if (r.quote && r.quote.trim()) body += '\n\n' + r.quote;
  body += '\n\n' + (r.boilerplate || '');
  if (r.contact && r.contact.trim()) body += '\n\nKontakt:\n' + r.contact;
  window.location.href = 'mailto:hello@rtnorth.se?subject=' + encodeURIComponent('Pressrelease – ' + c) + '&body=' + encodeURIComponent(body);
}

function newsroomReset() {
  window._newsroomResult = null;
  document.getElementById('newsroom-result').style.display = 'none';
  document.getElementById('newsroom-form-section').style.display = 'block';
  document.getElementById('newsroom-btn').disabled = false;
  window.scrollTo(0, 0);
}

/* ══════════════════════════════════════════
   THE BRIEF
══════════════════════════════════════════ */

let _briefGoals = [];

function briefToggleGoal(el, goal) {
  el.classList.toggle('sel');
  if (el.classList.contains('sel')) {
    if (!_briefGoals.includes(goal)) _briefGoals.push(goal);
  } else {
    _briefGoals = _briefGoals.filter(g => g !== goal);
  }
}

function brv(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

async function generateBrief() {
  const company   = brv('br-company');
  const industry  = brv('br-industry');
  const message   = brv('br-message');
  const audience  = brv('br-audience');
  const reach     = brv('br-reach');
  const region    = brv('br-region');
  const budget    = brv('br-budget');
  const period    = brv('br-period');
  const tone      = brv('br-tone');
  const constraints = brv('br-constraints');
  const extra     = brv('br-extra');

  const errEl = document.getElementById('brief-error');
  errEl.style.display = 'none';

  if (!company)  { showToolError('brief-error', 'Fyll i företagsnamn.'); return; }
  if (!industry) { showToolError('brief-error', 'Fyll i bransch.'); return; }
  if (!message)  { showToolError('brief-error', 'Beskriv vad kampanjen ska kommunicera.'); return; }
  if (!audience) { showToolError('brief-error', 'Beskriv målgruppen.'); return; }
  if (!reach)    { showToolError('brief-error', 'Välj geografisk räckvidd.'); return; }
  if (!budget)   { showToolError('brief-error', 'Ange total budget.'); return; }
  if (!period)   { showToolError('brief-error', 'Ange kampanjperiod.'); return; }
  if (_briefGoals.length === 0) { showToolError('brief-error', 'Välj minst ett kampanjmål.'); return; }

  document.getElementById('brief-btn').disabled = true;
  document.getElementById('brief-form-section').style.display = 'none';
  document.getElementById('brief-loading').style.display = 'block';

  const goalsStr = _briefGoals.join(', ');

  const prompt = `Du är en erfaren strategisk marknadsföringskonsult som specialiserat dig på att hjälpa små och medelstora svenska bolag få ut maximal effekt av begränsade marknadsbudgetar. Du skriver kampanjbriefer som är konkreta, realistiska och direkt användbara att skicka till en byrå, frilansare eller internt team. Du vet att mottagaren har begränsade resurser och förväntar dig att varje rekommendation ska gå att genomföra på riktigt.

Skriv en komplett och professionell kampanjbrief på svenska baserad på informationen nedan.

ÖVERGRIPANDE KRAV:
- Varje sektion ska ge faktisk vägledning, inte allmänna floskler. Var specifik och handlingsorienterad.
- Anpassa alla råd till den angivna budgeten. Föreslå aldrig kanaler eller insatser som är orealistiska för budgetens storlek (t.ex. ingen TV- eller storskalig utomhusreklam för en liten budget). Prioritera kanaler med låg tröskel, god mätbarhet och hög kostnadseffektivitet för mindre bolag.
- Motivera varje kanal med var målgruppen faktiskt befinner sig och varför kanalen passar målet.
- Väg in den geografiska räckvidden i kanalvalet. Vid LOKAL eller REGIONAL räckvidd: bedöm om lokalmedia och regional press (t.ex. lokaltidningar, regionala nyhetssajter, lokalradio) är kostnadseffektiva sätt att nå målgruppen, och prioritera geografiskt riktade kanaler (t.ex. geotargetad digital annonsering). Vid NATIONELL räckvidd: fokusera på skalbara rikstäckande kanaler och undvik att lägga budget på enskild lokalmedia om det inte finns särskilda skäl. Om en ort/region angetts, referera gärna konkret till den.
- All budgetfördelning ska anges i BÅDE procent OCH kronor, och kronbeloppen ska summera till den totala budgeten.
- KPI:er ska vara konkreta och mätbara med faktiska måltal (t.ex. "minst 150 leads till en kostnad under 80 kr/lead"), inte vaga ("öka antalet leads").
- Tidslinjens faser ska ligga inom den angivna kampanjperioden.

FORMATERING (viktigt för läsbarheten):
- Skriv INTE textfälten som en enda lång textmassa. Strukturera för snabb läsning.
- Använd korta stycken (2-4 meningar). Separera stycken med en tom rad (\\n\\n).
- Använd punktlistor (rader som börjar med "- ") när du räknar upp saker, t.ex. flera mål, kanaler eller målgruppssegment.
- Använd korta feta delrubriker på egen rad när ett fält har flera delar, t.ex. **Primär målgrupp** och **Sekundär målgrupp** i audience-fältet, eller **Produktion** och **Media** i budget-fältet.
- Fetstil skrivs med dubbla asterisker: **så här**. Använd det sparsamt för att lyfta nyckelbegrepp.
- Målet är en brief som går att skumläsa – tydliga nedslag, inte en vägg av text.

KAMPANJINFO:
Företag: ${company}
Bransch: ${industry}
Kampanjmål: ${goalsStr}
Kommunikation: ${message}
Målgrupp: ${audience}
Geografisk räckvidd: ${reach}${region ? ` (${region})` : ''}
Total budget: ${budget} kr exkl. moms
Kampanjperiod: ${period}
${tone ? `Önskad ton: ${tone}` : ''}
${constraints ? `Krav/begränsningar: ${constraints}` : ''}
${extra ? `Övrigt: ${extra}` : ''}

Returnera ENBART ett giltigt JSON-objekt med exakt dessa fält och inget annat. Använd \\n för radbrytningar inuti strängar och se till att all text är korrekt escapead så att JSON går att parsa:
{
  "campaign_name": "Ett kort, slagkraftigt namn på kampanjen",
  "background": "2-3 meningar om företaget, marknadsläget och varför den här kampanjen görs nu. Ett eller två korta stycken.",
  "goals": "Konkreta, mätbara mål kopplade till de valda kampanjmålen, som en punktlista där varje mål börjar med '- ' på egen rad.",
  "audience": "Detaljerad målgruppsbeskrivning. Använd feta delrubriker som **Primär målgrupp** och **Sekundär målgrupp**, och punktlistor för demografi, psykografi, beteenden och var de finns.",
  "message": "Kärnbudskap och tonalitet i korta stycken. Använd gärna en delrubrik **Kärnbudskap** och en **Tonalitet**. Vad ska kampanjen säga? Hur ska den låta och kännas?",
  "channels": "Rekommenderade kanaler som en punktlista. Varje kanal på egen rad som börjar med '- ', med kanalnamnet i fetstil följt av kort motivering kopplad till mål och målgrupp. Anpassat till budgetens storlek.",
  "budget": "Budgetfördelning med delrubrikerna **Media** och **Produktion**. Under varje, en punktlista per post med procent OCH kronor. Kronbeloppen ska summera till ${budget} kr.",
  "timeline": [
    {"phase": "Fas 1 – namn", "period": "datumintervall inom kampanjperioden", "activities": "vad som görs"},
    {"phase": "Fas 2 – namn", "period": "datumintervall inom kampanjperioden", "activities": "vad som görs"},
    {"phase": "Fas 3 – namn", "period": "datumintervall inom kampanjperioden", "activities": "vad som görs"}
  ],
  "kpis": [
    {"name": "KPI-namn", "target": "konkret måltal och mätvärde"},
    {"name": "KPI-namn", "target": "konkret måltal och mätvärde"},
    {"name": "KPI-namn", "target": "konkret måltal och mätvärde"}
  ],
  "constraints": "${constraints || ''}"
}`;

  try {
    const data = await safeFetch([{ role: 'user', content: prompt + brandGuidance() }], 80000, 'the-brief');
    const raw  = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const r = JSON.parse(clean);

    renderBriefResult(r, goalsStr + ' · ' + period, company);

    document.getElementById('brief-loading').style.display = 'none';
    document.getElementById('brief-result').style.display  = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch(e) {
    document.getElementById('brief-loading').style.display  = 'none';
    document.getElementById('brief-form-section').style.display = 'block';
    document.getElementById('brief-btn').disabled = false;
    showToolError('brief-error', e.message, generateBrief);
  }
}

/* ── mdToHtml ──────────────────────────────────────────────────────────────
   Liten, säker Markdown→HTML-omvandlare för att presentera AI-text tydligt.
   Stödjer: stycken (tom rad), punktlistor (- eller •), numrerade listor (1.),
   fetstil (**text**) och delrubriker (en rad som är helt **fet**).
   VIKTIGT: all råtext escapas först, så AI:n kan aldrig injicera egna HTML-taggar.
   Vi bygger bara upp HTML från mönster VI känner igen. Återanvänds av flera verktyg.
──────────────────────────────────────────────────────────────────────────── */
function mdEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function mdInline(s) {
  // Körs EFTER escaping. **text** -> <strong>. Inget annat tolkas.
  return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}
function mdToHtml(text) {
  if (!text) return '';
  const lines = String(text).replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let listType = null;      // 'ul' | 'ol' | null
  let paragraph = [];       // rader som hör till samma stycke

  function flushParagraph() {
    if (paragraph.length) {
      html += '<p>' + mdInline(mdEscape(paragraph.join(' '))) + '</p>';
      paragraph = [];
    }
  }
  function closeList() {
    if (listType) { html += '</' + listType + '>'; listType = null; }
  }

  for (let raw of lines) {
    const line = raw.trim();

    if (line === '') { flushParagraph(); closeList(); continue; }

    // Delrubrik: hela raden är fet, t.ex. "**Kanalval**"
    const heading = line.match(/^\*\*(.+?)\*\*:?$/);
    if (heading) {
      flushParagraph(); closeList();
      html += '<h4 class="md-sub">' + mdInline(mdEscape('**' + heading[1] + '**')) + '</h4>';
      continue;
    }

    // Punktlista: "- ", "* " eller "• "
    const bullet = line.match(/^[-*•]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (listType !== 'ul') { closeList(); html += '<ul class="md-list">'; listType = 'ul'; }
      html += '<li>' + mdInline(mdEscape(bullet[1])) + '</li>';
      continue;
    }

    // Numrerad lista: "1. ", "2) " osv
    const num = line.match(/^\d+[.)]\s+(.+)$/);
    if (num) {
      flushParagraph();
      if (listType !== 'ol') { closeList(); html += '<ol class="md-list">'; listType = 'ol'; }
      html += '<li>' + mdInline(mdEscape(num[1])) + '</li>';
      continue;
    }

    // Vanlig rad -> del av stycke
    closeList();
    paragraph.push(line);
  }
  flushParagraph(); closeList();
  return html;
}

function renderBriefResult(r, label, company) {
    document.getElementById('br-result-label').textContent   = label || '';
    document.getElementById('br-result-title').textContent   = r.campaign_name || (company || '') + ' – Kampanjbrief';
    document.getElementById('br-result-background').innerHTML = mdToHtml(r.background);
    document.getElementById('br-result-goals').innerHTML     = mdToHtml(r.goals);
    document.getElementById('br-result-audience').innerHTML  = mdToHtml(r.audience);
    document.getElementById('br-result-message').innerHTML   = mdToHtml(r.message);
    document.getElementById('br-result-channels').innerHTML  = mdToHtml(r.channels);
    document.getElementById('br-result-budget').innerHTML    = mdToHtml(r.budget);

    // Timeline
    const tlEl = document.getElementById('br-result-timeline');
    tlEl.innerHTML = (r.timeline || []).map(t => `
      <div class="brief-timeline-row">
        <div class="brief-timeline-dot"></div>
        <div><strong>${t.phase}</strong> <span style="color:#9A8570">${t.period}</span><br>
        <span style="font-size:13px;color:#5F5E5A">${t.activities}</span></div>
      </div>
    `).join('');

    // KPIs
    const kpiEl = document.getElementById('br-result-kpis');
    kpiEl.innerHTML = `<div class="brief-kpi-grid">${(r.kpis || []).map(k => `
      <div class="brief-kpi">
        <div class="brief-kpi-name">${k.name}</div>
        <div class="brief-kpi-value">${k.target}</div>
      </div>
    `).join('')}</div>`;

    // Constraints
    const constraintsSection = document.getElementById('br-result-constraints-section');
    if (r.constraints && r.constraints.trim()) {
      document.getElementById('br-result-constraints').innerHTML = mdToHtml(r.constraints);
      constraintsSection.style.display = 'block';
    } else if (constraintsSection) {
      constraintsSection.style.display = 'none';
    }

    window._briefResult  = r;
    window._briefCompany = company || '';
}

function briefCopy() {
  const r = window._briefResult;
  if (!r) return;
  let t = `KAMPANJBRIEF – ${r.campaign_name || ''}\n\n`;
  t += `BAKGRUND\n${r.background || ''}\n\n`;
  t += `MÅL\n${r.goals || ''}\n\n`;
  t += `MÅLGRUPP\n${r.audience || ''}\n\n`;
  t += `BUDSKAP OCH TONALITET\n${r.message || ''}\n\n`;
  t += `KANALREKOMMENDATIONER\n${r.channels || ''}\n\n`;
  t += `BUDGET\n${r.budget || ''}\n\n`;
  t += `TIDSLINJE\n${(r.timeline||[]).map(p=>`${p.phase} (${p.period}): ${p.activities}`).join('\n')}\n\n`;
  t += `KPI:ER\n${(r.kpis||[]).map(k=>`${k.name}: ${k.target}`).join('\n')}\n`;
  if (r.constraints && r.constraints.trim()) t += `\nKRAV OCH BEGRÄNSNINGAR\n${r.constraints}\n`;
  navigator.clipboard.writeText(t).then(() => alert('Brief kopierad!'));
}

function briefEmail() {
  const r = window._briefResult;
  const c = window._briefCompany || '';
  if (!r) return;
  let body = `KAMPANJBRIEF – ${r.campaign_name || c}\n\n`;
  body += `BAKGRUND\n${r.background || ''}\n\n`;
  body += `MÅL\n${r.goals || ''}\n\n`;
  body += `MÅLGRUPP\n${r.audience || ''}\n\n`;
  body += `BUDSKAP\n${r.message || ''}\n\n`;
  body += `KANALER\n${r.channels || ''}\n\n`;
  body += `BUDGET\n${r.budget || ''}\n\n`;
  body += `TIDSLINJE\n${(r.timeline||[]).map(p=>`${p.phase} (${p.period}): ${p.activities}`).join('\n')}`;
  window.location.href = 'mailto:hello@rtnorth.se?subject=' + encodeURIComponent('Kampanjbrief – ' + c) + '&body=' + encodeURIComponent(body);
}

function briefReset() {
  window._briefResult = null;
  _briefGoals = [];
  document.querySelectorAll('.brief-goal').forEach(g => g.classList.remove('sel'));
  document.getElementById('brief-result').style.display = 'none';
  document.getElementById('brief-result-constraints-section') && (document.getElementById('br-result-constraints-section').style.display = 'none');
  document.getElementById('brief-form-section').style.display = 'block';
  document.getElementById('brief-btn').disabled = false;
  window.scrollTo(0, 0);
}



/* ══════════════════════════════════════════
   AD GENERATOR
══════════════════════════════════════════ */

const ADGEN_FORMATS = {
  'meta-feed-square':   { label:'Meta Feed (kvadrat)',   w:1080, h:1080, html5:false, group:'meta' },
  'meta-feed-portrait': { label:'Meta Feed (porträtt)',  w:1080, h:1350, html5:false, group:'meta' },
  'meta-stories':       { label:'Meta Stories / Reels',  w:1080, h:1920, html5:false, group:'meta' },
  'meta-landscape':     { label:'Meta Landscape',        w:1200, h:628,  html5:false, group:'meta' },
  'meta-instream':      { label:'Meta In-stream (16:9)', w:1920, h:1080, html5:false, group:'meta' },
  'linkedin':           { label:'LinkedIn',              w:1200, h:628,  html5:false, group:'meta' },
  'iab-medium':         { label:'Medium Rectangle',      w:300,  h:250,  html5:true,  group:'display' },
  'iab-large-rect':     { label:'Large Rectangle',       w:336,  h:280,  html5:true,  group:'display' },
  'iab-leaderboard':    { label:'Leaderboard',           w:728,  h:90,   html5:true,  group:'display' },
  'iab-billboard':      { label:'Billboard',             w:970,  h:250,  html5:true,  group:'display' },
  'iab-halfpage':       { label:'Half Page',             w:300,  h:600,  html5:true,  group:'display' },
  'iab-skyscraper':     { label:'Wide Skyscraper',       w:160,  h:600,  html5:true,  group:'display' },
  'iab-mobile':         { label:'Mobile Banner',         w:320,  h:50,   html5:true,  group:'display' },
  'iab-mobile-large':   { label:'Large Mobile Banner',   w:320,  h:100,  html5:true,  group:'display' },
};

function adgenEscapeHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Läser kundens valda accentfärg + stil från varumärkesprofilen.
// Faller tillbaka på guld/overlay om ingen profil finns.
function adgenBrandStyle() {
  const p = _brandProfile;
  return {
    color: (p && p.ad_color) || '#C9A84C',
    style: (p && p.ad_style) || 'overlay'
  };
}

// Ljus eller mörk text beroende på hur ljus accentfärgen är (så texten alltid syns på färgytan).
function adgenTextOn(hex) {
  const c = hex.replace('#','');
  const r = parseInt(c.substr(0,2),16), g = parseInt(c.substr(2,2),16), b = parseInt(c.substr(4,2),16);
  const lum = (0.299*r + 0.587*g + 0.114*b);
  return lum > 150 ? '#1a1410' : '#ffffff';
}

function buildBannerHtml(fmt, copy) {
  const w = fmt.w, h = fmt.h;
  const shortH = h < 130; // låga banners klarar bara overlay-stilen
  const brand = adgenBrandStyle();
  // Band/split kräver rimlig yta; tvinga overlay i låga/smala banners.
  let style = brand.style;
  if (shortH || w < 250) style = 'overlay';

  const headline = adgenEscapeHtml(copy.headline || '');
  const subline  = adgenEscapeHtml(copy.subline || '');
  const cta      = adgenEscapeHtml(copy.cta || '');
  const img = _adgenImageDataUrl || '';
  const accent = brand.color;
  const onAccent = adgenTextOn(accent);

  let logoHtml = '';
  if (_adgenLogoDataUrl) {
    const pos = (document.getElementById('ac-logo-pos') || {}).value || 'bottom-right';
    const p = 14;
    const vpos = pos.indexOf('bottom') > -1 ? 'bottom:' + p + 'px' : 'top:' + p + 'px';
    const hpos = pos.indexOf('right') > -1 ? 'right:' + p + 'px' : 'left:' + p + 'px';
    const logoMax = Math.round(Math.min(w * 0.2, h * 0.15));
    logoHtml = '<img src="' + _adgenLogoDataUrl + '" style="position:absolute;' + vpos + ';' + hpos + ';max-width:' + logoMax + 'px;max-height:' + Math.round(h*0.15) + 'px;z-index:3">';
  }

  const head = '<!DOCTYPE html><html lang="sv"><head><meta charset="utf-8"><style>' +
    '*{margin:0;padding:0;box-sizing:border-box}' +
    'html,body{width:' + w + 'px;height:' + h + 'px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}' +
    '.b{position:relative;width:' + w + 'px;height:' + h + 'px;cursor:pointer;overflow:hidden}';

  const parts = { w:w, h:h, shortH:shortH, headline:headline, subline:subline, cta:cta, img:img, accent:accent, onAccent:onAccent, logoHtml:logoHtml };
  let inner;
  if (style === 'band')       inner = adgenBandLayout(parts);
  else if (style === 'split') inner = adgenSplitLayout(parts);
  else                        inner = adgenOverlayLayout(parts);

  return head + inner.css + '</style></head><body>' +
    '<a class="b" href="#" onclick="return false" style="text-decoration:none">' + inner.html + '</a></body></html>';
}

// STIL 1: Overlay – text över helbild med toning (funkar i alla format).
function adgenOverlayLayout(p) {
  const w = p.w, h = p.h, shortH = p.shortH;
  const pad = shortH ? 12 : (w < 320 ? 12 : 22);
  const hSize = shortH ? Math.min(18, Math.round(h/5)) : (h > w*1.3 ? 22 : (w < 320 ? 17 : Math.min(32, Math.round(w/20))));
  const sSize = shortH ? 11 : 14;
  const ctaSize = shortH ? 11 : 13;
  const vertical = h > w * 1.3;
  const dir = shortH ? 'row' : 'column';
  const align = shortH ? 'center;justify-content:space-between' : (vertical ? 'flex-start;justify-content:flex-end' : 'flex-start;justify-content:center');
  const css =
    '.b-img{position:absolute;inset:0;background-image:url(' + p.img + ');background-size:cover;background-position:center}' +
    '.b-ov{position:absolute;inset:0;background:linear-gradient(' + (vertical?'0deg':'90deg') + ',rgba(20,14,8,0.85) 0%,rgba(20,14,8,0.5) 55%,rgba(20,14,8,0.12) 100%)}' +
    '.b-c{position:absolute;inset:0;padding:' + pad + 'px;display:flex;flex-direction:' + dir + ';align-items:' + align + ';z-index:1;gap:' + (shortH?'10px':'0') + 'px}' +
    '.b-txt{display:flex;flex-direction:column;min-width:0}' +
    '.b-h{color:#fff;font-size:' + hSize + 'px;font-weight:800;line-height:1.1;letter-spacing:-0.02em;margin-bottom:' + (shortH?'2':'7') + 'px;text-shadow:0 1px 3px rgba(0,0,0,0.3)}' +
    '.b-s{color:rgba(255,255,255,0.9);font-size:' + sSize + 'px;line-height:1.35;' + (shortH?'':'margin-bottom:14px;') + '}' +
    '.b-cta{display:inline-flex;align-items:center;gap:5px;align-self:flex-start;background:' + p.accent + ';color:' + p.onAccent + ';font-size:' + ctaSize + 'px;font-weight:700;padding:' + (shortH?'7px 13px':'9px 17px') + ';border-radius:8px;white-space:nowrap;flex-shrink:0}';
  const html = '<div class="b-img"></div><div class="b-ov"></div>' + p.logoHtml +
    '<div class="b-c"><div class="b-txt">' +
    (p.headline ? '<div class="b-h">' + p.headline + '</div>' : '') +
    (p.subline && !shortH ? '<div class="b-s">' + p.subline + '</div>' : '') +
    '</div>' + (p.cta ? '<span class="b-cta">' + p.cta + ' <span style="font-size:0.9em">\u2192</span></span>' : '') + '</div>';
  return { css:css, html:html };
}

// STIL 2: Band – bild upptill, färgat band med text nedtill.
function adgenBandLayout(p) {
  const w = p.w, h = p.h;
  const bandH = Math.round(h * 0.42);
  const hSize = Math.min(30, Math.round(w/22));
  const css =
    '.b-img{position:absolute;top:0;left:0;right:0;height:' + (h-bandH) + 'px;background-image:url(' + p.img + ');background-size:cover;background-position:center}' +
    '.b-band{position:absolute;bottom:0;left:0;right:0;height:' + bandH + 'px;background:' + p.accent + ';padding:14px 18px;display:flex;flex-direction:column;justify-content:center}' +
    '.b-h{color:' + p.onAccent + ';font-size:' + hSize + 'px;font-weight:800;line-height:1.1;letter-spacing:-0.02em;margin-bottom:5px}' +
    '.b-s{color:' + p.onAccent + ';opacity:0.85;font-size:13px;line-height:1.3;margin-bottom:9px}' +
    '.b-cta{display:inline-flex;align-items:center;gap:5px;align-self:flex-start;background:' + p.onAccent + ';color:' + p.accent + ';font-size:12px;font-weight:700;padding:7px 14px;border-radius:7px;white-space:nowrap}';
  const html = '<div class="b-img"></div>' + p.logoHtml + '<div class="b-band">' +
    (p.headline ? '<div class="b-h">' + p.headline + '</div>' : '') +
    (p.subline ? '<div class="b-s">' + p.subline + '</div>' : '') +
    (p.cta ? '<span class="b-cta">' + p.cta + ' <span style="font-size:0.9em">\u2192</span></span>' : '') + '</div>';
  return { css:css, html:html };
}

// STIL 3: Delad – bild på ena halvan, färgad yta med text på andra.
function adgenSplitLayout(p) {
  const w = p.w, h = p.h;
  const vertical = h > w;
  const hSize = Math.min(28, Math.round((vertical?w:w/2)/16));
  const imgStyle = vertical
    ? 'top:0;left:0;right:0;height:50%'
    : 'top:0;left:0;bottom:0;width:50%';
  const areaStyle = vertical
    ? 'bottom:0;left:0;right:0;height:50%'
    : 'top:0;right:0;bottom:0;width:50%';
  const css =
    '.b-img{position:absolute;' + imgStyle + ';background-image:url(' + p.img + ');background-size:cover;background-position:center}' +
    '.b-area{position:absolute;' + areaStyle + ';background:' + p.accent + ';padding:16px 18px;display:flex;flex-direction:column;justify-content:center}' +
    '.b-h{color:' + p.onAccent + ';font-size:' + hSize + 'px;font-weight:800;line-height:1.12;letter-spacing:-0.02em;margin-bottom:6px}' +
    '.b-s{color:' + p.onAccent + ';opacity:0.85;font-size:13px;line-height:1.35;margin-bottom:12px}' +
    '.b-cta{display:inline-flex;align-items:center;gap:5px;align-self:flex-start;background:' + p.onAccent + ';color:' + p.accent + ';font-size:12px;font-weight:700;padding:7px 14px;border-radius:7px;white-space:nowrap}';
  const html = '<div class="b-img"></div>' + p.logoHtml + '<div class="b-area">' +
    (p.headline ? '<div class="b-h">' + p.headline + '</div>' : '') +
    (p.subline ? '<div class="b-s">' + p.subline + '</div>' : '') +
    (p.cta ? '<span class="b-cta">' + p.cta + ' <span style="font-size:0.9em">\u2192</span></span>' : '') + '</div>';
  return { css:css, html:html };
}

let _adgenImage = null;
let _adgenImageDataUrl = null;
let _adgenLogo = null;
let _adgenLogoDataUrl = null;
let _adgenFormats = [];
let _adgenCopyData = null;

function adgenHandleLogo(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      _adgenLogo = img;
      _adgenLogoDataUrl = e.target.result;
      const preview = document.getElementById('adgen-logo-preview');
      preview.src = e.target.result;
      preview.style.display = 'block';
      document.getElementById('adgen-logo-zone').style.borderColor = '#C9A84C';
      document.getElementById('adgen-logo-pos-field').style.display = 'block';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function adgenHandleFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      _adgenImage = img;
      _adgenImageDataUrl = e.target.result;
      const preview = document.getElementById('adgen-preview');
      preview.src = e.target.result;
      preview.style.display = 'block';
      document.getElementById('adgen-upload-zone').style.borderColor = '#C9A84C';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function adgenToggleFmt(el, id) {
  el.classList.toggle('sel');
  if (el.classList.contains('sel')) {
    if (!_adgenFormats.includes(id)) _adgenFormats.push(id);
  } else {
    _adgenFormats = _adgenFormats.filter(f => f !== id);
  }
}

async function generateAdGen() {
  const company = document.getElementById('ac-company').value.trim();
  const product = document.getElementById('ac-product').value.trim();
  const message = document.getElementById('ac-message').value.trim();
  const cta     = document.getElementById('ac-cta').value.trim();
  const tone    = document.getElementById('ac-tone').value;
  const reference = document.getElementById('ac-reference').value.trim();
  const errEl   = document.getElementById('adcopy-error');
  errEl.style.display = 'none';

  if (!company) { showToolError('adcopy-error', 'Fyll i företagsnamn.'); return; }
  if (!product) { showToolError('adcopy-error', 'Fyll i produkt eller kampanj.'); return; }
  if (!message) { showToolError('adcopy-error', 'Fyll i huvudbudskap.'); return; }
  if (!cta)     { showToolError('adcopy-error', 'Fyll i call to action.'); return; }
  if (_adgenFormats.length === 0) { showToolError('adcopy-error', 'Välj minst ett annonsformat.'); return; }
  if (!_adgenImage) { showToolError('adcopy-error', 'Ladda upp en bild först.'); return; }

  document.getElementById('adcopy-btn').disabled = true;
  document.getElementById('adcopy-form-section').style.display = 'none';
  document.getElementById('adcopy-loading').style.display = 'block';

  const formatEntries = _adgenFormats.map(function(id){
    const f = ADGEN_FORMATS[id];
    const shape = f.h > f.w * 1.3 ? 'stående helskärm' : (f.w > f.h * 2.5 ? 'liggande smal banner' : (f.w > f.h ? 'liggande' : 'kvadratisk/stående'));
    return '"' + id + '": { "headline": "...", "subline": "...", "cta": "..." }  // ' + f.label + ' (' + f.w + '×' + f.h + ', ' + shape + ')';
  }).join(',\n  ');

  const prompt = 'Du är en senior copywriter specialiserad på digital displayannonsering med bevisat höga konverteringsgrader. Du vet att mottagaren har 1-2 sekunder och skannar – inte läser. Du skriver annonstext som går fram direkt.\n\n' +
    'RAMVERK FÖR STARK DISPLAYANNONS:\n' +
    '- ETT budskap per annons. En huvudpoäng, ett värde, en handling. Aldrig flera budskap i samma annons.\n' +
    '- Led med nyttan för mottagaren ("vad får jag ut av det?"), inte företagets perspektiv eller en funktionslista.\n' +
    '- Minimal text: rubriken är ofta 3-7 ord, sublinen kort eller tom. Hela annonsen bör kännas som 5-10 ord totalt. Hellre för lite än för mycket.\n' +
    '- Konkret framför vagt. "Sänk dina kostnader – börja idag" slår "Vi erbjuder marknadens bästa lösningar". Undvik tomma superlativ ("bäst", "marknadsledande") om de inte styrks.\n' +
    '- CTA ska vara kort och handlingsorienterad: t.ex. "Läs mer", "Upptäck", "Börja nu", "Se erbjudandet". Den ska kännas som en knapp man vill trycka på.\n' +
    '- Skriv ALDRIG in webbadresser (www), telefonnummer, e-post eller andra kontaktuppgifter i rubrik eller subline – klicklänken sköter det, och sådant skapar bara visuellt brus.\n' +
    '- Anpassa efter format: i smala banners (728×90, 320×50, 320×100) måste rubriken vara mycket kort (3-5 ord) och sublinen minimal eller tom. I stora stående format (1080×1920) finns plats för något mer, men håll det ändå stramt.\n' +
    '- Svenska som är naturlig och trovärdig – aldrig översatt reklamsvenska.\n\n' +
    'KAMPANJINFORMATION:\n' +
    'Företag: ' + company + '\n' +
    'Produkt/Kampanj: ' + product + '\n' +
    'Huvudbudskap: ' + message + '\n' +
    'Önskad call to action: ' + cta + '\n' +
    (tone ? 'Ton: ' + tone + '\n' : '') +
    (reference ? '\nREFERENS / STILRIKTNING (efterlikna tonen och känslan i detta, men skriv originaltext – kopiera inte ordagrant):\n"' + reference + '"\n' : '') +
    '\nSkriv anpassad copy för varje format nedan. Varje format har olika dimensioner och proportioner – anpassa rubrikens och sublinens längd därefter. Kom ihåg: ett budskap, minimal text, tydlig CTA. CTA kan varieras något men ska ligga nära den önskade.\n\n' +
    'Returnera ENBART ett giltigt JSON-objekt (inga kommentarer i själva svaret) med exakt ett fält per format-id:\n{\n  ' + formatEntries + '\n}';

  try {
    const data = await safeFetch([{ role: 'user', content: prompt }], 80000, 'ad-copy');
    const raw = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    _adgenCopyData = JSON.parse(clean);

    document.getElementById('adcopy-loading').style.display = 'none';
    document.getElementById('adcopy-result').style.display = 'block';
    renderAdGenResult();
    window.scrollTo({ top: 0, behavior: 'smooth' });

  } catch(e) {
    document.getElementById('adcopy-loading').style.display = 'none';
    document.getElementById('adcopy-form-section').style.display = 'block';
    document.getElementById('adcopy-btn').disabled = false;
    showToolError('adcopy-error', e.message, generateAdGen);
  }
}

function renderAdGenResult() {
  const grid = document.getElementById('adgen-result-grid');
  grid.innerHTML = '';
  _adgenFormats.forEach(function(formatId) {
    const fmt  = ADGEN_FORMATS[formatId];
    const copy = _adgenCopyData[formatId] || {};
    const scale = Math.min(1, 480 / fmt.w);
    const dispW = Math.round(fmt.w * scale);
    const dispH = Math.round(fmt.h * scale);
    const card = document.createElement('div');
    card.className = 'adgen-result-card';
    let html = '<div class="adgen-result-label">' + fmt.label + '</div>' +
      '<div class="adgen-canvas-wrap" style="height:' + dispH + 'px">' +
        '<canvas id="canvas-' + formatId + '" width="' + fmt.w + '" height="' + fmt.h + '" style="width:' + dispW + 'px;height:' + dispH + 'px"></canvas>' +
      '</div>' +
      '<button class="adgen-dl-btn" onclick="adgenDownload(\'' + formatId + '\')">' +
        '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 1v8M3 6l3.5 3.5L10 6"/><path d="M1 11h11"/></svg>' +
        'Ladda ner PNG (' + fmt.w + 'x' + fmt.h + ')' +
      '</button>';
    if (fmt.html5) {
      html +=
      '<div style="margin-top:14px;padding-top:14px;border-top:1px solid #F0EEE8">' +
        '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#C9A84C;margin-bottom:8px">HTML5-banner · live</div>' +
        '<div class="adgen-canvas-wrap" style="height:' + dispH + 'px;overflow:hidden">' +
          '<iframe id="iframe-' + formatId + '" style="width:' + fmt.w + 'px;height:' + fmt.h + 'px;border:0;transform:scale(' + scale + ');transform-origin:top left" scrolling="no"></iframe>' +
        '</div>' +
        '<button class="adgen-dl-btn" onclick="adgenDownloadHtml(\'' + formatId + '\')">' +
          '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 1v8M3 6l3.5 3.5L10 6"/><path d="M1 11h11"/></svg>' +
          'Ladda ner HTML (' + fmt.w + 'x' + fmt.h + ')' +
        '</button>' +
      '</div>';
    }
    card.innerHTML = html;
    grid.appendChild(card);
    drawAd(formatId, fmt, copy);
    if (fmt.html5) {
      const iframe = document.getElementById('iframe-' + formatId);
      if (iframe) iframe.srcdoc = buildBannerHtml(fmt, copy);
    }
  });
}

function adgenDownloadHtml(formatId) {
  const fmt = ADGEN_FORMATS[formatId];
  const copy = (_adgenCopyData && _adgenCopyData[formatId]) || {};
  const html = buildBannerHtml(fmt, copy);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'banner-' + formatId + '-' + fmt.w + 'x' + fmt.h + '.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function drawAd(formatId, fmt, copy) {
  const canvas = document.getElementById('canvas-' + formatId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = fmt.w, H = fmt.h;

  // Läs kundens stil + färg (samma källa som HTML-bannern).
  const brand = adgenBrandStyle();
  let style = brand.style;
  // Band/split behöver yta – tvinga overlay i låga/smala format.
  if (H < 130 || W < 250) style = 'overlay';

  const parts = { ctx:ctx, W:W, H:H, copy:copy, accent:brand.color, onAccent:adgenTextOn(brand.color) };
  if (style === 'band')       drawAdBand(parts);
  else if (style === 'split') drawAdSplit(parts);
  else                        drawAdOverlay(parts);

  drawAdLogo(ctx, W, H);
}

// Ritar loggan i valt hörn (gemensam för alla stilar).
function drawAdLogo(ctx, W, H) {
  if (!_adgenLogo) return;
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 6;
  const pos = (document.getElementById('ac-logo-pos') || {}).value || 'bottom-right';
  const lr = Math.min((W*0.22) / _adgenLogo.width, (H*0.14) / _adgenLogo.height);
  const lw = _adgenLogo.width * lr, lh = _adgenLogo.height * lr;
  const m = Math.round(W * 0.04);
  let lx = m, ly = m;
  if (pos.indexOf('right') > -1) lx = W - lw - m;
  if (pos.indexOf('bottom') > -1) ly = H - lh - m;
  ctx.drawImage(_adgenLogo, lx, ly, lw, lh);
  ctx.restore();
}

// Hjälpare: rita bakgrundsbilden beskuren till en yta (x,y,w,h på canvasen).
function drawAdImageInto(ctx, x, y, w, h) {
  if (!_adgenImage) { ctx.fillStyle = '#1a1a2e'; ctx.fillRect(x, y, w, h); return; }
  const ia = _adgenImage.width / _adgenImage.height;
  const ca = w / h;
  let sx = 0, sy = 0, sw = _adgenImage.width, sh = _adgenImage.height;
  if (ia > ca) { sw = _adgenImage.height * ca; sx = (_adgenImage.width - sw) / 2; }
  else         { sh = _adgenImage.width / ca;  sy = (_adgenImage.height - sh) / 2; }
  ctx.drawImage(_adgenImage, sx, sy, sw, sh, x, y, w, h);
}

// STIL 1: Overlay – helbild med toning, text över.
function drawAdOverlay(p) {
  const ctx = p.ctx, W = p.W, H = p.H, copy = p.copy;
  drawAdImageInto(ctx, 0, 0, W, H);
  const isWide = W / H > 3;
  const grad = ctx.createLinearGradient(0, isWide ? 0 : H * 0.3, 0, H);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.85)');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
  const padding = Math.round(W * 0.055);
  const isPortrait = H > W;
  const headlineSz = isWide ? Math.round(H * 0.28) : Math.round(W * 0.072);
  const sublineSz  = isWide ? Math.round(H * 0.16) : Math.round(W * 0.04);
  const ctaSz      = isWide ? Math.round(H * 0.14) : Math.round(W * 0.034);
  let baseY = isPortrait ? H * 0.72 : (isWide ? H * 0.28 : H * 0.56);
  ctx.textBaseline = 'top';
  ctx.fillStyle = p.accent;
  ctx.fillRect(padding, baseY - Math.round(W * 0.022), Math.round(W * 0.08), Math.round(Math.max(3, H * 0.008)));
  ctx.font = '700 ' + headlineSz + 'px -apple-system,Arial,sans-serif';
  ctx.fillStyle = '#ffffff'; ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 8;
  wrapText(ctx, copy.headline || '', padding, baseY, W - padding * 2, headlineSz * 1.2);
  const hlLines = estimateLines(ctx, copy.headline || '', W - padding * 2);
  const afterHL = baseY + hlLines * headlineSz * 1.2 + Math.round(W * 0.018);
  ctx.font = '400 ' + sublineSz + 'px -apple-system,Arial,sans-serif';
  ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.shadowBlur = 4;
  wrapText(ctx, copy.subline || '', padding, afterHL, W - padding * 2, sublineSz * 1.5);
  const slLines = estimateLines(ctx, copy.subline || '', W - padding * 2);
  const afterSL = afterHL + slLines * sublineSz * 1.5 + Math.round(W * 0.025);
  ctx.font = '600 ' + ctaSz + 'px -apple-system,Arial,sans-serif';
  ctx.shadowBlur = 0;
  const ctaText = copy.cta || '';
  const ctaW = ctx.measureText(ctaText).width + ctaSz * 1.6;
  const ctaH = ctaSz * 1.8;
  const ctaY = Math.min(afterSL, H - ctaH - padding);
  ctx.fillStyle = p.accent;
  roundRect(ctx, padding, ctaY, ctaW, ctaH, ctaH * 0.2);
  ctx.fillStyle = p.onAccent; ctx.textBaseline = 'middle';
  ctx.fillText(ctaText, padding + ctaSz * 0.8, ctaY + ctaH / 2);
}

// STIL 2: Band – bild upptill, färgat band med text nedtill.
function drawAdBand(p) {
  const ctx = p.ctx, W = p.W, H = p.H, copy = p.copy;
  const bandH = Math.round(H * 0.42);
  drawAdImageInto(ctx, 0, 0, W, H - bandH);
  ctx.fillStyle = p.accent;
  ctx.fillRect(0, H - bandH, W, bandH);
  const pad = Math.round(W * 0.05);
  const headlineSz = Math.round(W * 0.06);
  const sublineSz = Math.round(W * 0.035);
  const ctaSz = Math.round(W * 0.032);
  let y = H - bandH + Math.round(bandH * 0.16);
  ctx.textBaseline = 'top';
  ctx.font = '800 ' + headlineSz + 'px -apple-system,Arial,sans-serif';
  ctx.fillStyle = p.onAccent; ctx.shadowBlur = 0;
  wrapText(ctx, copy.headline || '', pad, y, W - pad*2, headlineSz*1.15);
  const hlLines = estimateLines(ctx, copy.headline || '', W - pad*2);
  y += hlLines * headlineSz * 1.15 + Math.round(H*0.012);
  if (copy.subline) {
    ctx.font = '400 ' + sublineSz + 'px -apple-system,Arial,sans-serif';
    ctx.globalAlpha = 0.85;
    wrapText(ctx, copy.subline, pad, y, W - pad*2, sublineSz*1.35);
    ctx.globalAlpha = 1;
    y += estimateLines(ctx, copy.subline, W - pad*2) * sublineSz * 1.35 + Math.round(H*0.015);
  }
  if (copy.cta) {
    ctx.font = '700 ' + ctaSz + 'px -apple-system,Arial,sans-serif';
    const ctaW = ctx.measureText(copy.cta).width + ctaSz * 1.6;
    const ctaH = ctaSz * 1.9;
    const ctaY = Math.min(y, H - ctaH - pad*0.6);
    ctx.fillStyle = p.onAccent;
    roundRect(ctx, pad, ctaY, ctaW, ctaH, ctaH*0.18);
    ctx.fillStyle = p.accent; ctx.textBaseline = 'middle';
    ctx.fillText(copy.cta, pad + ctaSz*0.8, ctaY + ctaH/2);
  }
}

// STIL 3: Delad – bild på ena halvan, färgad yta med text på andra.
function drawAdSplit(p) {
  const ctx = p.ctx, W = p.W, H = p.H, copy = p.copy;
  const vertical = H > W;
  if (vertical) {
    drawAdImageInto(ctx, 0, 0, W, H/2);
    ctx.fillStyle = p.accent; ctx.fillRect(0, H/2, W, H/2);
  } else {
    drawAdImageInto(ctx, 0, 0, W/2, H);
    ctx.fillStyle = p.accent; ctx.fillRect(W/2, 0, W/2, H);
  }
  const areaX = vertical ? 0 : W/2;
  const areaY = vertical ? H/2 : 0;
  const areaW = vertical ? W : W/2;
  const areaH = vertical ? H/2 : H;
  const pad = Math.round(areaW * 0.09);
  const headlineSz = Math.round(areaW * 0.075);
  const sublineSz = Math.round(areaW * 0.045);
  const ctaSz = Math.round(areaW * 0.04);
  let y = areaY + Math.round(areaH * 0.2);
  ctx.textBaseline = 'top'; ctx.shadowBlur = 0;
  ctx.font = '800 ' + headlineSz + 'px -apple-system,Arial,sans-serif';
  ctx.fillStyle = p.onAccent;
  wrapText(ctx, copy.headline || '', areaX + pad, y, areaW - pad*2, headlineSz*1.15);
  const hlLines = estimateLines(ctx, copy.headline || '', areaW - pad*2);
  y += hlLines * headlineSz * 1.15 + Math.round(areaH*0.03);
  if (copy.subline) {
    ctx.font = '400 ' + sublineSz + 'px -apple-system,Arial,sans-serif';
    ctx.globalAlpha = 0.85;
    wrapText(ctx, copy.subline, areaX + pad, y, areaW - pad*2, sublineSz*1.35);
    ctx.globalAlpha = 1;
    y += estimateLines(ctx, copy.subline, areaW - pad*2) * sublineSz * 1.35 + Math.round(areaH*0.03);
  }
  if (copy.cta) {
    ctx.font = '700 ' + ctaSz + 'px -apple-system,Arial,sans-serif';
    const ctaW = ctx.measureText(copy.cta).width + ctaSz * 1.6;
    const ctaH = ctaSz * 1.9;
    ctx.fillStyle = p.onAccent;
    roundRect(ctx, areaX + pad, y, ctaW, ctaH, ctaH*0.18);
    ctx.fillStyle = p.accent; ctx.textBaseline = 'middle';
    ctx.fillText(copy.cta, areaX + pad + ctaSz*0.8, y + ctaH/2);
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  if (!text) return;
  const words = text.split(' ');
  let line = '', curY = y;
  words.forEach(function(word, i) {
    const test = line + (line ? ' ' : '') + word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, curY); line = word; curY += lineHeight;
    } else { line = test; }
    if (i === words.length - 1) ctx.fillText(line, x, curY);
  });
}

function estimateLines(ctx, text, maxWidth) {
  if (!text) return 0;
  const words = text.split(' ');
  let line = '', lines = 1;
  words.forEach(function(word) {
    const test = line + (line ? ' ' : '') + word;
    if (ctx.measureText(test).width > maxWidth && line) { lines++; line = word; }
    else line = test;
  });
  return lines;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath(); ctx.fill();
}

function adgenDownload(formatId) {
  const canvas = document.getElementById('canvas-' + formatId);
  if (!canvas) return;
  const fmt = ADGEN_FORMATS[formatId];
  const link = document.createElement('a');
  link.download = 'annons-' + fmt.label.toLowerCase().replace(/\s/g,'-') + '-' + fmt.w + 'x' + fmt.h + '.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function adgenReset() {
  _adgenImage = null; _adgenImageDataUrl = null; _adgenLogo = null; _adgenLogoDataUrl = null; _adgenFormats = []; _adgenCopyData = null;
  const prev = document.getElementById('adgen-preview');
  if (prev) { prev.style.display='none'; prev.src=''; }
  const logoPrev = document.getElementById('adgen-logo-preview');
  if (logoPrev) { logoPrev.style.display='none'; logoPrev.src=''; }
  const logoPosField = document.getElementById('adgen-logo-pos-field');
  if (logoPosField) logoPosField.style.display='none';
  const logoZone = document.getElementById('adgen-logo-zone');
  if (logoZone) logoZone.style.borderColor = '';
  const zone = document.getElementById('adgen-upload-zone');
  if (zone) zone.style.borderColor = '';
  document.querySelectorAll('.adgen-fmt').forEach(function(el){ el.classList.remove('sel'); });
  ['ac-company','ac-product','ac-message','ac-cta','ac-reference'].forEach(function(id){
    const el = document.getElementById(id); if (el) el.value='';
  });
  const tone = document.getElementById('ac-tone'); if (tone) tone.value='';
  const grid = document.getElementById('adgen-result-grid'); if (grid) grid.innerHTML='';
  document.getElementById('adcopy-result').style.display='none';
  document.getElementById('adcopy-form-section').style.display='block';
  document.getElementById('adcopy-btn').disabled=false;
  window.scrollTo(0,0);
}

function generateAdCopy(){ generateAdGen(); }
function adcopyReset(){ adgenReset(); }
function renderAdCopyFormats(){}

/* ── Nav scroll + balk animations ── */
(function(){
  var nav = document.querySelector('.site-nav');
  var logo = document.getElementById('nav-logo');
  var btn  = document.getElementById('nav-btn-testa');
  if(!nav) return;
  var vh = window.innerHeight;
  function updateNav(){
    var y = window.scrollY;
    var t = Math.min(1, y / (vh * 0.4));
    nav.style.background = 'rgba(255,255,255,' + (t * 0.92) + ')';
    nav.style.borderBottomColor = 'rgba(0,0,0,' + (t * 0.08) + ')';
    if(logo){ logo.classList.toggle('on-light', t > 0.5); logo.classList.toggle('on-dark', t <= 0.5); }
    if(btn)  { btn.style.background = t > 0.5 ? '#1d1d1f' : '#fff'; btn.style.color = t > 0.5 ? '#fff' : '#1d1d1f'; }
  }
  window.addEventListener('scroll', updateNav, {passive:true});
  updateNav();
})();

(function(){
  var balks = document.querySelectorAll('[id^="balk-"]');
  if(!balks.length) return;
  balks.forEach(function(b){
    b.style.opacity='0'; b.style.transform='translateY(28px)';
    b.style.transition='opacity 0.7s ease,transform 0.7s ease';
  });
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.style.opacity='1'; e.target.style.transform='translateY(0)';
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.06});
  balks.forEach(function(b){ obs.observe(b); });
})();

(function(){
  var imgs = document.querySelectorAll('[id^="balk-"] img');
  if(!imgs.length) return;
  imgs.forEach(function(img){ img.style.transform='scale(1.08)'; });
  function onParallax(){
    imgs.forEach(function(img){
      var rect = img.closest('[id^="balk-"]').getBoundingClientRect();
      var center = rect.top + rect.height/2;
      var offset = (window.innerHeight/2 - center)*0.08;
      img.style.transform='translateY('+offset+'px) scale(1.08)';
    });
  }
  window.addEventListener('scroll', onParallax, {passive:true});
  onParallax();
})();

</script>
</body>
</html>
