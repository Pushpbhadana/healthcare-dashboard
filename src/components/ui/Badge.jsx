import { cn } from '../../lib/utils';

const variants = {
  normal:      'bg-green-100 text-green-700',
  observation: 'bg-amber-100 text-amber-700',
  inactive:    'bg-gray-100 text-gray-500',
};

export function Badge({ variant = 'inactive', children, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-0.5 rounded-chip text-xs font-bold',
        variants[variant] ?? variants.inactive,
        className
      )}
    >
      {children}
    </span>
  );
}
