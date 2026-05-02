import { Settings, MoreHorizontal, Home, Users, Calendar, Mail } from 'lucide-react';
import TestLogo from '../../assets/TestLogo.svg';
import TestLogo1 from '../../assets/TestLogo.png';
import { cn } from '../../lib/utils';

const NAV_ITEMS = [
  { label: 'Overview', icon: Home },
  { label: 'Patients', icon: Users, active: true },
  { label: 'Schedule', icon: Calendar },
  { label: 'Messages', icon: Mail },
];

function LogoMark({ className }) {
  return (
    <span
      className={cn(
        'flex items-center gap-2 text-base font-extrabold text-brand-text no-underline sm:gap-2.5 sm:text-lg md:text-xl lg:text-xl',
        className
      )}
    >
      <img src={TestLogo} alt="HealthCare logo" className="h-8 w-auto hidden md:flex" />
      <img src={TestLogo1} alt="HealthCare logo" className="h-7 w-auto md:hidden flex" />
    </span>
  );
}

export function TopNav() {
  return (
    <header className="m-5 bg-white flex h-14 max-w-full min-w-0 items-center gap-2 px-3 sm:h-[72px] sm:gap-3 sm:px-5 md:gap-4 md:px-8 rounded-full overflow-hidden">
      <a
        href="#"
        className="shrink-0 no-underline"
        onClick={(e) => e.preventDefault()}
        aria-label="HealthCare home"
      >
        <LogoMark />
      </a>

      <nav
        className="flex min-w-0 flex-1 justify-center overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
        aria-label="Primary"
      >
        <ul className="m-0 flex w-max min-w-0 list-none items-center justify-center gap-1 p-0">
          {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
            <li key={label} className="shrink-0">
              <a
                href="#"
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap rounded-chip px-2 py-1.5 text-[11px] font-semibold transition-all sm:gap-2 sm:px-3.5 sm:py-2 sm:text-xs md:text-sm lg:px-3 lg:text-[13px]',
                  active
                    ? 'bg-teal text-brand-text'
                    : 'text-brand-muted hover:bg-page hover:text-brand-text'
                )}
                onClick={(e) => e.preventDefault()}
              >
                <Icon size={16} className="shrink-0" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <img
            src="https://i.pravatar.cc/40?img=11"
            alt="Dr. Jose Simmons"
            className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
            onError={(e) => {
              e.target.src = 'https://i.pravatar.cc/40';
            }}
          />
          <div className="hidden min-w-0 leading-tight sm:block">
            <p className="truncate text-xs font-bold text-brand-text sm:text-sm md:text-[13px]">
              Dr. Jose Simmons
            </p>
            <p className="truncate text-[11px] text-brand-muted sm:text-xs md:text-[10px]">
              General Practitioner
            </p>
          </div>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-full p-1.5 text-brand-muted transition-colors hover:bg-page border-l border"
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
        <button
          type="button"
          className="shrink-0 rounded-full p-1.5 text-brand-muted transition-colors hover:bg-page"
          aria-label="More"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>
    </header>
  );
}
