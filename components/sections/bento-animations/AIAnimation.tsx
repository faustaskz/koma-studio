'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const AI_RESPONSE = 'Rekomenduoju Meta reklamos kampaniją su...';
const CHAR_DELAY_MS = 38;
const TYPING_PAUSE_MS = 520;

function AIAnimation({ forceActive = false }: { forceActive?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const [typed, setTyped]     = useState('');
  const [isTyping, setIsTyping] = useState(false); // typing indicator (dots)
  const [done, setDone]       = useState(false);

  const timersRef = useRef<(ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>)[]>([]);

  function clearTimers() {
    timersRef.current.forEach((t) => {
      clearTimeout(t as ReturnType<typeof setTimeout>);
      clearInterval(t as ReturnType<typeof setInterval>);
    });
    timersRef.current = [];
  }

  useEffect(() => {
    clearTimers();

    if (!hovered && !forceActive) {
      setTyped('');
      setIsTyping(false);
      setDone(false);
      return;
    }

    if (reduced) {
      setIsTyping(false);
      setTyped(AI_RESPONSE);
      setDone(true);
      return;
    }

    // Phase 1: show typing dots
    setIsTyping(true);
    setTyped('');
    setDone(false);

    // Phase 2: after pause, start typewriting
    const t1 = setTimeout(() => {
      setIsTyping(false);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTyped(AI_RESPONSE.slice(0, i));
        if (i >= AI_RESPONSE.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, CHAR_DELAY_MS);
      timersRef.current.push(iv);
    }, TYPING_PAUSE_MS);

    timersRef.current.push(t1);

    return clearTimers;
  }, [hovered, forceActive, reduced]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        height: '120px',
        borderRadius: '10px',
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '7px',
        marginBottom: '20px',
        flexShrink: 0,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      {/* ── User message (right-aligned) ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '12px 12px 3px 12px',
            padding: '6px 10px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 300,
            color: 'rgba(245,241,235,0.75)',
            maxWidth: '75%',
            lineHeight: 1.45,
          }}
        >
          Kaip padidinti pardavimus?
        </div>
      </div>

      {/* ── AI message (left-aligned) ── */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
        {/* AI avatar */}
        <div
          style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '7px',
              fontWeight: 700,
              color: '#0A0A0A',
              letterSpacing: 0,
            }}
          >
            AI
          </span>
        </div>

        {/* Bubble */}
        <div
          style={{
            background: 'rgba(167,139,250,0.08)',
            border: '1px solid rgba(167,139,250,0.18)',
            borderRadius: '12px 12px 12px 3px',
            padding: '6px 10px',
            maxWidth: '76%',
            minHeight: '30px',
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1.45,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isTyping ? (
              /* ── Typing dots ── */
              <motion.div
                key="dots"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', gap: '3px', alignItems: 'center' }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -2, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: dot * 0.18,
                      ease: 'easeInOut',
                    }}
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'rgba(167,139,250,0.7)',
                      display: 'block',
                      willChange: 'transform, opacity',
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              /* ── Typed text ── */
              <motion.div
                key="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1 }}
                style={{ display: 'flex', alignItems: 'baseline' }}
              >
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '11px',
                    fontWeight: 300,
                    color: 'rgba(245,241,235,0.75)',
                  }}
                >
                  {typed || '\u00A0'}
                </span>

                {/* Blinking cursor — shows while typing and briefly after */}
                {!done && typed.length > 0 && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                    style={{
                      display: 'inline-block',
                      width: '1.5px',
                      height: '11px',
                      background: '#A78BFA',
                      marginLeft: '1px',
                      borderRadius: '1px',
                      verticalAlign: 'middle',
                      willChange: 'opacity',
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default memo(AIAnimation);
