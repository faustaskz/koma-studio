import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { vardas, telefonas, email, tema, komentaras } = await req.json();

  if (!vardas || !telefonas || !email || !tema) {
    return NextResponse.json({ error: 'Trūksta laukų' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'no-reply@koma-studio.lt',
    to: 'info@komastudio.lt',
    subject: `Nemokama konsultacija — ${vardas} (${tema})`,
    text: `Vardas: ${vardas}\nTelefonas: ${telefonas}\nEl. paštas: ${email}\nKonsultacijos tema: ${tema}${komentaras ? `\n\nKomentaras:\n${komentaras}` : ''}`,
    replyTo: email,
  });

  if (error) {
    return NextResponse.json({ error: 'Nepavyko išsiųsti' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
