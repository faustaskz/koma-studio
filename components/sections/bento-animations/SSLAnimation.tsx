'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Lock, LockOpen } from 'lucide-react';

export default function SSLAnimation() {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  // When reduced motion: always show the "locked" end-state, no transitions
  const active = hovered || !!reduced;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '140px',
        borderRadius: '10px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: '20px',
        flexShrink: 0,
      }}
    >
      {/* Subtle radial gradient bg — fades in on hover */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(167,139,250,0.10) 0%, transparent 72%)',
          pointerEvents: 'none',
        }}
      />

      {/* Pulse glow ring behind icon */}
      <motion.div
        aria-hidden
        animate={
          hovered && !reduced
            ? { opacity: [0.35, 0.75, 0.35], scale: [1, 1.18, 1] }
            : { opacity: 0, scale: 1 }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: '88px',
          height: '88px',
          borderRadius: '50%',
          background: 'rgba(167,139,250,0.18)',
          filter: 'blur(14px)',
          pointerEvents: 'none',
        }}
      />

      {/* Icon swap: LockOpen → Lock */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.span
              key="locked"
              initial={reduced ? false : { scale: 0.55, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.55, opacity: 0 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 380, damping: 22 }
              }
              style={{ color: '#A78BFA', display: 'flex' }}
            >
              <Lock size={52} strokeWidth={1.4} />
            </motion.span>
          ) : (
            <motion.span
              key="unlocked"
              initial={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.14, ease: 'easeIn' }}
              style={{ color: 'rgba(245,241,235,0.22)', display: 'flex' }}
            >
              <LockOpen size={52} strokeWidth={1.4} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* "SSL aktyvuotas" label — fades in below icon */}
      <AnimatePresence>
        {active && (
          <motion.p
            key="label"
            initial={reduced ? false : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.28, delay: 0.08, ease: 'easeOut' }
            }
            style={{
              position: 'absolute',
              bottom: '14px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(167,139,250,0.80)',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            SSL aktyvuotas
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
