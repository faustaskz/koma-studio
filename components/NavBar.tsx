'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const PASLAUGOS = [
  { label: 'Google Ads',        href: '/paslaugos/google-ads',        icon: '/googleadss.webp' },
  { label: 'Meta Ads',          href: '/paslaugos/meta-ads',          icon: '/metalogo.webp' },
  { label: 'SEO Optimizacija',  href: '/paslaugos/seo-optimizacija',  icon: '/magnifyingglass.webp' },
  { label: 'Svetainių kūrimas', href: '/paslaugos/svetainiu-kurimas', icon: '/svetainiulogo.webp' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=DM+Mono:wght@300;400&display=swap');
        nav {
          position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
          z-index: 100;
          background: rgba(12,12,11,0.55);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border-radius: 100px;
          padding: 10px 10px 10px 24px;
          display: flex; align-items: center; gap: 4px;
          box-shadow: 0 2px 24px rgba(0,0,0,0.4);
          white-space: nowrap;
          font-family: 'Raleway', sans-serif;
        }
        .nav-logo {
          font-weight: 600; font-size: 14px; letter-spacing: 0.04em;
          color: #f0ede8; text-decoration: none; margin-right: 8px;
        }
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
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .nav-links { display: flex; align-items: center; gap: 2px; }
        .nav-links a {
          color: rgba(255,255,255,0.55); text-decoration: none;
          font-size: 13px; font-weight: 400;
          padding: 8px 16px; border-radius: 100px;
          transition: color 0.2s, background 0.2s;
        }
        .nav-links a:hover { color: #f0ede8; background: rgba(255,255,255,0.07); }
        .nav-cta {
          padding: 10px 20px !important; border-radius: 100px !important;
          font-weight: 500 !important; font-size: 13px !important;
          display: inline-flex !important; align-items: center !important;
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.06) !important;
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.15) !important;
          cursor: pointer; color: #f0ede8 !important;
          transition: border-color 0.25s, background 0.25s, transform 0.2s;
        }
        .nav-cta:hover {
          border-color: rgba(167,139,250,0.55) !important;
          background: rgba(167,139,250,0.06) !important;
          transform: translateY(-1px);
          color: #f0ede8 !important;
        }

        /* ── DROPDOWN ── */
        .nav-drop-wrap { position: relative; display: flex; align-items: center; }
        .nav-drop-trigger {
          display: flex; align-items: center; gap: 5px;
          color: rgba(255,255,255,0.55); text-decoration: none;
          font-size: 13px; font-weight: 400;
          padding: 8px 16px; border-radius: 100px;
          transition: color 0.2s, background 0.2s; cursor: pointer;
          border: none; background: transparent; font-family: 'Raleway', sans-serif;
        }
        .nav-drop-trigger:hover, .nav-drop-trigger.active { color: #f0ede8; background: rgba(255,255,255,0.07); }
        .nav-drop-chevron {
          transition: transform 0.2s; display: block; opacity: 0.6;
          font-size: 10px; margin-top: 1px;
        }
        .nav-drop-chevron.open { transform: rotate(180deg); }
        .nav-dropdown {
          position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%);
          background: rgba(18, 18, 18, 0.92);
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px; padding: 6px;
          min-width: 200px;
          box-shadow: var(--shadow-lg);
          display: flex; flex-direction: column; gap: 1px;
          animation: dropIn 0.18s cubic-bezier(0.16,1,0.3,1) forwards;
          z-index: 10;
        }
        @keyframes dropIn { from { opacity:0; transform:translateX(-50%) translateY(-6px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }
        .nav-drop-item {
          padding: 9px 12px; border-radius: 10px;
          font-size: 13px; color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
          display: flex; align-items: center; gap: 10px;
        }
        .nav-drop-item:hover { background: rgba(255,255,255,0.08); color: #f0ede8; }
        .nav-drop-icon { width: 22px; height: 22px; object-fit: contain; flex-shrink: 0; }

        @media(max-width:768px){
          nav { top: 12px; padding: 8px 8px 8px 18px; }
          .nav-links a:not(.nav-cta):not(.nav-drop-trigger) { display: none; }
          .nav-drop-wrap { display: none; }
        }
      `}</style>

      <nav>
        <Link href="/" className="nav-logo" style={{ height: '34px', overflow: 'visible', display: 'flex', alignItems: 'center' }}>
          <img src="/KOMALOGO.webp" alt="KOMA Studio" style={{ height: '68px', width: 'auto' }} />
        </Link>
        <div className="nav-links">
          <div
            className="nav-drop-wrap"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            <button className={`nav-drop-trigger${open ? ' active' : ''}`}>
              Paslaugos
              <span className={`nav-drop-chevron${open ? ' open' : ''}`}>▾</span>
            </button>
            {open && (
              <div className="nav-dropdown" onMouseEnter={onEnter} onMouseLeave={onLeave}>
                {PASLAUGOS.map(p => (
                  <Link key={p.href} href={p.href} className="nav-drop-item" onClick={() => setOpen(false)}>
                    <img src={p.icon} alt="" className="nav-drop-icon" style={p.icon === '/magnifyingglass.webp' ? {width:'30px', height:'30px'} : undefined} />
                    {p.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/#apie" className="">Apie</Link>

          <button className="nav-cta" onClick={() => window.dispatchEvent(new CustomEvent('openConsultPopup'))}>
            Susisiekite
          </button>
        </div>
      </nav>
    </>
  );
}
