'use client';

import { useEffect, useRef, useState } from 'react';

const WORDS = ['prabanga', 'kokybė', 'patirtis', 'vertė', 'vizija'];
const HOLD_MS    = 3200;
const TYPE_MS    = 68;
const DELETE_MS  = 42;
const PAUSE_MS   = 180; // pause between delete done and start typing

export default function TypewriterWord() {
  const [displayed, setDisplayed] = useState(WORDS[0]);
  const [showCursor, setShowCursor] = useState(false);
  const wordIndex = useRef(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let ticker: ReturnType<typeof setInterval>;

    function startDelete() {
      setShowCursor(true);
      const current = WORDS[wordIndex.current];
      let len = current.length;

      ticker = setInterval(() => {
        len--;
        setDisplayed(current.slice(0, len));
        if (len <= 0) {
          clearInterval(ticker);
          wordIndex.current = (wordIndex.current + 1) % WORDS.length;
          timer = setTimeout(startType, PAUSE_MS);
        }
      }, DELETE_MS);
    }

    function startType() {
      const next = WORDS[wordIndex.current];
      let len = 0;

      ticker = setInterval(() => {
        len++;
        setDisplayed(next.slice(0, len));
        if (len >= next.length) {
          clearInterval(ticker);
          setShowCursor(false);
          timer = setTimeout(startDelete, HOLD_MS);
        }
      }, TYPE_MS);
    }

    timer = setTimeout(startDelete, HOLD_MS);
    return () => { clearTimeout(timer); clearInterval(ticker); };
  }, []);

  return (
    <>
      <style>{`@keyframes cur-blink { 0%,60%{opacity:0.7} 61%,100%{opacity:0} }`}</style>
      {displayed}
      {showCursor && (
        <span style={{
          WebkitTextFillColor: 'rgba(167,139,250,0.5)',
          color: 'rgba(167,139,250,0.5)',
          animation: 'cur-blink 1s ease-in-out infinite',
          marginLeft: '1px',
          fontStyle: 'normal',
          fontWeight: 300,
        }}>|</span>
      )}
    </>
  );
}
