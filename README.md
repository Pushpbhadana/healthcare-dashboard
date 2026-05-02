# 🏥 Healthcare Dashboard

A modern, fully componentised **React + Vite** healthcare dashboard.  
Fetches live patient data from the Coalition Technologies API and displays blood pressure history, vitals, diagnostic lists, and patient profiles.

---

## ✨ Tech Stack

| Tool | Purpose |
|---|---|
| **React 18** | UI library with hooks |
| **Vite 6** | Lightning-fast dev server & bundler |
| **Tailwind CSS 3** | Utility-first styling |
| **Recharts** | Blood pressure line chart |
| **Lucide React** | Icon set |
| **Context API** | Global state management (no Redux needed) |

---

## 📁 Project Structure

```
src/
├── context/
│   └── PatientContext.jsx        # Global state: patients, search, bpRange
├── hooks/
│   └── useInitPatients.js        # Triggers API fetch on mount
├── lib/
│   └── utils.js                  # cn(), API constants, helpers
├── components/
│   ├── layout/
│   │   ├── TopNav.jsx            # Sticky top navigation bar
│   │   └── ErrorBanner.jsx       # Full-width API error with retry
│   ├── patients/
│   │   └── PatientList.jsx       # Left sidebar: searchable patient list
│   ├── charts/
│   │   └── BloodPressureChart.jsx # BP line chart with range selector
│   ├── vitals/
│   │   └── VitalsRow.jsx         # Resp. rate, temperature, heart rate
│   ├── diagnostics/
│   │   └── DiagnosticList.jsx    # Diagnostic table with status badges
│   ├── profile/
│   │   └── PatientProfile.jsx    # Right sidebar: info + lab results
│   └── ui/
│       ├── Badge.jsx             # Status badge component
│       └── TrendIndicator.jsx    # Arrow trend indicator
├── App.jsx                       # Root CSS grid layout
├── main.jsx                      # Entry: wraps in PatientProvider
└── index.css                     # Tailwind + Google Font
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

```bash
node -v   # should be 18+
npm -v    # should be 9+
```

---

### 1. Install dependencies

```bash
npm install
```

---

### 2. Start dev server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.  
The app hot-reloads on every file save.

---

### 3. Production build

```bash
npm run build
```

Output → `dist/`. Preview locally:

```bash
npm run preview
```

---

## 🔑 API

Data is fetched from:

```
GET https://fedskillstest.coalitiontechnologies.workers.dev
Authorization: Basic <base64(coalition:skills-test)>
```

No `.env` needed — credentials are included for this demo project.

---

## 🧩 State Management

All state lives in `src/context/PatientContext.jsx` and is consumed via `usePatient()`:

| State | Description |
|---|---|
| `patients` | Full list from API |
| `filteredPatients` | Filtered by search query |
| `selectedPatient` | Active patient (defaults to Jessica Taylor) |
| `loading` | Fetch in progress flag |
| `error` | API error string or null |
| `searchQuery` | Left sidebar search value |
| `bpRange` | BP chart months to display (3 / 6 / 12) |

No prop-drilling — every component reads context directly.

---

## 🎨 Customisation

**Colours** — edit `tailwind.config.js`:
```js
teal: { DEFAULT: '#01F0D0' },
systolic: '#E66FD2',
diastolic: '#8C6FE6',
```

**Default patient** — edit `PatientContext.jsx`:
```js
const jessica = list.find((p) => p.name === 'Jessica Taylor') || list[0];
```

**BP chart range** — edit `rangeOptions` in `BloodPressureChart.jsx`.

---

## 📝 Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
