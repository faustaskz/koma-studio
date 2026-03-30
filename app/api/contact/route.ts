import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { vardas, email, zinute } = await req.json();

  if (!vardas || !email || !zinute) {
    return NextResponse.json({ error: 'Trūksta laukų' }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: 'no-reply@koma-studio.lt',
    to: 'info@koma-studio.lt',
    subject: `Naujas užklausimas nuo ${vardas}`,
    text: `Vardas: ${vardas}\nEl. paštas: ${email}\n\nŽinutė:\n${zinute}`,
    replyTo: email,
  });

  if (error) {
    return NextResponse.json({ error: 'Nepavyko išsiųsti' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
