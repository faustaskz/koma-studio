'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FileText, Database, Mail, MessageSquare } from 'lucide-react';

// ── Layout constants (SVG viewBox 0 0 340 240) ────────────────────────────
const W = 340;
const H = 240;

// Node centre coords
const NX = [68, W - 68, W - 68, 68];
const NY = [80,       80, H - 80, H - 80];

const NODE_META = [
  { id: 'form',  label: 'Contact Form', Icon: FileText },
  { id: 'crm',   label: 'CRM',          Icon: Database },
  { id: 'email', label: 'Email',        Icon: Mail },
  { id: 'slack', label: 'Slack',        Icon: MessageSquare },
] as const;

// Box half-dimensions
const BW = 22; // half-width
const BH = 20; // half-height

// Line path & arrowhead tip
const LINES = [
  { // form → crm (rightward)
    d: `M ${NX[0] + BW + 2} ${NY[0]} L ${NX[1] - BW - 2} ${NY[1]}`,
    tipX: NX[1] - BW - 2,
    tipY: NY[1],
    tipPoints: (x: number, y: number) =>
      `${x},${y} ${x - 7},${y - 3} ${x - 7},${y + 3}`,
  },
  { // crm → email (downward)
    d: `M ${NX[1]} ${NY[1] + BH + 2} L ${NX[2]} ${NY[2] - BH - 2}`,
    tipX: NX[2],
    tipY: NY[2] - BH - 2,
    tipPoints: (x: number, y: number) =>
      `${x},${y} ${x - 3},${y - 7} ${x + 3},${y - 7}`,
  },
  { // email → slack (leftward)
    d: `M ${NX[2] - BW - 2} ${NY[2]} L ${NX[3] + BW + 2} ${NY[3]}`,
    tipX: NX[3] + BW + 2,
    tipY: NY[3],
    tipPoints: (x: number, y: number) =>
      `${x},${y} ${x + 7},${y - 3} ${x + 7},${y + 3}`,
  },
] as const;

// ── Phase timings (ms) ─────────────────────────────────────────────────────
// Even phase = node pulse, odd phase = line flow, phase 7 = hold
const DURATIONS = [200, 320, 200, 320, 200, 320, 200, 400];

function sleep(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

// ── Component ──────────────────────────────────────────────────────────────
function CRMAnimation({ forceActive = false }: { forceActive?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState(-1);
  const reduced = useReducedMotion();
  const cancelRef = useRef(false);

  useEffect(() => {
    if ((!hovered && !forceActive) || reduced) {
      setPhase(reduced ? 7 : -1);
      return;
    }

    cancelRef.current = false;

    (async () => {
      while (!cancelRef.current) {
        for (let p = 0; p < 8; p++) {
          if (cancelRef.current) return;
          setPhase(p);
          await sleep(DURATIONS[p]);
        }
      }
    })();

    return () => {
      cancelRef.current = true;
      setPhase(-1);
    };
  }, [hovered, forceActive, reduced]);

  const isNodeLit  = (i: number) => phase >= i * 2;
  const isNodePulse = (i: number) => phase === i * 2;
  const isLineActive = (i: number) => phase === i * 2 + 1 || phase >= 7;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '280px',
        borderRadius: '10px',
        marginBottom: '20px',
        flexShrink: 0,
        background: 'rgba(255,255,255,0.015)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        aria-hidden
      >
        {/* ── Lines ── */}
        {LINES.map((line, i) => (
          <g key={i}>
            {/* Dim base dashes */}
            <path
              d={line.d}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1.5"
              strokeDasharray="6 5"
              fill="none"
            />

            {/* Active flowing overlay */}
            <motion.path
              d={line.d}
              strokeWidth="1.5"
              strokeDasharray="6 5"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isLineActive(i) ? 1 : 0,
                strokeDashoffset: isLineActive(i) && !reduced ? [0, -11] : 0,
              }}
              transition={{
                opacity: { duration: 0.2 },
                strokeDashoffset: isLineActive(i) && !reduced
                  ? { duration: 0.45, repeat: Infinity, ease: 'linear' }
                  : { duration: 0 },
              }}
              style={{ stroke: '#A78BFA', willChange: 'stroke-dashoffset' }}
            />

            {/* Arrowhead tip */}
            <motion.polygon
              points={line.tipPoints(line.tipX, line.tipY)}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLineActive(i) ? 1 : 0.18 }}
              transition={{ duration: 0.2 }}
              style={{
                fill: isLineActive(i) ? '#A78BFA' : 'rgba(255,255,255,0.18)',
              }}
            />
          </g>
        ))}

        {/* ── Nodes ── */}
        {NODE_META.map((node, i) => {
          const cx = NX[i];
          const cy = NY[i];
          const lit = isNodeLit(i);
          const pulse = isNodePulse(i);

          return (
            <g key={node.id}>
              {/* Node box */}
              <motion.rect
                x={cx - BW}
                y={cy - BH}
                width={BW * 2}
                height={BH * 2}
                rx="8"
                animate={{
                  fill: lit
                    ? 'rgba(167,139,250,0.08)'
                    : 'rgba(255,255,255,0.04)',
                  stroke: lit
                    ? 'rgba(167,139,250,0.45)'
                    : 'rgba(255,255,255,0.10)',
                }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                strokeWidth="1"
              />

              {/* Glow layer (separate rect, blurred) */}
              <motion.rect
                x={cx - BW}
                y={cy - BH}
                width={BW * 2}
                height={BH * 2}
                rx="8"
                fill="none"
                animate={{
                  stroke: lit ? 'rgba(167,139,250,0.25)' : 'rgba(0,0,0,0)',
                  strokeWidth: lit ? 8 : 0,
                }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                style={{ filter: 'blur(4px)', pointerEvents: 'none' }}
              />

              {/* Scale pulse wrapper — translated to node centre */}
              <motion.g
                animate={
                  pulse && !reduced
                    ? { scale: [1, 1.12, 1] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.28 }}
                style={{
                  transformBox: 'fill-box',
                  transformOrigin: `${cx}px ${cy}px`,
                }}
              >
                {/* Icon (lucide, via foreignObject) */}
                <foreignObject
                  x={cx - 9}
                  y={cy - 11}
                  width="18"
                  height="18"
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: lit ? '#A78BFA' : 'rgba(245,241,235,0.28)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    <node.Icon size={14} strokeWidth={1.5} />
                  </div>
                </foreignObject>
              </motion.g>

              {/* Label */}
              <text
                x={cx}
                y={cy + BH + 11}
                textAnchor="middle"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '8px',
                  letterSpacing: '0.07em',
                  fill: lit ? 'rgba(245,241,235,0.55)' : 'rgba(245,241,235,0.22)',
                  transition: 'fill 0.3s ease',
                  textTransform: 'uppercase',
                }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default memo(CRMAnimation);
