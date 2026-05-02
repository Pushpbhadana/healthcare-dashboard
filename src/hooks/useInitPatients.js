import { useEffect } from 'react';
import { usePatient } from '../context/PatientContext';

export function useInitPatients() {
  const { fetchPatients } = usePatient();
  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);
}
