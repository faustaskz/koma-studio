'use client';

import { useRef, useState, useEffect, memo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';

// ── Dynamic imports (ssr:false — Framer Motion hydration safety) ─────────────
const SSLAnimation    = dynamic(() => import('./bento-animations/SSLAnimation'),       { ssr: false });
const SEOAnimation    = dynamic(() => import('./bento-animations/SEOAnimation'),       { ssr: false });
const SpeedAnimation  = dynamic(() => import('./bento-animations/SpeedAnimation'),     { ssr: false });
const MobileAnimation = dynamic(() => import('./bento-animations/MobileAnimation'),   { ssr: false });
const MetaAnimation   = dynamic(() => import('./bento-animations/MetaAdsAnimation'),  { ssr: false });
const GAdsAnimation   = dynamic(() => import('./bento-animations/GoogleAdsAnimation'),{ ssr: false });
const CRMAnimation    = dynamic(() => import('./bento-animations/CRMAnimation'),      { ssr: false });
const AIAnimation     = dynamic(() => import('./bento-animations/AIAnimation'),       { ssr: false });
const BrandAnimation  = dynamic(() => import('./bento-animations/BrandAnimation'),    { ssr: false });

// ── Card data ─────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 'ssl'   as const,
    title: 'SSL ir saugumas',
    desc: 'Kiekviena svetainė su SSL sertifikatu ir saugumo auditu. Jūsų klientų duomenys apsaugoti.',
  },
  {
    id: 'seo'   as const,
    title: 'Google matomumas',
    desc: 'SEO optimizacija nuo techninio audito iki turinio strategijos. Auginame organinį trafiką.',
  },
  {
    id: 'speed' as const,
    title: 'Greitis',
    desc: 'PageSpeed 90+ garantuotai. Optimizuotas kodas, CDN, kešavimas.',
  },
  {
    id: 'mobile' as const,
    title: 'Mobili versija',
    desc: 'Pixel-perfect dizainas visuose įrenginiuose. Nuo telefono iki 4K ekrano.',
  },
  {
    id: 'meta'  as const,
    title: 'Meta Ads',
    desc: 'Facebook ir Instagram reklamos, kurios konvertuoja. Nuo kampanijų kūrimo iki A/B testavimo.',
  },
  {
    id: 'gads'  as const,
    title: 'Google Ads',
    desc: 'Search, Display, YouTube kampanijos. Konversijų sekimas ir optimizavimas.',
  },
  {
    id: 'crm'   as const,
    title: 'CRM ir automatizacijos',
    desc: 'Integruojame Make, n8n, HubSpot. Automatizuojame procesus, kurie atima jūsų laiką.',
  },
  {
    id: 'ai'    as const,
    title: 'AI integracijos',
    desc: 'Chatbotai, AI agentai, turinio generavimas. Šiuolaikiški sprendimai šiuolaikiniam verslui.',
  },
  {
    id: 'brand' as const,
    title: 'Brand dizainas',
    desc: 'Logo, brand book, vizualinė tapatybė. Nuo idėjos iki pilno identiteto.',
  },
];

type CardId = (typeof CARDS)[number]['id'];

// ── Route map ──────────────────────────────────────────────────────────────────
const CARD_HREFS: Record<CardId, string> = {
  ssl:    '/paslaugos/ssl-saugumas',
  seo:    '/paslaugos/google-matomumas',
  speed:  '/paslaugos/greitis-performance',
  mobile: '/paslaugos/mobili-versija',
  meta:   '/paslaugos/meta-ads',
  gads:   '/paslaugos/google-ads',
  crm:    '/paslaugos/crm-automatizacijos',
  ai:     '/paslaugos/ai-integracijos',
  brand:  '/paslaugos/brand-dizainas',
};

// ── Animation component map ────────────────────────────────────────────────────
type AnimProps = { forceActive?: boolean };
const ANIM_MAP: Partial<Record<CardId, React.ComponentType<AnimProps>>> = {
  ssl:    SSLAnimation,
  seo:    SEOAnimation,
  speed:  SpeedAnimation,
  mobile: MobileAnimation,
  meta:   MetaAnimation,
  gads:   GAdsAnimation,
  crm:    CRMAnimation,
  ai:     AIAnimation,
  brand:  BrandAnimation,
};

// Min heights used as loading skeleton while dynamic component loads
const ANIM_HEIGHTS: Record<CardId, string> = {
  ssl:    '140px',
  seo:    '260px',
  speed:  '120px',
  mobile: '120px',
  meta:   '140px',
  gads:   '120px',
  crm:    '280px',
  ai:     '120px',
  brand:  '120px',
};

