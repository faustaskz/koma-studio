import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Susisiekite',
  description:
    'Susisiekite su KOMA Studio. Atsakysime per 24 val. ir aptarsime, kaip galėtume padėti sukurti jūsų svetainę.',
  alternates: {
    canonical: 'https://koma-studio.lt/susisiekite',
  },
  openGraph: {
    url: 'https://koma-studio.lt/susisiekite',
    title: 'Susisiekite | KOMA Studio',
    description:
      'Susisiekite su KOMA Studio. Atsakysime per 24 val. ir aptarsime, kaip galėtume padėti sukurti jūsų svetainę.',
  },
};

export default function SusisiekitePage() {
  redirect('/#kontaktai');
}
