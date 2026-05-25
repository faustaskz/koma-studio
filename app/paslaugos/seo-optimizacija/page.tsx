'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const FAQS = [
  { q: 'Per kiek laiko matosi SEO rezultatai?', a: 'SEO yra ilgalaikis procesas. Pirmi pokyčiai dažnai matomi po kelių savaičių, tačiau rimtesni rezultatai ateina per kelis mėnesius.' },
  { q: 'Ar SEO verta mažam verslui?', a: 'Taip, ypač jei žmonės jūsų paslaugų ieško Google.' },
  { q: 'Ar SEO geriau nei reklama?', a: 'SEO ir reklama dažniausiai veikia geriausiai kartu.' },
  { q: 'Ar galite optimizuoti jau esamą svetainę?', a: 'Taip, galime dirbti su jau veikiančia svetaine.' },
];

export default function SeoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const cta = () => window.dispatchEvent(new CustomEvent('openConsultPopup'));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap');
        body{background:#0a0a0a;color:#f0ede8;font-family:'Raleway',sans-serif;font-weight:300;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .page-bg{position:fixed;inset:0;z-index:-1;background:url('/SEO%20back.webp') center/cover no-repeat;}
        .page-bg::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.75);}

        /* ── HERO ── */
        .svc-hero{min-height:100vh;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:140px 80px 100px;position:relative;overflow:hidden;background:transparent;}
        .svc-eyebrow{font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.4);text-transform:uppercase;margin-bottom:28px;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;display:flex;align-items:center;gap:12px;}
        .svc-eyebrow::before{content:'';width:20px;height:1px;background:rgba(255,255,255,0.3);}
        .svc-hero-title{font-family:'Raleway',sans-serif;font-size:clamp(44px,6.5vw,88px);line-height:1.05;letter-spacing:-0.02em;font-weight:700;max-width:760px;color:#f0ede8;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;}
        .svc-hero-title em{font-style:normal;font-weight:800;background:linear-gradient(135deg,#10b981,#34d399,#10b981);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradShift 6s ease infinite;}
        .svc-hero-sub{margin-top:24px;font-size:18px;color:rgba(255,255,255,0.55);line-height:1.7;max-width:460px;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s forwards;}
        .svc-hero-actions{margin-top:40px;display:flex;gap:14px;align-items:center;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;}
        .btn-primary{background:#f0ede8;color:#0a0a0a;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:600;text-decoration:none;border:none;cursor:pointer;transition:opacity 0.2s,transform 0.2s;font-family:'Raleway',sans-serif;}
        .btn-primary:hover{opacity:0.88;transform:translateY(-1px);}
        .btn-outline{color:rgba(255,255,255,0.6);padding:14px 28px;border-radius:100px;font-size:14px;text-decoration:none;border:1px solid rgba(255,255,255,0.2);background:transparent;cursor:pointer;transition:color 0.2s,border-color 0.2s;font-family:'Raleway',sans-serif;}
        .btn-outline:hover{color:#fff;border-color:rgba(255,255,255,0.5);}

        /* ── SHARED ── */
        .sec{padding:80px 80px;background:rgba(0,0,0,0.52);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);}
        .sec-tag{font-size:10px;letter-spacing:0.2em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px;}
        .sec-tag::before{content:'';width:20px;height:1px;background:rgba(255,255,255,0.2);}
        .sec-h{font-size:clamp(28px,3.5vw,48px);font-weight:700;letter-spacing:-0.02em;line-height:1.15;color:#f0ede8;margin-bottom:16px;}
        .sec-sub{font-size:16px;color:rgba(255,255,255,0.5);line-height:1.7;max-width:560px;margin-bottom:48px;}

        /* ── PROBLEM ── */
        .prob-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:48px;}
        .prob-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:28px 32px;transition:background 0.2s;}
        .prob-card:hover{background:rgba(255,255,255,0.07);}
        .prob-icon{font-size:22px;margin-bottom:14px;}
        .prob-text{font-size:15px;font-weight:500;color:#f0ede8;line-height:1.5;}

        /* ── CTA STRIP ── */
        .cta-strip{padding:48px 80px;background:rgba(0,0,0,0.6);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;gap:24px;}
        .cta-strip-text{font-size:18px;font-weight:600;color:#f0ede8;max-width:480px;line-height:1.4;}

        /* ── SOLUTION ── */
        .sol-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:48px;}
        .sol-card{background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.14);padding:24px;transition:background 0.2s;}
        .sol-card:hover{background:rgba(16,185,129,0.1);}
        .sol-num{font-size:10px;letter-spacing:0.15em;color:rgba(16,185,129,0.55);margin-bottom:10px;}
        .sol-title{font-size:14px;font-weight:600;color:#f0ede8;line-height:1.4;}

        /* ── HOW IT WORKS ── */
        .how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:48px;}
        .how-card{padding:32px 24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);position:relative;overflow:hidden;}
        .how-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#10b981,#34d399);opacity:0.5;}
        .how-n{font-size:36px;font-weight:800;color:rgba(16,185,129,0.15);line-height:1;margin-bottom:16px;letter-spacing:-0.02em;}
        .how-title{font-size:17px;font-weight:600;color:#f0ede8;margin-bottom:8px;}
        .how-desc{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.65;}

        /* ── WHAT YOU GET ── */
        .get-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:48px;}
        .get-card{padding:24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);transition:background 0.2s,border-color 0.2s;}
        .get-card:hover{background:rgba(255,255,255,0.06);border-color:rgba(16,185,129,0.25);}
        .get-icon{font-size:20px;margin-bottom:12px;}
        .get-title{font-size:14px;font-weight:600;color:#f0ede8;line-height:1.4;}

        /* ── FIT ── */
        .fit-list{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:48px;}
        .fit-item{display:flex;align-items:center;gap:14px;padding:18px 22px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;transition:border-color 0.2s;}
        .fit-item:hover{border-color:rgba(16,185,129,0.3);}
        .fit-dot{width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#10b981,#34d399);flex-shrink:0;}
        .fit-text{font-size:15px;color:rgba(255,255,255,0.8);font-weight:400;}

        /* ── TRUST ── */
        .trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:48px;}
        .trust-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:28px 24px;transition:background 0.2s;}
        .trust-card:hover{background:rgba(255,255,255,0.07);}
        .trust-icon{font-size:24px;margin-bottom:12px;}
        .trust-title{font-size:14px;font-weight:600;color:#f0ede8;line-height:1.4;margin-bottom:6px;}

        /* ── FAQ ── */
        .faq-list{display:flex;flex-direction:column;gap:0;margin-top:48px;max-width:720px;}
        .faq-item{border-top:1px solid rgba(255,255,255,0.08);}
        .faq-item:last-child{border-bottom:1px solid rgba(255,255,255,0.08);}
        .faq-q{width:100%;background:transparent;border:none;color:#f0ede8;font-family:'Raleway',sans-serif;font-size:16px;font-weight:500;text-align:left;padding:22px 0;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;transition:color 0.2s;}
        .faq-q:hover{color:rgba(255,255,255,0.7);}
        .faq-arrow{font-size:18px;color:rgba(255,255,255,0.3);transition:transform 0.25s;flex-shrink:0;}
        .faq-arrow.open{transform:rotate(45deg);}
        .faq-a{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;padding-bottom:22px;max-width:580px;}

        /* ── GIF/SVG PANELS ── */
        .gif-split{padding:64px 80px;background:rgba(0,0,0,0.52);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
        .gif-copy-tag{font-size:10px;letter-spacing:0.2em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px;}
        .gif-copy-tag::before{content:'';width:20px;height:1px;background:rgba(255,255,255,0.2);}
        .gif-copy-h{font-size:clamp(22px,2.5vw,34px);font-weight:700;letter-spacing:-0.02em;line-height:1.2;color:#f0ede8;margin-bottom:14px;}
        .gif-copy-p{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;}
        .gif-frame{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);padding:32px;display:flex;align-items:center;justify-content:center;}
        .gif-frame img{width:100%;height:auto;display:block;max-height:320px;object-fit:contain;}

        /* ── FINAL CTA ── */
        .final-cta{padding:120px 80px;text-align:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);}
        .final-h{font-size:clamp(32px,4vw,56px);font-weight:700;letter-spacing:-0.02em;line-height:1.15;color:#f0ede8;margin-bottom:16px;}
        .final-sub{font-size:16px;color:rgba(255,255,255,0.5);max-width:440px;margin:0 auto 40px;line-height:1.7;}

        /* ── FOOTER ── */
        footer{border-top:1px solid rgba(255,255,255,0.08);padding:28px 80px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(12px);}
        .fcopy{font-size:11px;color:rgba(255,255,255,0.25);}

        /* ── STICKY MOBILE ── */
        .sticky-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:50;padding:14px 20px;background:rgba(8,8,8,0.95);backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.1);}
        .sticky-cta button{width:100%;padding:14px;border-radius:100px;background:#f0ede8;color:#0a0a0a;font-family:'Raleway',sans-serif;font-size:14px;font-weight:600;border:none;cursor:pointer;}

        /* ── MOBILE ── */
        @media(max-width:768px){
          .svc-hero{padding:120px 24px 80px;}
          .svc-hero-actions{flex-direction:column;width:100%;}
          .btn-primary,.btn-outline{width:100%;text-align:center;}
          .sec{padding:64px 24px;}
          .prob-grid{grid-template-columns:1fr;}
          .sol-grid{grid-template-columns:1fr;}
          .how-grid{grid-template-columns:1fr;}
          .get-grid{grid-template-columns:1fr;}
          .trust-grid{grid-template-columns:1fr;}
          .fit-list{grid-template-columns:1fr;}
          .gif-split{grid-template-columns:1fr;gap:32px;padding:48px 24px;}
          .cta-strip{flex-direction:column;align-items:flex-start;padding:40px 24px;}
          .final-cta{padding:80px 24px 100px;}
          footer{flex-direction:column;gap:12px;text-align:center;padding:24px;}
          .sticky-cta{display:block;}
        }
      `}</style>

      <div className="page-bg" />
      <NavBar />

      {/* 1. HERO */}
      <section className="svc-hero">
        <p className="svc-eyebrow">SEO Optimizacija</p>
        <h1 className="svc-hero-title">Būkite randami<br /><em>be reklamos kainos</em></h1>
        <p className="svc-hero-sub">Optimizuojame jūsų svetainę taip, kad žmonės jus rastų Google — be nuolatinių reklamos išlaidų.</p>
        <div className="svc-hero-actions">
          <button onClick={cta} className="btn-primary">Gauti nemokamą konsultaciją →</button>
          <a href="#kaip-veikia" className="btn-outline">Kaip veikia SEO</a>
        </div>
      </section>

      {/* 2. PROBLEMA */}
      <section className="sec" id="problema">
        <div className="sec-tag">Problema</div>
        <h2 className="sec-h">Jeigu jūsų nėra Google –<br />klientai renkasi konkurentus</h2>
        <p className="sec-sub">Dauguma žmonių paslaugų ieško Google. Jei jūsų svetainė neatsiranda paieškoje, prarandate potencialius klientus.</p>
        <div className="prob-grid">
          {[
            { icon: '🔍', text: 'Svetainė nesimato Google paieškoje' },
            { icon: '📉', text: 'Mažas organinis srautas' },
            { icon: '🏆', text: 'Konkurentai randami aukščiau' },
            { icon: '⚠️', text: 'Svetainė neoptimizuota SEO' },
          ].map(p => (
            <div key={p.text} className="prob-card">
              <div className="prob-icon">{p.icon}</div>
              <div className="prob-text">{p.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP 1 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Atpažįstate bent vieną iš šių problemų?</div>
        <button onClick={cta} className="btn-primary">Kalbėkimės →</button>
      </div>

      {/* 3. SPRENDIMAS */}
      <section className="sec" id="sprendimas">
        <div className="sec-tag">Sprendimas</div>
        <h2 className="sec-h">SEO, kuris orientuotas<br />į realų verslo augimą</h2>
        <p className="sec-sub">Optimizuojame jūsų svetainę taip, kad ją lengviau rastų tiek žmonės, tiek Google.</p>
        <div className="sol-grid">
          {[
            { n: '01', t: 'Raktažodžių analizė' },
            { n: '02', t: 'Techninis SEO sutvarkymas' },
            { n: '03', t: 'Svetainės greičio optimizacija' },
            { n: '04', t: 'On-page SEO' },
            { n: '05', t: 'Turinio optimizacija' },
            { n: '06', t: 'Google indexing setup' },
            { n: '07', t: 'Local SEO optimizacija' },
            { n: '08', t: 'Nuolatinis pozicijų stebėjimas' },
          ].map(s => (
            <div key={s.n} className="sol-card">
              <div className="sol-num">{s.n}</div>
              <div className="sol-title">{s.t}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '40px' }}>
          <button onClick={cta} className="btn-primary">Noriu SEO optimizacijos →</button>
        </div>
      </section>

      {/* 4. KAIP VEIKIA */}
      <section className="sec" id="kaip-veikia">
        <div className="sec-tag">Procesas</div>
        <h2 className="sec-h">Kaip veikia SEO?</h2>
        <div className="how-grid">
          {[
            { n: '1', t: 'Analizė', d: 'Peržiūrime jūsų svetainę, konkurenciją ir esamą situaciją.' },
            { n: '2', t: 'Optimizacija', d: 'Sutvarkome technines ir turinio problemas.' },
            { n: '3', t: 'Google supranta geriau', d: 'Padedame paieškos sistemoms aiškiau suprasti jūsų paslaugas.' },
            { n: '4', t: 'Auga matomumas', d: 'Daugiau žmonių randa jūsų verslą organiškai.' },
          ].map(h => (
            <div key={h.n} className="how-card">
              <div className="how-n">{h.n}</div>
              <div className="how-title">{h.t}</div>
              <p className="how-desc">{h.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SVG — augimo grafas */}
      <div className="gif-split">
        <div>
          <div className="gif-copy-tag">Augimas</div>
          <h3 className="gif-copy-h">SEO duoda rezultatus, kurie auga laikui bėgant</h3>
          <p className="gif-copy-p">Skirtingai nei reklama — SEO investicija neišnyksta. Kuo ilgiau dirbama, tuo stipresnis matomumas.</p>
        </div>
        <div className="gif-frame">
          <img src="/growthchart.svg" alt="SEO augimo grafas" />
        </div>
      </div>

      {/* CTA STRIP 2 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Nori pradėti? Pirmasis žingsnis — nemokama konsultacija.</div>
        <button onClick={cta} className="btn-primary">Pradėkime →</button>
      </div>

      {/* 5. KĄ GAUNATE */}
      <section className="sec" id="ka-gaunate">
        <div className="sec-tag">Ką gaunate</div>
        <h2 className="sec-h">Kas įeina į<br />SEO optimizaciją</h2>
        <div className="get-grid">
          {[
            { icon: '🔎', t: 'SEO auditas' },
            { icon: '🔑', t: 'Raktažodžių tyrimas' },
            { icon: '📝', t: 'Meta title ir description optimizacija' },
            { icon: '📄', t: 'Vidinio turinio optimizacija' },
            { icon: '⚡', t: 'Svetainės performance pagerinimai' },
            { icon: '🛠️', t: 'Google Search Console setup' },
            { icon: '📊', t: 'Pozicijų stebėjimas' },
            { icon: '💡', t: 'SEO rekomendacijos' },
          ].map(c => (
            <div key={c.t} className="get-card">
              <div className="get-icon">{c.icon}</div>
              <div className="get-title">{c.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. KAM TINKA */}
      <section className="sec" id="kam-tinka">
        <div className="sec-tag">Tikslinė auditorija</div>
        <h2 className="sec-h">Tinka verslams, kurie nori<br />ilgalaikio srauto</h2>
        <div className="fit-list">
          {[
            'Paslaugų verslams',
            'E-komercijai',
            'Vietiniams verslams',
            'Statybų / NT sektoriui',
            'Grožio ir sveikatos verslams',
            'Įmonėms, kurios nori daugiau organinių užklausų',
          ].map(t => (
            <div key={t} className="fit-item">
              <div className="fit-dot" />
              <div className="fit-text">{t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRUST */}
      <section className="sec" id="rezultatai">
        <div className="sec-tag">Skaidrumas</div>
        <h2 className="sec-h">SEO rezultatai<br />matuojami aiškiai</h2>
        <div className="trust-grid">
          {[
            { icon: '📈', t: 'Raktažodžių pozicijos' },
            { icon: '👥', t: 'Organinis srautas' },
            { icon: '👁️', t: 'Google parodymai' },
            { icon: '🖱️', t: 'Paspaudimų augimas' },
            { icon: '🔧', t: 'Techninės klaidos' },
            { icon: '💡', t: 'Augimo rekomendacijos' },
          ].map(c => (
            <div key={c.t} className="trust-card">
              <div className="trust-icon">{c.icon}</div>
              <div className="trust-title">{c.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SVG — performance palyginimas */}
      <div className="gif-split">
        <div className="gif-frame">
          <img src="/performencecompare.svg" alt="SEO performance palyginimas" />
        </div>
        <div>
          <div className="gif-copy-tag">Rezultatai</div>
          <h3 className="gif-copy-h">Aiški skirtumo tarp optimizuotos ir neoptimizuotos svetainės</h3>
          <p className="gif-copy-p">Matome kur esate dabar ir kur galite būti. Duomenys rodo, kur slypi augimo potencialas.</p>
        </div>
      </div>

      {/* CTA STRIP 3 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Norite matyti, kaip auga jūsų svetainės matomumas?</div>
        <button onClick={cta} className="btn-primary">Susisiekite →</button>
      </div>

      {/* 8. FAQ */}
      <section className="sec" id="faq">
        <div className="sec-tag">Dažni klausimai</div>
        <h2 className="sec-h">Klausimai ir atsakymai</h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item">
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {f.q}
                <span className={`faq-arrow${openFaq === i ? ' open' : ''}`}>+</span>
              </button>
              {openFaq === i && <p className="faq-a">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="final-cta">
        <h2 className="final-h">Norite, kad žmonės<br />jus rastų Google?</h2>
        <p className="final-sub">Parašykite – įvertinsime jūsų svetainę ir pasiūlysime, ką verta pagerinti pirmiausia.</p>
        <button onClick={cta} className="btn-primary">Gauti SEO pasiūlymą →</button>
      </section>

      <footer>
        <div><img src="/KOMALOGO.webp" alt="KOMA Studio" style={{ height: '56px', width: 'auto' }} /></div>
        <div className="fcopy">© 2026 KOMA Studio</div>
      </footer>

      <div className="sticky-cta">
        <button onClick={cta}>Gauti nemokamą konsultaciją →</button>
      </div>
    </>
  );
}
