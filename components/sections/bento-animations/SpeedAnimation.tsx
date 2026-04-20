'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';

export default function SpeedAnimation() {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const progress = useMotionValue(reduced ? 98 : 0);
  // String for the displayed number
  const displayCount = useTransform(progress, (v) => String(Math.round(v)));
  // Width % for the bar fill
  const barWidth = useTransform(progress, [0, 98], ['0%', '98%']);

  useEffect(() => {
    if (reduced) {
      // No animation — keep at 98
      progress.set(98);
      return;
    }

    if (hovered) {
      const ctrl = animate(progress, 98, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => ctrl.stop();
    } else {
      const ctrl = animate(progress, 0, {
        duration: 0.55,
        ease: 'easeOut',
      });
      return () => ctrl.stop();
    }
  }, [hovered, reduced, progress]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '120px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: '0 20px',
        marginBottom: '20px',
        flexShrink: 0,
      }}
    >
      {/* Animated number */}
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
            fontSize: '42px',
            fontWeight: 400,
            lineHeight: 1,
            color: '#F5F1EB',
          }}
        >
          {displayCount}
        </motion.span>
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '13px',
            color: 'rgba(245,241,235,0.35)',
          }}
        >
          /100
        </span>
      </div>

      {/* Label */}
      <p
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(245,241,235,0.35)',
          marginBottom: '14px',
        }}
      >
        PageSpeed score
      </p>

      {/* Progress bar track */}
      <div
        style={{
          width: '100%',
          height: '6px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Progress bar fill */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '0 auto 0 0',
            width: barWidth,
            height: '100%',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #7C3AED 0%, #A78BFA 60%, #C4B5FD 100%)',
          }}
        />
      </div>
    </div>
  );
}
