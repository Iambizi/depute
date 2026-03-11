const fs = require('fs');
const path = require('path');

// 1. Read the original 3D logo
const sourcePath = path.join(__dirname, '../public/logo.svg');
const destPath = path.join(__dirname, '../src/app/icon.svg');

let svg = fs.readFileSync(sourcePath, 'utf8');

// 2. Define the target scale
// The original logo is 4096 wide x 2000 high. 
// A square viewBox is required for browser tab favicons so it doesn't get squished.
// Increase this CANVAS_SIZE to make the logo appear smaller. Decrease to make it bigger.
const CANVAS_SIZE = 6000; 

const originalWidth = 4096;
const originalHeight = 2000;

const xOffset = Math.floor((CANVAS_SIZE - originalWidth) / 2);
const yOffset = Math.floor((CANVAS_SIZE - originalHeight) / 2);

// 3. Update the viewBox to be a perfect square
svg = svg.replace(/viewBox="[^"]+"/, `viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}"`);

// 4. Wrap the inside contents with a group tag that centers the artwork
svg = svg.replace(/(<svg[^>]+>)/, `$1<g transform="translate(${xOffset}, ${yOffset})">`);
svg = svg.replace(/<\/svg>/, '</g></svg>');

// 5. Write the optimized icon
fs.writeFileSync(destPath, svg);

console.log(`✅ Generated src/app/icon.svg with a ${CANVAS_SIZE}x${CANVAS_SIZE} canvas!`);
console.log(`Open apps/www/scripts/generate-favicon.js to adjust the CANVAS_SIZE and run \`node scripts/generate-favicon.js\` to update it.`);
