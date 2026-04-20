'use client';

import { useState, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Blocks that simulate page content inside the phone screen
const CONTENT_BLOCKS = [
  { w: '75%', h: 6, accent: false },
  { w: '55%', h: 6, accent: false },
  { w: '100%', h: 36, accent: true },
  { w: '85%', h: 6, accent: false },
  { w: '65%', h: 6, accent: false },
  { w: '100%', h: 24, accent: false },
  { w: '80%', h: 6, accent: false },
  { w: '60%', h: 6, accent: false },
  { w: '100%', h: 30, accent: true },
  { w: '70%', h: 6, accent: false },
];

function MobileAnimation({ forceActive = false }: { forceActive?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const active = (forceActive || hovered) && !reduced;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '120px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        flexShrink: 0,
        // 3-D perspective for the parent
        perspective: '700px',
        perspectiveOrigin: 'center center',
      }}
    >
      {/* Phone frame — rotates on hover */}
      <motion.div
        animate={
          active
            ? { rotateY: 6, rotateX: -5, scale: 1.04 }
            : { rotateY: 0, rotateX: 0, scale: 1 }
        }
        transition={
          reduced
            ? { duration: 0 }
            : { type: 'spring', stiffness: 200, damping: 24 }
        }
        style={{
          width: '62px',
          height: '108px',
          borderRadius: '16px',
          border: '2px solid rgba(255,255,255,0.14)',
          background: '#141414',
          position: 'relative',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          boxShadow: active
            ? '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.12)'
            : '0 8px 24px rgba(0,0,0,0.35)',
          // Shadow transition is CSS, not Framer (fine for this use)
          transition: 'box-shadow 0.35s ease',
        }}
      >
        {/* Screen bezel */}
        <div
          style={{
            position: 'absolute',
            inset: '3px',
            borderRadius: '13px',
            background: '#0a0a0a',
            overflow: 'hidden',
          }}
        >
          {/* Dynamic island / notch */}
          <div
            style={{
              width: '22px',
              height: '5px',
              background: '#141414',
              borderRadius: '0 0 6px 6px',
              margin: '0 auto 4px',
            }}
          />

          {/* Scrolling content */}
          <motion.div
            animate={
              active
                ? { y: ['0%', '-42%'] }
                : { y: '0%' }
            }
            transition={
              active
                ? {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                  }
                : { duration: 0.4, ease: 'easeOut' }
            }
            style={{
              padding: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {/* Duplicate blocks for seamless loop */}
            {[...CONTENT_BLOCKS, ...CONTENT_BLOCKS].map((block, i) => (
              <div
                key={i}
                style={{
                  width: block.w,
                  height: `${block.h}px`,
                  borderRadius: '3px',
                  background: block.accent
                    ? 'rgba(167,139,250,0.20)'
                    : 'rgba(255,255,255,0.07)',
                  flexShrink: 0,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Home indicator bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '24px',
            height: '2px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.18)',
          }}
        />
      </motion.div>
    </div>
  );
}
export default memo(MobileAnimation);
