'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';

const FAQS = [
  { q: 'Kiek reikia reklamos biudžeto?', a: 'Priklauso nuo rinkos, tačiau dažniausiai verta pradėti bent nuo 300–500 € mėnesinio reklamos biudžeto.' },
  { q: 'Kada matosi rezultatai?', a: 'Pirmi duomenys matomi greitai, tačiau optimaliam vertinimui dažniausiai reikia 2–4 savaičių.' },
  { q: 'Ar kuriate reklamos vizualus?', a: 'Taip, padedame su reklamos kūryba ir kryptimi.' },
  { q: 'Ar galima optimizuoti jau veikiančias kampanijas?', a: 'Taip, galime perimti ir sutvarkyti esamas reklamas.' },
];

export default function MetaAdsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const cta = () => window.dispatchEvent(new CustomEvent('openConsultPopup'));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap');
        body{background:#0a0a0a;color:#f0ede8;font-family:'Raleway',sans-serif;font-weight:300;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}

        .page-bg{position:fixed;inset:0;z-index:-1;background:url('/meta%20ads%20back.webp') center/cover no-repeat;}
        .page-bg::after{content:'';position:absolute;inset:0;background:rgba(0,0,0,0.75);}

        /* ── HERO ── */
        .svc-hero{min-height:100vh;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:140px 80px 100px;position:relative;overflow:hidden;background:transparent;}
        .svc-eyebrow{font-size:11px;letter-spacing:0.2em;color:rgba(255,255,255,0.4);text-transform:uppercase;margin-bottom:28px;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards;display:flex;align-items:center;gap:12px;}
        .svc-eyebrow::before{content:'';width:20px;height:1px;background:rgba(255,255,255,0.3);}
        .svc-hero-title{font-family:'Raleway',sans-serif;font-size:clamp(44px,6.5vw,88px);line-height:1.05;letter-spacing:-0.02em;font-weight:700;max-width:760px;color:#f0ede8;opacity:0;animation:fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;}
        .svc-hero-title em{font-style:normal;font-weight:800;background:linear-gradient(135deg,#3b82f6,#8b5cf6,#3b82f6);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradShift 6s ease infinite;}
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
        .prob-split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .prob-text-list{display:flex;flex-direction:column;margin-top:32px;}
        .prob-text-item{padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.07);}
        .prob-text-item:first-child{border-top:1px solid rgba(255,255,255,0.07);}
        .prob-text-title{font-size:15px;font-weight:600;color:#f0ede8;margin-bottom:6px;}
        .prob-text-desc{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65;}
        .prob-img-wrap{border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 32px 80px rgba(0,0,0,0.6);}
        .prob-img-wrap img{width:100%;height:auto;display:block;}

        /* ── CTA STRIP ── */
        .cta-strip{padding:48px 80px;background:rgba(0,0,0,0.6);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;gap:24px;}
        .cta-strip-text{font-size:18px;font-weight:600;color:#f0ede8;max-width:480px;line-height:1.4;}

        /* ── SOLUTION ── */
        .sol-split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .sol-body{font-size:15px;color:rgba(255,255,255,0.55);line-height:1.8;margin-bottom:16px;}
        .sol-img-wrap{border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 32px 80px rgba(0,0,0,0.6);}
        .sol-img-wrap img{width:100%;height:auto;display:block;}

        /* ── WHAT YOU GET ── */
        .get-split{display:grid;grid-template-columns:370px 1fr;gap:56px;align-items:center;margin-left:100px;}
        .get-img-wrap{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 16px 48px rgba(0,0,0,0.5);}
        .get-img-wrap img{width:100%;height:auto;display:block;}
        .get-text-list{display:flex;flex-direction:column;margin-top:28px;}
        .get-text-item{padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.07);}
        .get-text-item:first-child{border-top:1px solid rgba(255,255,255,0.07);}
        .get-text-title{font-size:14px;font-weight:600;color:#f0ede8;margin-bottom:5px;display:flex;align-items:center;gap:8px;}
        .get-text-desc{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.65;}

        /* ── PROCESS ── */
        .proc-list{display:flex;flex-direction:column;gap:0;margin-top:48px;}
        .proc-row{display:grid;grid-template-columns:48px 1fr;gap:28px;padding:28px 0;border-top:1px solid rgba(255,255,255,0.07);align-items:start;}
        .proc-row:last-child{border-bottom:1px solid rgba(255,255,255,0.07);}
        .proc-n{font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:0.1em;padding-top:4px;}
        .proc-title{font-size:20px;font-weight:600;color:#f0ede8;margin-bottom:6px;}
        .proc-desc{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65;}

        /* ── FIT ── */
        .fit-list{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:48px;}
        .fit-item{display:flex;align-items:center;gap:14px;padding:18px 22px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;transition:border-color 0.2s;}
        .fit-item:hover{border-color:rgba(139,92,246,0.3);}
        .fit-dot{width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#8b5cf6);flex-shrink:0;}
        .fit-text{font-size:15px;color:rgba(255,255,255,0.8);font-weight:400;}

        /* ── TRUST ── */
        .trust-split{display:grid;grid-template-columns:1fr 0.6fr;gap:64px;align-items:center;}
        .trust-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px;}
        .trust-pill{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:10px 16px;border-radius:8px;transition:background 0.2s;}
        .trust-pill:hover{background:rgba(255,255,255,0.09);}
        .trust-pill-icon{font-size:16px;line-height:1;}
        .trust-pill-text{font-size:13px;font-weight:500;color:#f0ede8;white-space:nowrap;}
        .trust-accent-wrap{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);opacity:0.82;}
        .trust-accent-wrap img{width:100%;height:auto;display:block;}

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
          .sol-split{grid-template-columns:1fr;gap:32px;}
          .sol-img-order{order:-1;}
          .get-split{grid-template-columns:1fr;gap:32px;margin-left:0;}
          .trust-split{grid-template-columns:1fr;gap:28px;}
          .trust-accent-hide{display:none;}
          .fit-list{grid-template-columns:1fr;}
          .gif-split{grid-template-columns:1fr;gap:32px;padding:48px 24px;}
          .cta-strip{flex-direction:column;align-items:flex-start;padding:40px 24px;}
          .final-cta{padding:80px 24px;}
          footer{flex-direction:column;gap:12px;text-align:center;padding:24px;}
        }
      `}</style>

      <div className="page-bg" />
      <NavBar />

      {/* 1. HERO */}
      <section className="svc-hero">
        <p className="svc-eyebrow">Meta Ads</p>
        <h1 className="svc-hero-title">Pasiekite savo<br /><em>idealų klientą</em></h1>
        <p className="svc-hero-sub">Facebook ir Instagram kampanijos, orientuotos į rezultatą — ne pasiekiamumą, o realias užklausas ir pardavimus.</p>
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
            <h2 className="sec-h">Leidžiate reklamas,<br />bet rezultatai nestabilūs?</h2>
            <p className="sec-sub" style={{ marginBottom: 0 }}>Dauguma Meta Ads kampanijų sudega dėl silpnos kūrybos, blogo targeting'o arba neoptimizuojamų reklamų.</p>
            <div className="prob-text-list">
              {[
                { t: 'Reklama generuoja bereikalingus paspaudimus', d: 'Reklama gauna daug paspaudimų, tačiau į svetainę ateinantys žmonės nesidomisi jūsų paslaugomis ir neketina pirkti. Tai rodo netikslų targetingą arba silpną skelbimo kryptį.' },
                { t: 'Aukšta užklausos kaina', d: 'Kiekvienas gautas lead\'as kainuoja per daug, nes auditorija pasirinkta per plačiai arba kūryba nepakankamai stipri, kad išskirtų jus iš konkurentų.' },
                { t: 'Kūryba nepritraukia dėmesio', d: 'Facebook ir Instagram vartotojai per dieną mato šimtus reklamų. Jei vizualas ar tekstas neišsiskiria per pirmąsias sekundes – jūsų reklama tiesiog praslys pro šalį.' },
                { t: 'Kampanijos paleistos ir pamirštos', d: 'Viena dažniausių klaidų — paleisti kampaniją ir jos neoptimizuoti. Meta algoritmas reikalauja nuolatinio testavimo, nes auditorijos ir kainos keičiasi.' },
              ].map(p => (
                <div key={p.t} className="prob-text-item">
                  <div className="prob-text-title">{p.t}</div>
                  <p className="prob-text-desc">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="prob-img-order">
            <div className="prob-img-wrap">
              <img src="/leads%200.webp" alt="Meta Ads leads problema" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPRENDIMAS */}
      <section className="sec" id="sprendimas">
        <div className="sol-split">
          <div>
            <div className="sec-tag">Sprendimas</div>
            <h2 className="sec-h" style={{ marginBottom: '24px' }}>Meta Ads turi ne tik atrodyti gerai.<br />Jos turi veikti.</h2>
            <p className="sol-body">Meta Ads sėkmė priklauso nuo trijų dalykų: tinkamos auditorijos, stiprios kūrybos ir nuolatinės optimizacijos. Prieš paleisdami bet kokią kampaniją, ištiriame jūsų tikslinę auditoriją — kas yra jūsų klientas, kur jis leidžia laiką ir kokie pranešimai jį pasiekia.</p>
            <p className="sol-body">Reklaminį turinį kuriame orientuotą į konversiją — ne tik gražų vizualą, bet žinutę, kuri verčia imtis veiksmo. Facebook ir Instagram algoritmai atlygina reklamoms su aukštu engagement rate ir žema klikų kaina, todėl kūryba yra vienas svarbiausių sėkmės veiksnių.</p>
            <p className="sol-body">Kiekvieną kampaniją valdome aktyviai: sekame konversijas per Facebook Pixel, testuojame auditorijų segmentus, lyginame vizualus A/B testais ir optimizuojame pagal realius ROAS bei CPA rodiklius — ne spėliojimus.</p>
            <div style={{ marginTop: '32px' }}>
              <button onClick={cta} className="btn-primary">Noriu Meta Ads reklamos →</button>
            </div>
          </div>
          <div className="sol-img-order">
            <div className="sol-img-wrap">
              <img src="/meta%20campaigns.webp" alt="Meta Ads kampanijų valdymas" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP 1 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Atpažįstate bent vieną iš šių problemų?</div>
        <button onClick={cta} className="btn-primary">Kalbėkimės →</button>
      </div>

      {/* GIF — Meta naršymas */}
      <div className="gif-split">
        <div className="gif-frame">
          <img src="/meta%20adsgif.gif" alt="Meta Ads Facebook" />
        </div>
        <div>
          <div className="gif-copy-tag">Kaip tai veikia</div>
          <h3 className="gif-copy-h">Jūsų reklama pasirodo ten, kur žmonės leidžia laiką</h3>
          <p className="gif-copy-p">Skirtingai nei Google Ads, Meta reklama pasiekia auditoriją dar prieš jiems pradedant aktyviai ieškoti. Facebook ir Instagram algoritmai leidžia nukreipti reklamą pagal amžių, vietą, pomėgius, elgseną ir net panašumą į jūsų esamus klientus.</p>
          <p className="gif-copy-p" style={{ marginTop: '14px' }}>Tai reiškia, kad galite pasiekti potencialius klientus ankstyvame sprendimo priėmimo etape — kurti žinomumą, generuoti susidomėjimą ir skatinti užklausas dar prieš konkurentai juos pastebi. Tinkamai sukonfigūruota Meta Ads kampanija dirba nuolat — generuoja srautą ir užklausas net tada, kai jūs nedirbate.</p>
        </div>
      </div>


      {/* SVG — biznio planas */}
      <div className="gif-split" style={{ gridTemplateColumns: '1fr 0.5fr' }}>
        <div>
          <div className="gif-copy-tag">Strategija</div>
          <h3 className="gif-copy-h">Kiekviena kampanija prasideda nuo aiškaus plano</h3>
          <p className="gif-copy-p">Prieš paleisdami bet kokią Meta Ads kampaniją, atliekame verslo ir konkurencijos analizę: kas yra jūsų tikslinė auditorija, kokie pranešimai jai rezonuoja ir kaip pozicionuojasi konkurentai. Tik su šia informacija galima sukurti kampaniją, kuri iš tikrųjų veikia.</p>
          <p className="gif-copy-p" style={{ marginTop: '14px' }}>Planas apima auditorijų segmentavimą, kampanijų struktūrą, biudžeto paskirstymą ir kūrybos kryptį. Tokiu būdu kiekvienas investuotas euras dirba pagal aiškią logiką — ne atsitiktinai.</p>
        </div>
        <div className="gif-frame">
          <img src="/biznioplanas.svg" alt="Meta Ads kampanijų planas" />
        </div>
      </div>

      {/* 4. KĄ GAUNATE */}
      <section className="sec" id="ka-gaunate">
        <div className="get-split">
          <div className="get-img-wrap">
            <img src="/meta%20telefonas.webp" alt="Meta Ads telefonas" />
          </div>
          <div>
            <div className="sec-tag">Ką gaunate</div>
            <h2 className="sec-h">Pilnai sutvarkytą<br />Meta Ads sistemą</h2>
            <div className="get-text-list">
              {[
                { icon: '🚀', t: 'Reklamų paleidimas', d: 'Sukuriame ir paleidžiame Facebook bei Instagram kampanijas – nuo struktūros ir tekstų iki tikslinės auditorijos nustatymo.' },
                { icon: '📡', t: 'Facebook Pixel ir konversijų sekimas', d: 'Sutvarkome Pixel integraciją, kad galėtume tiksliai sekti, kas ateina iš reklamos ir kiek kainuoja kiekvienas pirkimas ar užklausa.' },
                { icon: '🎯', t: 'Auditorijų kūrimas ir testavimas', d: 'Kuriame tikslines auditorijas pagal demografiją, pomėgius ir elgseną, taip pat lookalike bei retargeting segmentus.' },
                { icon: '🎨', t: 'Reklaminių vizualų kryptis', d: 'Padedame suformuoti reklamos kūrybos kryptį – kokie vizualai ir žinutės veikia jūsų auditorijai ir generuoja daugiau konversijų.' },
                { icon: '📊', t: 'Nuolatinė optimizacija ir ataskaitos', d: 'Stebime CPA, ROAS ir kitus pagrindinius rodiklius, testuojame naujus kreivius ir reguliariai informuojame apie rezultatus.' },
              ].map(c => (
                <div key={c.t} className="get-text-item">
                  <div className="get-text-title"><span>{c.icon}</span>{c.t}</div>
                  <p className="get-text-desc">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESAS */}
      <section className="sec" id="procesas">
        <div className="sec-tag">Procesas</div>
        <h2 className="sec-h">Procesas paprastas</h2>
        <div className="proc-list">
          {[
            { n: '01', t: 'Analizė', d: 'Peržiūrime jūsų verslą, auditoriją ir konkurenciją.' },
            { n: '02', t: 'Strategija', d: 'Paruošiame reklamos kryptį ir kūrybos planą.' },
            { n: '03', t: 'Paleidimas', d: 'Sukuriame ir paleidžiame kampanijas.' },
            { n: '04', t: 'Optimizacija', d: 'Stebime rezultatus ir nuolat geriname reklamas.' },
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


      {/* 7. TRUST */}
      <section className="sec" id="rezultatai">
        <div className="trust-split">
          <div>
            <div className="sec-tag">Skaidrumas</div>
            <h2 className="sec-h">Aiškiai matysite<br />kas veikia</h2>
            <div className="prob-text-list" style={{ marginTop: '28px' }}>
              {[
                { t: 'Reklamos rezultatų ataskaitos', d: 'Kiekvieną savaitę ar mėnesį gausite aiškią ataskaitą: kiek paspaudimų, kiek konversijų, kiek kainavo kiekvienas lead\'as ar pirkimas. Jokie neaiškūs grafikai — tik skaičiai, kurie reiškia kažką konkrečiai jūsų verslui.' },
                { t: 'CPA ir ROAS stebėjimas', d: 'Sekame kiekvienos kampanijos pelningumą realiu laiku. Žinome, kiek kainuoja viena konversija ir koks yra reklamos investicijos grąžos koeficientas — tai leidžia priimti greitus sprendimus: investuoti daugiau į tai, kas veikia, ir stabdyti tai, kas švaistymo biudžetą.' },
                { t: 'Kūrybos efektyvumo analizė', d: 'Testuojame skirtingus vizualus, antraštes ir žinutes A/B formatais. Matuojame, kurie kreatyvai generuoja daugiau konversijų ir žemesnę kliką — tokiu būdu reklaminė kūryba nuolat gerėja ir nesensta.' },
                { t: 'Auditorijų testavimas ir tikslinimas', d: 'Lygiagrečiai testuojame kelias auditorijų grupes: interesų, demografines, lookalike ir retargeting segmentus. Žinome, kuri auditorija konvertuoja geriausiai, ir palaipsniui perkeliame biudžetą ten, kur jis duoda daugiausiai grąžos.' },
              ].map(p => (
                <div key={p.t} className="prob-text-item">
                  <div className="prob-text-title">{p.t}</div>
                  <p className="prob-text-desc">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="trust-accent-hide">
            <div className="trust-accent-wrap">
              <img src="/meta%20kas%20veikia.webp" alt="Meta Ads rezultatai" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP 3 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Norite reklamos, kuri dirba net tada, kai jūs nedirbate?</div>
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
        <h2 className="final-h">Norite reklamos, kuri<br />ne tik renka like'us?</h2>
        <p className="final-sub">Parašykite – įvertinsime situaciją ir pasiūlysime aiškų veiksmų planą.</p>
        <button onClick={cta} className="btn-primary">Gauti Meta Ads pasiūlymą →</button>
      </section>

      <footer>
        <div><img src="/KOMALOGO.webp" alt="KOMA Studio" style={{ height: '56px', width: 'auto' }} /></div>
        <div className="fcopy">© 2026 KOMA Studio</div>
      </footer>

    </>
  );
}
