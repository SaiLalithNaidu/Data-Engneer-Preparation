import React, { useState } from 'react';
import { History, Calendar, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

export default function ScdVisualizer() {
  const [scdType, setScdType] = useState('TYPE_2');
  const [events, setEvents] = useState([
    { step: 1, date: '2024-01-01', action: 'Customer Onboarding', city: 'New York', phone: '+1-555-0101' },
    { step: 2, date: '2024-06-15', action: 'Address Change to San Francisco', city: 'San Francisco', phone: '+1-555-0101' },
    { step: 3, date: '2025-02-01', action: 'Phone Update to +1-555-9999', city: 'San Francisco', phone: '+1-555-9999' }
  ]);

  const [currentStep, setCurrentStep] = useState(2);

  // Compute table state based on SCD Type and currentStep
  const computeScdTable = () => {
    if (scdType === 'TYPE_1') {
      // Overwrite: only 1 row ever exists
      const latest = events[currentStep - 1];
      return [{
        customer_id: 1001,
        name: 'John Doe',
        city: latest.city,
        phone: latest.phone,
        last_updated: latest.date
      }];
    }

    if (scdType === 'TYPE_2') {
      // History rows with surrogate keys & dates
      const rows = [];
      for (let i = 0; i < currentStep; i++) {
        const ev = events[i];
        const nextEv = events[i + 1];
        const isActive = i === currentStep - 1;
        
        rows.push({
          surrogate_key: 500 + i + 1,
          customer_id: 1001,
          name: 'John Doe',
          city: ev.city,
          phone: ev.phone,
          effective_start: ev.date,
          effective_end: isActive ? '9999-12-31' : (nextEv ? nextEv.date : ev.date),
          is_active: isActive ? 'Y' : 'N'
        });
      }
      return rows;
    }

    if (scdType === 'TYPE_3') {
      // Limited history with previous_city column
      const current = events[currentStep - 1];
      const prev = currentStep > 1 ? events[currentStep - 2] : null;
      return [{
        customer_id: 1001,
        name: 'John Doe',
        current_city: current.city,
        previous_city: prev ? prev.city : 'NULL',
        last_updated: current.date
      }];
    }

    return [];
  };

  const tableData = computeScdTable();

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-extrabold text-slate-100">Slowly Changing Dimension (SCD) Timeline</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate how dimension tables preserve audit history across SCD Type 1, Type 2, and Type 3 strategies.
          </p>
        </div>
      </div>

      {/* Strategy Switcher */}
      <div className="flex items-center gap-3 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
        <span className="text-xs font-bold text-slate-300 ml-2">Select Strategy:</span>
        <button
          onClick={() => setScdType('TYPE_1')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            scdType === 'TYPE_1' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          SCD Type 1 (Overwrite)
        </button>
        <button
          onClick={() => setScdType('TYPE_2')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            scdType === 'TYPE_2' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' : 'bg-slate-800 text-slate-400'
          }`}
        >
          SCD Type 2 (Full History)
        </button>
        <button
          onClick={() => setScdType('TYPE_3')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            scdType === 'TYPE_3' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'
          }`}
        >
          SCD Type 3 (Previous Column)
        </button>
      </div>

      {/* Timeline Controls */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-400" /> Event Simulation Controls</span>
          <span className="text-emerald-400">Step {currentStep} of {events.length}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {events.map(ev => (
            <button
              key={ev.step}
              onClick={() => setCurrentStep(ev.step)}
              className={`p-3 rounded-lg border text-left text-xs transition-all ${
                currentStep >= ev.step 
                  ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200' 
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
            >
              <div className="font-mono text-[10px] text-slate-400 mb-1">{ev.date}</div>
              <div className="font-bold">{ev.action}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Dimension Table Rendering */}
      <div className="space-y-2">
        <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          <code className="text-emerald-400">dim_customer</code> Table State
        </h3>
        
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-800 font-mono">
              <tr>
                {scdType === 'TYPE_2' && <th className="p-3 text-emerald-400">surrogate_key</th>}
                <th className="p-3">customer_id</th>
                <th className="p-3">name</th>
                {scdType !== 'TYPE_3' && <th className="p-3">city</th>}
                {scdType === 'TYPE_3' && <th className="p-3 text-cyan-300">current_city</th>}
                {scdType === 'TYPE_3' && <th className="p-3 text-slate-400">previous_city</th>}
                <th className="p-3">phone</th>
                {scdType === 'TYPE_2' && <th className="p-3">start_date</th>}
                {scdType === 'TYPE_2' && <th className="p-3">end_date</th>}
                {scdType === 'TYPE_2' && <th className="p-3">is_active</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {tableData.map((row, i) => (
                <tr key={i} className={`hover:bg-slate-900/50 ${row.is_active === 'Y' ? 'bg-emerald-950/20' : 'opacity-70'}`}>
                  {scdType === 'TYPE_2' && <td className="p-3 text-emerald-400 font-bold">{row.surrogate_key}</td>}
                  <td className="p-3 text-slate-400">{row.customer_id}</td>
                  <td className="p-3 font-sans font-semibold text-slate-100">{row.name}</td>
                  {scdType !== 'TYPE_3' && <td className="p-3 font-semibold text-cyan-300">{row.city}</td>}
                  {scdType === 'TYPE_3' && <td className="p-3 font-semibold text-cyan-300">{row.current_city}</td>}
                  {scdType === 'TYPE_3' && <td className="p-3 italic text-slate-400">{row.previous_city}</td>}
                  <td className="p-3 text-amber-400">{row.phone}</td>
                  {scdType === 'TYPE_2' && <td className="p-3 text-slate-300">{row.effective_start}</td>}
                  {scdType === 'TYPE_2' && <td className="p-3 text-slate-300">{row.effective_end}</td>}
                  {scdType === 'TYPE_2' && (
                    <td className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        row.is_active === 'Y' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {row.is_active}
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
