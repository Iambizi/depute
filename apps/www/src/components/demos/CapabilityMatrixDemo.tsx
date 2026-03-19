'use client';

import { CapabilityMatrix } from '@/depute/components/CapabilityMatrix';

export function CapabilityMatrixDemo() {
  return (
    <div style={{ padding: '1rem', width: '100%' }}>
      <CapabilityMatrix
        title="Agent Permissions"
        agentId="sysadmin-bot-01"
        capabilities={[
          { name: 'logs.read', description: 'Read system logs', permission: 'full', category: 'Observability' },
          { name: 'services.restart', description: 'Restart running services', permission: 'conditional', condition: 'requires 2FA', category: 'Operations' },
          { name: 'services.stop', description: 'Stop running services', permission: 'none', category: 'Operations' },
          { name: 'config.write', description: 'Modify configuration', permission: 'write', category: 'System' },
          { name: 'db.drop', description: 'Drop database tables', permission: 'none', category: 'Storage' },
        ]}
      />
    </div>
  );
}
