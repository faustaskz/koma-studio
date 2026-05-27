import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConsultationPopup from "@/components/ConsultationPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "700"],
});

const BASE_URL = "https://www.koma-studio.lt";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "KOMA Studio | Reklama, SEO ir Modernių Svetainių Kūrimas",
    template: "%s | KOMA Studio",
  },
  description:
    "Google Ads, Meta Ads ir SEO optimizacija jūsų verslo augimui. Modernios svetainės kurios atrodo profesionaliai ir generuoja klientus.",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "KOMA Studio",
    title: "KOMA Studio | Reklama, SEO ir Modernių Svetainių Kūrimas",
    description:
      "Google Ads, Meta Ads ir SEO optimizacija jūsų verslo augimui. Modernios svetainės kurios atrodo profesionaliai ir generuoja klientus.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "KOMA Studio",
      },
    ],
    locale: "lt_LT",
  },
  twitter: {
    card: "summary_large_image",
    title: "KOMA Studio | Reklama, SEO ir Modernių Svetainių Kūrimas",
    description:
      "Google Ads, Meta Ads ir SEO optimizacija jūsų verslo augimui. Modernios svetainės kurios atrodo profesionaliai ir generuoja klientus.",
    images: ["/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="lt"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <ConsultationPopup />
      </body>
    </html>
  );
}
