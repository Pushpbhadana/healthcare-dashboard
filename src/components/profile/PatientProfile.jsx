import { Calendar, User, Phone, AlertCircle, Heart, Download } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';

const profileAside = 'flex w-full min-w-0 flex-col';

function ProfileDetail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2 py-2 md:gap-3 md:py-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-page md:max-lg:h-8 md:max-lg:w-8">
        <Icon size={16} className="text-brand-muted md:max-lg:h-[14px] md:max-lg:w-[14px]" />
      </div>
      <div>
        <p className="mb-0.5 text-[11px] font-semibold text-brand-muted md:text-xs md:max-lg:text-[10px]">
          {label}
        </p>
        <p className="text-sm font-bold leading-snug text-brand-text md:max-lg:text-[13px] lg:text-[15px]">
          {value || '—'}
        </p>
      </div>
    </div>
  );
}

export function PatientProfile() {
  const { selectedPatient, loading } = usePatient();

  if (loading) {
    return (
      <aside className={profileAside}>
        <div className="flex flex-col p-3 sm:p-4 md:p-5">
          <div className="flex flex-col rounded-2xl bg-white p-4 shadow-card sm:p-5">
            <div className="flex flex-col items-center gap-3 animate-pulse">
              <div className="h-24 w-24 rounded-full bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </aside>
    );
  }

  const p = selectedPatient;
  if (!p) return null;

  const labResults = p.lab_results ?? [];

  return (
    <aside className={profileAside}>
      <div className="flex flex-col gap-3 p-3 sm:gap-4 md:gap-4 md:p-5 h-full overflow-hidden">
        {/* Profile Card - No overflow, stays at top */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 shrink-0">
          <div className="flex flex-col items-center pb-4 text-center md:pb-5">
            <img
              src={p.profile_picture || 'https://i.pravatar.cc/100?img=47'}
              alt={p.name}
              className="mb-2 h-20 w-20 rounded-full object-cover sm:mb-3 sm:h-24 sm:w-24 md:max-lg:h-[4.25rem] md:max-lg:w-[4.25rem]"
              onError={(e) => {
                e.target.src = 'https://i.pravatar.cc/100?img=47';
              }}
            />
            <h3 className="font-extrabold leading-snug tracking-tight text-brand-text text-display md:max-lg:text-[1.05rem] lg:text-xl">
              {p.name}
            </h3>
          </div>

          <div>
            <ProfileDetail icon={Calendar} label="Date of Birth" value={p.date_of_birth} />
            <ProfileDetail icon={User} label="Gender" value={p.gender} />
            <ProfileDetail icon={Phone} label="Contact Info" value={p.phone_number} />
            <ProfileDetail icon={AlertCircle} label="Emergency Contact" value={p.emergency_contact} />
            <ProfileDetail icon={Heart} label="Insurance Provider" value={p.insurance_type} />
          </div>
        </div>

        {/* Lab Results Section - Only this has overflow-y */}
        <div className="rounded-2xl bg-white p-4 sm:p-5 flex-1 min-h-0 flex flex-col overflow-hidden">
          <h4 className="mb-2 font-extrabold leading-snug text-brand-text text-section md:mb-3 md:max-lg:text-[1rem] shrink-0">
            Lab Results
          </h4>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {labResults.length === 0 ? (
              <p className="text-xs text-brand-muted md:text-sm md:max-lg:text-[13px]">No lab results</p>
            ) : (
              <ul className="space-y-1.5 md:space-y-2">
                {labResults.map((lab, i) => (
                  <li key={i} className="flex items-center justify-between py-1.5 md:py-2">
                    <span className="text-xs font-medium leading-snug text-brand-text md:text-sm md:max-lg:text-[12px]">
                      {lab}
                    </span>
                    <button type="button" className="p-1 text-brand-muted transition-colors hover:text-brand-text shrink-0">
                      <Download size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}