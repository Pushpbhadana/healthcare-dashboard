import { useState } from 'react';
import { Search, MoreHorizontal, X } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { cn } from '../../lib/utils';

export function PatientList() {
  const { filteredPatients, selectedPatient, setSelectedPatient, searchQuery, setSearchQuery, loading } =
    usePatient();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <aside className="flex min-h-0 w-full min-w-0 flex-col overflow-hidden md:h-[calc(100vh)]">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-card">
        <div className="flex items-center justify-between px-4 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-6">
          {!isSearchOpen ? (
            <>
              <h2 className="font-extrabold leading-tight text-brand-text text-section md:text-lg">Patients</h2>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="transition-transform hover:scale-105 focus:outline-none"
              >
                <Search size={20} className="shrink-0 text-brand-muted" />
              </button>
            </>
          ) : (
            <div className="flex w-full animate-slide-in-search items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search patients…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-none bg-transparent text-sm text-brand-text outline-none placeholder:text-brand-muted md:text-base"
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="transition-transform hover:scale-105 focus:outline-none"
              >
                <X size={18} className="shrink-0 text-brand-muted" />
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          {loading ? (
            <div className="flex flex-col gap-3 p-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex animate-pulse items-center gap-3">
                  <div className="h-11 w-11 shrink-0 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-gray-200" />
                    <div className="h-2.5 w-1/2 rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            filteredPatients.map((patient) => {
              const isSelected = selectedPatient?.name === patient.name;
              return (
                <div
                  key={patient.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPatient(patient)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedPatient(patient);
                    }
                  }}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 px-5 py-3 transition-colors',
                    isSelected ? 'bg-teal-light' : 'hover:bg-page'
                  )}
                >
                  <img
                    src={patient.profile_picture || 'https://i.pravatar.cc/44'}
                    alt={patient.name}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://i.pravatar.cc/44';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-brand-text md:text-[15px]">{patient.name}</p>
                    <p className="mt-0.5 text-[11px] text-brand-muted md:text-xs">
                      {patient.gender || ''} · {patient.age ? `${patient.age} yrs` : ''}
                    </p>
                  </div>
                  <MoreHorizontal size={15} className="shrink-0 text-brand-muted" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </aside>
  );
}
