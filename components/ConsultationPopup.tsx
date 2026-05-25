'use client';

import { useState, useEffect, useRef } from 'react';

const TEMOS = ['Marketingas', 'Meta / Google Ads', 'Svetainės kūrimas', 'Kita / Nežinau'];

export default function ConsultationPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  // Controlled inputs
  const [vardas, setVardas] = useState('');
  const [telefonas, setTelefonas] = useState('');
  const [email, setEmail] = useState('');
  const [tema, setTema] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [komentaras, setKomentaras] = useState('');

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [dropOpen, setDropOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Open via event or scroll trigger
  useEffect(() => {
    const openNow = () => {
      setOpen(true);
      sessionStorage.setItem('koma-consult-shown', '1');
    };
    window.addEventListener('openConsultPopup', openNow);

    if (!sessionStorage.getItem('koma-consult-shown')) {
      let timer: ReturnType<typeof setTimeout> | null = null;
      const onScroll = () => {
        if (timer !== null) return;
        if (window.scrollY > 320) {
          timer = setTimeout(openNow, 10000);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('openConsultPopup', openNow);
        if (timer !== null) clearTimeout(timer);
      };
    }
    return () => window.removeEventListener('openConsultPopup', openNow);
  }, []);

  // Close custom dropdown on outside click
  useEffect(() => {
    if (!dropOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropOpen]);

  // Scroll to top when success
  useEffect(() => {
    if (status === 'ok' && wrapRef.current) {
      wrapRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [status]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errs: Record<string, boolean> = {};
    if (!vardas.trim()) errs.vardas = true;
    if (!telefonas.trim()) errs.telefonas = true;
    if (!email.trim()) errs.email = true;
    if (!tema) errs.tema = true;
    if (!privacy) errs.privacy = true;

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShakeKey(k => k + 1); // increment forces CSS animation to re-run
      return;
    }

    setErrors({});
    setStatus('sending');

    fetch('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vardas, telefonas, email, tema, komentaras }),
    })
      .then(res => setStatus(res.ok ? 'ok' : 'error'))
      .catch(() => setStatus('error'));
  }

  if (!open) return null;

  return (
    <>
      <style>{`
        @keyframes cpFadeIn{from{opacity:0}to{opacity:1}}
        @keyframes cpSlideUp{from{opacity:0;transform:translate(-50%,-46%)}to{opacity:1;transform:translate(-50%,-50%)}}
        @keyframes cpSlideSheet{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes cpShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-8px)}35%{transform:translateX(8px)}55%{transform:translateX(-5px)}75%{transform:translateX(5px)}90%{transform:translateX(-2px)}}

        .cp-wrap::-webkit-scrollbar{display:none}
        .cp-wrap{
          scrollbar-width:none;
          position:fixed;z-index:901;
          top:50%;left:50%;
          transform:translate(-50%,-50%);
          width:min(480px,calc(100vw - 24px));
          background-image:url(/juodassmelis.webp);
          background-size:cover;background-position:center;
          border:1px solid rgba(255,255,255,0.1);
          border-radius:20px;
          padding:32px;
          box-shadow:0 8px 48px rgba(0,0,0,0.7);
          animation:cpSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
          max-height:calc(100dvh - 32px);
          overflow-y:auto;
        }
        .cp-overlay{position:absolute;inset:0;border-radius:20px;background:rgba(7,7,6,0.86);pointer-events:none;z-index:0}
        .cp-handle{display:none}

        @media(max-width:640px){
          .cp-wrap{
            top:auto;bottom:0;left:0;right:0;
            transform:none;
            width:100%;
            border-radius:20px 20px 0 0;
            padding:16px 20px 36px;
            max-height:92dvh;
            animation:cpSlideSheet 0.38s cubic-bezier(0.16,1,0.3,1) forwards;
          }
          .cp-overlay{border-radius:20px 20px 0 0}
          .cp-handle{display:block;width:36px;height:4px;border-radius:2px;background:rgba(255,255,255,0.15);margin:0 auto 16px}
        }

        .cp-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,0.12);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.35);font-size:13px;transition:all 0.2s;z-index:2}
        .cp-close:hover{background:rgba(255,255,255,0.07);color:#f0ede8}
        .cp-tag{display:inline-block;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:5px 12px;border-radius:100px;font-size:10px;letter-spacing:0.16em;color:rgba(255,255,255,0.35);text-transform:uppercase;margin-bottom:12px}
        .cp-title{font-family:'Instrument Serif',serif;font-size:clamp(20px,3vw,26px);font-weight:400;line-height:1.2;letter-spacing:-0.02em;margin-bottom:6px;color:#f0ede8}
        .cp-sub{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6;margin-bottom:16px}
        .cp-fg{display:flex;flex-direction:column;gap:5px;margin-bottom:10px;position:relative}
        .cp-label{font-size:10px;letter-spacing:0.14em;color:rgba(255,255,255,0.3);text-transform:uppercase}
        .cp-req{color:rgba(239,68,68,0.7);margin-left:2px}
        .cp-input{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f0ede8;padding:10px 14px;font-size:16px;font-weight:300;outline:none;width:100%;transition:border-color 0.2s}
        .cp-input::placeholder{color:rgba(255,255,255,0.2)}
        .cp-input:focus{border-color:rgba(255,255,255,0.28)}
        .cp-input.err,.cp-drop-trigger.err{border-color:rgba(239,68,68,0.6)!important;background:rgba(239,68,68,0.04)!important}
        .cp-err{font-size:11px;color:#f87171}
        .cp-drop-trigger{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f0ede8;padding:10px 14px;font-size:16px;font-weight:300;outline:none;width:100%;transition:border-color 0.2s;cursor:pointer;display:flex;justify-content:space-between;align-items:center;text-align:left}
        .cp-drop-trigger.empty{color:rgba(255,255,255,0.2)}
        .cp-drop-arrow{font-size:10px;opacity:0.4;transition:transform 0.18s;margin-left:6px;flex-shrink:0}
        .cp-drop-arrow.open{transform:rotate(180deg)}
        .cp-drop-list{position:absolute;top:calc(100% + 4px);left:0;right:0;background:rgba(14,14,12,0.98);border:1px solid rgba(255,255,255,0.12);border-radius:8px;overflow:hidden;z-index:200;box-shadow:0 8px 24px rgba(0,0,0,0.7)}
        .cp-drop-opt{padding:10px 14px;font-size:14px;color:rgba(255,255,255,0.65);cursor:pointer;transition:background 0.1s,color 0.1s}
        .cp-drop-opt:hover,.cp-drop-opt.sel{background:rgba(255,255,255,0.07);color:#f0ede8}
        .cp-textarea{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#f0ede8;padding:10px 14px;font-size:16px;font-weight:300;outline:none;width:100%;transition:border-color 0.2s;resize:none;min-height:72px;font-family:'Plus Jakarta Sans',sans-serif;line-height:1.5}
        .cp-textarea::placeholder{color:rgba(255,255,255,0.2)}
        .cp-textarea:focus{border-color:rgba(255,255,255,0.28)}
        .cp-opt-lbl{font-size:10px;letter-spacing:0.1em;color:rgba(255,255,255,0.18);text-transform:uppercase;margin-left:6px}
        .cp-check-row{display:flex;align-items:flex-start;gap:10px;margin-bottom:6px}
        .cp-check{width:15px;height:15px;flex-shrink:0;margin-top:2px;accent-color:#f0ede8;cursor:pointer}
        .cp-check-lbl{font-size:12px;color:rgba(255,255,255,0.4);line-height:1.5}
        .cp-check-lbl a{color:rgba(255,255,255,0.7);text-underline-offset:2px}
        .cp-submit{width:100%;padding:13px;border-radius:100px;font-size:15px;font-weight:600;cursor:pointer;transition:all 0.2s;margin-top:8px}
        .cp-submit:disabled{opacity:0.5;cursor:not-allowed}
        .cp-ok{text-align:center;padding:24px 0 4px}
        .cp-ok-icon{width:56px;height:56px;border-radius:50%;background:rgba(16,185,129,0.12);border:1px solid rgba(16,185,129,0.3);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:22px;color:#34d399}
        .cp-ok-title{font-family:'Instrument Serif',serif;font-size:26px;font-weight:400;color:#f0ede8;margin-bottom:10px}
        .cp-ok-sub{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6;max-width:300px;margin:0 auto 24px}
        .cp-ok-btn{padding:11px 28px;border-radius:100px;font-size:13px;font-weight:500;cursor:pointer;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#f0ede8;transition:all 0.2s}
        .cp-ok-btn:hover{background:rgba(255,255,255,0.12)}
        .cp-api-err{font-size:12px;color:#f87171;text-align:center;margin-top:8px;padding:8px 12px;background:rgba(239,68,68,0.08);border-radius:8px;border:1px solid rgba(239,68,68,0.2)}
      `}</style>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 900,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          animation: 'cpFadeIn 0.3s ease forwards',
        }}
      />

      {/* Modal */}
      <div ref={wrapRef} className="cp-wrap">
        <div className="cp-handle" />
        {/* Dark overlay */}
        <div className="cp-overlay" />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <button className="cp-close" onClick={() => setOpen(false)}>✕</button>

          {status === 'ok' ? (
            <div className="cp-ok">
              <div className="cp-ok-icon">✓</div>
              <div className="cp-ok-title">Ačiū! Susisieksime greitai.</div>
              <p className="cp-ok-sub">Peržiūrėsime jūsų užklausą ir atsakysime per 24 val.</p>
              <button className="cp-ok-btn" onClick={() => setOpen(false)}>Uždaryti</button>
            </div>
          ) : (
            <>
              <div className="cp-tag">Nemokama konsultacija</div>
              <h2 className="cp-title">Gaukite nemokamą<br />verslo konsultaciją</h2>
              <p className="cp-sub">Užpildykite formą — susisieksime per 24 val.</p>

              <form onSubmit={handleSubmit} noValidate>
                {/* Vardas */}
                <div
                  className="cp-fg"
                  key={`vardas-${shakeKey}`}
                  style={errors.vardas ? { animation: 'cpShake 0.4s ease' } : undefined}
                >
                  <label className="cp-label">Vardas<span className="cp-req">*</span></label>
                  <input
                    className={`cp-input${errors.vardas ? ' err' : ''}`}
                    type="text"
                    placeholder="Jūsų vardas"
                    value={vardas}
                    onChange={e => { setVardas(e.target.value); setErrors(p => ({ ...p, vardas: false })); }}
                  />
                  {errors.vardas && <span className="cp-err">Įveskite vardą</span>}
                </div>

                {/* Telefonas */}
                <div
                  className="cp-fg"
                  key={`tel-${shakeKey}`}
                  style={errors.telefonas ? { animation: 'cpShake 0.4s ease' } : undefined}
                >
                  <label className="cp-label">Telefonas<span className="cp-req">*</span></label>
                  <input
                    className={`cp-input${errors.telefonas ? ' err' : ''}`}
                    type="tel"
                    placeholder="+370 600 00000"
                    value={telefonas}
                    onChange={e => { setTelefonas(e.target.value); setErrors(p => ({ ...p, telefonas: false })); }}
                  />
                  {errors.telefonas && <span className="cp-err">Įveskite telefoną</span>}
                </div>

                {/* El. paštas */}
                <div
                  className="cp-fg"
                  key={`email-${shakeKey}`}
                  style={errors.email ? { animation: 'cpShake 0.4s ease' } : undefined}
                >
                  <label className="cp-label">El. paštas<span className="cp-req">*</span></label>
                  <input
                    className={`cp-input${errors.email ? ' err' : ''}`}
                    type="email"
                    placeholder="jusu@pastas.lt"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: false })); }}
                  />
                  {errors.email && <span className="cp-err">Įveskite el. paštą</span>}
                </div>

                {/* Tema dropdown */}
                <div
                  className="cp-fg"
                  ref={dropRef}
                  key={`tema-${shakeKey}`}
                  style={errors.tema ? { animation: 'cpShake 0.4s ease' } : undefined}
                >
                  <label className="cp-label">Konsultacijos tema<span className="cp-req">*</span></label>
                  <button
                    type="button"
                    className={`cp-drop-trigger${!tema ? ' empty' : ''}${errors.tema ? ' err' : ''}`}
                    onClick={() => setDropOpen(v => !v)}
                  >
                    {tema || 'Pasirinkite temą...'}
                    <span className={`cp-drop-arrow${dropOpen ? ' open' : ''}`}>▾</span>
                  </button>
                  {dropOpen && (
                    <div className="cp-drop-list">
                      {TEMOS.map(t => (
                        <div
                          key={t}
                          className={`cp-drop-opt${tema === t ? ' sel' : ''}`}
                          onMouseDown={() => {
                            setTema(t);
                            setDropOpen(false);
                            setErrors(p => ({ ...p, tema: false }));
                          }}
                        >{t}</div>
                      ))}
                    </div>
                  )}
                  {errors.tema && <span className="cp-err">Pasirinkite temą</span>}
                </div>

                {/* Komentaras */}
                <div className="cp-fg">
                  <label className="cp-label">Komentaras<span className="cp-opt-lbl">neprivaloma</span></label>
                  <textarea
                    className="cp-textarea"
                    placeholder="Papildoma informacija apie jūsų projektą ar klausimą..."
                    value={komentaras}
                    onChange={e => setKomentaras(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Privacy */}
                <div
                  key={`priv-${shakeKey}`}
                  style={{ marginBottom: '6px', ...(errors.privacy ? { animation: 'cpShake 0.4s ease' } : {}) }}
                >
                  <div className="cp-check-row">
                    <input
                      className="cp-check"
                      type="checkbox"
                      id="cp-privacy"
                      checked={privacy}
                      onChange={e => { setPrivacy(e.target.checked); setErrors(p => ({ ...p, privacy: false })); }}
                    />
                    <label className="cp-check-lbl" htmlFor="cp-privacy">
                      Sutinku su <a href="/privatumo-politika" target="_blank" rel="noopener">privatumo politika</a> ir sutinku, kad KOMA Studio susisiektų su manimi.<span className="cp-req"> *</span>
                    </label>
                  </div>
                  {errors.privacy && <span className="cp-err" style={{ display: 'block', marginTop: '2px' }}>Privalote sutikti</span>}
                </div>

                <button type="submit" className="lava-btn cp-submit" disabled={status === 'sending'}>
                  <span className="btn-label">
                    {status === 'sending' ? 'Siunčiama...' : 'Gauti nemokamą konsultaciją →'}
                  </span>
                </button>

                {status === 'error' && (
                  <div className="cp-api-err">Nepavyko išsiųsti — bandykite dar kartą arba rašykite tiesiogiai.</div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
