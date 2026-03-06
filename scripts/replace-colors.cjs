const fs = require('fs');
const path = require('path');

const colorMap = {
  '#f9fafb': 'var(--ax-color-gray-50, #f9fafb)',
  '#f3f4f6': 'var(--ax-color-gray-100, #f3f4f6)',
  '#e5e7eb': 'var(--ax-color-gray-200, #e5e7eb)',
  '#d1d5db': 'var(--ax-color-gray-300, #d1d5db)',
  '#9ca3af': 'var(--ax-color-gray-400, #9ca3af)',
  '#6b7280': 'var(--ax-color-gray-500, #6b7280)',
  '#4b5563': 'var(--ax-color-gray-600, #4b5563)',
  '#374151': 'var(--ax-color-gray-700, #374151)',
  '#1f2937': 'var(--ax-color-gray-800, #1f2937)',
  '#111827': 'var(--ax-color-gray-900, #111827)',
  '#1e1e1e': 'var(--ax-color-gray-900, #1e1e1e)',
  
  '#ffffff': 'var(--ax-surface-primary, #ffffff)',
  '#fff': 'var(--ax-surface-primary, #fff)',
  '#fff1f1': 'var(--ax-surface-primary, #fff1f1)',
  '#f1f5f9': 'var(--ax-surface-primary, #f1f5f9)',
  
  '#fef2f2': 'var(--ax-color-red-50, #fef2f2)',
  '#fee2e2': 'var(--ax-color-red-100, #fee2e2)',
  '#fecaca': 'var(--ax-color-red-200, #fecaca)',
  '#fca5a5': 'var(--ax-color-red-300, #fca5a5)',
  '#ef4444': 'var(--ax-color-red-500, #ef4444)',
  '#dc2626': 'var(--ax-color-red-600, #dc2626)',
  '#b91c1c': 'var(--ax-color-red-700, #b91c1c)',
  '#991b1b': 'var(--ax-color-red-800, #991b1b)',
  
  '#eff6ff': 'var(--ax-color-blue-50, #eff6ff)',
  '#dbeafe': 'var(--ax-color-blue-100, #dbeafe)',
  '#bfdbfe': 'var(--ax-color-blue-200, #bfdbfe)',
  '#3b82f6': 'var(--ax-color-blue-500, #3b82f6)',
  '#2563eb': 'var(--ax-color-blue-600, #2563eb)',
  '#1d4ed8': 'var(--ax-color-blue-700, #1d4ed8)',
  '#1e40af': 'var(--ax-color-blue-800, #1e40af)',
  
  '#fffbeb': 'var(--ax-color-amber-50, #fffbeb)',
  '#fefce8': 'var(--ax-color-amber-50, #fefce8)',
  '#fef3c7': 'var(--ax-color-amber-100, #fef3c7)',
  '#fde68a': 'var(--ax-color-amber-200, #fde68a)',
  '#f59e0b': 'var(--ax-color-amber-500, #f59e0b)',
  '#d97706': 'var(--ax-color-amber-600, #d97706)',
  '#b45309': 'var(--ax-color-amber-700, #b45309)',
  '#92400e': 'var(--ax-color-amber-800, #92400e)',
  
  '#f0fdf4': 'var(--ax-color-green-50, #f0fdf4)',
  '#d1fae5': 'var(--ax-color-green-100, #d1fae5)',
  '#dcfce7': 'var(--ax-color-green-100, #dcfce7)',
  '#10b981': 'var(--ax-color-green-500, #10b981)',
  '#059669': 'var(--ax-color-green-600, #059669)',
  '#047857': 'var(--ax-color-green-700, #047857)',
  '#065f46': 'var(--ax-color-green-800, #065f46)',
  
  '#ede9fe': 'var(--ax-color-indigo-50, #ede9fe)',
  '#6366f1': 'var(--ax-color-indigo-500, #6366f1)',
  '#4c1d95': 'var(--ax-color-indigo-900, #4c1d95)',
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Replace independent hex codes
      for (const [hex, cssVar] of Object.entries(colorMap)) {
        // Find hex codes that are not already inside a var() fallback
        const regex = new RegExp(`(?<!var\\([^,]+,\\s*)${hex}\\b`, 'gi');
        if (regex.test(content)) {
          content = content.replace(regex, cssVar);
        }
      }

      // Replace box-shadow rgba with semantic shadow vars if they match
      content = content.replace(/box-shadow:\s*0\s+4px\s+1(?:2|6)px\s+rgba\([^)]+\);/g, 'box-shadow: var(--ax-shadow-md);');
      content = content.replace(/box-shadow:\s*0\s+1px\s+2px(?:\s+0)?\s+rgba\([^)]+\);/g, 'box-shadow: var(--ax-shadow-sm);');
      content = content.replace(/box-shadow:\s*0\s+2px\s+4px\s+rgba\([^)]+\);/g, 'box-shadow: var(--ax-shadow-sm);');
      content = content.replace(/box-shadow:\s*0\s+0\s+6px\s+rgba\(239,\s*68,\s*68,\s*0\.2\);/g, 'box-shadow: 0 0 6px var(--ax-color-red-200, rgba(239,0,0,0.2));');
      content = content.replace(/rgba\(59,\s*130,\s*246,\s*0\.15\)/g, 'var(--ax-color-blue-200, rgba(59, 130, 246, 0.15))');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, '..', 'src', 'components'));
