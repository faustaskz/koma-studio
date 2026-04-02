import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Mūsų darbai',
  description:
    'Peržiūrėkite KOMA Studio sukurtas svetaines ir projektus. Realūs rezultatai — nuo reprezentacinių svetainių iki el. parduotuvių.',
  alternates: {
    canonical: 'https://koma-studio.lt/darbai',
  },
  openGraph: {
    url: 'https://koma-studio.lt/darbai',
    title: 'Mūsų darbai | KOMA Studio',
    description:
      'Peržiūrėkite KOMA Studio sukurtas svetaines ir projektus. Realūs rezultatai — nuo reprezentacinių svetainių iki el. parduotuvių.',
  },
};

export default function DarbaiPage() {
  redirect('/#darbai');
}
