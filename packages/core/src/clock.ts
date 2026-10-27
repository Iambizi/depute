/**
 * Injectable clock. The reducer does not read the wall clock or generate ids.
 * Callers, including the server example, pass `at` on each event.
 */
export interface Clock {
  now(): number;
  id(): string;
}

export function createClock(start: number): Clock & { advance(ms: number): void } {
  let now = start;
  let n = 0;
  return {
    now: () => now,
    advance(ms: number) {
      now += ms;
    },
    id: () => {
      n += 1;
      return `id-${n}`;
    },
  };
}
