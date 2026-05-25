import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Svetainių kūrimas | KOMA Studio',
  description: 'Modernių svetainių kūrimas Lietuvoje – greitos, profesionalios, orientuotos į konversiją nuo dizaino iki gyvo produkto.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
