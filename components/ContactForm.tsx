'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      vardas: (form.elements.namedItem('vardas') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      zinute: (form.elements.namedItem('zinute') as HTMLTextAreaElement).value,
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
        <div className="fg"><label className="fl">Vardas</label><input className="fi" type="text" name="vardas" placeholder="Vardas" required /></div>
        <div className="fg"><label className="fl">El. paštas</label><input className="fi" type="email" name="email" placeholder="Jūsų.paštas@gmail.com" required /></div>
      </div>
      <div className="fg"><label className="fl">Žinutė</label><textarea className="fta" name="zinute" placeholder="Papasakokite apie savo projektą..." required></textarea></div>
      <button type="submit" className="lava-btn btn-send-wrap" disabled={status === 'sending'}>
        <span className="btn-label">{status === 'sending' ? 'Siunčiama...' : 'Siųsti žinutę →'}</span>
      </button>
      {status === 'ok' && <div className="form-ok" style={{ display: 'block' }}>✓ Žinutė išsiųsta! Susisieksime greitai.</div>}
      {status === 'error' && <div className="form-ok" style={{ display: 'block', color: '#fca5a5' }}>✗ Nepavyko išsiųsti. Bandykite dar kartą.</div>}
    </form>
  );
}
