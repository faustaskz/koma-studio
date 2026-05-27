'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const FAQS = [
  { q: 'Kiek reikia biudžeto Google Ads?', a: 'Priklauso nuo rinkos, bet dažniausiai testui verta turėti bent 300–500 € reklamos biudžetą per mėnesį.' },
  { q: 'Kada matosi rezultatai?', a: 'Pirmus duomenis galima matyti gana greitai, bet normaliai vertinti kampaniją verta po 2–4 savaičių.' },
  { q: 'Ar reikia turėti svetainę?', a: 'Taip, geriausia turėti aiškų puslapį arba landing page. Jei jo nėra – galime sukurti.' },
  { q: 'Ar tvarkote jau paleistas kampanijas?', a: 'Taip, galime peržiūrėti esamas kampanijas ir sutvarkyti struktūrą.' },
];

export default function GoogleAdsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const cta = () => window.dispatchEvent(new CustomEvent('openConsultPopup'));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap');
        body{background:#0a0a0a;color:#f0ede8;font-family:'Raleway',sans-serif;font-weight:300;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .page-bg{position:fixed;inset:0;z-index:-1;background:url('/google%20ads%20back.webp') center/cover no-repeat;}
        .page-bg::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.75);}

        /* ── HERO ── */
        .svc-hero{min-height:100vh;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:140px 80px 100px;position:relative;overflow:hidden;background:transparent;}
        .svc-eyebrow{font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.4);text-transform:uppercase;margin-bottom:28px;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;display:flex;align-items:center;gap:12px;}
        .svc-eyebrow::before{content:'';width:20px;height:1px;background:rgba(255,255,255,0.3);}
        .svc-hero-title{font-family:'Raleway',sans-serif;font-size:clamp(44px,6.5vw,88px);line-height:1.05;letter-spacing:-0.02em;font-weight:700;max-width:760px;color:#f0ede8;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;}
        .svc-hero-title em{font-style:normal;font-weight:800;background:linear-gradient(135deg,#4a90d9,#34c4f4,#4a90d9);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradShift 6s ease infinite;}
        .svc-hero-sub{margin-top:24px;font-size:18px;color:rgba(255,255,255,0.55);line-height:1.7;max-width:460px;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s forwards;}
        .svc-hero-actions{margin-top:40px;display:flex;gap:14px;align-items:center;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards;}
        .btn-primary{background:#f0ede8;color:#0a0a0a;padding:14px 28px;border-radius:100px;font-size:14px;font-weight:600;text-decoration:none;border:none;cursor:pointer;transition:opacity 0.2s,transform 0.2s;font-family:'Raleway',sans-serif;}
        .btn-primary:hover{opacity:0.88;transform:translateY(-1px);}
        .btn-outline{color:rgba(255,255,255,0.6);padding:14px 28px;border-radius:100px;font-size:14px;text-decoration:none;border:1px solid rgba(255,255,255,0.2);background:transparent;cursor:pointer;transition:color 0.2s,border-color 0.2s;font-family:'Raleway',sans-serif;}
        .btn-outline:hover{color:#fff;border-color:rgba(255,255,255,0.5);}

        /* ── SHARED SECTION ── */
        .sec{padding:80px 80px;background:rgba(0,0,0,0.52);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);}
        .sec-tag{font-size:10px;letter-spacing:0.2em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px;}
        .sec-tag::before{content:'';width:20px;height:1px;background:rgba(255,255,255,0.2);}
        .sec-h{font-size:clamp(28px,3.5vw,48px);font-weight:700;letter-spacing:-0.02em;line-height:1.15;color:#f0ede8;margin-bottom:16px;}
        .sec-sub{font-size:16px;color:rgba(255,255,255,0.5);line-height:1.7;max-width:560px;margin-bottom:48px;}

        /* ── PROBLEM SECTION ── */
        .prob-split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .prob-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:2px;margin-top:32px;}
        .prob-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:20px 22px;transition:background 0.2s;}
        .prob-card:hover{background:rgba(255,255,255,0.07);}
        .prob-icon{font-size:18px;margin-bottom:10px;}
        .prob-text{font-size:13px;font-weight:500;color:#f0ede8;line-height:1.5;}
        .prob-img-wrap{border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 32px 80px rgba(0,0,0,0.6);}
        .prob-img-wrap img{width:100%;height:auto;display:block;}

        /* ── CTA STRIP ── */
        .cta-strip{padding:48px 80px;background:rgba(0,0,0,0.6);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;gap:24px;}
        .cta-strip-text{font-size:18px;font-weight:600;color:#f0ede8;max-width:480px;line-height:1.4;}

        /* ── SOLUTION ── */
        .sol-split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .sol-compact{display:flex;flex-direction:column;}
        .sol-row{display:flex;align-items:center;gap:16px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,0.07);}
        .sol-row:first-child{border-top:1px solid rgba(255,255,255,0.07);}
        .sol-row-n{font-size:10px;letter-spacing:0.12em;color:rgba(74,144,217,0.55);flex-shrink:0;width:22px;}
        .sol-row-t{font-size:14px;font-weight:500;color:#f0ede8;line-height:1.4;}
        .sol-img-wrap{border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 32px 80px rgba(0,0,0,0.6);}
        .sol-img-wrap img{width:100%;height:auto;display:block;}

        /* ── PROCESS ── */
        .proc-list{display:flex;flex-direction:column;gap:0;margin-top:48px;}
        .proc-row{display:grid;grid-template-columns:48px 1fr;gap:28px;padding:28px 0;border-top:1px solid rgba(255,255,255,0.07);align-items:start;}
        .proc-row:last-child{border-bottom:1px solid rgba(255,255,255,0.07);}
        .proc-n{font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:0.1em;padding-top:4px;}
        .proc-title{font-size:20px;font-weight:600;color:#f0ede8;margin-bottom:6px;}
        .proc-desc{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65;}

        /* ── FIT ── */
        .fit-split{display:grid;grid-template-columns:0.6fr 1fr;gap:64px;align-items:center;}
        .fit-accent-wrap{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);opacity:0.82;}
        .fit-accent-wrap img{width:100%;height:auto;display:block;}
        .fit-list{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}
        .fit-item{display:flex;align-items:center;gap:12px;padding:14px 18px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;}
        .fit-dot{width:5px;height:5px;border-radius:50%;background:linear-gradient(135deg,#4a90d9,#34c4f4);flex-shrink:0;}
        .fit-text{font-size:14px;color:rgba(255,255,255,0.8);font-weight:400;}

        /* ── TRUST ── */
        .trust-split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .trust-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px;}
        .trust-pill{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:10px 16px;border-radius:8px;transition:background 0.2s;}
        .trust-pill:hover{background:rgba(255,255,255,0.09);}
        .trust-pill-icon{font-size:16px;line-height:1;}
        .trust-pill-text{font-size:13px;font-weight:500;color:#f0ede8;white-space:nowrap;}
        .trust-img-wrap{border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 32px 80px rgba(0,0,0,0.6);}
        .trust-img-wrap img{width:100%;height:auto;display:block;}

        /* ── FAQ ── */
        .faq-list{display:flex;flex-direction:column;gap:0;margin-top:48px;max-width:720px;}
        .faq-item{border-top:1px solid rgba(255,255,255,0.08);}
        .faq-item:last-child{border-bottom:1px solid rgba(255,255,255,0.08);}
        .faq-q{width:100%;background:transparent;border:none;color:#f0ede8;font-family:'Raleway',sans-serif;font-size:16px;font-weight:500;text-align:left;padding:22px 0;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:16px;transition:color 0.2s;}
        .faq-q:hover{color:rgba(255,255,255,0.7);}
        .faq-arrow{font-size:18px;color:rgba(255,255,255,0.3);transition:transform 0.25s;flex-shrink:0;}
        .faq-arrow.open{transform:rotate(45deg);}
        .faq-a{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;padding-bottom:22px;max-width:580px;}

        /* ── GIF PANEL ── */
        .gif-split{padding:64px 80px;background:rgba(0,0,0,0.52);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
        .gif-copy-tag{font-size:10px;letter-spacing:0.2em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:16px;display:flex;align-items:center;gap:10px;}
        .gif-copy-tag::before{content:'';width:20px;height:1px;background:rgba(255,255,255,0.2);}
        .gif-copy-h{font-size:clamp(22px,2.5vw,34px);font-weight:700;letter-spacing:-0.02em;line-height:1.2;color:#f0ede8;margin-bottom:14px;}
        .gif-copy-p{font-size:15px;color:rgba(255,255,255,0.5);line-height:1.7;}
        .gif-frame{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 24px 60px rgba(0,0,0,0.5);}
        .gif-frame img{width:100%;height:auto;display:block;}

        /* ── FINAL CTA ── */
        .final-cta{padding:120px 80px;text-align:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);}
        .final-h{font-size:clamp(32px,4vw,56px);font-weight:700;letter-spacing:-0.02em;line-height:1.15;color:#f0ede8;margin-bottom:16px;}
        .final-sub{font-size:16px;color:rgba(255,255,255,0.5);max-width:440px;margin:0 auto 40px;line-height:1.7;}

        /* ── FOOTER ── */
        footer{border-top:1px solid rgba(255,255,255,0.08);padding:28px 80px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(12px);}
        .fcopy{font-size:11px;color:rgba(255,255,255,0.25);}

        /* ── MOBILE ── */
        @media(max-width:768px){
          .svc-hero{padding:120px 24px 80px;}
          .svc-hero-actions{flex-direction:column;width:100%;}
          .btn-primary,.btn-outline{width:100%;text-align:center;}
          .sec{padding:64px 24px;}
          .prob-split{grid-template-columns:1fr;gap:32px;}
          .prob-img-order{order:-1;}
          .prob-grid{grid-template-columns:1fr;}
          .sol-split{grid-template-columns:1fr;gap:32px;}
          .sol-img-order{order:-1;}
          .trust-split{grid-template-columns:1fr;gap:32px;}
          .trust-img-trust-order{order:-1;}
          .fit-split{grid-template-columns:1fr;gap:28px;}
          .fit-list{grid-template-columns:1fr;}
          .gif-split{grid-template-columns:1fr!important;gap:32px;padding:48px 24px;}
          .cta-strip{flex-direction:column;align-items:flex-start;padding:40px 24px;}
          .final-cta{padding:80px 24px;}
          footer{flex-direction:column;gap:12px;text-align:center;padding:24px;}
        }
        @media(max-width:480px){
          .svc-hero{padding:100px 20px 60px;}
          .svc-hero-sub{font-size:16px;}
          .sec{padding:48px 20px;}
          .cta-strip{padding:32px 20px;}
          .cta-strip-text{font-size:16px;}
          .gif-split{padding:40px 20px;}
          .final-cta{padding:60px 20px;}
          footer{padding:20px;}
        }
      `}</style>

      <div className="page-bg" />
      <NavBar />

      {/* 1. HERO */}
      <section className="svc-hero">
        <p className="svc-eyebrow">Google Ads</p>
        <h1 className="svc-hero-title">Reklama, kuri pasiekia<br /><em>tikrus pirkėjus</em></h1>
        <p className="svc-hero-sub">Valdome Google kampanijas taip, kad kiekvienas investuotas euras dirbtų už jus — ne tiesiog rodytų reklamą, bet atvestų klientus.</p>
        <div className="svc-hero-actions">
          <button onClick={cta} className="btn-primary">Gauti nemokamą konsultaciją →</button>
          <a href="#procesas" className="btn-outline">Kaip dirbame</a>
        </div>
      </section>

      {/* 2. PROBLEMA */}
      <section className="sec" id="problema">
        <div className="prob-split">
          <div>
            <div className="sec-tag">Problema</div>
            <h2 className="sec-h">Mokate už reklamą,<br />bet negaunate klientų?</h2>
            <p className="sec-sub" style={{ marginBottom: 0 }}>Dažniausia problema nėra Google Ads. Problema – bloga struktūra, netikslūs raktažodžiai ir kampanijos be aiškaus tikslo.</p>
            <div className="prob-grid">
              {[
                { icon: '📉', text: 'Daug paspaudimų, mažai užklausų' },
                { icon: '💸', text: 'Reklama leidžia pinigus be aiškaus rezultato' },
                { icon: '🤷', text: 'Neaišku, kas veikia ir kas ne' },
                { icon: '🔕', text: 'Kampanijos paleistos, bet niekas jų neoptimizuoja' },
              ].map(p => (
                <div key={p.text} className="prob-card">
                  <div className="prob-icon">{p.icon}</div>
                  <div className="prob-text">{p.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="prob-img-order">
            <div className="prob-img-wrap">
              <img src="/low%20conversion.webp" alt="Žemos konversijos problema" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP 1 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Atpažįstate bent vieną iš šių problemų?</div>
        <button onClick={cta} className="btn-primary">Kalbėkimės →</button>
      </div>

      {/* GIF — Google naršymas */}
      <div className="gif-split">
        <div className="gif-frame">
          <img src="/google%20ads.webp" alt="Google Ads naršymas" />
        </div>
        <div>
          <div className="gif-copy-tag">Kaip tai veikia</div>
          <h3 className="gif-copy-h">Jūsų reklama pasirodo tada, kai žmogus jau ieško to, ką siūlote</h3>
          <p className="gif-copy-p">Google Ads leidžia pasiekti pirkti pasiruošusius žmones — tik reikia sutvarkyti kampaniją tinkamai.</p>
        </div>
      </div>

      {/* 3. SPRENDIMAS */}
      <section className="sec" id="sprendimas">
        <div className="sol-split">
          <div>
            <div className="sec-tag">Sprendimas</div>
            <h2 className="sec-h" style={{ marginBottom: '32px' }}>Sutvarkome Google Ads taip,<br />kad reklama turėtų aiškų tikslą</h2>
            <div className="sol-compact">
              {[
                { n: '01', t: 'Randame tinkamus raktažodžius' },
                { n: '02', t: 'Sukuriame aiškią kampanijų struktūrą' },
                { n: '03', t: 'Parašome skelbimus, kurie parduoda' },
                { n: '04', t: 'Sutvarkome konversijų sekimą' },
                { n: '05', t: 'Optimizuojame pagal realius rezultatus' },
                { n: '06', t: 'Aiškiai parodome, kur keliauja biudžetas' },
              ].map(s => (
                <div key={s.n} className="sol-row">
                  <span className="sol-row-n">{s.n}</span>
                  <span className="sol-row-t">{s.t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '32px' }}>
              <button onClick={cta} className="btn-primary">Noriu sutvarkyti Google Ads →</button>
            </div>
          </div>
          <div className="sol-img-order">
            <div className="sol-img-wrap">
              <img src="/Google%20Ads%20kompas.webp" alt="Google Ads strategija" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESAS */}
      <section className="sec" id="procesas">
        <div className="sec-tag">Procesas</div>
        <h2 className="sec-h">Procesas paprastas</h2>
        <div className="proc-list">
          {[
            { n: '01', t: 'Įvertiname situaciją', d: 'Peržiūrime jūsų svetainę, paslaugas, konkurenciją ir tikslus.' },
            { n: '02', t: 'Paruošiame planą', d: 'Pasiūlome kampanijų struktūrą, biudžetą ir prioritetus.' },
            { n: '03', t: 'Paleidžiame reklamą', d: 'Sukuriame kampanijas, skelbimus, raktažodžius ir sekimą.' },
            { n: '04', t: 'Optimizuojame', d: 'Stebime rezultatus, testuojame ir geriname kampanijas.' },
          ].map(p => (
            <div key={p.n} className="proc-row">
              <div className="proc-n">{p.n}</div>
              <div>
                <div className="proc-title">{p.t}</div>
                <p className="proc-desc">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP 2 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Nori pradėti? Pirmasis žingsnis — nemokama konsultacija.</div>
        <button onClick={cta} className="btn-primary">Pradėkime →</button>
      </div>

      {/* 5. KAM TINKA */}
      <section className="sec" id="kam-tinka">
        <div className="fit-split">
          <div className="fit-accent-wrap">
            <img src="/verslui%20google%20ads.webp" alt="Google Ads verslui" />
          </div>
          <div>
            <div className="sec-tag">Tikslinė auditorija</div>
            <h2 className="sec-h" style={{ marginBottom: '28px' }}>Tinka verslams, kurie<br />nori daugiau užklausų</h2>
            <div className="fit-list">
              {[
                'Statybų ir remonto paslaugoms',
                'B2B paslaugoms',
                'E-komercijai',
                'Grožio / sveikatos paslaugoms',
                'Vietiniams paslaugų verslams',
                'Įmonėms, kurios jau turi svetainę, bet trūksta srauto',
              ].map(t => (
                <div key={t} className="fit-item">
                  <div className="fit-dot" />
                  <div className="fit-text">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST */}
      <section className="sec" id="rezultatai">
        <div className="trust-split">
          <div>
            <div className="sec-tag">Skaidrumas</div>
            <h2 className="sec-h">Matysite ne pažadus,<br />o aiškius skaičius</h2>
            <div className="trust-pills">
              {[
                { icon: '📊', t: 'Konversijų sekimas' },
                { icon: '🔑', t: 'Raktažodžių ataskaitos' },
                { icon: '💰', t: 'Biudžeto panaudojimas' },
                { icon: '📬', t: 'Užklausų kaina' },
                { icon: '💡', t: 'Rekomendacijos, ką gerinti' },
              ].map(c => (
                <div key={c.t} className="trust-pill">
                  <span className="trust-pill-icon">{c.icon}</span>
                  <span className="trust-pill-text">{c.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="trust-img-trust-order">
            <div className="trust-img-wrap">
              <img src="/google%20ads%20dashboard.webp" alt="Google Ads dashboard" />
            </div>
          </div>
        </div>
      </section>

      {/* SVG — makeitrain */}
      <div className="gif-split">
        <div>
          <div className="gif-copy-tag">Tikslas</div>
          <h3 className="gif-copy-h">Kiekvienas reklamos euras turi dirbti ir grįžti atgal</h3>
          <p className="gif-copy-p">Google Ads valdome taip, kad reklama ne tik generuotų paspaudimus — bet ir atvestų realiaus užklausas bei pardavimus.</p>
        </div>
        <div className="gif-frame">
          <img src="/makeitrain.svg" alt="Google Ads ROI" />
        </div>
      </div>

      {/* CTA STRIP 3 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Norite matyti, kur keliauja kiekvienas euras?</div>
        <button onClick={cta} className="btn-primary">Susisiekite →</button>
      </div>

      {/* 7. FAQ */}
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

      {/* 8. FINAL CTA */}
      <section className="final-cta">
        <h2 className="final-h">Norite, kad Google Ads<br />pagaliau pradėtų nešti rezultatus?</h2>
        <p className="final-sub">Parašykite – peržiūrėsime situaciją ir pasiūlysime ką verta tvarkyti pirmiausia.</p>
        <button onClick={cta} className="btn-primary">Gauti Google Ads pasiūlymą →</button>
      </section>

      <footer>
        <div><img src="/KOMALOGO.webp" alt="KOMA Studio" style={{ height: '56px', width: 'auto' }} /></div>
        <div className="fcopy">© 2026 KOMA Studio</div>
      </footer>

    </>
  );
}
