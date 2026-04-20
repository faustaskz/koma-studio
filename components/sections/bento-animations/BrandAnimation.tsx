'use client';

import { useState, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// SVG canvas: 220 × 120, centre (110, 60)
const CX = 110;
const CY = 60;
const ORBIT_R = 42;
const LOGO_R  = 16;

const SWATCHES = [
  { color: '#A78BFA', angle: 315 }, // top-right — violet
  { color: '#F5F1EB', angle: 45  }, // bottom-right — cream
  { color: '#4B4B55', angle: 135 }, // bottom-left — charcoal
  { color: '#7C7C8A', angle: 225 }, // top-left — gray
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }

function BrandAnimation({ forceActive = false }: { forceActive?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const active = forceActive || hovered || !!reduced;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '120px',
        borderRadius: '10px',
        marginBottom: '20px',
        flexShrink: 0,
        background: 'rgba(255,255,255,0.015)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 220 120"
        width="220"
        height="120"
        style={{ overflow: 'visible' }}
        aria-hidden
      >
        {/* ── Orbit track (appears on hover) ── */}
        <AnimatePresence>
          {active && (
            <motion.circle
              key="orbit-track"
              cx={CX}
              cy={CY}
              r={ORBIT_R}
              fill="none"
              stroke="rgba(167,139,250,0.07)"
              strokeWidth="1"
              strokeDasharray="3 7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        {/* ── Orbiting swatches ── */}
        {/* Single rotating group — translate to centre, rotate, translate back implicit */}
        <g transform={`translate(${CX}, ${CY})`}>
          <motion.g
            animate={active && !reduced ? { rotate: 360 } : { rotate: 0 }}
            transition={
              active && !reduced
                ? { duration: 3, repeat: Infinity, ease: 'linear' }
                : { duration: 0.5, ease: 'easeOut' }
            }
            style={{ willChange: 'transform' }}
          >
            {SWATCHES.map((sw, i) => {
              const rad     = toRad(sw.angle);
              const sx      = ORBIT_R * Math.cos(rad);
              const sy      = ORBIT_R * Math.sin(rad);
              // Trail ghost: offset by -22° behind each swatch
              const trailRad = toRad(sw.angle - 22);
              const tx      = ORBIT_R * Math.cos(trailRad);
              const ty      = ORBIT_R * Math.sin(trailRad);

              return (
                <g key={i}>
                  {/* Trail ghost */}
                  <motion.circle
                    cx={tx}
                    cy={ty}
                    r="4.5"
                    fill={sw.color}
                    animate={{ opacity: active ? 0.22 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Main swatch */}
                  <motion.circle
                    cx={sx}
                    cy={sy}
                    r="6"
                    fill={sw.color}
                    animate={{ opacity: active ? 1 : 0.35 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      filter: active ? 'drop-shadow(0 0 4px rgba(167,139,250,0.4))' : 'none',
                    }}
                  />
                </g>
              );
            })}
          </motion.g>
        </g>

        {/* ── Logo mockup ── */}
        <g transform={`translate(${CX}, ${CY})`}>
          <motion.g
            animate={
              active && !reduced
                ? { scale: [1, 1.055, 1] }
                : { scale: 1 }
            }
            transition={
              active && !reduced
                ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.4 }
            }
            style={{ willChange: 'transform' }}
          >
            {/* Outer circle */}
            <motion.circle
              cx={0}
              cy={0}
              r={LOGO_R}
              fill="none"
              animate={{
                stroke: active ? 'rgba(167,139,250,0.65)' : 'rgba(245,241,235,0.25)',
              }}
              transition={{ duration: 0.4 }}
              strokeWidth="1.5"
            />

            {/* Inner diamond (rotated square) */}
            <motion.rect
              x={-8}
              y={-8}
              width="16"
              height="16"
              rx="1"
              fill="none"
              transform="rotate(45)"
              animate={{
                stroke: active ? 'rgba(167,139,250,0.40)' : 'rgba(245,241,235,0.14)',
              }}
              transition={{ duration: 0.4 }}
              strokeWidth="1"
            />

            {/* Centre dot */}
            <motion.circle
              cx={0}
              cy={0}
              r="2.5"
              animate={{
                fill: active ? '#A78BFA' : 'rgba(245,241,235,0.20)',
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.g>
        </g>

        {/* ── Colour label hint (appears below on hover) ── */}
        <AnimatePresence>
          {active && (
            <motion.text
              key="label"
              x={CX}
              y={CY + LOGO_R + 30}
              textAnchor="middle"
              initial={reduced ? false : { opacity: 0, y: CY + LOGO_R + 36 }}
              animate={{ opacity: 1, y: CY + LOGO_R + 30 }}
              exit={{ opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '8px',
                letterSpacing: '0.12em',
                fill: 'rgba(245,241,235,0.28)',
                textTransform: 'uppercase',
              }}
            >
              Brand identity
            </motion.text>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

export default memo(BrandAnimation);
