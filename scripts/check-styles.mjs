#!/usr/bin/env node
// Guards the design-token contract: every --ax name is defined, component CSS
// does not hard-code color or spacing, and status pairs clear WCAG AA.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const abs = path.join(dir, name);
    if (fs.statSync(abs).isDirectory()) walk(abs, acc);
    else acc.push(abs);
  }
  return acc;
}

function rel(file) {
  return path.relative(root, file);
}

const failures = [];

function fail(message) {
  failures.push(message);
}

const styleFiles = walk(path.join(root, 'src/styles')).filter((file) => file.endsWith('.css'));
const defined = new Set();
for (const file of styleFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/(--ax-[\w-]+)\s*:/g)) defined.add(match[1]);
}

const sourceFiles = walk(path.join(root, 'src')).filter((file) => /\.(css|tsx|ts)$/.test(file));
const missing = new Map();
for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/var\(\s*(--ax-[\w-]+)/g)) {
    if (!defined.has(match[1])) {
      if (!missing.has(match[1])) missing.set(match[1], rel(file));
    }
  }
}
for (const [name, file] of missing) fail(`${name} is used in ${file} but never defined`);

const componentCss = walk(path.join(root, 'src/components')).filter((file) => file.endsWith('.css'));
for (const file of componentCss) {
  const text = fs.readFileSync(file, 'utf8');
  if (/#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(/.test(text)) {
    fail(`${rel(file)} contains a hard-coded color`);
  }
  if (/var\(\s*--ax-[\w-]+\s*,/.test(text)) {
    fail(`${rel(file)} contains a token fallback`);
  }
  const lengths = [...text.matchAll(/(?<!-)\b\d+(?:\.\d+)?(?:px|rem)\b/g)]
    .map((match) => match[0])
    .filter((value) => value !== '1px' && value !== '0px');
  if (lengths.length) fail(`${rel(file)} contains ${[...new Set(lengths)].join(', ')}`);
  const animations = text.split('\n').filter((line) => /animation:.*\d+m?s/.test(line) && !line.includes('var(--ax-dur'));
  if (animations.length) fail(`${rel(file)} has a literal animation duration`);
}

const componentTsx = walk(path.join(root, 'src/components')).filter((file) => file.endsWith('.tsx'));
for (const file of componentTsx) {
  const text = fs.readFileSync(file, 'utf8');
  if (/\u{1F510}|\u{1F512}|\u2713|\u2715|\u23F8|\u25B6|\u21A9/u.test(text)) {
    fail(`${rel(file)} renders an emoji icon`);
  }
}

function lin(channel) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function lum(hex) {
  const value = hex.slice(1);
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a, b) {
  const hi = Math.max(lum(a), lum(b));
  const lo = Math.min(lum(a), lum(b));
  return (hi + 0.05) / (lo + 0.05);
}

const light = {
  surface: '#ffffff',
  gray1: '#fcfcfc',
  gray2: '#f9f9f9',
  gray3: '#f1f1f1',
  gray4: '#ebebeb',
  gray11: '#646464',
  gray12: '#202020',
  accent3: '#edf2fe',
  accent11: '#3a5bc7',
  green3: '#e6f6eb',
  green11: '#18794e',
  amber3: '#fff7c2',
  amber11: '#9d5c00',
  red3: '#feebec',
  red11: '#ce2c31',
  dangerSolid: '#cd2f34',
};
const dark = {
  surface: '#191919',
  gray1: '#111111',
  gray2: '#191919',
  gray3: '#222222',
  gray4: '#2a2a2a',
  gray11: '#b4b4b4',
  gray12: '#eeeeee',
  accent3: '#182449',
  accent11: '#9eb1ff',
  green3: '#132d21',
  green11: '#3dd68c',
  amber3: '#302008',
  amber11: '#ffca16',
  red3: '#3b1219',
  red11: '#ff9592',
  dangerSolid: '#cd2f34',
};

const pairs = [
  ['muted on surface', 'gray11', 'surface'],
  ['neutral', 'gray11', 'gray3'],
  ['info', 'accent11', 'accent3'],
  ['success', 'green11', 'green3'],
  ['warning', 'amber11', 'amber3'],
  ['danger', 'red11', 'red3'],
  ['emphasis', 'gray1', 'gray12'],
  ['on danger solid', 'surface', 'dangerSolid'],
];

for (const theme of [light, dark]) {
  for (const [name, fg, bg] of pairs) {
    const fgHex = name === 'on danger solid' ? '#ffffff' : theme[fg];
    const value = ratio(fgHex, theme[bg]);
    if (value < 4.5) fail(`${name} contrast ${value.toFixed(2)} is below 4.5`);
  }
}

if (failures.length) {
  for (const message of failures) console.error(`  ${message}`);
  process.exit(1);
}

console.log(`Style contract ok (${defined.size} tokens)`);
