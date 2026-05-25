import NavBar from '@/components/NavBar';
import Link from 'next/link';

export const metadata = {
  title: 'Privatumo politika | KOMA Studio',
  description: 'KOMA Studio privatumo politika. Sužinokite kaip renkame, naudojame ir saugome jūsų asmeninius duomenis.',
};

export default function PrivatumoPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');
        body { background: #0a0a0a; color: #f0ede8; font-family: 'Raleway', sans-serif; font-weight: 300; }

        .pp-hero { min-height: 40vh; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-end; padding: 140px 80px 64px; background: rgba(0,0,0,0.6); border-bottom: 1px solid rgba(255,255,255,0.07); }
        .pp-eyebrow { font-size: 11px; letter-spacing: 0.2em; color: rgba(255,255,255,0.35); text-transform: uppercase; margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
        .pp-eyebrow::before { content: ''; width: 20px; height: 1px; background: rgba(255,255,255,0.25); }
        .pp-title { font-size: clamp(32px,4vw,56px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; color: #f0ede8; }
        .pp-updated { margin-top: 16px; font-size: 13px; color: rgba(255,255,255,0.3); }

        .pp-body { max-width: 780px; margin: 0 auto; padding: 80px 80px 120px; }
        .pp-section { margin-bottom: 56px; }
        .pp-h2 { font-size: 20px; font-weight: 700; color: #f0ede8; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .pp-h3 { font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.8); margin: 20px 0 8px; }
        .pp-p { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.8; margin-bottom: 12px; }
        .pp-ul { margin: 8px 0 12px 0; padding-left: 0; list-style: none; }
        .pp-ul li { font-size: 15px; color: rgba(255,255,255,0.55); line-height: 1.8; padding-left: 20px; position: relative; margin-bottom: 4px; }
        .pp-ul li::before { content: '—'; position: absolute; left: 0; color: rgba(255,255,255,0.25); }
        .pp-highlight { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px 24px; margin: 16px 0; }
        .pp-highlight .pp-p { margin-bottom: 0; }
        a.pp-link { color: rgba(255,255,255,0.6); text-decoration: underline; text-underline-offset: 3px; }
        a.pp-link:hover { color: #f0ede8; }

        footer { border-top: 1px solid rgba(255,255,255,0.08); padding: 28px 80px; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.6); }
        .fcopy { font-size: 11px; color: rgba(255,255,255,0.25); }

        @media (max-width: 768px) {
          .pp-hero { padding: 120px 24px 48px; }
          .pp-body { padding: 48px 24px 80px; }
          footer { flex-direction: column; gap: 16px; text-align: center; padding: 24px; }
        }
      `}</style>

      <NavBar />

      <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <div className="pp-hero">
          <p className="pp-eyebrow">Teisinė informacija</p>
          <h1 className="pp-title">Privatumo politika</h1>
          <p className="pp-updated">Paskutinį kartą atnaujinta: 2026 m. gegužės mėn.</p>
        </div>

        <div className="pp-body">

          <div className="pp-section">
            <h2 className="pp-h2">1. Bendrosios nuostatos</h2>
            <p className="pp-p">Ši privatumo politika taikoma svetainei <strong>komadigital.lt</strong>, kurią valdo <strong>KOMA Studio</strong> (toliau — „mes", „mūsų").</p>
            <p className="pp-p">Naudodamiesi mūsų svetaine jūs sutinkate, kad jūsų duomenys gali būti tvarkomi šioje politikoje aprašytu būdu. Mes gerbiame jūsų privatumą ir įsipareigojame apsaugoti jūsų asmens duomenis pagal 2016 m. balandžio 27 d. Europos Parlamento ir Tarybos reglamento (ES) 2016/679 (BDAR / GDPR) reikalavimus.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">2. Kokie duomenys renkami</h2>

            <h3 className="pp-h3">Duomenys, kuriuos pateikiate patys</h3>
            <p className="pp-p">Kai užpildote konsultacijos užklausos formą, mes renkame:</p>
            <ul className="pp-ul">
              <li>Vardą</li>
              <li>Telefono numerį</li>
              <li>El. pašto adresą</li>
              <li>Paslaugos tipą (jūsų pasirinktą)</li>
              <li>Laisvą komentarą (jei pateikiamas)</li>
            </ul>
            <p className="pp-p">Šie duomenys naudojami išskirtinai siekiant susisiekti su jumis dėl jūsų užklausos.</p>

            <h3 className="pp-h3">Automatiškai renkami duomenys</h3>
            <p className="pp-p">Naudodamiesi svetaine, automatiškai renkami techniniai duomenys: IP adresas, naršyklės tipas, operacinė sistema, apsilankytų puslapių seka, laikas svetainėje. Šie duomenys renkami naudojant žemiau aprašytus trečiųjų šalių įrankius.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">3. Google Analytics</h2>
            <p className="pp-p">Ši svetainė naudoja <strong>Google Analytics</strong> — analitikos paslaugą, kurią teikia Google LLC. Ji leidžia mums suprasti, kaip lankytojai naudojasi svetaine: kuriuos puslapius lanko, kiek laiko praleidžia, iš kur ateina.</p>

            <div className="pp-highlight">
              <p className="pp-p"><strong>Ką renka Google Analytics:</strong> anonimizuotus duomenis apie lankytojų elgseną, šaltinį, įrenginį, geografinę vietą (miesto lygiu). Duomenys siunčiami į Google serverius JAV.</p>
            </div>

            <p className="pp-p">Google Analytics naudoja slapukus (_ga, _gid, _gat) lankytojams atpažinti. Slapukai galioja nuo 24 valandų iki 2 metų.</p>
            <p className="pp-p">Galite atsisakyti Google Analytics sekimo įdiegę naršyklės priedą: <a className="pp-link" href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a></p>
            <p className="pp-p">Daugiau informacijos: <a className="pp-link" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google privatumo politika</a></p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">4. Meta Pixel (Facebook Pixel)</h2>
            <p className="pp-p">Ši svetainė naudoja <strong>Meta Pixel</strong> — įrankį, kurį teikia Meta Platforms Ireland Ltd. Jis leidžia mums matuoti reklamos efektyvumą, kurti tikslines auditorijas ir rodyti aktualias reklamas Facebook bei Instagram platformose.</p>

            <div className="pp-highlight">
              <p className="pp-p"><strong>Ką renka Meta Pixel:</strong> duomenis apie lankytojo veiksmus svetainėje (puslapių peržiūros, formos pildymas), IP adresą, naršyklės informaciją. Duomenys siunčiami į Meta serverius ir gali būti naudojami reklamos tikslais.</p>
            </div>

            <p className="pp-p">Meta Pixel naudoja slapukus ir kitas sekimo technologijas. Duomenys gali būti siejami su jūsų Facebook paskyra, jei esate prisijungę.</p>
            <p className="pp-p">Galite valdyti reklamos nuostatas: <a className="pp-link" href="https://www.facebook.com/ads/preferences" target="_blank" rel="noopener noreferrer">facebook.com/ads/preferences</a></p>
            <p className="pp-p">Daugiau informacijos: <a className="pp-link" href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta privatumo politika</a></p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">5. Slapukai (Cookies)</h2>
            <p className="pp-p">Svetainė naudoja šiuos slapukų tipus:</p>
            <ul className="pp-ul">
              <li><strong>Analitiniai slapukai</strong> — Google Analytics (_ga, _gid, _gat): renka anoniminius duomenis apie lankymąsi.</li>
              <li><strong>Reklaminiai slapukai</strong> — Meta Pixel (_fbp, _fbc): seka veiksmus reklamos tikslais.</li>
            </ul>
            <p className="pp-p">Galite bet kada ištrinti slapukus naršyklės nustatymuose arba naudoti inkognito režimą. Atkreipiame dėmesį, kad išjungus slapukus kai kurios svetainės funkcijos gali neveikti tinkamai.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">6. Duomenų saugojimas ir apsauga</h2>
            <p className="pp-p">Užklausų formos duomenys (vardas, telefonas, el. paštas) saugomi saugiai ir nėra perduodami trečiosioms šalims be jūsų sutikimo, išskyrus atvejus, kai to reikalauja teisės aktai.</p>
            <p className="pp-p">Duomenys saugomi tol, kol reikalingi užklausos tikslui įvykdyti, tačiau ne ilgiau kaip 2 metus, nebent taikytini teisės aktai reikalauja ilgesnio saugojimo.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">7. Jūsų teisės (BDAR / GDPR)</h2>
            <p className="pp-p">Pagal ES duomenų apsaugos teisę jūs turite šias teises:</p>
            <ul className="pp-ul">
              <li><strong>Teisė susipažinti</strong> — galite prašyti informacijos, kokius jūsų duomenis tvarkome.</li>
              <li><strong>Teisė ištaisyti</strong> — galite prašyti ištaisyti netikslius duomenis.</li>
              <li><strong>Teisė ištrinti</strong> — galite prašyti ištrinti jūsų duomenis („teisė būti pamirštam").</li>
              <li><strong>Teisė apriboti tvarkymą</strong> — tam tikrais atvejais galite prašyti sustabdyti duomenų tvarkymą.</li>
              <li><strong>Teisė nesutikti</strong> — galite nesutikti su duomenų tvarkymu rinkodaros tikslais.</li>
            </ul>
            <p className="pp-p">Norėdami pasinaudoti šiomis teisėmis, susisiekite su mumis el. paštu nurodytu žemiau.</p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">8. Kontaktai</h2>
            <p className="pp-p">Jei turite klausimų dėl šios privatumo politikos arba norite pasinaudoti savo teisėmis, susisiekite:</p>
            <div className="pp-highlight">
              <p className="pp-p"><strong>KOMA Studio</strong><br />El. paštas: <a className="pp-link" href="mailto:info@komadigital.lt">info@komadigital.lt</a></p>
            </div>
            <p className="pp-p">Taip pat turite teisę pateikti skundą Valstybinei duomenų apsaugos inspekcijai (VDAI): <a className="pp-link" href="https://vdai.lrv.lt" target="_blank" rel="noopener noreferrer">vdai.lrv.lt</a></p>
          </div>

          <div className="pp-section">
            <h2 className="pp-h2">9. Politikos pakeitimai</h2>
            <p className="pp-p">Pasiliekame teisę bet kada atnaujinti šią privatumo politiką. Apie esminius pakeitimus informuosime paskelbdami naują versiją šiame puslapyje su atnaujinimo data.</p>
          </div>

        </div>

        <footer>
          <div><img src="/KOMALOGO.webp" alt="KOMA Studio" style={{ height: '56px', width: 'auto' }} /></div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}>Pradinis</Link>
            <span className="fcopy">© 2026 KOMA Studio</span>
          </div>
        </footer>
      </div>
    </>
  );
}
