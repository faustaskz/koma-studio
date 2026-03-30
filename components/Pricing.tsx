'use client';

import { useState } from 'react';

type Tab = 'wp' | 'fr' | 'ai' | 'compare';

const TABS: { id: Tab; label: string }[] = [
  { id: 'wp', label: 'WordPress' },
  { id: 'fr', label: 'Framer' },
  { id: 'ai', label: 'AI Svetainė' },
  { id: 'compare', label: 'Palyginimas' },
];

interface Plan {
  name: string;
  price: string;
  desc: string;
  features: string[];
  featured?: boolean;
  badge?: string;
}

interface Platform {
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  pros: string[];
  cons: string[];
  plans: Plan[];
}

const PLATFORMS: Record<'wp' | 'fr' | 'ai', Platform> = {
  wp: {
    badge: 'WordPress',
    badgeColor: '#60a5fa',
    title: 'Klasikinis sprendimas — pilnas lankstumas',
    subtitle: 'Tinka verslo, el. parduotuvių ir turinio svetainėms. Lengvai valdoma turinio sistema, kurią galite tvarkyti patys.',
    pros: [
      'Patogus valdymas be programavimo žinių',
      'Lengva keisti tekstą ir nuotraukas',
      'Tūkstančiai papildinių ir temų',
      'Puikus el. parduotuvėms (WooCommerce)',
      'Didelė bendruomenė ir palaikymas',
    ],
    cons: [
      'Lėtesnis užkrovimo greitis nei modernesnės platformos',
      'Reikia reguliarių atnaujinimų',
      'Dizaino galimybės labiau standartizuotos',
    ],
    plans: [
      {
        name: 'WordPress Mini',
        price: '299',
        desc: 'Greitas pradžios puslapis',
        features: ['Landing page (1 puslapis)', 'Kontaktų forma', 'Mobili versija', 'Bazinė SEO sąranka'],
      },
      {
        name: 'WordPress Basic',
        price: '599',
        desc: 'Iki 5 puslapių svetainė',
        features: ['Iki 5 puslapių', 'Individuali dizaino tema', 'SEO optimizacija', 'Google Analytics', '1 mėn. palaikymas'],
        featured: true,
        badge: 'Populiariausias',
      },
      {
        name: 'WordPress Pro',
        price: '999',
        desc: 'Pilna svetainė su visomis funkcijomis',
        features: ['Iki 15 puslapių', 'El. parduotuvė (WooCommerce)', 'Neriboti puslapiai', 'Daugiakalbystė', 'API integracijos', '3 mėn. palaikymas'],
      },
    ],
  },
  fr: {
    badge: 'Framer',
    badgeColor: '#34d399',
    title: 'Modernus ir greitas — maksimalus dizainas',
    subtitle: 'Idealu landing page ir pristatomiesiems puslapiams. Neįtikėtinai greitas ir vizualiai efektingas.',
    pros: [
      'Pats greičiausias užkrovimo laikas',
      'Modernūs animacijos efektai',
      'Puikus konversijoms — atrodo premium',
      'Svetainė įdiegiama ir apsaugota automatiškai — jums nereikia rūpintis techniniais dalykais',
      'Greitas kūrimo procesas',
    ],
    cons: [
      'Mažiau lanksčios funkcijos nei WordPress',
      'Mėnesinis mokestis už platformą',
      'Nėra el. parduotuvės galimybės',
      'Mažesnė bendruomenė',
    ],
    plans: [
      {
        name: 'Framer Start',
        price: '399',
        desc: 'Efektingas landing page',
        features: ['1 puslapis su animacijomis', 'Mobili versija', 'Kontaktų forma'],
      },
      {
        name: 'Framer Business',
        price: '799',
        desc: 'Pilna pristatoma svetainė',
        features: ['Iki 6 puslapių', 'Prabangus dizainas', 'SEO ir Analytics', '2 mėn. palaikymas'],
        featured: true,
        badge: 'Rekomenduojamas',
      },
      {
        name: 'Framer Premium',
        price: '1299',
        desc: 'Visiškai individualus dizainas',
        features: ['Neriboti puslapiai', 'CMS turinys', 'Integracija su išoriniais įrankiais', '3 mėn. palaikymas'],
      },
    ],
  },
  ai: {
    badge: 'AI Svetainė',
    badgeColor: '#a78bfa',
    title: 'Ateities metodas — greičiau, išmaniau',
    subtitle: 'Kuriame svetaines naudodami dirbtinį intelektą. Išskirtinis rezultatas per trumpesnį laiką.',
    pros: [
      'Ypač greitas sukūrimo laikas',
      'Žemesnė kaina nei tradicinis kūrimas',
      'Tekstų generavimas ir optimizavimas įskaičiuotas',
      'Lengvai ir greitai galima keisti bei tobulinti svetainę',
      'Šiuolaikiškas ir modernus rezultatas',
    ],
    cons: [
      'Sudėtingesnėms funkcijoms reikia papildomo kūrimo',
      'Ne visada tinkamas didelėms el. parduotuvėms',
      'Turinį sunkiau keisti pačiam klientui',
    ],
    plans: [
      {
        name: 'AI Spark',
        price: '249',
        desc: 'Greitas startas su AI',
        features: ['Landing page su AI tekstais', 'Pagrindinis dizainas', 'SEO optimizuoti tekstai'],
      },
      {
        name: 'AI Growth',
        price: '549',
        desc: 'Pilna svetainė su AI turiniu',
        features: ['Iki 8 puslapių', 'AI tekstai ir vaizdai', 'SEO strategija', '2 mėn. palaikymas'],
        featured: true,
        badge: 'Geriausias kainos / kokybė',
      },
      {
        name: 'AI Scale',
        price: '1199',
        desc: 'Pažangus AI sprendimas',
        features: ['Neriboti puslapiai', 'AI chatbot integracija', 'Automatizacijos', '4 mėn. palaikymas'],
      },
    ],
  },
};

