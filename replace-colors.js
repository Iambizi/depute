const fs = require('fs');
const path = require('path');

const colorMap = {
  '#f9fafb': 'var(--ax-color-gray-50)',
  '#f3f4f6': 'var(--ax-color-gray-100)',
  '#e5e7eb': 'var(--ax-color-gray-200)',
  '#d1d5db': 'var(--ax-color-gray-300)',
  '#9ca3af': 'var(--ax-color-gray-400)',
  '#6b7280': 'var(--ax-color-gray-500)',
  '#4b5563': 'var(--ax-color-gray-600)',
  '#374151': 'var(--ax-color-gray-700)',
  '#1f2937': 'var(--ax-color-gray-800)',
  '#111827': 'var(--ax-color-gray-900)',
  '#1e1e1e': 'var(--ax-color-gray-900)',
  
  '#ffffff': 'var(--ax-surface-primary)',
  '#fff': 'var(--ax-surface-primary)',
  '#fff1f1': 'var(--ax-surface-primary)',
  '#f1f5f9': 'var(--ax-surface-primary)',
  
  '#fef2f2': 'var(--ax-color-red-50)',
  '#fee2e2': 'var(--ax-color-red-100)',
  '#fecaca': 'var(--ax-color-red-200, #fecaca)',
  '#fca5a5': 'var(--ax-color-red-300, #fca5a5)',
  '#ef4444': 'var(--ax-color-red-500)',
  '#dc2626': 'var(--ax-color-red-600)',
  '#b91c1c': 'var(--ax-color-red-700)',
  '#991b1b': 'var(--ax-color-red-800, #991b1b)',
  
  '#eff6ff': 'var(--ax-color-blue-50)',
  '#dbeafe': 'var(--ax-color-blue-100)',
  '#bfdbfe': 'var(--ax-color-blue-200, #bfdbfe)',
  '#3b82f6': 'var(--ax-color-blue-500)',
  '#2563eb': 'var(--ax-color-blue-600)',
  '#1d4ed8': 'var(--ax-color-blue-700)',
  '#1e40af': 'var(--ax-color-blue-800, #1e40af)',
  
  '#fffbeb': 'var(--ax-color-amber-50)',
  '#fefcce8': 'var(--ax-color-amber-50)',
  '#fefce8': 'var(--ax-color-amber-50)',
  '#fef3c7': 'var(--ax-color-amber-100)',
  '#fde68a': 'var(--ax-color-amber-200, #fde68a)',
  '#f59e0b': 'var(--ax-color-amber-500)',
  '#d97706': 'var(--ax-color-amber-600)',
  '#b45309': 'var(--ax-color-amber-700)',
  '#92400e': 'var(--ax-color-amber-800, #92400e)',
  
  '#f0fdf4': 'var(--ax-color-green-50)',
  '#d1fae5': 'var(--ax-color-green-100)',
  '#dcfce7': 'var(--ax-color-green-100)',
  '#10b981': 'var(--ax-status-completed-border)',
  '#059669': 'var(--ax-status-completed-border)',
  '#047857': 'var(--ax-status-completed-border)',
  '#065f46': 'var(--ax-status-completed-border)',
  
  '#ede9fe': 'var(--ax-color-gray-100)',
  '#6366f1': 'var(--ax-color-gray-500)',
  '#4c1d95': 'var(--ax-color-gray-600)',
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Replace independent hex codes
      for (const [hex, cssVar] of Object.entries(colorMap)) {
        const regex = new RegExp(`(?<!var\\([^,]+,\\s*)${hex}\\b`, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, cssVar);
          modified = true;
        }
      }

      // Replace box-shadow rgba with semantic shadow vars if they match
      if (content.includes('box-shadow: 0 4px 16px rgba(') || content.includes('box-shadow: 0 4px 12px rgba(')) {
        content = content.replace(/box-shadow:\s*0\s+4px\s+1(?:2|6)px\s+rgba\([^)]+\);/g, 'box-shadow: var(--ax-shadow-md);');
        modified = true;
      }
      if (content.includes('box-shadow: 0 1px 2px')) {
         content = content.replace(/box-shadow:\s*0\s+1px\s+2px(?:\s+0)?\s+rgba\([^)]+\);/g, 'box-shadow: var(--ax-shadow-sm);');
         modified = true;
      }
      if (content.includes('box-shadow: 0 2px 4px rgba')) {
         content = content.replace(/box-shadow:\s*0\s+2px\s+4px\s+rgba\([^)]+\);/g, 'box-shadow: var(--ax-shadow-sm);');
         modified = true;
      }
      if (content.includes('rgba(239, 68, 68, 0.2)')) {
         // This is a custom glowing shadow on failed
         content = content.replace(/box-shadow:\s*0\s+0\s+6px\s+rgba\(239,\s*68,\s*68,\s*0\.2\);/g, 'box-shadow: 0 0 6px var(--ax-color-red-200, rgba(239,0,0,0.2));');
         modified = true;
      }
      if (content.includes('rgba(59, 130, 246, 0.15)')) {
         content = content.replace(/rgba\(59,\s*130,\s*246,\s*0\.15\)/g, 'var(--ax-color-blue-200, rgba(59, 130, 246, 0.15))');
         modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src', 'components'));
