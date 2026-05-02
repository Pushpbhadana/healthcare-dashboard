import { usePatient } from '../../context/PatientContext';
import { TrendIndicator } from '../ui/TrendIndicator';
import respiratoryImage from '../../assets/Res.svg';
import temperatureImage from '../../assets/temperature.svg';
import heartRateImage from '../../assets/HeartBPM.svg';

function RespiratoryIcon() {
  return (
    <div>
        <img src={respiratoryImage} alt="Respiratory Icon" className="h-20 w-20" />
    </div>
  );
}

function TemperatureIcon() {
  return (
    <div>
        <img src={temperatureImage} alt="Temperature Icon" className="h-20 w-20" />
    </div>
  );
}

function HeartRateIcon() {
  return (
      <div>
      <img src={heartRateImage} alt="Heart Rate Icon" className="h-20 w-20" />
    </div>
  );
}

const VITALS_CONFIG = [
  { key: 'respiratory_rate', label: 'Respiratory Rate', unit: 'bpm', Icon: RespiratoryIcon , BgColor: 'bg-blue-100'},
  { key: 'temperature', label: 'Temperature', unit: '°F', Icon: TemperatureIcon , BgColor: 'bg-red-100' },
  { key: 'heart_rate', label: 'Heart Rate', unit: 'bpm', Icon: HeartRateIcon , BgColor: 'bg-red-200' },
];

export function VitalsRow() {
  const { selectedPatient } = usePatient();

  const history = selectedPatient?.diagnosis_history ?? [];
  const latest = history[history.length - 1] ?? {};

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 min-[480px]:grid-cols-3 sm:gap-4">
      {VITALS_CONFIG.map(({ key, label, unit, Icon, BgColor }) => {
        const vital = latest[key];
        return (
          <div key={key} className={`rounded-card bg-white p-4 shadow-card sm:p-5 ${BgColor}`}>
            <div className={`mb-2 md:mb-3 [&_svg]:h-10 [&_svg]:w-10 md:[&_svg]:h-12 md:[&_svg]:w-12`}>
              <Icon />
            </div>
            <p className="mb-1 text-xs font-semibold text-brand-muted md:text-sm md:max-lg:text-[11px]">
              {label}
            </p>
            <p className="mb-1 text-2xl font-extrabold leading-none text-brand-text min-[400px]:text-[26px] md:text-[28px] md:max-lg:text-[1.35rem] lg:text-[28px]">
              {vital?.value ?? '--'}
              <span className="ml-1 text-xs font-semibold text-brand-muted md:text-sm md:max-lg:text-[11px]">
                {unit}
              </span>
            </p>
            <TrendIndicator level={vital?.levels} />
          </div>
        );
      })}
    </div>
  );
}
