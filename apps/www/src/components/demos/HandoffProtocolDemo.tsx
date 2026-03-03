'use client';

import { HandoffProtocol } from '@/depute/components/HandoffProtocol';
import { generateMockHandoff } from '@/depute/utils/mockData';

const handoff = generateMockHandoff();

export function HandoffProtocolDemo() {
  return (
    <div style={{ padding: '1rem' }}>
      <HandoffProtocol {...handoff} onAccept={() => {}} onIntercept={() => {}} onCancel={() => {}} />
    </div>
  );
}
