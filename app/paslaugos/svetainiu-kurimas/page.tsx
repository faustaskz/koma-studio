'use client';

import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Link from 'next/link';

const cta = () => window.dispatchEvent(new CustomEvent('openConsultPopup'));

export default function SvetainiuKurimasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap');

        body { background: #0a0a0a; color: #f0ede8; font-family: 'Raleway', sans-serif; font-weight: 300; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gradShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

        .page-bg { position: fixed; inset: 0; z-index: -1; background: url('/internetiniu%20svetainiu%20kurimo%20back.webp') center/cover no-repeat; }
        .page-bg::after { content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.78); }

        /* HERO */
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; padding: 140px 80px 100px; }
        .eyebrow { font-size: 11px; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); text-transform: uppercase; margin-bottom: 28px; opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards; display: flex; align-items: center; gap: 12px; }
        .eyebrow::before { content: ''; width: 20px; height: 1px; background: rgba(255,255,255,0.3); }
        .hero-title { font-size: clamp(44px,6.5vw,88px); line-height: 1.1; letter-spacing: -0.02em; font-weight: 700; max-width: 760px; color: #f0ede8; opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; }
        .hero-title em { font-style: normal; font-weight: 800; background: linear-gradient(135deg,#8b5cf6,#c084fc,#8b5cf6); background-size: 300% 300%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: gradShift 6s ease infinite; }
        .hero-sub { margin-top: 28px; font-size: 18px; color: rgba(255,255,255,0.6); line-height: 1.7; max-width: 480px; opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s forwards; }
        .hero-actions { margin-top: 44px; display: flex; gap: 14px; align-items: center; opacity: 0; animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards; }

        /* BUTTONS */
        .btn-main { background: #f0ede8; color: #0a0a0a; padding: 14px 28px; border-radius: 100px; font-size: 14px; font-weight: 600; border: none; cursor: pointer; transition: opacity 0.2s, transform 0.2s; font-family: 'Raleway', sans-serif; white-space: nowrap; }
        .btn-main:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-ghost { color: rgba(255,255,255,0.6); padding: 14px 28px; border-radius: 100px; font-size: 14px; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); transition: color 0.2s, border-color 0.2s; font-family: 'Raleway', sans-serif; cursor: pointer; background: none; display: inline-block; }
        .btn-ghost:hover { color: #fff; border-color: rgba(255,255,255,0.5); }

        /* SECTIONS */
        .section { padding: 80px 80px; background: rgba(0,0,0,0.52); backdrop-filter: blur(14px); border-top: 1px solid rgba(255,255,255,0.07); }
        .sec-tag { font-size: 10px; letter-spacing: 0.2em; color: rgba(255,255,255,0.3); text-transform: uppercase; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
        .sec-tag::before { content: ''; width: 20px; height: 1px; background: rgba(255,255,255,0.2); }
        .sec-title { font-size: clamp(28px,3.5vw,48px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; color: #f0ede8; max-width: 700px; margin-bottom: 16px; }
        .sec-sub { font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.7; max-width: 560px; margin-bottom: 48px; }

        /* CTA STRIP */
        .cta-strip { padding: 48px 80px; background: rgba(0,0,0,0.6); backdrop-filter: blur(14px); border-top: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .cta-strip-text { font-size: 18px; font-weight: 600; color: #f0ede8; max-width: 480px; line-height: 1.4; }
        .cta-strip-sub { font-size: 14px; color: rgba(255,255,255,0.5); margin-top: 4px; }

        /* PROBLEM */
        .prob-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-top: 48px; }
        .prob-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 28px 24px; transition: background 0.2s; }
        .prob-card:hover { background: rgba(255,255,255,0.07); }
        .prob-icon { font-size: 22px; margin-bottom: 14px; }
        .prob-title { font-size: 15px; font-weight: 500; color: #f0ede8; line-height: 1.4; margin-bottom: 8px; }
        .prob-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; }

        /* SOLUTION */
        .sol-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-top: 48px; }
        .sol-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 24px; transition: background 0.2s; }
        .sol-card:hover { background: rgba(255,255,255,0.07); }
        .sol-icon { font-size: 20px; margin-bottom: 12px; }
        .sol-title { font-size: 14px; font-weight: 600; color: #f0ede8; line-height: 1.4; margin-bottom: 0; }
        .sol-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; margin-top: 6px; }

        /* GET */
        .get-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-top: 48px; }
        .get-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 24px; display: flex; align-items: flex-start; gap: 14px; transition: background 0.2s; }
        .get-card:hover { background: rgba(255,255,255,0.07); }
        .get-check { font-size: 13px; color: rgba(255,255,255,0.4); flex-shrink: 0; margin-top: 2px; }
        .get-label { font-size: 14px; font-weight: 600; color: #f0ede8; margin-bottom: 4px; }
        .get-desc { font-size: 12px; color: rgba(255,255,255,0.45); line-height: 1.55; }

        /* PROCESS */
        .proc-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-top: 48px; }
        .proc-card { padding: 32px 24px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); position: relative; overflow: hidden; }
        .proc-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg,#8b5cf6,#c084fc); opacity: 0.5; }
        .proc-num { font-size: 36px; font-weight: 800; color: rgba(139,92,246,0.15); line-height: 1; margin-bottom: 16px; letter-spacing: -0.02em; }
        .proc-title { font-size: 17px; font-weight: 600; color: #f0ede8; margin-bottom: 8px; }
        .proc-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.65; }

        /* FIT */
        .fit-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-top: 48px; }
        .fit-item { display: flex; align-items: center; gap: 14px; padding: 18px 22px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; transition: border-color 0.2s; }
        .fit-item:hover { border-color: rgba(255,255,255,0.2); }
        .fit-dot { width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(135deg,#8b5cf6,#c084fc); flex-shrink: 0; }
        .fit-label { font-size: 15px; color: rgba(255,255,255,0.8); font-weight: 400; }

        /* TRUST */
        .trust-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; margin-top: 48px; }
        .trust-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 28px 24px; transition: background 0.2s; }
        .trust-card:hover { background: rgba(255,255,255,0.07); }
        .trust-icon { font-size: 24px; margin-bottom: 12px; }
        .trust-title { font-size: 14px; font-weight: 600; color: #f0ede8; line-height: 1.4; margin-bottom: 6px; }
        .trust-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; }

        /* GIF PANELS */
        .gif-split{padding:64px 80px;background:rgba(0,0,0,0.52);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
        .gif-copy-tag{font-size:10px;letter-spacing:0.2em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px;}
        .gif-copy-tag::before{content:'';width:20px;height:1px;background:rgba(255,255,255,0.2);}
        .gif-copy-h{font-size:clamp(22px,2.5vw,36px);font-weight:700;letter-spacing:-0.02em;line-height:1.2;color:#f0ede8;margin-bottom:14px;}
        .gif-copy-p{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;}
        .gif-frame{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 24px 60px rgba(0,0,0,0.5);}
        .gif-frame img{width:100%;height:auto;display:block;}

        /* FAQ */
        .faq-list { display: flex; flex-direction: column; gap: 0; margin-top: 48px; max-width: 720px; }
        .faq-item { border-top: 1px solid rgba(255,255,255,0.08); }
        .faq-item:last-child { border-bottom: 1px solid rgba(255,255,255,0.08); }
        .faq-q { width: 100%; background: transparent; border: none; color: #f0ede8; font-family: 'Raleway', sans-serif; font-size: 16px; font-weight: 500; text-align: left; padding: 22px 0; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; transition: color 0.2s; }
        .faq-q:hover { color: rgba(255,255,255,0.7); }
        .faq-arrow { font-size: 18px; color: rgba(255,255,255,0.3); transition: transform 0.25s; flex-shrink: 0; }
        .faq-arrow.open { transform: rotate(45deg); }
        .faq-a { overflow: hidden; max-height: 0; transition: max-height 0.35s cubic-bezier(0.16,1,0.3,1); }
        .faq-a.open { max-height: 200px; }
        .faq-a-inner { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.7; padding-bottom: 22px; max-width: 580px; }

        /* FINAL CTA */
        .final-cta { padding: 120px 80px; text-align: center; background: rgba(0,0,0,0.6); backdrop-filter: blur(14px); border-top: 1px solid rgba(255,255,255,0.07); }
        .final-h { font-size: clamp(32px,4vw,56px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; color: #f0ede8; margin-bottom: 16px; }
        .final-sub { font-size: 16px; color: rgba(255,255,255,0.5); max-width: 440px; margin: 0 auto 40px; line-height: 1.7; }

        /* FOOTER */
        footer { border-top: 1px solid rgba(255,255,255,0.08); padding: 28px 80px; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); }
        .fcopy { font-size: 11px; color: rgba(255,255,255,0.25); }

@media (max-width: 1024px) {
          .sol-grid { grid-template-columns: repeat(2,1fr); }
          .get-grid { grid-template-columns: repeat(2,1fr); }
          .prob-grid { grid-template-columns: repeat(2,1fr); }
          .proc-grid { grid-template-columns: repeat(2,1fr); }
        }

        @media (max-width: 1024px) {
          .gif-split { grid-template-columns: 1fr; gap: 32px; padding: 48px 24px; }
        }

        @media (max-width: 768px) {
          .hero { padding: 120px 24px 80px; }
          .hero-actions { flex-direction: column; width: 100%; }
          .btn-main, .btn-ghost { width: 100%; text-align: center; }
          .section { padding: 64px 24px; }
          .cta-strip { padding: 32px 24px; flex-direction: column; text-align: center; }
          .cta-strip .btn-main { width: 100%; }
          .prob-grid { grid-template-columns: 1fr 1fr; gap: 2px; }
          .sol-grid { grid-template-columns: 1fr 1fr; gap: 2px; }
          .get-grid { grid-template-columns: 1fr 1fr; gap: 2px; }
          .proc-grid { grid-template-columns: 1fr; gap: 2px; }
          .fit-grid { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: 1fr 1fr; gap: 2px; }
          footer { flex-direction: column; gap: 16px; text-align: center; padding: 24px 20px; }
          .final-cta { padding: 80px 24px; }
        }
        @media (max-width: 480px) {
          .hero { padding: 100px 20px 60px; }
          .hero-sub { font-size: 16px; }
          .section { padding: 48px 20px; }
          .cta-strip { padding: 28px 20px; }
          .gif-split { padding: 36px 20px; }
          .final-cta { padding: 60px 20px; }
          .prob-grid { grid-template-columns: 1fr; }
          .sol-grid { grid-template-columns: 1fr; }
          .get-grid { grid-template-columns: 1fr; }
          .trust-grid { grid-template-columns: 1fr; }
          footer { padding: 20px; }
        }
      `}</style>

      <div className="page-bg" />
      <NavBar />

      {/* 1. HERO */}
      <section className="hero">
        <p className="eyebrow">Svetainių kūrimas</p>
        <h1 className="hero-title">Svetainės, kurios<br /><em>dirba už jus</em></h1>
        <p className="hero-sub">Kuriame modernias, greitas ir individualiai pritaikytas svetaines. Ne tik gražias — bet ir tokias, kurios paverčia lankytojus klientais.</p>
        <div className="hero-actions">
          <button className="btn-main" onClick={cta}>Aptarti projektą →</button>
          <Link href="/#paslaugos" className="btn-ghost">Kitos paslaugos</Link>
        </div>
      </section>

      {/* 2. PROBLEMA */}
      <section className="section">
        <div className="sec-tag">Problema</div>
        <h2 className="sec-title">Dauguma svetainių atrodo pasenusios ir nekonvertuoja</h2>
        <p className="sec-sub">Žmonės per kelias sekundes nusprendžia ar jūsų verslas atrodo patikimas. Lėta, pasenusi ar neaiški svetainė dažnai reiškia prarastus klientus.</p>
        <div className="prob-grid">
          {[
            { icon: '🕸️', title: 'Pasenęs dizainas', desc: 'Sena svetainė sukuria blogą pirmą įspūdį. Lankytojai nelieka.' },
            { icon: '🌀', title: 'Neaiški struktūra', desc: 'Žmonės nesupranta ką daryti toliau ir tiesiog išeina.' },
            { icon: '🐌', title: 'Lėtas veikimas', desc: 'Kiekviena sekundė laukimo mažina konversijų rodiklius.' },
            { icon: '📉', title: 'Svetainė neatveda užklausų', desc: 'Gražus dizainas be strategijos neneša verslo rezultatų.' },
          ].map(p => (
            <div key={p.title} className="prob-card">
              <div className="prob-icon">{p.icon}</div>
              <div className="prob-title">{p.title}</div>
              <p className="prob-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SVG 1 — kūrimo procesas */}
      <div className="gif-split">
        <div>
          <div className="gif-copy-tag">Kūrybos procesas</div>
          <h3 className="gif-copy-h">Nuo pirmos eilutės kodo iki gyvos svetainės</h3>
          <p className="gif-copy-p">Kiekviena svetainė kuriama nuo nulio — individualiai, kruopščiai ir greitai. Jokių šablonų.</p>
        </div>
        <div className="gif-frame" style={{ border: 'none', boxShadow: 'none', background: 'none', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/kodas.svg" alt="Svetainės kūrimas" style={{ maxHeight: '260px', width: 'auto', maxWidth: '100%' }} />
        </div>
      </div>

      {/* CTA STRIP 1 */}
      <div className="cta-strip">
        <div>
          <div className="cta-strip-text">Turima pasenusi svetainė?</div>
          <div className="cta-strip-sub">Aptarkime kaip ją galima patobulinti ar sukurti iš naujo.</div>
        </div>
        <button className="btn-main" onClick={cta}>Noriu modernios svetainės →</button>
      </div>

      {/* 3. SPRENDIMAS */}
      <section className="section">
        <div className="sec-tag">Sprendimas</div>
        <h2 className="sec-title">Svetainė turi ne tik atrodyti gerai. Ji turi veikti.</h2>
        <p className="sec-sub">Kuriame modernias svetaines kurios aiškiai pristato jūsų verslą ir padeda žmonėms atlikti veiksmą.</p>
        <div className="sol-grid">
          {[
            { icon: '🎨', title: 'Modernus UI/UX dizainas', desc: 'Kiekvienas ekranas veda lankytoją link veiksmo.' },
            { icon: '📱', title: 'Mobile-first kūrimas', desc: 'Tobulai veikia nuo telefono iki monitoriaus.' },
            { icon: '⚡', title: 'Greitas veikimas', desc: 'Optimizuoti puslapiai kraustosi greičiau.' },
            { icon: '🔍', title: 'SEO pagrindai', desc: 'Teisingi techniniai pagrindai Google paieškoje.' },
            { icon: '📣', title: 'Aiškūs CTA mygtukai', desc: 'Strategiškai išdėstyti raginimai veikti.' },
            { icon: '✨', title: 'Premium animacijos', desc: 'Subtilios animacijos sukuria moderną pojūtį.' },
            { icon: '📋', title: 'Kontaktų formos', desc: 'Integruotos formos priima užklausas be trukdžių.' },
            { icon: '🛠️', title: 'Lengvas administravimas', desc: 'Keiskite turinį patys be programavimo žinių.' },
          ].map(s => (
            <div key={s.title} className="sol-card">
              <div className="sol-icon">{s.icon}</div>
              <div className="sol-title">{s.title}</div>
              <p className="sol-desc">{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}>
          <button className="btn-main" onClick={cta}>Noriu modernios svetainės →</button>
        </div>
      </section>

      {/* 4. KĄ GAUNATE */}
      <section className="section">
        <div className="sec-tag">Kas įeina</div>
        <h2 className="sec-title">Kas įeina į svetainės kūrimą</h2>
        <div className="get-grid">
          {[
            { label: 'Individualus dizainas', desc: 'Kuriama tik jums, ne pagal šabloną' },
            { label: 'Responsive mobile versija', desc: 'Tobulai veikia visose ekrano dydžiuose' },
            { label: 'Kontaktų formos', desc: 'Užklausų formos integruotos ir veikiančios' },
            { label: 'SEO setup', desc: 'Meta žymos, struktūra, greitis — viskas tvarkoje' },
            { label: 'Performance optimizacija', desc: 'Greitas kraustymasis ir geras Core Web Vitals' },
            { label: 'Google integracijos', desc: 'Analytics, Maps, Search Console' },
            { label: 'Analytics setup', desc: 'Matote lankytojus, šaltinius ir konversijas' },
            { label: 'Hosting / deployment pagalba', desc: 'Padedame paleisti ir sutvarkyti techninę dalį' },
          ].map(g => (
            <div key={g.label} className="get-card">
              <div className="get-check">✓</div>
              <div>
                <div className="get-label">{g.label}</div>
                <p className="get-desc">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP 2 */}
      <div className="cta-strip">
        <div>
          <div className="cta-strip-text">Kiek kainuoja tokia svetainė?</div>
          <div className="cta-strip-sub">Kaina priklauso nuo projekto apimties — aptarkime ir pateiksime pasiūlymą.</div>
        </div>
        <button className="btn-main" onClick={cta}>Gauti pasiūlymą →</button>
      </div>

      {/* 5. KAIP DIRBAME */}
      <section className="section">
        <div className="sec-tag">Procesas</div>
        <h2 className="sec-title">Procesas paprastas</h2>
        <div className="proc-grid">
          {[
            { n: '1', title: 'Aptariame projektą', desc: 'Suprantame jūsų verslą, tikslus ir auditoriją.' },
            { n: '2', title: 'Kuriame dizainą', desc: 'Suprojektuojame aiškią ir modernią struktūrą.' },
            { n: '3', title: 'Programuojame', desc: 'Paverčiame dizainą greita ir responsive svetaine.' },
            { n: '4', title: 'Paleidžiame', desc: 'Optimizuojame ir paleidžiame projektą.' },
          ].map(p => (
            <div key={p.n} className="proc-card">
              <div className="proc-num">{p.n}</div>
              <div className="proc-title">{p.title}</div>
              <p className="proc-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GIF 2 — responsive */}
      <div className="gif-split">
        <div className="gif-frame">
          <img src="/pritaikymasviskam.webp" alt="Pritaikyta visiems įrenginiams" />
        </div>
        <div>
          <div className="gif-copy-tag">Mobile-first</div>
          <h3 className="gif-copy-h">Tobulai atrodo kiekviename ekrane</h3>
          <p className="gif-copy-p">Telefonas, planšetė, monitorius — visur veikia taip pat sklandžiai. Dauguma lankytojų ateina iš telefono.</p>
        </div>
      </div>

      {/* 6. KAM TINKA */}
      <section className="section">
        <div className="sec-tag">Kam tinka</div>
        <h2 className="sec-title">Tinka verslams kurie nori atrodyti rimtai</h2>
        <div className="fit-grid">
          {[
            'Paslaugų verslams',
            'Statybų / NT sektoriui',
            'E-komercijai',
            'Kūrybiniams brandams',
            'Restoranams / hospitality',
            'Įmonėms kurios nori daugiau užklausų',
          ].map(f => (
            <div key={f} className="fit-item">
              <div className="fit-dot" />
              <span className="fit-label">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP 3 */}
      <div className="cta-strip">
        <div>
          <div className="cta-strip-text">Jūsų verslas čia?</div>
          <div className="cta-strip-sub">Aptarkime kokia svetainė geriausiai tiktų jūsų situacijai.</div>
        </div>
        <button className="btn-main" onClick={cta}>Pradėti projektą →</button>
      </div>

      {/* 7. TRUST */}
      <section className="section">
        <div className="sec-tag">Rezultatai</div>
        <h2 className="sec-title">Svetainė turi kurti pasitikėjimą nuo pirmų sekundžių</h2>
        <div className="trust-grid">
          {[
            { icon: '💬', title: 'Aiškesnė komunikacija', desc: 'Lankytojas iš karto supranta ką jūs darote ir kodėl verta rinktis jus.' },
            { icon: '👁️', title: 'Geresnis pirmas įspūdis', desc: 'Modernus dizainas sukuria pasitikėjimą prieš žmogui susisiekus.' },
            { icon: '🤝', title: 'Didesnis pasitikėjimas', desc: 'Profesionali svetainė parodo kad esate rimtas verslas.' },
            { icon: '📲', title: 'Geresnė mobile patirtis', desc: 'Dauguma lankytojų ateina iš telefono — jiems turi veikti.' },
            { icon: '🚀', title: 'Greitesnis veikimas', desc: 'Greitas puslapis mažina atmetimų rodiklį ir gerina SEO.' },
            { icon: '🎯', title: 'Aiškesni CTA', desc: 'Žmonės žino ką daryti toliau — susisiekia, perka, registruojasi.' },
          ].map(t => (
            <div key={t.title} className="trust-card">
              <div className="trust-icon">{t.icon}</div>
              <div className="trust-title">{t.title}</div>
              <p className="trust-desc">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GIF 3 — naršymo patirtis */}
      <div className="gif-split">
        <div>
          <div className="gif-copy-tag">Galutinis rezultatas</div>
          <h3 className="gif-copy-h">Štai kaip tai atrodo lankytojo akimis</h3>
          <p className="gif-copy-p">Greita, sklandi, aiški. Tai ką žmonės jaučia atėję į modernią, gerai sukurtą svetainę.</p>
        </div>
        <div className="gif-frame">
          <img src="/svetaineskurimasgif.webp" alt="Svetainės naršymas" />
        </div>
      </div>

      {/* 9. FAQ */}
      <section className="section">
        <div className="sec-tag">DUK</div>
        <h2 className="sec-title">Dažni klausimai</h2>
        <div className="faq-list">
          {[
            { q: 'Kiek laiko trunka svetainės kūrimas?', a: 'Priklauso nuo projekto dydžio, tačiau dažniausiai projektai trunka nuo kelių savaičių.' },
            { q: 'Ar svetainė bus pritaikyta telefonams?', a: 'Taip, visos svetainės kuriamos mobile-first principu.' },
            { q: 'Ar galėsiu pats redaguoti turinį?', a: 'Taip, priklausomai nuo projekto galime integruoti lengvą administravimo sistemą.' },
            { q: 'Ar padedate su hostingu ir paleidimu?', a: 'Taip, galime pilnai padėti su paleidimu ir technine dalimi.' },
          ].map((f, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span className={`faq-arrow${openFaq === i ? ' open' : ''}`}>+</span>
              </button>
              <div className={`faq-a${openFaq === i ? ' open' : ''}`}>
                <p className="faq-a-inner">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="final-cta">
        <h2 className="final-h">Norite svetainės kuri atrodo rimtai ir padeda augti?</h2>
        <p className="final-sub">Parašykite – aptarsime projektą ir pasiūlysime geriausią sprendimą jūsų verslui.</p>
        <button className="btn-main" onClick={cta}>Gauti svetainės pasiūlymą →</button>
      </section>

      <footer>
        <div><img src="/KOMALOGO.webp" alt="KOMA Studio" style={{ height: '56px', width: 'auto' }} /></div>
        <div className="fcopy">© 2026 KOMA Studio</div>
      </footer>

    </>
  );
}
