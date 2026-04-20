'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';

// Bar chart data: scaleY targets (0–1)
const BARS = [
  { id: 'b1', target: 0.46, label: 'P' },
  { id: 'b2', target: 0.78, label: 'A' },
  { id: 'b3', target: 0.55, label: 'T' },
  { id: 'b4', target: 0.95, label: 'K' },
];

const IDLE_SCALE = 0.12;

export default function GoogleAdsAnimation() {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const active = hovered || !!reduced;

  // Click counter
  const clicksMv = useMotionValue(reduced ? 348 : 0);
  const clicksDisplay = useTransform(clicksMv, (v) => String(Math.round(v)));

  useEffect(() => {
    if (reduced) {
      clicksMv.set(348);
      return;
    }
    if (active) {
      const ctrl = animate(clicksMv, 348, { duration: 1.3, ease: [0.16, 1, 0.3, 1] });
      return () => ctrl.stop();
    } else {
      const ctrl = animate(clicksMv, 0, { duration: 0.4, ease: 'easeOut' });
      return () => ctrl.stop();
    }
  }, [active, reduced, clicksMv]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '120px',
        borderRadius: '10px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '20px',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      {/* ── Search result card ── */}
      <div
        style={{
          flex: '0 0 auto',
          position: 'relative',
        }}
      >
        {/* Top row: Ad badge + URL */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '3px',
          }}
        >
          {/* "Ad" badge */}
          <AnimatePresence initial={false}>
            {active && (
              <motion.span
                key="ad-badge"
                initial={reduced ? false : { opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 22 }}
                style={{
                  background: 'rgba(52, 168, 83, 0.18)',
                  border: '1px solid rgba(52, 168, 83, 0.4)',
                  borderRadius: '3px',
                  padding: '1px 5px',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '8px',
                  letterSpacing: '0.06em',
                  color: 'rgba(74, 222, 128, 0.9)',
                  flexShrink: 0,
                }}
              >
                Ad
              </motion.span>
            )}
          </AnimatePresence>

          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.04em',
              color: 'rgba(167,139,250,0.6)',
            }}
          >
            koma-studio.lt ›
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            color: active ? 'rgba(245,241,235,0.85)' : 'rgba(245,241,235,0.55)',
            marginBottom: '2px',
            transition: 'color 0.3s ease',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          KOMA Studio — Profesionalus web dizainas
        </div>

        {/* Description + click counter row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 300,
              color: 'rgba(245,241,235,0.3)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
            }}
          >
            Greitos svetainės · SEO · Vilnius
          </div>

          {/* Click counter — fades in on hover */}
          <AnimatePresence>
            {active && (
              <motion.div
                key="counter"
                initial={reduced ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={reduced ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '2px',
                  flexShrink: 0,
                }}
              >
                <motion.span
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#A78BFA',
                    lineHeight: 1,
                  }}
                >
                  {clicksDisplay}
                </motion.span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '8px',
                    color: 'rgba(245,241,235,0.3)',
                    letterSpacing: '0.04em',
                  }}
                >
                  klikai
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bar chart ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '5px',
          paddingTop: '4px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {BARS.map((bar, i) => (
          <div
            key={bar.id}
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '3px',
            }}
          >
            {/* Bar fill */}
            <motion.div
              animate={{
                scaleY: active ? bar.target : IDLE_SCALE,
                opacity: active ? 1 : 0.35,
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : {
                      type: 'spring',
                      stiffness: 200,
                      damping: 22,
                      delay: active ? i * 0.08 : 0,
                    }
              }
              style={{
                width: '100%',
                height: '26px',
                borderRadius: '3px 3px 2px 2px',
                background: i === 3
                  ? 'linear-gradient(180deg, #A78BFA 0%, #7C3AED 100%)'
                  : 'rgba(167,139,250,0.28)',
                transformOrigin: 'bottom',
              }}
            />
            {/* Day label */}
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '7px',
                color: 'rgba(245,241,235,0.2)',
                letterSpacing: '0.04em',
              }}
            >
              {bar.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
