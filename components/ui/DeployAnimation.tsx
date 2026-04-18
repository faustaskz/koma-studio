'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const LINES = [
  { text: '$ pnpm deploy', delay: 0, color: '#f0ede8' },
  { text: '→ Building project...', delay: 400, color: '#908d87' },
  { text: '→ Bundling assets...', delay: 800, color: '#908d87' },
  { text: '→ Optimizing images...', delay: 1200, color: '#908d87' },
  { text: '→ Uploading...', delay: 1600, color: '#908d87' },
  { text: '✓ Deployed to koma.studio', delay: 2000, color: '#22c55e' },
];

const TOTAL_LINES_DONE = LINES[LINES.length - 1].delay + 800;
const COLLAPSE_START = TOTAL_LINES_DONE;
const BROWSER_START = COLLAPSE_START + 300;

function TypewriterLine({ text, color, startMs, triggered }: {
  text: string;
  color: string;
  startMs: number;
  triggered: boolean;
}) {
  const [displayed, setDisplayed] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!triggered) return;
    const showTimer = setTimeout(() => {
      setVisible(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, startMs);
    return () => clearTimeout(showTimer);
  }, [triggered, text, startMs]);

  if (!visible) return null;
  return (
    <div style={{ color, fontFamily: "'DM Mono', 'Courier New', monospace", fontSize: '13px', lineHeight: '1.7', minHeight: '22px' }}>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ animation: 'blink 0.7s step-end infinite', borderRight: '2px solid currentColor', marginLeft: '1px' }} />
      )}
    </div>
  );
}

export default function DeployAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [showBrowser, setShowBrowser] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setShowBrowser(true), BROWSER_START);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <div
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050505',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      {/* Section label */}
      <div style={{
        position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.18em',
        color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', whiteSpace: 'nowrap',
      }}>
        Nuo kodo iki svetainės
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: '560px', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* ── TERMINAL ── */}
        <AnimatePresence>
          {!showBrowser && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              exit={{ opacity: 0, scale: 0.88, filter: 'blur(8px)', y: -16 }}
              transition={
                showBrowser
                  ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              }
              style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#111110',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                overflow: 'hidden',
                position: 'absolute',
              }}
            >
              {/* Title bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: '#161614',
              }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
                <span style={{
                  position: 'absolute', left: '50%', transform: 'translateX(-50%)',
                  fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.3)',
                }}>~/project — zsh</span>
              </div>

              {/* Terminal body */}
              <div style={{ padding: '20px 20px 24px', minHeight: '180px' }}>
                {LINES.map((line) => (
                  <TypewriterLine
                    key={line.text}
                    text={line.text}
                    color={line.color}
                    startMs={line.delay}
                    triggered={isInView}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BROWSER ── */}
        <AnimatePresence>
          {showBrowser && (
            <motion.div
              key="browser"
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0 }}
              style={{
                width: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#111110',
                boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
                overflow: 'hidden',
                position: 'absolute',
              }}
            >
              {/* Browser chrome */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: '#161614',
              }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />

                {/* URL bar */}
                <div style={{
                  flex: 1, marginLeft: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '6px', padding: '4px 12px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
                    koma.studio
                  </span>
                </div>
              </div>

              {/* Page preview */}
              <div style={{
                padding: '40px 32px 44px',
                background: '#0c0c0b',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
              }}>
                {/* Nav mock */}
                <div style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '8px',
                }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>
                    KOMA <span style={{ color: '#7b4fa5' }}>·</span> Studio
                  </span>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {['Apie', 'Paslaugos', 'Darbai'].map(l => (
                      <span key={l} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{l}</span>
                    ))}
                  </div>
                </div>

                {/* Hero mock */}
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <div style={{
                    fontFamily: "'Instrument Serif', serif", fontWeight: 400,
                    fontSize: '32px', lineHeight: 1.1, color: 'rgba(255,255,255,0.85)',
                    letterSpacing: '-0.02em',
                  }}>
                    Skaitmeninė<br />
                    <em style={{
                      fontStyle: 'italic',
                      background: 'linear-gradient(135deg, #4a6fa5, #7b4fa5)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>prabanga</em> jūsų<br />verslui.
                  </div>
                  <div style={{
                    marginTop: '14px', fontSize: '12px', color: 'rgba(255,255,255,0.3)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 300, lineHeight: 1.6,
                  }}>
                    Jūsų vizija. Mūsų meistriškumas.
                  </div>
                </div>

                {/* Success badge */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  style={{
                    marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)',
                    borderRadius: '100px', padding: '5px 14px',
                    fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#22c55e',
                    letterSpacing: '0.05em',
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  Live · koma.studio
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spacer so the section has height */}
        <div style={{ height: '340px', width: '100%', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}
