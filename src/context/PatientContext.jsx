import { createContext, useContext, useState, useCallback } from 'react';
import { API_URL, API_CREDS } from '../lib/utils';

const PatientContext = createContext(null);

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bpRange, setBpRange] = useState(6); // number of months to show

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Basic ${API_CREDS}` },
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.data || data.patients || []);
      setPatients(list);
      // Default: select Jessica Taylor
      const jessica = list.find((p) => p.name === 'Jessica Taylor') || list[0];
      setSelectedPatient(jessica || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PatientContext.Provider
      value={{
        patients,
        filteredPatients,
        selectedPatient,
        setSelectedPatient,
        loading,
        error,
        fetchPatients,
        searchQuery,
        setSearchQuery,
        bpRange,
        setBpRange,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const ctx = useContext(PatientContext);
  if (!ctx) throw new Error('usePatient must be used inside PatientProvider');
  return ctx;
}
