import type { Metadata } from 'next';
import Link from 'next/link';
import { PaperTradingDesk } from '@/components/oversight/PaperTradingDesk';

export const metadata: Metadata = {
  title: 'Paper trading oversight',
  description: 'A scripted trading-agent oversight desk built from depute components. No exchange and no API key.',
};

export default function DemoPage() {
  return (
    <>
      <header className="mx-auto flex max-w-3xl items-center px-6 pt-8">
        <Link
          href="/"
          aria-label="depute home"
          className="block w-64 overflow-hidden sm:w-80 [aspect-ratio:814/380]"
        >
          {/* Crop title-logo.webp to the opaque word: 814×380 inside 1600×781. */}
          <img
            src="/title-logo.webp"
            alt="Depute"
            className="h-auto w-[196.56%] max-w-none -ml-[44.84%] -mt-[22.24%]"
          />
        </Link>
      </header>
      <PaperTradingDesk />
    </>
  );
}
