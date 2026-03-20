'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const html = document.documentElement;
    const tb = document.getElementById('themeBtn');
    const saved = localStorage.getItem('koma-theme') || 'dark';
    html.setAttribute('data-theme', saved);
    if (tb) tb.textContent = saved === 'dark' ? '☀︎' : '☾';

    tb?.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('koma-theme', next);
      if (tb) tb.textContent = next === 'dark' ? '☀︎' : '☾';
    });

    const ro = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => ro.observe(el));

    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      document.querySelectorAll<HTMLElement>('.float-img').forEach((el, i) => {
        const d = [9, 13, 7, 11, 5, 8][i] || 9;
        el.style.transform = `translate(${dx * d}px, ${dy * d}px)`;
      });

      document.querySelectorAll<HTMLElement>('.svc-row').forEach((row) => {
        const rect = row.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        row.style.setProperty('--glow-x', `${x}px`);
        row.style.setProperty('--glow-y', `${y}px`);
        const isNear = e.clientX > rect.left - 50 && e.clientX < rect.right + 50 &&
                       e.clientY > rect.top - 50 && e.clientY < rect.bottom + 50;
        row.style.setProperty('--glow-opacity', isNear ? '1' : '0');
      });
    };
    document.addEventListener('mousemove', handleMouse);

    const bar = document.getElementById('cookieBar');
    if (!localStorage.getItem('koma-cookie') && bar) {
      setTimeout(() => bar.classList.add('show'), 2000);
    }
    document.getElementById('cYes')?.addEventListener('click', () => {
      localStorage.setItem('koma-cookie', '1');
      bar?.classList.remove('show');
    });
    document.getElementById('cNo')?.addEventListener('click', () => {
      localStorage.setItem('koma-cookie', '0');
      bar?.classList.remove('show');
    });

    const form = document.getElementById('contactForm') as HTMLFormElement;
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const b = form.querySelector('.btn-send') as HTMLButtonElement;
      b.textContent = 'Siunčiama...';
      b.disabled = true;
      try {
        const r = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (r.ok) {
          form.reset();
          const ok = document.getElementById('formOk');
          if (ok) ok.style.display = 'block';
          b.style.display = 'none';
        } else {
          b.textContent = 'Klaida — bandykite vėl';
          b.disabled = false;
        }
      } catch {
        b.textContent = 'Klaida — bandykite vėl';
        b.disabled = false;
      }
    });

    return () => {
      document.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --bg: #f5f4f0; --bg2: #eeede9; --surface: #ffffff; --surface2: #f0efe9;
          --border: rgba(0,0,0,0.08); --border-strong: rgba(0,0,0,0.12);
          --text: #1a1916; --text-muted: #6b6860; --text-dim: #b0aea8;
          --pill-bg: rgba(255,255,255,0.72); --pill-border: rgba(0,0,0,0.08);
          --shadow: 0 2px 24px rgba(0,0,0,0.07);
          --shadow-lg: 0 8px 48px rgba(0,0,0,0.12);
          --blur: blur(20px);
          --btn-bg: #1a1916;
          --btn-text: #f0ede8;
        }
        [data-theme="dark"] {
          --bg: #0c0c0b; --bg2: #111110; --surface: #161614; --surface2: #1e1e1c;
          --border: rgba(255,255,255,0.07); --border-strong: rgba(255,255,255,0.1);
          --text: #f0ede8; --text-muted: #908d87; --text-dim: #4a4844;
          --pill-bg: rgba(22,22,20,0.85); --pill-border: rgba(255,255,255,0.08);
          --shadow: 0 2px 24px rgba(0,0,0,0.4); --shadow-lg: 0 8px 48px rgba(0,0,0,0.6);
          --btn-bg: #f0ede8;
          --btn-text: #0c0c0b;
        }

        @keyframes lavaFlow {
          0%   { background-position: 0% 0%; }
          25%  { background-position: 100% 0%; }
          50%  { background-position: 100% 100%; }
          75%  { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes f1 { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-18px) rotate(1deg)} }
        @keyframes f2 { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(-22px) rotate(-1deg)} }
        @keyframes f3 { 0%,100%{transform:translateY(-8px) rotate(-1deg)} 50%{transform:translateY(12px) rotate(2deg)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blobSpin { from{filter:blur(32px) saturate(1.3) hue-rotate(0deg)} to{filter:blur(32px) saturate(1.6) hue-rotate(360deg)} }

        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400&display=swap');

        body { background: var(--bg); color: var(--text); font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 300; transition: background 0.4s, color 0.4s; }

        /* ── LAVA MYGTUKAS — pagrindas ── */
       .lava-btn {
  position: relative;
  overflow: hidden;
  background: var(--btn-bg);
  color: var(--btn-text) !important;
  border: none;
  outline: none;
  box-shadow: none;
  cursor: pointer;
  transition: transform 0.2s;
  -webkit-text-fill-color: var(--btn-text) !important;
  text-decoration: none;
}
        .lava-btn .btn-label {
          position: relative;
          z-index: 2;
          color: var(--btn-text);
          -webkit-text-fill-color: var(--btn-text);
          transition: color 0.3s;
          pointer-events: none;
        }
        .lava-btn::before {
          content: '';
          position: absolute;
          inset: 0;
         background: linear-gradient(135deg,
  #0d1b4b 0%,
  #1a0533 40%,
  #0a1628 70%,
  #0d1b4b 100%
);
          background-size: 400% 400%;
          opacity: 0;
          transition: opacity 0.9s ease;
          animation: lavaFlow 10s ease infinite paused;
          z-index: 1;
        }
        .lava-btn:hover::before {
          opacity: 1;
          animation-play-state: running;
        }
        .lava-btn:hover .btn-label {
          color: #ffffff;
          -webkit-text-fill-color: #ffffff;
        }
        .lava-btn:hover { transform: translateY(-1px); }

        /* ── NAV ── */
        nav { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 100; background: var(--pill-bg); border: 1px solid var(--pill-border); backdrop-filter: var(--blur); -webkit-backdrop-filter: var(--blur); border-radius: 100px; padding: 10px 10px 10px 24px; display: flex; align-items: center; gap: 4px; box-shadow: var(--shadow); white-space: nowrap; transition: background 0.4s; }
        .nav-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px; letter-spacing: 0.04em; color: var(--text); text-decoration: none; margin-right: 8px; }
        .nav-logo .dot {
          background: linear-gradient(135deg, #0d1b4b, #3a1a6e, #0d1b4b);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        [data-theme="dark"] .nav-logo .dot {
          background: linear-gradient(135deg, #4a6fa5, #7b4fa5, #4a6fa5);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        .nav-links { display: flex; align-items: center; gap: 2px; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-size: 13px; font-weight: 400; padding: 8px 16px; border-radius: 100px; transition: color 0.2s, background 0.2s; }
        .nav-links a:hover { color: var(--text); background: var(--border); }
        .nav-cta { padding: 10px 20px !important; border-radius: 100px; font-weight: 500 !important; font-size: 13px !important; text-decoration: none !important; display: inline-flex !important; align-items: center !important; }
        .theme-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-strong); background: transparent; color: var(--text-muted); font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; margin-left: 6px; }
        .theme-btn:hover { background: var(--border); color: var(--text); }

        /* ── HERO ── */
        #hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 48px 80px; position: relative; overflow: hidden; }
        .float-img { position: absolute; border-radius: 20px; overflow: hidden; box-shadow: var(--shadow-lg); will-change: transform; }
        .float-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, var(--surface2), var(--bg2)); }
        .fi-1 { width: 175px; height: 215px; top: 14%; left: 4%; animation: f1 7s ease-in-out infinite; }
        .fi-2 { width: 140px; height: 170px; top: 7%; right: 11%; animation: f2 9s ease-in-out infinite; }
        .fi-3 { width: 155px; height: 195px; bottom: 17%; left: 7%; animation: f3 8s ease-in-out infinite; }
        .fi-4 { width: 145px; height: 180px; bottom: 11%; right: 6%; animation: f1 10s ease-in-out infinite reverse; }
        .fi-5 { width: 115px; height: 145px; top: 42%; left: 0.5%; animation: f2 6s ease-in-out infinite; opacity: 0.65; }
        .fi-6 { width: 125px; height: 150px; top: 38%; right: 1.5%; animation: f3 11s ease-in-out infinite; opacity: 0.65; }

        .hero-eyebrow { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.2em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 28px; opacity: 0; animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.1s forwards; }
        .hero-title { font-family: 'Instrument Serif', serif; font-size: clamp(52px, 8vw, 108px); line-height: 1.04; letter-spacing: -0.025em; font-weight: 400; max-width: 860px; opacity: 0; animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.25s forwards; }
        .hero-title em {
          font-style: italic;
          background: linear-gradient(135deg, #0d1b4b, #3a1a6e, #0d1b4b);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        [data-theme="dark"] .hero-title em {
          background: linear-gradient(135deg, #4a6fa5, #7b4fa5, #4a6fa5);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        .hero-sub { margin-top: 28px; font-size: 17px; color: var(--text-muted); font-weight: 300; line-height: 1.65; max-width: 420px; opacity: 0; animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s forwards; }
        .hero-actions { margin-top: 40px; display: flex; gap: 12px; align-items: center; justify-content: center; opacity: 0; animation: fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.55s forwards; }
        .btn-primary-wrap { padding: 14px 28px; border-radius: 100px; font-size: 14px; font-weight: 500; text-decoration: none; font-family: 'Plus Jakarta Sans', sans-serif; display: inline-block; background: var(--btn-bg) !important; }
        .btn-ghost { color: var(--text-muted); padding: 13px 22px; border-radius: 100px; font-size: 14px; font-weight: 400; text-decoration: none; font-family: 'Plus Jakarta Sans', sans-serif; border: 1px solid var(--border-strong); transition: color 0.2s, border-color 0.2s; }
        .btn-ghost:hover { color: var(--text); border-color: var(--text-muted); }

        /* ── MARQUEE ── */
        .marquee-wrap { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 14px 0; overflow: hidden; }
        .marquee-track { display: flex; animation: marquee 22s linear infinite; white-space: nowrap; }
        .marquee-item { display: inline-flex; align-items: center; gap: 24px; padding: 0 24px; font-size: 13px; font-weight: 400; color: var(--text-dim); letter-spacing: 0.05em; }
        .msep { opacity: 0.3; }

        /* ── SECTIONS ── */
        section { padding: 100px 48px; }
        .stag { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.18em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 56px; display: flex; align-items: center; gap: 12px; }
        .stag::before { content:''; width:24px; height:1px; background: var(--text-dim); flex-shrink:0; opacity: 0.3; }

        /* ── APIE ── */
        #apie { background: var(--bg2); border-top: 1px solid var(--border); }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .about-h { font-family: 'Instrument Serif', serif; font-size: clamp(36px, 4vw, 56px); line-height: 1.15; font-weight: 400; letter-spacing: -0.02em; }
        .about-h em {
          font-style: italic;
          background: linear-gradient(135deg, #0d1b4b, #3a1a6e, #0d1b4b);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        [data-theme="dark"] .about-h em {
          background: linear-gradient(135deg, #4a6fa5, #7b4fa5, #4a6fa5);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 52px; padding-top: 44px; border-top: 1px solid var(--border); }
        .sn { font-family: 'Instrument Serif', serif; font-size: 48px; font-weight: 400; line-height: 1; color: var(--text); }
        .sl { font-size: 13px; color: var(--text-dim); margin-top: 6px; }
        .about-p { font-size: 16px; line-height: 1.8; color: var(--text-muted); margin-bottom: 20px; }
        .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
        .pill { background: var(--surface); border: 1px solid var(--border-strong); padding: 8px 16px; border-radius: 100px; font-size: 13px; color: var(--text-muted); font-weight: 400; transition: all 0.3s; cursor: default; }
        .pill:hover { background: var(--btn-bg); color: var(--btn-text); border-color: transparent; }

        /* ── PASLAUGOS ── */
        #paslaugos { border-top: 1px solid var(--border); }
        .svc-title { font-family: 'Instrument Serif', serif; font-size: clamp(36px, 4vw, 56px); line-height: 1.1; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 56px; max-width: 460px; }
        .svc-list { display: flex; flex-direction: column; }
        .svc-row {
          --glow-x: 50%; --glow-y: 50%; --glow-opacity: 0;
          display: grid; grid-template-columns: 60px 1fr 28px; align-items: start; gap: 28px; padding: 40px 0; border-top: 1px solid var(--border); transition: padding-left 0.3s cubic-bezier(0.16,1,0.3,1); cursor: default; position: relative; overflow: hidden;
        }
        .svc-row::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(13,27,75,0.1), transparent 40%);
          opacity: var(--glow-opacity); transition: opacity 0.3s; pointer-events: none;
        }
        [data-theme="dark"] .svc-row::before {
          background: radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(74,111,165,0.08), transparent 40%);
        }
        .svc-row:last-child { border-bottom: 1px solid var(--border); }
        .svc-row:hover { padding-left: 8px; }
        .svc-n { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-dim); padding-top: 7px; }
        .svc-name { font-family: 'Instrument Serif', serif; font-size: 32px; font-weight: 400; letter-spacing: -0.01em; margin-bottom: 12px; transition: color 0.2s; color: var(--text); }
        .svc-row:hover .svc-name { color: var(--text-muted); }
        .svc-desc { font-size: 15px; color: var(--text-muted); line-height: 1.7; max-width: 500px; }
        .svc-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 18px; }
        .stag2 { background: var(--bg2); border: 1px solid var(--border); padding: 5px 12px; border-radius: 100px; font-size: 11px; color: var(--text-dim); font-family: 'DM Mono', monospace; letter-spacing: 0.05em; }
        .svc-arr { font-size: 18px; color: var(--text-dim); padding-top: 5px; transition: transform 0.3s; }
        .svc-row:hover .svc-arr { transform: translate(3px, -3px); }

        /* ── PORTFOLIO ── */
        #portfolio { background: var(--bg2); border-top: 1px solid var(--border); }
        .port-title { font-family: 'Instrument Serif', serif; font-size: clamp(36px, 4vw, 56px); line-height: 1.1; font-weight: 400; letter-spacing: -0.02em; margin-bottom: 52px; }
        .port-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .port-card { border-radius: 18px; overflow: hidden; background: var(--surface); border: 1px solid var(--border); aspect-ratio: 4/3; position: relative; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s; }
        .port-card:hover { transform: translateY(-6px) scale(1.01); box-shadow: var(--shadow-lg); }
        .port-inner { width: 100%; height: 100%; background: linear-gradient(135deg, var(--surface2), var(--bg2)); display: flex; align-items: center; justify-content: center; }
        .port-ph { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-dim); letter-spacing: 0.14em; }
        .port-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; background: linear-gradient(to top, rgba(0,0,0,0.55), transparent); opacity: 0; transition: opacity 0.3s; }
        .port-card:hover .port-info { opacity: 1; }
        .port-name { font-family: 'Instrument Serif', serif; font-size: 20px; color: white; font-weight: 400; }
        .port-type { font-family: 'DM Mono', monospace; font-size: 11px; color: rgba(255,255,255,0.55); letter-spacing: 0.1em; margin-top: 4px; }

        /* ── BLOB ── */
        #blob-sec { border-top: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: 0; }
        .blob-left { padding: 100px 80px 100px 48px; border-right: 1px solid var(--border); }
        .blob-right { padding: 100px 48px 100px 80px; display: flex; flex-direction: column; justify-content: center; }
        .blob-wrap { width: 100%; height: 300px; border-radius: 24px; overflow: hidden; background: conic-gradient(from 200deg at 40% 60%, #0d1b4b, #1a0533, #0a1628, #0d1b4b, #1a0533, #0d1b4b); filter: blur(32px) saturate(1.5); animation: blobSpin 16s linear infinite; }
        .blob-tag { display: inline-block; background: var(--surface2); border: 1px solid var(--border); padding: 8px 16px; border-radius: 100px; font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.15em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 20px; }
        .blob-title { font-family: 'Instrument Serif', serif; font-size: clamp(26px, 3vw, 40px); line-height: 1.2; font-weight: 400; letter-spacing: -0.01em; margin-bottom: 28px; }
        .blob-desc { font-size: 15px; color: var(--text-muted); line-height: 1.8; margin-bottom: 36px; }

        /* ── KONTAKTAI ── */
        #kontaktai { border-top: 1px solid var(--border); }
        .cont-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .cont-title { font-family: 'Instrument Serif', serif; font-size: clamp(36px, 4vw, 64px); line-height: 1.08; font-weight: 400; letter-spacing: -0.025em; margin-bottom: 22px; }
        .cont-title em {
          font-style: italic;
          background: linear-gradient(135deg, #0d1b4b, #3a1a6e, #0d1b4b);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        [data-theme="dark"] .cont-title em {
          background: linear-gradient(135deg, #4a6fa5, #7b4fa5, #4a6fa5);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        .cont-desc { font-size: 16px; color: var(--text-muted); line-height: 1.7; margin-bottom: 44px; }
        .cont-details { display: flex; flex-direction: column; gap: 22px; }
        .cd-l { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--text-dim); text-transform: uppercase; margin-bottom: 4px; }
        .cd-v { font-size: 15px; color: var(--text-muted); }
        .cform { display: flex; flex-direction: column; gap: 16px; }
        .fg { display: flex; flex-direction: column; gap: 8px; }
        .fl { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em; color: var(--text-dim); text-transform: uppercase; }
        .fi, .fta { background: var(--surface); border: 1px solid var(--border-strong); border-radius: 12px; color: var(--text); padding: 14px 18px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 300; outline: none; resize: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .fi:focus, .fta:focus { border-color: var(--text-dim); box-shadow: 0 0 0 3px rgba(13,27,75,0.06); }
        .fta { height: 140px; }
        .fr2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .btn-send-wrap { padding: 15px 32px; border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 500; align-self: flex-start; margin-top: 6px; }
        .form-ok { display: none; padding: 16px 20px; border-radius: 12px; background: var(--surface); border: 1px solid var(--border-strong); color: var(--text-muted); font-size: 14px; }

        /* ── FOOTER ── */
        footer { border-top: 1px solid var(--border); padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; background: var(--bg2); }
        .flogo { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; font-size: 14px; letter-spacing: 0.04em; }
        .flogo .dot {
          background: linear-gradient(135deg, #0d1b4b, #3a1a6e, #0d1b4b);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        [data-theme="dark"] .flogo .dot {
          background: linear-gradient(135deg, #4a6fa5, #7b4fa5, #4a6fa5);
          background-size: 300% 300%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: gradShift 6s ease infinite;
        }
        .fcopy { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-dim); }
        .flinks { display: flex; gap: 24px; }
        .flinks a { font-size: 13px; color: var(--text-dim); text-decoration: none; transition: color 0.2s; }
        .flinks a:hover { color: var(--text-muted); }

        /* ── COOKIE ── */
        .cookie { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(120px); background: var(--pill-bg); backdrop-filter: var(--blur); -webkit-backdrop-filter: var(--blur); border: 1px solid var(--pill-border); border-radius: 20px; padding: 18px 24px; display: flex; align-items: center; gap: 24px; z-index: 200; box-shadow: var(--shadow-lg); opacity: 0; transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.5s; max-width: 520px; width: calc(100% - 48px); }
        .cookie.show { transform: translateX(-50%) translateY(0); opacity: 1; }
        .cookie-txt { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
        .cookie-txt a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; }
        .cookie-btns { display: flex; gap: 8px; flex-shrink: 0; }
        .cbtn { padding: 9px 18px; border-radius: 100px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 13px; font-weight: 500; border: none; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .cacc-wrap { padding: 9px 18px; border-radius: 100px; font-size: 13px; font-weight: 500; }
        .cdec { background: transparent; color: var(--text-muted); border: 1px solid var(--border-strong); }
        .cdec:hover { color: var(--text); }

        /* ── REVEAL ── */
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .reveal.on { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; }

        /* ── RESPONSIVE ── */
        @media(max-width:768px){
          nav { top: 12px; padding: 8px 8px 8px 18px; }
          .nav-links a:not(.nav-cta) { display: none; }
          #hero { padding: 100px 24px 60px; }
          section { padding: 72px 24px; }
          .about-grid, .cont-grid { grid-template-columns: 1fr; gap: 48px; }
          .port-grid { grid-template-columns: 1fr 1fr; }
          #blob-sec { grid-template-columns: 1fr; }
          .blob-left { border-right: none; border-bottom: 1px solid var(--border); padding: 72px 24px; }
          .blob-right { padding: 72px 24px; }
          .fi-1,.fi-2,.fi-3,.fi-4 { width: 95px; height: 120px; border-radius: 14px; }
          .fi-5,.fi-6 { display: none; }
          footer { flex-direction: column; gap: 20px; text-align: center; }
          .fr2 { grid-template-columns: 1fr; }
          .svc-row { grid-template-columns: 48px 1fr 24px; gap: 16px; }
        }
      `}</style>

      <nav>
        <a href="#" className="nav-logo">KOMA <span className="dot">·</span> Studio</a>
        <div className="nav-links">
          <a href="#apie">Apie</a>
          <a href="#paslaugos">Paslaugos</a>
          <a href="#portfolio">Darbai</a>
          <a href="#kontaktai" className="lava-btn nav-cta">
            <span className="btn-label">Susisiekite</span>
          </a>
        </div>
        <button className="theme-btn" id="themeBtn">☀︎</button>
      </nav>

      <section id="hero">
        <div className="float-img fi-1"><div className="float-placeholder"></div></div>
        <div className="float-img fi-2"><div className="float-placeholder"></div></div>
        <div className="float-img fi-3"><div className="float-placeholder"></div></div>
        <div className="float-img fi-4"><div className="float-placeholder"></div></div>
        <div className="float-img fi-5"><div className="float-placeholder"></div></div>
        <div className="float-img fi-6"><div className="float-placeholder"></div></div>
        <p className="hero-eyebrow">Kūrybinė studija — Vilnius, Lietuva</p>
        <h1 className="hero-title">Skaitmeninė<br /><em>prabanga</em> jūsų<br />verslui.</h1>
        <p className="hero-sub">Jūsų vizija. Mūsų meistriškumas.<br />Rezultatas, kuriantis vertę.</p>
        <div className="hero-actions">
          <a href="#kontaktai" className="lava-btn btn-primary-wrap">
            <span className="btn-label">Susisiekite →</span>
          </a>
          <a href="#portfolio" className="btn-ghost">Peržiūrėti darbus</a>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {['Web Dizainas','SEO Optimizacija','Greitos Svetainės','Modernūs Sprendimai','Individualus Dizainas',
            'Web Dizainas','SEO Optimizacija','Greitos Svetainės','Modernūs Sprendimai','Individualus Dizainas'].map((t,i) => (
            <span key={i} className="marquee-item">{t} <span className="msep">·</span></span>
          ))}
        </div>
      </div>

      <section id="apie">
        <div className="stag reveal">Apie mus</div>
        <div className="about-grid">
          <div className="reveal">
            <h2 className="about-h">Dirbame su tais, kurie vertina<br /><em>dizaino galią.</em></h2>
            <div className="about-stats">
              <div><div className="sn">2</div><div className="sl">Kūrėjai</div></div>
              <div><div className="sn">100%</div><div className="sl">Individualūs sprendimai</div></div>
            </div>
          </div>
          <div className="reveal d1">
            <p className="about-p">Esame nedidelė, bet ambicinga kūrybinė studija iš Vilniaus. Kuriame modernias, greitas ir efektyvias svetaines verslams, kuriems svarbus rezultatas — ne tik išvaizda.</p>
            <p className="about-p">Mūsų darbas derina estetiką su technika: kiekvienas projektas optimizuotas greičiui, paieškos sistemoms ir konversijoms.</p>
            <div className="pills">
              {['Web dizainas','SEO optimizacija','Greitas hostingas','Mobili versija'].map((p,i) => <span key={i} className="pill">{p}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section id="paslaugos">
        <div className="stag reveal">Paslaugos</div>
        <h2 className="svc-title reveal">Ką mes darome.</h2>
        <div className="svc-list">
          <div className="svc-row reveal">
            <div className="svc-n">01</div>
            <div>
              <div className="svc-name">Web Dizainas</div>
              <p className="svc-desc">Kuriame individualias svetaines nuo nulio. Kiekvienas projektas — unikalus dizainas, greitas kodas, mobili versija. Jokių šablonų, jokių kompromisų.</p>
              <div className="svc-tags">
                {['HTML / CSS / JS','Mobili versija','Greitas įkėlimas','Modernios animacijos'].map((t,i) => <span key={i} className="stag2">{t}</span>)}
              </div>
            </div>
            <div className="svc-arr">↗</div>
          </div>
          <div className="svc-row reveal d1">
            <div className="svc-n">02</div>
            <div>
              <div className="svc-name">SEO Optimizacija</div>
              <p className="svc-desc">Optimizuojame svetaines kad jos būtų randamos Google paieškoje. Techninė SEO, greičio optimizacija, vietinė paieška — viskas ką reikia augti.</p>
              <div className="svc-tags">
                {['Techninė SEO','Google Search Console','Core Web Vitals','Vietinė paieška'].map((t,i) => <span key={i} className="stag2">{t}</span>)}
              </div>
            </div>
            <div className="svc-arr">↗</div>
          </div>
        </div>
      </section>

      <section id="portfolio">
        <div className="stag reveal">Darbai</div>
        <h2 className="port-title reveal">Mūsų projektai.</h2>
        <div className="port-grid reveal">
          {[
            {bg:'linear-gradient(135deg,var(--surface2),var(--bg2))',name:'Projektas 01',type:'Web Dizainas'},
            {bg:'linear-gradient(135deg,#e8e4de,#d0ccc4)',name:'Projektas 02',type:'SEO + Web'},
            {bg:'linear-gradient(135deg,#dce8e4,#c4d4ce)',name:'Projektas 03',type:'Web Dizainas'},
          ].map((p,i) => (
            <div key={i} className="port-card">
              <div className="port-inner" style={{background:p.bg}}><span className="port-ph">{p.name.toUpperCase()}</span></div>
              <div className="port-info"><div className="port-name">{p.name}</div><div className="port-type">{p.type}</div></div>
            </div>
          ))}
        </div>
      </section>

      <div id="blob-sec">
        <div className="blob-left reveal"><div className="blob-wrap"></div></div>
        <div className="blob-right reveal d1">
          <div className="blob-tag">Dirbkime kartu</div>
          <h3 className="blob-title">Dizaino komanda, kuri supranta jūsų verslo tikslus</h3>
          <p className="blob-desc">Jokių sudėtingų procesų. Tik rezultatas, kuris kalba už save. Nuo pirmojo pokalbio iki veikiančios svetainės — mes esame šalia.</p>
          <a href="#kontaktai" className="lava-btn btn-primary-wrap">
            <span className="btn-label">Susisiekite →</span>
          </a>
        </div>
      </div>

      <section id="kontaktai">
        <div className="stag reveal">Kontaktai</div>
        <div className="cont-grid">
          <div className="reveal">
            <h2 className="cont-title">Pradėkime<br /><em>kartu.</em></h2>
            <p className="cont-desc">Turite projektą? Parašykite — atsakysime per 24 val. ir aptarsime kaip galime padėti.</p>
            <div className="cont-details">
              <div><div className="cd-l">El. paštas</div><div className="cd-v">info@komastudio.lt</div></div>
              <div><div className="cd-l">Miestas</div><div className="cd-v">Vilnius, Lietuva</div></div>
            </div>
          </div>
          <div className="reveal d1">
            <form className="cform" id="contactForm" action="https://formspree.io/f/JŪSŲ-KODAS" method="POST">
              <div className="fr2">
                <div className="fg"><label className="fl">Vardas</label><input className="fi" type="text" name="vardas" placeholder="Jonas" required /></div>
                <div className="fg"><label className="fl">El. paštas</label><input className="fi" type="email" name="email" placeholder="jonas@gmail.com" required /></div>
              </div>
              <div className="fg"><label className="fl">Žinutė</label><textarea className="fta" name="zinute" placeholder="Papasakokite apie savo projektą..." required></textarea></div>
              <button type="submit" className="lava-btn btn-send-wrap">
                <span className="btn-label">Siųsti žinutę →</span>
              </button>
              <div className="form-ok" id="formOk">✓ Žinutė išsiųsta! Susisieksime greitai.</div>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="flogo">KOMA <span className="dot">·</span> Studio</div>
        <div className="fcopy">© 2026 KOMA Studio</div>
        <div className="flinks"><a href="/privatumo-politika">Privatumo politika</a></div>
      </footer>

      <div className="cookie" id="cookieBar">
        <p className="cookie-txt">Naudojame slapukus svetainės veikimui. <a href="/privatumo-politika">Sužinoti daugiau</a>.</p>
        <div className="cookie-btns">
          <button className="cbtn cdec" id="cNo">Atmesti</button>
          <button id="cYes" className="lava-btn cacc-wrap">
            <span className="btn-label">Sutinku</span>
          </button>
        </div>
      </div>
    </>
  );
}