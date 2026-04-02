import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Paslaugos',
  description:
    'WordPress, Framer ir AI svetainių kūrimas. Profesionalus web dizainas, SEO optimizacija ir greitas hostingas jūsų verslui.',
  alternates: {
    canonical: 'https://koma-studio.lt/paslaugos',
  },
  openGraph: {
    url: 'https://koma-studio.lt/paslaugos',
    title: 'Paslaugos | KOMA Studio',
    description:
      'WordPress, Framer ir AI svetainių kūrimas. Profesionalus web dizainas, SEO optimizacija ir greitas hostingas jūsų verslui.',
  },
};

export default function PaslaugosPage() {
  redirect('/#paslaugos');
}
