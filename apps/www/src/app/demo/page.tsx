import type { Metadata } from 'next';
import { PaperTradingDesk } from '@/components/oversight/PaperTradingDesk';

export const metadata: Metadata = {
  title: 'Paper trading oversight',
  description: 'A scripted trading-agent oversight desk built from depute components. No exchange and no API key.',
};

export default function DemoPage() {
  return <PaperTradingDesk />;
}
