import { ArrowUp, ArrowDown } from 'lucide-react';
import { getTrendDirection } from '../../lib/utils';

export function TrendIndicator({ level = 'Normal', colorUp = '#E66FD2', colorDown = '#8C6FE6' }) {
  const dir = getTrendDirection(level);
  return (
    <span className="inline-flex items-center gap-1 text-xs text-brand-muted">
      {dir === 'up' && <ArrowUp size={12} style={{ color: colorUp }} />}
      {dir === 'down' && <ArrowDown size={12} style={{ color: colorDown }} />}
      {dir === 'normal' && (
        <svg viewBox="0 0 14 14" fill="#1A7F4B" width={12} height={12}>
          <circle cx="7" cy="7" r="7" />
        </svg>
      )}
      <span>{level || 'Normal'}</span>
    </span>
  );
}
