import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const API_URL = 'https://fedskillstest.coalitiontechnologies.workers.dev';
export const API_CREDS = btoa('coalition:skills-test');

export function statusVariant(status = '') {
  const s = status.toLowerCase();
  if (s.includes('normal') || s.includes('cured')) return 'normal';
  if (s.includes('observation')) return 'observation';
  return 'inactive';
}

export function getTrendDirection(level = '') {
  const l = level.toLowerCase();
  if (l.includes('higher') || l.includes('above')) return 'up';
  if (l.includes('lower') || l.includes('below')) return 'down';
  return 'normal';
}
