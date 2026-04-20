'use client';

import { useState, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const RESULTS = [
  {
    id: 'c1',
    url: 'webpro.lt',
    title: 'WebPro — Svetainių kūrimas Vilniuje',
    desc: 'Profesionalios svetainės nuo 500€. Greitas pristatymas.',
    isKoma: false,
  },
  {
    id: 'c2',
    url: 'digitalhub.lt',
    title: 'DigitalHub — Web Dizainas ir SEO',
    desc: 'Kuriame svetaines verslui. 10+ metų patirtis.',
    isKoma: false,
  },
  {
    id: 'koma',
    url: 'koma-studio.lt',
    title: 'KOMA Studio — Svetainių Kūrimas',
    desc: 'Modernios, greitos svetainės jūsų verslui.',
    isKoma: true,
  },
];

const SPRING = { type: 'spring', stiffness: 280, damping: 28 } as const;

function SEOAnimation({ forceActive = false }: { forceActive?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const active = forceActive || hovered || !!reduced;

  // Reorder: koma rises to #1 on hover
  const ordered = active
    ? [RESULTS[2], RESULTS[0], RESULTS[1]]
    : [RESULTS[0], RESULTS[1], RESULTS[2]];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '260px',
        borderRadius: '10px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '20px',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      {/* ── Search bar ── */}
      <div
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '7px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            fontWeight: 400,
            background: 'linear-gradient(135deg, #4285F4, #34A853, #FBBC05, #EA4335)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
          }}
        >
          G
        </span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            color: 'rgba(245,241,235,0.45)',
            letterSpacing: '0.02em',
            flex: 1,
          }}
        >
          svetainių kūrimas vilnius
        </span>
        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          style={{
            width: '1px',
            height: '12px',
            background: 'rgba(245,241,235,0.35)',
            display: 'block',
          }}
        />
      </div>

      {/* ── Results list ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          flex: 1,
        }}
      >
        {ordered.map((result, index) => (
          <motion.div
            key={result.id}
            layout
            transition={
              reduced
                ? { duration: 0 }
                : { layout: SPRING }
            }
            animate={{
              borderColor: result.isKoma && active
                ? 'rgba(167,139,250,0.28)'
                : 'rgba(255,255,255,0.07)',
              backgroundColor: result.isKoma && active
                ? 'rgba(167,139,250,0.06)'
                : 'rgba(255,255,255,0.025)',
            }}
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              padding: '8px 10px',
              position: 'relative',
              flex: '0 0 auto',
            }}
          >
            {/* Rank badge */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                fontFamily: "'DM Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.06em',
                color: result.isKoma && active
                  ? 'rgba(167,139,250,0.9)'
                  : 'rgba(245,241,235,0.18)',
                transition: 'color 0.3s ease',
              }}
            >
              #{index + 1}
            </div>

            {/* URL */}
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.04em',
                color: result.isKoma
                  ? 'rgba(167,139,250,0.65)'
                  : 'rgba(245,241,235,0.28)',
                marginBottom: '3px',
              }}
            >
              {result.url} ›
            </div>

            {/* Title */}
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                color: result.isKoma && active
                  ? '#C4B5FD'
                  : 'rgba(245,241,235,0.72)',
                marginBottom: '2px',
                lineHeight: 1.3,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'color 0.3s ease',
              }}
            >
              {result.title}
            </div>

            {/* Description */}
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 300,
                color: 'rgba(245,241,235,0.32)',
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {result.desc}
            </div>

            {/* "#1" badge — only on koma when active */}
            <AnimatePresence>
              {result.isKoma && active && (
                <motion.span
                  key="top-badge"
                  initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 22 }}
                  style={{
                    position: 'absolute',
                    top: '-7px',
                    left: '10px',
                    background: '#A78BFA',
                    color: '#0A0A0A',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    padding: '1px 6px',
                    borderRadius: '4px',
                  }}
                >
                  #1
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
export default memo(SEOAnimation);
