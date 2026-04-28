import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Depute | React Components for Agentic UI',
    template: '%s | Depute',
  },
  description:
    'Depute is an open-source React component library for human-in-the-loop oversight in agentic applications. Add approval gates, plan cards, confidence cues, tool traces, artifact previews, and run controls to your AI agent workflows.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://depute.dev',
  ),
  openGraph: {
    siteName: 'Depute',
    type: 'website',
    url: 'https://depute.dev',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@depute_dev',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareSourceCode',
      name: 'Depute',
      description:
        'An open-source React component library for human-in-the-loop oversight in agentic applications.',
      url: 'https://depute.dev',
      codeRepository: 'https://github.com/Iambizi/depute',
      programmingLanguage: ['TypeScript', 'React'],
      runtimePlatform: 'Web',
      license: 'https://opensource.org/licenses/MIT',
      applicationCategory: 'DeveloperApplication',
      creator: {
        '@type': 'Person',
        name: 'Amir Bizimana',
        url: 'https://github.com/Iambizi',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Depute',
      operatingSystem: 'Web',
      applicationCategory: 'DeveloperApplication',
      description:
        'Open-source React components for building trustworthy AI agent interfaces. Includes approval gates, plan cards, tool traces, confidence meters, and run controls.',
      url: 'https://depute.dev',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'Organization',
      name: 'Depute',
      url: 'https://depute.dev',
      sameAs: [
        'https://github.com/Iambizi/depute',
        'https://www.npmjs.com/package/ax-depute',
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