interface Cell { text: string; chk?: boolean; crs?: boolean }
interface CompareRow { feature: string; wp: Cell; fr: Cell; ai: Cell }

const COMPARE_ROWS: CompareRow[] = [
  { feature: 'Tinkamas pradedantiesiems', wp: { chk: true, text: 'Taip' }, fr: { chk: true, text: 'Taip' }, ai: { chk: true, text: 'Taip' } },
  { feature: 'Kliento galimybė keisti turinį', wp: { chk: true, text: 'Labai paprasta' }, fr: { text: 'Vidutiniškai' }, ai: { crs: true, text: 'Ribota' } },
  { feature: 'Dizaino unikalumas', wp: { text: 'Standartinis' }, fr: { text: 'Aukštas' }, ai: { text: 'Aukštas' } },
  { feature: 'Greitis ir našumas', wp: { text: 'Vidutinis' }, fr: { chk: true, text: 'Labai greitas' }, ai: { chk: true, text: 'Greitas' } },
  { feature: 'El. parduotuvė', wp: { chk: true, text: 'Taip' }, fr: { crs: true, text: 'Ne' }, ai: { text: 'Ribota' } },
  { feature: 'SEO galimybės', wp: { chk: true, text: 'Pilnos' }, fr: { chk: true, text: 'Pilnos' }, ai: { chk: true, text: 'Pilnos' } },
  { feature: 'Daugiakalbė svetainė', wp: { chk: true, text: 'Taip' }, fr: { text: 'Iš dalies' }, ai: { text: 'Iš dalies' } },
  { feature: 'Kūrimo greitis', wp: { text: 'Lėtesnis' }, fr: { text: 'Greitas' }, ai: { chk: true, text: 'Greičiausias' } },
  { feature: 'Pradžios kaina', wp: { text: 'Nuo €299' }, fr: { text: 'Nuo €399' }, ai: { text: 'Nuo €249' } },
  { feature: 'Geriausia kai...', wp: { text: 'Reikia el. parduotuvės ar didelio turinio valdymo' }, fr: { text: 'Svarbus įspūdingas dizainas ir greitis' }, ai: { text: 'Norima greito, modernaus rezultato už gerą kainą' } },
];

const SUPPORT_PLANS = [
  {
    tier: 'Mini',
    price: '14',
    features: ['Tekstų ir turinio atnaujinimas', 'Spalvų ir stilių korekcijos', 'Nuotraukų keitimas', 'Iki 2 val. darbų per mėnesį'],
  },
  {
    tier: 'Midi',
    price: '24',
    features: ['Visa Mini plano apimtis', 'Puslapio išdėstymo pakeitimai', 'Naujų funkcijų pridėjimas', 'Formų ir mygtukų keitimai', 'Iki 4 val. darbų per mėnesį'],
    featured: true,
    badge: 'Populiariausias',
  },
  {
    tier: 'Maxi',
    price: '49',
    features: ['Visa Midi plano apimtis', 'Naujų puslapių kūrimas', 'Pažangus SEO — raktažodžių stebėjimas ir turinio optimizavimas', 'Mėnesinė analitikos ataskaita', 'Iki 8 val. darbų per mėnesį'],
  },
];