// ── JSON-LD ────────────────────────────────────────────────────────────────────
function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': CARDS.map((c) => ({
      '@type': 'Service',
      name: c.title,
      description: c.desc,
      provider: {
        '@type': 'Organization',
        name: 'KOMA Studio',
        url: 'https://koma-studio.lt',
      },
      url: `https://koma-studio.lt${CARD_HREFS[c.id]}`,
    })),
  };
}

// ── Motion variants ────────────────────────────────────────────────────────────
const GRID_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
} as const;

const CARD_VARIANTS = {
  hidden:  { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
} as const;

// ── BentoCard (memoised — re-renders only when forceActive / card changes) ────
interface BentoCardProps {
  card: (typeof CARDS)[number];
  isMobile: boolean;
}

const BentoCard = memo(function BentoCard({ card, isMobile }: BentoCardProps) {
  const ref = useRef<HTMLElement>(null);
  // Once:false — mobile cards deactivate when they scroll away
  const isInView   = useInView(ref, { once: false, amount: 0.45 });
  const forceActive = isMobile && isInView;

  const AnimComp = ANIM_MAP[card.id];
  const phHeight = ANIM_HEIGHTS[card.id];

  return (
    <motion.article
      ref={ref}
      className="bento-card"
      data-card={card.id}
      variants={CARD_VARIANTS}
      // Promote to its own GPU layer once visible
      style={{ willChange: 'opacity, transform' }}
    >
      {/* ── Full-card keyboard-accessible link ── */}
      <Link
        href={CARD_HREFS[card.id]}
        className="bento-card-link"
        aria-label={`${card.title} — žiūrėti paslaugą`}
      />

      {/* ── Animation (z-index 2 so it sits above the link overlay) ── */}
      <div className="bento-anim-wrap">
        {AnimComp ? (
          <AnimComp forceActive={forceActive} />
        ) : (
          // Loading skeleton while dynamic chunk downloads
          <div
            className="bento-placeholder"
            style={{ height: phHeight }}
            aria-hidden="true"
          >
            <span className="bento-placeholder-label">loading…</span>
          </div>
        )}
      </div>

      {/* ── Text ── */}
      <div className="bento-text">
        <h3 className="bento-card-title">{card.title}</h3>
        <p className="bento-card-desc">{card.desc}</p>
      </div>

      {/* ── Corner indicator ── */}
      <span className="bento-card-arrow" aria-hidden="true">→</span>
    </motion.article>
  );
});

// ── Main component ─────────────────────────────────────────────────────────────
export default function BentoServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px 0px' });

  // Detect touch-only devices (no CSS hover capability → mobile)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <>
      {/* ── Structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
      />

      <section
        id="bento-services"
        ref={sectionRef}
        aria-label="KOMA Studio — visos paslaugos"
        style={{ background: '#0A0A0A', padding: '100px 48px', position: 'relative', overflow: 'hidden' }}
      >
        {/* Styles are component-scoped via #bento-services prefix */}
        <style>{`
          /* ── Noise texture on section background ── */
          #bento-services::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            opacity: 0.028;
            pointer-events: none;
            z-index: 0;
          }

          /* Section border */
          #bento-services {
            border-top: 1px solid rgba(255,255,255,0.06);
          }

          /* ── Typography ── */
          .bento-eyebrow {
            font-family: 'DM Mono', monospace;
            font-size: 11px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #F5F1EB;
            opacity: 0.5;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
          }
          .bento-heading {
            font-family: 'Instrument Serif', serif;
            font-size: clamp(36px, 4.5vw, 62px);
            font-weight: 400;
            line-height: 1.1;
            letter-spacing: -0.02em;
            color: #F5F1EB;
            max-width: 640px;
            margin-bottom: 16px;
            position: relative;
            z-index: 1;
          }
          .bento-sub {
            font-size: 16px;
            line-height: 1.7;
            color: rgba(245,241,235,0.50);
            max-width: 440px;
            margin-bottom: 64px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 300;
            position: relative;
            z-index: 1;
          }

          /* ── Grid ── */
          .bento-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            position: relative;
            z-index: 1;
          }
          @media (min-width: 768px) {
            .bento-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .bento-grid {
              grid-template-columns: repeat(4, 1fr);
              grid-template-rows: auto auto auto auto;
              grid-template-areas:
                "ssl   ssl   speed  seo"
                "meta  meta  mobile seo"
                "crm   crm   gads   ai"
                "crm   crm   brand  .";
            }
            .bento-card[data-card="ssl"]    { grid-area: ssl; }
            .bento-card[data-card="seo"]    { grid-area: seo; }
            .bento-card[data-card="speed"]  { grid-area: speed; }
            .bento-card[data-card="mobile"] { grid-area: mobile; }
            .bento-card[data-card="meta"]   { grid-area: meta; }
            .bento-card[data-card="gads"]   { grid-area: gads; }
            .bento-card[data-card="crm"]    { grid-area: crm; }
            .bento-card[data-card="ai"]     { grid-area: ai; }
            .bento-card[data-card="brand"]  { grid-area: brand; }
          }

          /* ── Card base ── */
          .bento-card {
            background: #0F0F0F;
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 24px;
            display: flex;
            flex-direction: column;
            position: relative;
            /* Own compositing layer — prevents repaint when children animate */
            transform: translate3d(0, 0, 0);
            transition: border-color 0.28s ease, box-shadow 0.28s ease;
            text-decoration: none;
          }
          .bento-card:hover,
          .bento-card:focus-within {
            border-color: rgba(255,255,255,0.10);
            box-shadow: 0 0 0 1px rgba(167,139,250,0.07);
          }
          /* Keyboard focus ring */
          .bento-card:focus-within {
            outline: none;
            box-shadow: 0 0 0 2px rgba(167,139,250,0.30) !important;
          }

          /* Large cards get more padding on desktop */
          @media (min-width: 1024px) {
            .bento-card[data-card="ssl"],
            .bento-card[data-card="meta"]  { padding: 28px; }
            .bento-card[data-card="seo"],
            .bento-card[data-card="crm"]   { padding: 32px; }
          }

          /* ── Full-card link (covers card for pointer+keyboard nav) ── */
          .bento-card-link {
            position: absolute;
            inset: 0;
            z-index: 1;
            border-radius: 16px;
            /* Transparent — only provides click area & focus target */
          }
          .bento-card-link:focus { outline: none; } /* outline on :focus-within instead */

          /* ── Animation wrapper (sits above link overlay) ── */
          .bento-anim-wrap {
            position: relative;
            z-index: 2;
          }

          /* ── Text ── */
          .bento-text {
            margin-top: auto;
            position: relative;
            z-index: 2;
          }
          .bento-card-title {
            font-family: 'Instrument Serif', serif;
            font-size: 20px;
            font-weight: 400;
            line-height: 1.2;
            color: #F5F1EB;
            margin-bottom: 8px;
            letter-spacing: -0.01em;
          }
          @media (min-width: 1024px) {
            .bento-card[data-card="crm"] .bento-card-title { font-size: 26px; }
            .bento-card[data-card="seo"] .bento-card-title { font-size: 22px; }
          }
          .bento-card-desc {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 13px;
            font-weight: 300;
            line-height: 1.65;
            color: rgba(245,241,235,0.60);
          }

          /* ── Corner arrow ── */
          .bento-card-arrow {
            position: absolute;
            top: 14px;
            right: 16px;
            font-size: 13px;
            color: rgba(245,241,235,0.18);
            transition: transform 0.25s ease, color 0.25s ease;
            z-index: 2;
            pointer-events: none;
            line-height: 1;
          }
          .bento-card:hover .bento-card-arrow,
          .bento-card:focus-within .bento-card-arrow {
            transform: rotate(-45deg);
            color: rgba(245,241,235,0.55);
          }

          /* ── Placeholder (while dynamic chunk loads) ── */
          .bento-placeholder {
            width: 100%;
            border-radius: 10px;
            background: rgba(255,255,255,0.03);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            margin-bottom: 20px;
          }
          .bento-placeholder-label {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            letter-spacing: 0.16em;
            color: rgba(245,241,235,0.12);
            text-transform: uppercase;
          }

          /* ── Mobile ── */
          @media (max-width: 767px) {
            #bento-services { padding: 72px 24px; }
            .bento-card { height: auto; }
          }
        `}</style>

        {/* ── Section heading ── */}
        <p className="bento-eyebrow">— MŪSŲ GALIMYBĖS</p>
        <h2 className="bento-heading">
          Sprendimai, kurie auga kartu su&nbsp;jūsų verslu.
        </h2>
        <p className="bento-sub">
          Kiekviena paslauga — tiksliai tinkama jūsų verslo etapui.
          Nuo techninių pagrindų iki augimo strategijų.
        </p>

        {/* ── Staggered card grid ── */}
        <motion.div
          className="bento-grid"
          variants={GRID_VARIANTS}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {CARDS.map((card) => (
            <BentoCard key={card.id} card={card} isMobile={isMobile} />
          ))}
        </motion.div>
      </section>
    </>
  );
}
