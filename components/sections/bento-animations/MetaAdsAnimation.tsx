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

// Format number with comma separator: 1247 → "1,247"
function fmt(v: number) {
  const n = Math.round(v);
  return n >= 1000 ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, '0')}` : String(n);
}

// Three mini "posts" — middle one is the active/sponsored one
const POSTS = [
  { id: 'p1', accent: false },
  { id: 'p2', accent: true },   // ← sponsored, lights up on hover
  { id: 'p3', accent: false },
];

// Muted colour bands inside each post thumbnail
const POST_LINES = [
  [{ w: '65%', h: 4 }, { w: '45%', h: 4 }],
  [{ w: '72%', h: 4 }, { w: '55%', h: 4 }],
  [{ w: '60%', h: 4 }, { w: '40%', h: 4 }],
];

export default function MetaAdsAnimation() {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const active = hovered || !!reduced;

  // Motion values for the two counters
  const clicks = useMotionValue(reduced ? 1247 : 0);
  const convs  = useMotionValue(reduced ? 89   : 0);

  const clicksDisplay = useTransform(clicks, fmt);
  const convsDisplay  = useTransform(convs,  (v) => String(Math.round(v)));

  useEffect(() => {
    if (reduced) {
      clicks.set(1247);
      convs.set(89);
      return;
    }

    if (active) {
      const a = animate(clicks, 1247, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
      const b = animate(convs,  89,   { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 });
      return () => { a.stop(); b.stop(); };
    } else {
      const a = animate(clicks, 0, { duration: 0.45, ease: 'easeOut' });
      const b = animate(convs,  0, { duration: 0.45, ease: 'easeOut' });
      return () => { a.stop(); b.stop(); };
    }
  }, [active, reduced, clicks, convs]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '140px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        padding: '14px',
        marginBottom: '20px',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      {/* ── Left: mini feed ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          flex: '0 0 auto',
          width: '52%',
        }}
      >
        {POSTS.map((post, pi) => (
          <motion.div
            key={post.id}
            animate={{
              borderColor: post.accent && active
                ? 'rgba(167,139,250,0.35)'
                : 'rgba(255,255,255,0.07)',
              boxShadow: post.accent && active
                ? '0 0 12px rgba(167,139,250,0.12)'
                : '0 0 0 rgba(0,0,0,0)',
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '6px',
              overflow: 'hidden',
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            {/* Post thumbnail */}
            <div
              style={{
                flex: 1,
                background: post.accent
                  ? 'rgba(167,139,250,0.07)'
                  : 'rgba(255,255,255,0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                padding: '0 6px',
              }}
            >
              {POST_LINES[pi].map((line, li) => (
                <div
                  key={li}
                  style={{
                    width: line.w,
                    height: `${line.h}px`,
                    borderRadius: '2px',
                    background: post.accent
                      ? 'rgba(167,139,250,0.25)'
                      : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>

            {/* "Sponsored" badge — middle post only, appears on hover */}
            <AnimatePresence>
              {post.accent && active && (
                <motion.div
                  key="sponsored"
                  initial={reduced ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={reduced ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    left: '4px',
                    background: 'rgba(167,139,250,0.22)',
                    border: '1px solid rgba(167,139,250,0.35)',
                    borderRadius: '3px',
                    padding: '1px 5px',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '8px',
                    letterSpacing: '0.06em',
                    color: '#C4B5FD',
                    pointerEvents: 'none',
                  }}
                >
                  Sponsored
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* ── Right: stats ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          paddingLeft: '12px',
        }}
      >
        {/* Clicks */}
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '8px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,235,0.3)',
              marginBottom: '2px',
            }}
          >
            Spaudimai
          </div>
          <motion.div
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '22px',
              fontWeight: 400,
              lineHeight: 1,
              color: active ? '#F5F1EB' : 'rgba(245,241,235,0.4)',
              transition: 'color 0.3s ease',
            }}
          >
            {clicksDisplay}
          </motion.div>
        </div>

        {/* Conversions */}
        <div>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '8px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(245,241,235,0.3)',
              marginBottom: '2px',
            }}
          >
            Konversijos
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '3px',
            }}
          >
            <motion.span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '22px',
                fontWeight: 400,
                lineHeight: 1,
                color: active ? '#A78BFA' : 'rgba(245,241,235,0.4)',
                transition: 'color 0.3s ease',
              }}
            >
              {convsDisplay}
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
