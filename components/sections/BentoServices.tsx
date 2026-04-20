'use client';

import SSLAnimation from './bento-animations/SSLAnimation';
import SpeedAnimation from './bento-animations/SpeedAnimation';
import MobileAnimation from './bento-animations/MobileAnimation';
import SEOAnimation from './bento-animations/SEOAnimation';
import MetaAdsAnimation from './bento-animations/MetaAdsAnimation';
import GoogleAdsAnimation from './bento-animations/GoogleAdsAnimation';
import CRMAnimation from './bento-animations/CRMAnimation';
import AIAnimation from './bento-animations/AIAnimation';
import BrandAnimation from './bento-animations/BrandAnimation';

const cards = [
  {
    id: 'ssl',
    title: 'SSL ir saugumas',
    desc: 'Kiekviena svetainė su SSL sertifikatu ir saugumo auditu. Jūsų klientų duomenys apsaugoti.',
  },
  {
    id: 'seo',
    title: 'Google matomumas',
    desc: 'SEO optimizacija nuo techninio audito iki turinio strategijos. Auginame organinį trafiką.',
  },
  {
    id: 'speed',
    title: 'Greitis',
    desc: 'PageSpeed 90+ garantuotai. Optimizuotas kodas, CDN, kešavimas.',
  },
  {
    id: 'mobile',
    title: 'Mobili versija',
    desc: 'Pixel-perfect dizainas visuose įrenginiuose. Nuo telefono iki 4K ekrano.',
  },
  {
    id: 'meta',
    title: 'Meta Ads',
    desc: 'Facebook ir Instagram reklamos, kurios konvertuoja. Nuo kampanijų kūrimo iki A/B testavimo.',
  },
  {
    id: 'gads',
    title: 'Google Ads',
    desc: 'Search, Display, YouTube kampanijos. Konversijų sekimas ir optimizavimas.',
  },
  {
    id: 'crm',
    title: 'CRM ir automatizacijos',
    desc: 'Integruojame Make, n8n, HubSpot. Automatizuojame procesus, kurie atima jūsų laiką.',
  },
  {
    id: 'ai',
    title: 'AI integracijos',
    desc: 'Chatbotai, AI agentai, turinio generavimas. Šiuolaikiški sprendimai šiuolaikiniam verslui.',
  },
  {
    id: 'brand',
    title: 'Brand dizainas',
    desc: 'Logo, brand book, vizualinė tapatybė. Nuo idėjos iki pilno identiteto.',
  },
] as const;

type CardId = (typeof cards)[number]['id'];

// Cards that have a custom animation component
const ANIMATED: Partial<Record<CardId, React.ReactNode>> = {
  ssl:    <SSLAnimation />,
  seo:    <SEOAnimation />,
  speed:  <SpeedAnimation />,
  mobile: <MobileAnimation />,
  meta:   <MetaAdsAnimation />,
  gads:   <GoogleAdsAnimation />,
  crm:    <CRMAnimation />,
  ai:     <AIAnimation />,
  brand:  <BrandAnimation />,
};

// No placeholder cards remain — all 9 are animated
const PLACEHOLDER_HEIGHTS: Partial<Record<CardId, string>> = {};

export default function BentoServices() {
  return (
    <section id="bento-services" style={{ background: '#0A0A0A', padding: '100px 48px' }}>
      <style>{`
        /* ── BENTO SERVICES ── */
        #bento-services {
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .bento-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #F5F1EB;
          opacity: 0.5;
          margin-bottom: 20px;
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
        }

        .bento-sub {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(245, 241, 235, 0.5);
          max-width: 440px;
          margin-bottom: 64px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 300;
        }

        /* Grid */
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
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

        /* Cards */
        .bento-card {
          background: #0F0F0F;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          /* Use translate3d so the card gets its own compositing layer;
             avoids repaints when child animations run. */
          transform: translate3d(0, 0, 0);
          transition:
            border-color 0.28s ease,
            box-shadow  0.28s ease;
          /* Don't declare will-change: transform here — each animation
             sub-component sets it on the element that actually moves. */
        }

        .bento-card:hover {
          border-color: rgba(255,255,255,0.10);
          box-shadow: 0 0 0 1px rgba(167,139,250,0.06);
        }

        @media (min-width: 1024px) {
          .bento-card[data-card="ssl"],
          .bento-card[data-card="meta"] {
            padding: 28px;
          }
          .bento-card[data-card="seo"],
          .bento-card[data-card="crm"] {
            padding: 32px;
          }
        }

        /* Placeholder (cards without a custom animation yet) */
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
          color: rgba(245, 241, 235, 0.15);
          text-transform: uppercase;
        }

        /* Card text */
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
          .bento-card[data-card="crm"] .bento-card-title {
            font-size: 26px;
          }
          .bento-card[data-card="seo"] .bento-card-title {
            font-size: 22px;
          }
        }

        .bento-card-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 300;
          line-height: 1.65;
          color: rgba(245, 241, 235, 0.6);
        }

        @media (max-width: 767px) {
          #bento-services {
            padding: 72px 24px;
          }
          .bento-placeholder {
            height: 100px !important;
          }
        }
      `}</style>

      {/* Heading block */}
      <p className="bento-eyebrow">— MŪSŲ GALIMYBĖS</p>
      <h2 className="bento-heading">
        Sprendimai, kurie auga kartu su&nbsp;jūsų verslu.
      </h2>
      <p className="bento-sub">
        Kiekviena paslauga — tiksliai tinkama jūsų verslo etapui.
        Nuo techninių pagrindų iki augimo strategijų.
      </p>

      {/* Bento grid */}
      <div className="bento-grid">
        {cards.map((card) => {
          const animation = ANIMATED[card.id];
          const phHeight = PLACEHOLDER_HEIGHTS[card.id];

          return (
            <div
              key={card.id}
              className="bento-card"
              data-card={card.id}
            >
              {/* Animation or placeholder */}
              {animation ?? (
                <div
                  className="bento-placeholder"
                  style={{ height: phHeight ?? '120px' }}
                >
                  <span className="bento-placeholder-label">animation area</span>
                </div>
              )}

              {/* Card text */}
              <div style={{ marginTop: 'auto' }}>
                <h3 className="bento-card-title">{card.title}</h3>
                <p className="bento-card-desc">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
