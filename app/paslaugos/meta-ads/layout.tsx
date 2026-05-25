import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meta Ads reklama | KOMA Studio',
  description: 'Meta Ads reklama Facebook ir Instagram – pasiekite savo auditorijas ir generuokite realius užsakymus.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