function RevealPhone() {
  const [revealed, setRevealed] = useState(false);
  return (
    <button className="pr-btn-sec" onClick={() => setRevealed(true)} title="rodyti numerį">
      <span style={{ filter: revealed ? 'none' : 'blur(5px)', transition: 'filter 0.3s', userSelect: revealed ? 'auto' : 'none' }}>
        +370 629 34679
      </span>
    </button>
  );
}

function CellMark({ chk, crs }: { chk?: boolean; crs?: boolean }) {
  if (chk) return <span style={{ color: '#6ee7b7', marginRight: 4 }}>✓</span>;
  if (crs) return <span style={{ color: '#fca5a5', marginRight: 4 }}>✗</span>;
  return null;
}

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>('wp');

  return (
    <>
      <style>{`
        .pr-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 7rem 2rem 6rem;
        }
        .pr-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .pr-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-dim);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 5px 16px;
          margin-bottom: 1.5rem;
          font-family: 'DM Mono', monospace;
        }
        .pr-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 400;
          line-height: 1.1;
          color: var(--text);
          margin-bottom: 1rem;
        }
        .pr-title em {
          font-style: italic;
          background: linear-gradient(135deg, #a78bfa, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pr-subtitle {
          font-size: 15px;
          color: var(--text-muted);
          max-width: 440px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* TABS */
        .pr-tabs-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
        }
        .pr-tabs {
          display: flex;
          gap: 4px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 4px;
        }
        .pr-tab {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: var(--text-muted);
          background: transparent;
          border: none;
          border-radius: 100px;
          padding: 8px 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .pr-tab:hover { color: var(--text); }
        .pr-tab.active {
          background: var(--surface2);
          color: var(--text);
          border: 1px solid var(--border-strong);
        }

        /* PLATFORM INTRO */
        .pr-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          border-radius: 100px;
          padding: 5px 14px;
          color: var(--text-muted);
          margin-bottom: 0.8rem;
          font-family: 'DM Mono', monospace;
        }
        .pr-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .pr-intro-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.6rem;
          font-weight: 400;
          color: var(--text);
          margin-bottom: 0.4rem;
        }
        .pr-intro-desc {
          font-size: 14px;
          color: var(--text-muted);
          max-width: 500px;
          font-weight: 300;
        }

        /* PROS/CONS */
        .pr-pc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 1.5rem 0 2rem;
        }
        .pr-pc-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
        }
        .pr-pc-head {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          font-family: 'DM Mono', monospace;
        }
        .pr-pc-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pr-pc-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
          font-weight: 300;
        }
        .pr-pc-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }

        /* PLAN CARDS */
        .pr-plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .pr-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .pr-card:hover {
          border-color: var(--border-strong);
        }
        .pr-card.featured {
          border-color: rgba(167,139,250,0.35);
          background: linear-gradient(135deg, var(--surface) 0%, rgba(167,139,250,0.04) 100%);
        }
        .pr-popular {
          display: inline-block;
          background: rgba(167,139,250,0.12);
          color: #a78bfa;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 100px;
          padding: 3px 10px;
          width: fit-content;
          font-family: 'DM Mono', monospace;
        }
        .pr-plan-name {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.2rem;
          font-weight: 400;
          color: var(--text);
        }
        .pr-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2.2rem;
          font-weight: 300;
          color: var(--text);
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .pr-price sup {
          font-size: 0.9rem;
          vertical-align: baseline;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 300;
          margin-left: 2px;
        }
        .pr-price-note {
          font-size: 12px;
          color: var(--text-dim);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 300;
        }
        .pr-plan-desc {
          font-size: 12px;
          color: var(--text-muted);
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
          font-weight: 300;
        }
        .pr-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
          flex: 1;
        }
        .pr-feat-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
          font-weight: 300;
        }
        .pr-feat-item::before {
          content: '—';
          color: var(--text-dim);
          flex-shrink: 0;
          font-size: 11px;
          margin-top: 1px;
        }

        /* COMPARE TABLE */
        .pr-compare-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .pr-compare {
          width: 100%;
          min-width: 600px;
          border-collapse: collapse;
        }
        .pr-compare thead th {
          text-align: left;
          padding: 14px 16px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-dim);
          border-bottom: 1px solid var(--border);
          font-family: 'DM Mono', monospace;
        }
        .pr-compare thead th:first-child { width: 38%; }
        .pr-compare thead th.col-wp { color: #60a5fa; }
        .pr-compare thead th.col-fr { color: #34d399; }
        .pr-compare thead th.col-ai { color: #a78bfa; }
        .pr-compare tbody tr { transition: background 0.15s ease; }
        .pr-compare tbody tr:hover { background: var(--surface); }
        .pr-compare td {
          padding: 13px 16px;
          font-size: 13px;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          vertical-align: top;
          line-height: 1.5;
          font-weight: 300;
        }
        .pr-compare td:first-child { color: var(--text); font-weight: 400; }
        .pr-compare tbody tr:last-child td { border-bottom: none; }

        /* SUPPORT */
        .pr-support {
          margin-top: 4rem;
          padding-top: 4rem;
          border-top: 1px solid var(--border);
        }
        .pr-support-hdr {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .pr-support-hdr h3 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: 1.8rem;
          font-weight: 400;
          color: var(--text);
        }
        .pr-support-hdr h3 em {
          font-style: italic;
          background: linear-gradient(135deg, #a78bfa, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pr-support-hdr p {
          font-size: 13px;
          color: var(--text-muted);
          max-width: 340px;
          text-align: right;
          font-weight: 300;
        }
        .pr-support-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .pr-sup-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s ease;
        }
        .pr-sup-card:hover { border-color: var(--border-strong); }
        .pr-sup-card.featured {
          border-color: rgba(167,139,250,0.35);
          background: linear-gradient(135deg, var(--surface) 0%, rgba(167,139,250,0.04) 100%);
        }
        .pr-sup-tier {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-dim);
          font-family: 'DM Mono', monospace;
        }
        .pr-sup-price {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2.2rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: var(--text);
          line-height: 1;
        }
        .pr-sup-price span {
          font-size: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 300;
          color: var(--text-dim);
        }
        .pr-sup-feats {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding-top: 6px;
          border-top: 1px solid var(--border);
        }
        .pr-sup-feat {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
          font-weight: 300;
        }
        .pr-sup-feat::before {
          content: '—';
          color: var(--text-dim);
          flex-shrink: 0;
          font-size: 11px;
          margin-top: 1px;
        }

        /* CTA */
        .pr-cta {
          margin-top: 4rem;
          text-align: center;
          padding: 3.5rem 2rem;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface);
          position: relative;
          overflow: hidden;
        }
        .pr-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(167,139,250,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .pr-cta h3 {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 400;
          color: var(--text);
          margin-bottom: 0.75rem;
          position: relative;
        }
        .pr-cta p {
          font-size: 14px;
          color: var(--text-muted);
          max-width: 440px;
          margin: 0 auto 2rem;
          line-height: 1.7;
          position: relative;
          font-weight: 300;
        }
        .pr-cta-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
        }
        .pr-btn-sec {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: var(--text);
          background: transparent;
          border: 1px solid var(--border-strong);
          border-radius: 100px;
          padding: 12px 28px;
          cursor: pointer;
          transition: border-color 0.2s ease, transform 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .pr-btn-sec:hover { border-color: var(--text-dim); transform: translateY(-1px); }

        @media (max-width: 768px) {
          .pr-section { padding: 5rem 1.25rem 4rem; }
          .pr-pc-grid { grid-template-columns: 1fr; }
          .pr-plans-grid { grid-template-columns: 1fr; }
          .pr-support-grid { grid-template-columns: 1fr; }
          .pr-support-hdr { flex-direction: column; }
          .pr-support-hdr p { text-align: left; }
          .pr-tabs { flex-wrap: wrap; border-radius: 14px; }
        }
      `}</style>

      <section id="kainodara" className="pr-section">
        {/* HEADER */}
        <div className="pr-header reveal">
          <div className="pr-label">Kainodara</div>
          <h2 className="pr-title">Svetainių kūrimo <em>planai</em></h2>
          <p className="pr-subtitle">Pasirinkite platformą ir planą, kuris geriausiai atitinka jūsų verslo poreikius.</p>
        </div>

        {/* TABS */}
        <div className="pr-tabs-wrap">
          <div className="pr-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`pr-tab${activeTab === t.id ? ' active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* PLATFORM VIEWS */}
        {(activeTab === 'wp' || activeTab === 'fr' || activeTab === 'ai') && (() => {
          const p = PLATFORMS[activeTab];
          return (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="pr-badge">
                  <span className="pr-badge-dot" style={{ background: p.badgeColor }} />
                  {p.badge}
                </div>
                <h3 className="pr-intro-title">{p.title}</h3>
                <p className="pr-intro-desc">{p.subtitle}</p>
              </div>

              <div className="pr-pc-grid">
                <div className="pr-pc-box">
                  <div className="pr-pc-head" style={{ color: '#6ee7b7' }}>Pliusai</div>
                  <ul className="pr-pc-list">
                    {p.pros.map((pro, i) => (
                      <li key={i} className="pr-pc-item">
                        <span className="pr-pc-dot" style={{ background: '#6ee7b7' }} />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pr-pc-box">
                  <div className="pr-pc-head" style={{ color: '#fca5a5' }}>Minusai</div>
                  <ul className="pr-pc-list">
                    {p.cons.map((con, i) => (
                      <li key={i} className="pr-pc-item">
                        <span className="pr-pc-dot" style={{ background: '#fca5a5' }} />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pr-plans-grid">
                {p.plans.map((plan, i) => (
                  <div key={i} className={`pr-card${plan.featured ? ' featured' : ''}`}>
                    {plan.badge && <div className="pr-popular">{plan.badge}</div>}
                    <div className="pr-plan-name">{plan.name}</div>
                    <div>
                      <div className="pr-price">{plan.price}<sup>€</sup></div>
                      <div className="pr-price-note">vienkartinis mokestis</div>
                    </div>
                    <div className="pr-plan-desc">{plan.desc}</div>
                    <ul className="pr-features">
                      {plan.features.map((f, j) => (
                        <li key={j} className="pr-feat-item">{f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* COMPARE TABLE */}
        {activeTab === 'compare' && (
          <div className="pr-compare-wrap">
            <table className="pr-compare">
              <thead>
                <tr>
                  <th>Savybė</th>
                  <th className="col-wp">WordPress</th>
                  <th className="col-fr">Framer</th>
                  <th className="col-ai">AI Svetainė</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td><CellMark chk={row.wp.chk} crs={row.wp.crs} />{row.wp.text}</td>
                    <td><CellMark chk={row.fr.chk} crs={row.fr.crs} />{row.fr.text}</td>
                    <td><CellMark chk={row.ai.chk} crs={row.ai.crs} />{row.ai.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SUPPORT SECTION */}
        <div className="pr-support reveal">
          <div className="pr-support-hdr">
            <h3>Administravimo <em>mokesčiai</em></h3>
            <p>Pasirenkamas mėnesinis planas svetainei prižiūrėti ir tobulinti po sukūrimo</p>
          </div>
          <div className="pr-support-grid">
            {SUPPORT_PLANS.map((s, i) => (
              <div key={i} className={`pr-sup-card${s.featured ? ' featured' : ''}`}>
                {s.badge && <div className="pr-popular">{s.badge}</div>}
                <div className="pr-sup-tier">{s.tier}</div>
                <div className="pr-sup-price">{s.price}<span style={{ fontSize: '1rem', marginLeft: 2 }}>€</span> <span>/ mėn.</span></div>
                <ul className="pr-sup-feats">
                  {s.features.map((f, j) => (
                    <li key={j} className="pr-sup-feat">{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pr-cta reveal">
          <h3>Nežinote, kuris variantas jums tinkamiausias?</h3>
          <p>Užsiregistruokite arba skambinkite dėl nemokamos konsultacijos. Padėsime rasti jums tinkamiausią sprendimą pagal jūsų tikslus ir biudžetą.</p>
          <div className="pr-cta-btns">
            <a href="#kontaktai" className="lava-btn btn-primary-wrap" style={{ borderRadius: '100px', padding: '12px 28px', display: 'inline-block' }}>
              <span className="btn-label">Užsiregistruoti konsultacijai →</span>
            </a>
            <RevealPhone />
          </div>
        </div>
      </section>
    </>
  );
}
