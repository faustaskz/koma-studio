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
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const closeMobile = () => setMobileOpen(false);

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
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
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

        /* ── HAMBURGER ── */
        .hamburger {
          display: none;
          flex-direction: column; justify-content: center; gap: 5px;
          background: none; border: none; padding: 8px; cursor: pointer;
          width: 40px; height: 40px; border-radius: 50%;
          transition: background 0.2s;
        }
        .hamburger:hover { background: rgba(255,255,255,0.08); }
        .hamburger span {
          display: block; width: 20px; height: 1.5px;
          background: #f0ede8; border-radius: 1px;
          transition: transform 0.3s, opacity 0.3s;
          transform-origin: center;
        }
        .hamburger.is-open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.is-open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── MOBILE MENU ── */
        .mob-menu {
          position: fixed; inset: 0; z-index: 99;
          background: rgba(8,8,8,0.97);
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          display: flex; flex-direction: column;
          padding: 100px 28px 48px;
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          font-family: 'Raleway', sans-serif;
          overflow-y: auto;
        }
        .mob-menu.open { transform: translateY(0); }
        .mob-section-label {
          font-size: 10px; letter-spacing: 0.2em; color: rgba(255,255,255,0.25);
          text-transform: uppercase; margin-bottom: 12px; margin-top: 32px;
        }
        .mob-section-label:first-child { margin-top: 0; }
        .mob-link {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8); text-decoration: none;
          font-size: 20px; font-weight: 500;
          transition: color 0.2s;
        }
        .mob-link:hover { color: #f0ede8; }
        .mob-link-icon { width: 28px; height: 28px; object-fit: contain; opacity: 0.7; }
        .mob-plain-link {
          display: block; padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7); text-decoration: none;
          font-size: 20px; font-weight: 400;
          transition: color 0.2s;
        }
        .mob-plain-link:hover { color: #f0ede8; }
        .mob-cta {
          margin-top: 40px;
          background: #f0ede8; color: #0a0a0a;
          border: none; border-radius: 100px;
          padding: 18px 32px;
          font-size: 15px; font-weight: 600;
          font-family: 'Raleway', sans-serif;
          cursor: pointer; width: 100%; text-align: center;
          transition: background 0.2s, transform 0.2s;
        }
        .mob-cta:hover { background: #fff; transform: translateY(-1px); }

        @media(max-width:768px){
          nav {
            top: 12px;
            left: 24px; right: 24px;
            transform: none;
            width: auto;
            padding: 8px 8px 8px 16px;
            justify-content: space-between;
          }
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav>
        <Link href="/" className="nav-logo" style={{ height: '34px', overflow: 'visible', display: 'flex', alignItems: 'center' }}>
          <img src="/KOMALOGO.webp" alt="KOMA Studio" style={{ height: '68px', width: 'auto' }} />
        </Link>

        {/* Desktop nav */}
        <div className="nav-links">
          <div className="nav-drop-wrap" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <button className={`nav-drop-trigger${open ? ' active' : ''}`}>
              Paslaugos
              <span className={`nav-drop-chevron${open ? ' open' : ''}`}>▾</span>
            </button>
            {open && (
              <div className="nav-dropdown" onMouseEnter={onEnter} onMouseLeave={onLeave}>
                {PASLAUGOS.map(p => (
                  <Link key={p.href} href={p.href} className="nav-drop-item" onClick={() => setOpen(false)}>
                    <img src={p.icon} alt="" className="nav-drop-icon" style={{ ...(p.icon === '/magnifyingglass.webp' ? {width:'30px', height:'30px'} : {}), ...(p.icon === '/svetainiulogo.webp' ? {filter:'brightness(0) invert(1)'} : {}) }} />
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

        {/* Hamburger */}
        <button
          className={`hamburger${mobileOpen ? ' is-open' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Meniu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu${mobileOpen ? ' open' : ''}`}>
        <p className="mob-section-label">Paslaugos</p>
        {PASLAUGOS.map(p => (
          <Link key={p.href} href={p.href} className="mob-link" onClick={closeMobile}>
            <img src={p.icon} alt="" className="mob-link-icon" style={p.icon === '/svetainiulogo.webp' ? {filter:'brightness(0) invert(1)'} : undefined} />
            {p.label}
          </Link>
        ))}

        <p className="mob-section-label">Navigacija</p>
        <Link href="/#apie" className="mob-plain-link" onClick={closeMobile}>Apie mus</Link>
        <Link href="/privatumo-politika" className="mob-plain-link" onClick={closeMobile}>Privatumo politika</Link>

        <button
          className="mob-cta"
          onClick={() => {
            closeMobile();
            window.dispatchEvent(new CustomEvent('openConsultPopup'));
          }}
        >
          Susisiekite →
        </button>
      </div>
    </>
  );
}
