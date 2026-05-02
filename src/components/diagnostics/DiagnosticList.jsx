import { usePatient } from '../../context/PatientContext';
import { Badge } from '../ui/Badge';
import { statusVariant } from '../../lib/utils';

export function DiagnosticList() {
  const { selectedPatient, loading } = usePatient();
  const diagnostics = selectedPatient?.diagnostic_list ?? [];

  return (
    <div className="min-w-0 rounded-card bg-white p-4 shadow-card sm:p-6">
      <h3 className="mb-3 font-extrabold leading-snug tracking-tight text-brand-text text-section sm:mb-4 md:max-lg:leading-tight lg:tracking-normal">
        Diagnostic List
      </h3>

      <div className="-mx-4 min-w-0 overflow-x-auto px-4 scrollbar-thin sm:mx-0 sm:px-0">
        <table className="w-full min-w-[520px] border-collapse">
          <thead>
            <tr>
              {['Problem / Diagnosis', 'Description', 'Status'].map((h, i) => (
                <th
                  key={h}
                  className={`pb-3 text-left text-xs font-bold leading-snug text-brand-muted md:max-lg:text-[11px] md:max-lg:uppercase md:max-lg:tracking-wide ${i === 2 ? 'text-right' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-sm text-brand-muted md:max-lg:text-[13px]">
                  Loading…
                </td>
              </tr>
            ) : diagnostics.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-6 text-center text-sm text-brand-muted md:max-lg:text-[13px]">
                  No diagnostics found
                </td>
              </tr>
            ) : (
              diagnostics.map((d, idx) => (
                <tr key={idx}>
                  <td className="py-3.5 pr-4">
                    <span className="text-sm font-bold leading-snug text-brand-text md:max-lg:text-[13px] lg:text-sm lg:leading-normal">
                      {d.name || '—'}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-xs leading-relaxed text-brand-muted md:max-lg:text-[12px] lg:text-sm lg:leading-normal">
                    {d.description || '—'}
                  </td>
                  <td className="py-3.5 text-right">
                    <Badge variant={statusVariant(d.status)}>{d.status || '—'}</Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
