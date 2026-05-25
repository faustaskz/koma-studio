import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Ads reklama | KOMA Studio',
  description: 'Google Ads reklama Lietuvoje – tikslingos kampanijos, kurios atneša naujų klientų ir padidina pardavimus.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
