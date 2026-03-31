'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const PLANS: Record<string, string[]> = {
  WordPress: ['WordPress Mini', 'WordPress Basic', 'WordPress Pro'],
  Framer: ['Framer Start', 'Framer Business', 'Framer Premium'],
  'AI Svetainė': ['AI Spark', 'AI Growth', 'AI Scale'],
};

const SERVICE_OPTIONS = ['WordPress', 'Framer', 'AI Svetainė', 'Konsultacija', 'Kita'];

function ContactFormInner() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [paslauga, setPaslauga] = useState('');
  const [planas, setPlanas] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const p = searchParams.get('platforma');
    const pl = searchParams.get('planas');
    if (p && SERVICE_OPTIONS.includes(p)) setPaslauga(p);
    if (pl) setPlanas(pl);
  }, [searchParams]);

  const planOptions = PLANS[paslauga] ?? [];

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      vardas: (form.elements.namedItem('vardas') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      zinute: (form.elements.namedItem('zinute') as HTMLTextAreaElement).value,
      paslauga,
      planas: planOptions.length ? planas : '',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('ok');
        form.reset();
        setPaslauga('');
        setPlanas('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="cform" onSubmit={handleSubmit}>
      <div className="fr2">
        <div className="fg">
          <label className="fl">Vardas</label>
          <input className="fi" type="text" name="vardas" placeholder="Vardas" required />
        </div>
        <div className="fg">
          <label className="fl">El. paštas</label>
          <input className="fi" type="email" name="email" placeholder="Jūsų.paštas@gmail.com" required />
        </div>
      </div>
      <div className="fr2">
        <div className="fg">
          <label className="fl">Paslaugos tipas</label>
          <select className="fi cf-select" name="paslauga" value={paslauga} onChange={e => { setPaslauga(e.target.value); setPlanas(''); }}>
            <option value="">Pasirinkite...</option>
            {SERVICE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        {planOptions.length > 0 && (
          <div className="fg">
            <label className="fl">Plano tipas</label>
            <select className="fi cf-select" name="planas" value={planas} onChange={e => setPlanas(e.target.value)}>
              <option value="">Pasirinkite planą...</option>
              {planOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        )}
      </div>
      <div className="fg">
        <label className="fl">Žinutė</label>
        <textarea className="fta" name="zinute" placeholder="Papasakokite apie savo projektą..." required></textarea>
      </div>
      <button type="submit" className="lava-btn btn-send-wrap" disabled={status === 'sending'}>
        <span className="btn-label">{status === 'sending' ? 'Siunčiama...' : 'Siųsti žinutę →'}</span>
      </button>
      {status === 'ok' && <div className="form-ok" style={{ display: 'block' }}>✓ Žinutė išsiųsta! Susisieksime greitai.</div>}
      {status === 'error' && <div className="form-ok" style={{ display: 'block', color: '#fca5a5' }}>✗ Nepavyko išsiųsti. Bandykite dar kartą.</div>}
    </form>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}
