'use client';

import NavBar from '@/components/NavBar';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const SEOAnimation = dynamic(() => import('@/components/sections/bento-animations/SEOAnimation'), { ssr: false });

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
        .prob-split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .prob-text-list{display:flex;flex-direction:column;margin-top:32px;}
        .prob-text-item{padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.07);}
        .prob-text-item:first-child{border-top:1px solid rgba(255,255,255,0.07);}
        .prob-text-title{font-size:15px;font-weight:600;color:#f0ede8;margin-bottom:6px;}
        .prob-text-desc{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65;}
        .prob-anim-wrap{background:rgba(12,12,11,0.5);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:16px;}

        /* ── CTA STRIP ── */
        .cta-strip{padding:48px 80px;background:rgba(0,0,0,0.6);backdrop-filter:blur(14px);border-top:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between;gap:24px;}
        .cta-strip-text{font-size:18px;font-weight:600;color:#f0ede8;max-width:480px;line-height:1.4;}

        /* ── SOLUTION ── */
        .sol-split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .sol-img-wrap{border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.1);box-shadow:0 32px 80px rgba(0,0,0,0.6);}
        .sol-img-wrap img{width:100%;height:auto;display:block;}
        .sol-body{font-size:15px;color:rgba(255,255,255,0.55);line-height:1.8;margin-bottom:16px;}

        /* ── HOW IT WORKS ── */
        .how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;margin-top:48px;}
        .how-card{padding:32px 24px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);position:relative;overflow:hidden;}
        .how-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#10b981,#34d399);opacity:0.5;}
        .how-n{font-size:36px;font-weight:800;color:rgba(16,185,129,0.15);line-height:1;margin-bottom:16px;letter-spacing:-0.02em;}
        .how-title{font-size:17px;font-weight:600;color:#f0ede8;margin-bottom:8px;}
        .how-desc{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.65;}

        /* ── WHAT YOU GET ── */
        .get-split{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;}
        .get-svg-wrap{border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);padding:32px;background:rgba(255,255,255,0.02);}
        .get-svg-wrap img{width:100%;height:auto;display:block;}
        .get-text-list{display:flex;flex-direction:column;margin-top:32px;}
        .get-text-item{padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.07);}
        .get-text-item:first-child{border-top:1px solid rgba(255,255,255,0.07);}
        .get-text-title{font-size:15px;font-weight:600;color:#f0ede8;margin-bottom:5px;}
        .get-text-desc{font-size:13px;color:rgba(255,255,255,0.5);line-height:1.65;}

        /* ── FIT ── */
        .fit-split{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
        .fit-text-list{display:flex;flex-direction:column;}
        .fit-text-item{padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.07);}
        .fit-text-item:first-child{border-top:1px solid rgba(255,255,255,0.07);}
        .fit-text-title{font-size:15px;font-weight:600;color:#f0ede8;margin-bottom:6px;}
        .fit-text-desc{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65;}

        /* ── TRUST ── */
        .trust-text-list{display:flex;flex-direction:column;margin-top:32px;}
        .trust-text-item{padding:18px 0;border-bottom:1px solid rgba(255,255,255,0.07);}
        .trust-text-item:first-child{border-top:1px solid rgba(255,255,255,0.07);}
        .trust-text-title{font-size:15px;font-weight:600;color:#f0ede8;margin-bottom:6px;}
        .trust-text-desc{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.65;}

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

        /* ── MOBILE ── */
        @media(max-width:768px){
          .svc-hero{padding:120px 24px 80px;}
          .svc-hero-actions{flex-direction:column;width:100%;}
          .btn-primary,.btn-outline{width:100%;text-align:center;}
          .sec{padding:64px 24px;}
          .prob-split{grid-template-columns:1fr;gap:32px;}
          .prob-anim-wrap{order:-1;}
          .sol-split{grid-template-columns:1fr;gap:32px;}
          .sol-img-wrap{order:-1;}
          .how-grid{grid-template-columns:1fr;}
          .get-split{grid-template-columns:1fr;gap:32px;}
          .get-svg-wrap{order:-1;}
          .trust-grid{grid-template-columns:1fr;}
          .fit-split{grid-template-columns:1fr;gap:32px;}
          .gif-split{grid-template-columns:1fr!important;gap:32px;padding:48px 24px;}
          .cta-strip{flex-direction:column;align-items:flex-start;padding:40px 24px;}
          .final-cta{padding:80px 24px;}
          footer{flex-direction:column;gap:12px;text-align:center;padding:24px;}
        }
        @media(max-width:480px){
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
        <div className="prob-split">
          <div>
            <div className="sec-tag">Problema</div>
            <h2 className="sec-h">Jeigu jūsų nėra Google –<br />klientai renkasi konkurentus</h2>
            <div className="prob-text-list">
              {[
                { t: 'Svetainė nesimato Google paieškoje', d: 'Dauguma žmonių paslaugų ieško tiesiog įvesdami užklausą Google. Jei jūsų svetainė neatsiranda pirmajame puslapyje – jos praktiškai nėra. Tyrimai rodo, kad daugiau kaip 90% paspaudimų tenka pirmiems penkiems rezultatams.' },
                { t: 'Mažas organinis srautas', d: 'Organinis srautas – tai lankytojai, kurie ateina be reklamos išlaidų. Neoptimizuota svetainė praranda šį potencialą: kiekviena diena be SEO yra praleista galimybė gauti nemokamų užklausų ir naujų klientų.' },
                { t: 'Konkurentai randami aukščiau', d: 'Jei jūsų konkurentai investuoja į SEO, jie matomi ten, kur jūsų dar nėra. Google paieška yra nuolatinė konkurencija – kuo ilgiau laukiama, tuo sunkiau vėliau pasivyti pozicijomis ir atsikovoti matomumą.' },
                { t: 'Svetainė neoptimizuota SEO', d: 'Techninės klaidos, lėtas įkėlimas, blogi meta aprašymai ir nestruktūrizuotas turinys – visa tai trukdo Google suprasti jūsų svetainę. Net gerai atrodanti svetainė gali būti nerandama, jei trūksta esminių SEO elementų.' },
              ].map(p => (
                <div key={p.t} className="prob-text-item">
                  <div className="prob-text-title">{p.t}</div>
                  <p className="prob-text-desc">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="prob-anim-wrap">
            <SEOAnimation forceActive={true} />
          </div>
        </div>
      </section>

      {/* CTA STRIP 1 */}
      <div className="cta-strip">
        <div className="cta-strip-text">Atpažįstate bent vieną iš šių problemų?</div>
        <button onClick={cta} className="btn-primary">Kalbėkimės →</button>
      </div>

      {/* 3. SPRENDIMAS */}
      <section className="sec" id="sprendimas">
        <div className="sol-split">
          <div className="sol-img-wrap">
            <img src="/SEO%20rank%201.webp" alt="SEO #1 pozicija Google paieškoje" />
          </div>
          <div>
            <div className="sec-tag">Sprendimas</div>
            <h2 className="sec-h">SEO, kuris orientuotas<br />į realų verslo augimą</h2>
            <p className="sol-body">SEO optimizacija prasideda nuo raktažodžių analizės — išsiaiškiname, kokiomis užklausomis jūsų potencialūs klientai ieško paslaugų, ir kuriame strategiją, kuri leidžia pasirodyti tose pozicijose, kur svarbiausia.</p>
            <p className="sol-body">Sutvarkome techninius SEO pagrindus: puslapio greitį, mobiliąją versiją, struktūrizuotus duomenis, vidinę nuorodų struktūrą ir Google indexavimą. Visa tai yra būtina sąlyga, kad Google algoritmas jūsų svetainę matytų kaip patikimą ir vertingą.</p>
            <p className="sol-body">On-page optimizacija apima meta pavadinimus, aprašymus, antraštes ir turinį — optimizuojame kiekvieną puslapį taip, kad atitiktų tikslinius raktažodžius ir skatintų lankytoją imtis veiksmo. Vietinė SEO optimizacija padeda verslams Vilniuje ir kituose miestuose pasirodyti lokaliose paieškose.</p>
            <div style={{ marginTop: '32px' }}>
              <button onClick={cta} className="btn-primary">Noriu SEO optimizacijos →</button>
            </div>
          </div>
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
        <div className="get-split">
          <div className="get-svg-wrap">
            <img src="/kas%20ieina%20i%20seo.svg" alt="Kas įeina į SEO optimizaciją" />
          </div>
          <div>
            <div className="sec-tag">Ką gaunate</div>
            <h2 className="sec-h">Kas įeina į<br />SEO optimizaciją</h2>
            <div className="get-text-list">
              {[
                { t: 'SEO auditas ir raktažodžių tyrimas', d: 'Pradedame nuo pilno svetainės audito — identifikuojame technines klaidas, turinio spragas ir augimo galimybes. Raktažodžių tyrimas leidžia tiksliai sužinoti, kokiomis užklausomis jūsų klientai ieško paslaugų.' },
                { t: 'Techninis SEO sutvarkymas', d: 'Sutvarkome viską, ką mato Google, bet nemato lankytojai: svetainės greitį, mobiliąją versiją, kanonines nuorodas, sitemap, robots.txt ir struktūrizuotus duomenis.' },
                { t: 'On-page optimizacija', d: 'Kiekvienas puslapis optimizuojamas atskirai — meta pavadinimai, aprašymai, H1–H3 struktūra, vidinės nuorodos ir turinys. Taip Google aiškiai supranta, apie ką yra puslapis ir kam jis aktualus.' },
                { t: 'Google Search Console setup', d: 'Sujungiame svetainę su Google Search Console ir Google Analytics — tai leidžia tiksliai stebėti, kurie raktažodžiai generuoja srautą, kokie puslapiai rodomi paieškoje ir kaip kinta pozicijos laikui bėgant.' },
                { t: 'Nuolatinis pozicijų stebėjimas', d: 'Reguliariai sekame jūsų raktažodžių pozicijas ir organinio srauto dinamiką. Gausite aiškias ataskaitas ir rekomendacijas, kaip toliau auginti matomumą — be techninių žargonų.' },
              ].map(p => (
                <div key={p.t} className="get-text-item">
                  <div className="get-text-title">{p.t}</div>
                  <p className="get-text-desc">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. KAM TINKA */}
      <section className="sec" id="kam-tinka">
        <div className="fit-split">
          <div>
            <div className="sec-tag">Tikslinė auditorija</div>
            <h2 className="sec-h">Tinka verslams, kurie nori<br />ilgalaikio srauto</h2>
          </div>
          <div className="fit-text-list">
            {[
              { t: 'Paslaugų verslams', d: 'Advokatų kontoros, statybų įmonės, grožio salonai, konsultantai — visi verslai, kurių paslaugų žmonės ieško Google. SEO leidžia pasirodyti tinkamu metu, kai potencialus klientas jau turi poreikį.' },
              { t: 'E-komercijai', d: 'Internetinės parduotuvės gauna didžiulę naudą iš organinės paieškos — produktų puslapiai ir kategorijos gali generuoti nuolatinį srautą be reklamos išlaidų, ypač ilgalaikėje perspektyvoje.' },
              { t: 'Vietiniams verslams', d: 'Jei dirbate konkrečiame mieste ar regione, vietinė SEO optimizacija padeda pasirodyti „svetainių kūrimas Vilniuje" tipo užklausose ir Google Maps rezultatuose — ten, kur ieško vietiniai klientai.' },
              { t: 'Įmonėms, norinčioms sumažinti priklausomybę nuo reklamos', d: 'Reklama sustoja, kai sustoja mokėjimas. SEO dirba nuolat — svetainė, kuri šiandien pasiekė pirmą Google puslapį, generuoja srautą ir po metų be papildomų išlaidų.' },
            ].map(p => (
              <div key={p.t} className="fit-text-item">
                <div className="fit-text-title">{p.t}</div>
                <p className="fit-text-desc">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TRUST */}
      <section className="sec" id="rezultatai">
        <div className="sec-tag">Skaidrumas</div>
        <h2 className="sec-h">SEO rezultatai<br />matuojami aiškiai</h2>
        <div className="trust-text-list">
          {[
            { t: 'Raktažodžių pozicijos', d: 'Kiekvieną mėnesį matote, kuriose pozicijose Google paieškoje rodomi jūsų puslapiai pagal tikslinius raktažodžius. Aiškiai matysite, kurie raktažodžiai kyla ir kokie dar reikalauja daugiau darbo.' },
            { t: 'Organinis srautas ir Google parodymai', d: 'Per Google Search Console ir Analytics stebime, kiek žmonių ateina į jūsų svetainę iš organinės paieškos, kiek kartų jūsų puslapiai buvo parodyti ir kokia yra paspaudimų norma — visi duomenys vienoje ataskaitoje.' },
            { t: 'Techninių klaidų stebėjimas', d: 'Automatiškai fiksuojame naujas technines klaidas — puslapius, kurių Google negali indeksuoti, sulūžusias nuorodas ar greičio problemas. Klaidos šalinamos prieš joms paveikiant pozicijas.' },
            { t: 'Augimo rekomendacijos', d: 'Kiekvienoje ataskaitoje pateikiame konkrečius tolesnius žingsnius: ką optimizuoti, kokie nauji raktažodžiai verti dėmesio ir kaip galima padidinti organinį srautą einamąjį mėnesį.' },
          ].map(p => (
            <div key={p.t} className="trust-text-item">
              <div className="trust-text-title">{p.t}</div>
              <p className="trust-text-desc">{p.d}</p>
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

    </>
  );
}
