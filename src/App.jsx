import { useInitPatients } from './hooks/useInitPatients';
import { usePatient } from './context/PatientContext';
import { TopNav } from './components/layout/TopNav';
import { ErrorBanner } from './components/layout/ErrorBanner';
import { PatientList } from './components/patients/PatientList';
import { BloodPressureChart } from './components/charts/BloodPressureChart';
import { VitalsRow } from './components/vitals/VitalsRow';
import { DiagnosticList } from './components/diagnostics/DiagnosticList';
import { PatientProfile } from './components/profile/PatientProfile';

/** Short viewports scroll the page; tall md+ layouts still use side-by-side columns. */
function Dashboard() {
  useInitPatients();
  const { error } = usePatient();

  const sideColumn =
    'flex w-full ms-2 flex-col md:w-[clamp(14rem,26vw,22rem)] md:max-w-[min(100%,24rem)] md:flex-none md:self-start';

  return (
    <div className="flex min-h-[100vh] w-full max-w-[100vw] flex-1 flex-col  bg-page font-manrope">
      <header>
        <TopNav />
      </header>

      <div className="flex w-full flex-1 flex-col md:flex-row md:items-start md:gap-2 lg:gap-4 xl:mx-auto xl:max-w-[min(100%,1600px)]">
        <section className={`order-1 px-3 pb-2 pt-2 md:order-3 md:px-2 md:pb-4 md:pt-2 ${sideColumn}`}>
          <PatientProfile />
        </section>

        <main className="  order-2 flex w-full min-w-0 flex-1 flex-col gap-3 px-3 py-3 md:order-2 md:min-w-0 md:flex-[1_1_0%] md:gap-4 md:px-5 md:py-4 lg:gap-5 lg:px-8 lg:py-6">
          {error ? (
            <ErrorBanner />
          ) : (
            <>
              <BloodPressureChart />
              <VitalsRow />
              <DiagnosticList />
            </>
          )}
        </main>

        <section className={` order-3 px-3 pb-6 pt-0 md:order-1 md:px-2 md:pb-4 md:pt-2 ${sideColumn}`}>
          <PatientList />
        </section>
      </div>
    </div>
  );
}

export default function App() {
  return <Dashboard />;
}
