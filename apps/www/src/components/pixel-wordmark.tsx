const LETTERS: Record<string, string[]> = {
  d: ['0110', '1001', '1001', '1001', '1001', '1001', '0110'],
  e: ['1111', '1000', '1000', '1110', '1000', '1000', '1111'],
  p: ['1110', '1001', '1001', '1110', '1000', '1000', '1000'],
  u: ['1001', '1001', '1001', '1001', '1001', '1001', '0110'],
  t: ['1110', '0100', '0100', '0100', '0100', '0100', '0100'],
};

export function PixelWordmark({ className = '' }: { className?: string }) {
  const word = 'depute';
  let x = 0;
  const rects: { x: number; y: number }[] = [];
  for (const char of word) {
    const rows = LETTERS[char];
    if (!rows) continue;
    rows.forEach((row, y) => {
      [...row].forEach((bit, col) => {
        if (bit === '1') rects.push({ x: x + col, y });
      });
    });
    x += rows[0].length + 1;
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${x - 1} 7`}
      role="img"
      aria-label="depute"
      shapeRendering="crispEdges"
    >
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width="1" height="1" fill="currentColor" />
      ))}
    </svg>
  );
}
