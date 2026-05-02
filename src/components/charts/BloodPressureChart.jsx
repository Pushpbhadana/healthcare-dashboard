import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { usePatient } from '../../context/PatientContext';
import { TrendIndicator } from '../ui/TrendIndicator';

const axisTick = { fontSize: 11, fontWeight: 600, fill: '#707070' };

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-white p-2.5 text-xs shadow-card sm:p-3 sm:text-sm">
      <p className="mb-1 font-bold text-brand-text">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export function BloodPressureChart() {
  const { selectedPatient, bpRange, setBpRange } = usePatient();

  const history = selectedPatient?.diagnosis_history ?? [];
  const recent = history.slice(-bpRange);

  const chartData = recent.map((h) => ({
    month: `${h.month ? h.month.substring(0, 3) : ''}, ${h.year || ''}`,
    Systolic: h.blood_pressure?.systolic?.value ?? null,
    Diastolic: h.blood_pressure?.diastolic?.value ?? null,
  }));

  const latest = recent[recent.length - 1] ?? {};
  const sys = latest.blood_pressure?.systolic;
  const dia = latest.blood_pressure?.diastolic;

  const rangeOptions = [
    { label: 'Last 3 months', value: 3 },
    { label: 'Last 6 months', value: 6 },
    { label: 'Last 12 months', value: 12 },
  ];

  return (
    <div className="min-w-0 rounded-card bg-white p-4 shadow-card md:overflow-visible md:p-6 mt-10 md:mt-0">
      <div className="mb-4 flex min-w-0 flex-col gap-3 md:mb-5 md:flex-row md:items-center md:justify-between">
        <h3 className="shrink-0 font-extrabold leading-snug tracking-tight text-brand-text text-section md:max-lg:text-[1.05rem]">
          Diagnosis History
        </h3>
        <div className="relative w-full min-w-0 md:w-auto">
          <select
            value={bpRange}
            onChange={(e) => setBpRange(Number(e.target.value))}
            className="flex w-full min-w-0 cursor-pointer appearance-none items-center gap-2 rounded-chip border border-brand-border bg-white px-3 py-1.5 pr-8 text-xs font-semibold text-brand-text focus:outline-none md:w-auto md:px-3.5 md:text-sm md:max-lg:text-[11px] mx-2"
          >
            {rangeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted"
          />
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-start gap-4 min-[480px]:grid-cols-[1fr_160px] md:grid-cols-[1fr_200px] md:gap-6">
        {/* Explicit heights so plot is always fully visible (no vertical clip) */}
        <div className="h-52 min-h-[13rem] w-full overflow-x-auto overflow-y-visible min-[480px]:h-60 md:h-64 md:min-h-[16rem]">
          <ResponsiveContainer width="100%" height="100%" minWidth={260}>
            <LineChart data={chartData} margin={{ top: 5, right: 4, left: -12, bottom: 4 }}>
              <CartesianGrid strokeDasharray="" stroke="#F0F0F0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={axisTick}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[50, 180]}
                tick={axisTick}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 20 }} />
              <Line
                type="monotone"
                dataKey="Systolic"
                stroke="#E66FD2"
                strokeWidth={2.5}
                dot={{ fill: '#E66FD2', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="Diastolic"
                stroke="#8C6FE6"
                strokeWidth={2.5}
                dot={{ fill: '#8C6FE6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-4 pt-1 min-[480px]:pt-2 md:gap-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-text md:text-sm">
              <span className="inline-block h-3 w-3 shrink-0 rounded-full bg-systolic" />
              Systolic
            </div>
            <p className="mt-1 text-xl font-extrabold text-brand-text min-[480px]:text-[22px]">
              {sys?.value ?? '--'}
            </p>
            <TrendIndicator level={sys?.levels} colorUp="#E66FD2" colorDown="#E66FD2" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-text md:text-sm">
              <span className="inline-block h-3 w-3 shrink-0 rounded-full bg-diastolic" />
              Diastolic
            </div>
            <p className="mt-1 text-xl font-extrabold text-brand-text min-[480px]:text-[22px]">
              {dia?.value ?? '--'}
            </p>
            <TrendIndicator level={dia?.levels} colorUp="#8C6FE6" colorDown="#8C6FE6" />
          </div>
        </div>
      </div>
    </div>
  );
}
