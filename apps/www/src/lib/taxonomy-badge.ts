/** Sidebar type labels. Step-11 text on a solid step-3 tint, so 12px type clears 4.5:1. */
export function taxonomyTone(badge: string): string {
  if (badge === 'Primitive') {
    return 'bg-[#edf2fe] text-[#3a5bc7] border-[#3a5bc7]/25 dark:bg-[#182449] dark:text-[#9eb1ff] dark:border-[#9eb1ff]/30';
  }
  if (badge === 'View') {
    return 'bg-[#e0e7ff] text-[#312e81] border-[#312e81]/20 dark:bg-[#1e1b4b] dark:text-[#c7d2fe] dark:border-[#c7d2fe]/30';
  }
  if (badge === 'Pattern') {
    return 'bg-[#fff7c2] text-[#9d5c00] border-[#9d5c00]/25 dark:bg-[#302008] dark:text-[#ffca16] dark:border-[#ffca16]/30';
  }
  return 'bg-[#f4f4f5] text-[#3f3f46] border-[#3f3f46]/20 dark:bg-[#27272a] dark:text-[#e4e4e7] dark:border-[#e4e4e7]/30';
}
