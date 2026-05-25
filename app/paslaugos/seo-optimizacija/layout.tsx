import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO optimizacija | KOMA Studio',
  description: 'SEO optimizacija Lietuvoje – ilgalaikis organinis augimas ir pirmosios Google pozicijos jūsų verslui.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
