export default function HeroSection() {
  return (
    <section id="hero">
      <div className="float-img fi-1"><div className="float-placeholder"></div></div>
      <div className="float-img fi-2"><div className="float-placeholder"></div></div>
      <div className="float-img fi-3"><div className="float-placeholder"></div></div>
      <div className="float-img fi-4"><div className="float-placeholder"></div></div>
      <div className="float-img fi-5"><div className="float-placeholder"></div></div>
      <div className="float-img fi-6"><div className="float-placeholder"></div></div>

      <p className="hero-eyebrow">Kūrybinė studija — Vilnius, Lietuva</p>

      <h1 className="hero-title">
        Skaitmeninė<br /><em>prabanga</em> jūsų<br />verslui.
      </h1>

      <p className="hero-sub">
        Jūsų vizija. Mūsų meistriškumas.<br />Rezultatas, kuriantis vertę.
      </p>

      <div className="hero-actions">
        <a href="#kontaktai" className="lava-btn btn-primary-wrap">
          <span className="btn-label">Susisiekite →</span>
        </a>
        <a href="#portfolio" className="btn-ghost">Peržiūrėti darbus</a>
      </div>
    </section>
  );
}
