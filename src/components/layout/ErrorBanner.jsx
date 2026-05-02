import { AlertTriangle, RefreshCw } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';

export function ErrorBanner() {
  const { error, fetchPatients } = usePatient();
  if (!error) return null;

  return (
    <div className="col-span-3 flex items-center justify-center p-8">
      <div className="bg-red-50 border border-red-200 rounded-card p-6 flex items-center gap-4 max-w-md w-full">
        <AlertTriangle className="text-red-500 shrink-0" size={24} />
        <div className="flex-1">
          <p className="font-bold text-red-700">Failed to load data</p>
          <p className="text-sm text-red-500 mt-0.5">{error}</p>
        </div>
        <button
          onClick={fetchPatients}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-chip bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      </div>
    </div>
  );
}
