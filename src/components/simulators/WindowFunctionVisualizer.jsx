import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, HelpCircle, Code, Layers, Sparkles } from 'lucide-react';

const INITIAL_EMPLOYEES = [
  { id: 101, name: 'Alice Smith', dept: 'Engineering', salary: 140000 },
  { id: 102, name: 'Bob Johnson', dept: 'Engineering', salary: 140000 },
  { id: 103, name: 'Charlie Brown', dept: 'Engineering', salary: 110000 },
  { id: 104, name: 'Diana Prince', dept: 'Sales', salary: 120000 },
  { id: 105, name: 'Evan Wright', dept: 'Sales', salary: 120000 },
  { id: 106, name: 'Fiona Gallagher', dept: 'Sales', salary: 95000 },
  { id: 107, name: 'George Clark', dept: 'Data Science', salary: 155000 },
  { id: 108, name: 'Hannah Abbott', dept: 'Data Science', salary: 130000 },
];

export default function WindowFunctionVisualizer() {
  const [selectedFunc, setSelectedFunc] = useState('DENSE_RANK');
  const [partitionBy, setPartitionBy] = useState('dept');
  const [orderDir, setOrderDir] = useState('DESC');

  // Compute live window function outputs
  const calculatedData = useMemo(() => {
    // 1. Group by partition
    const grouped = {};
    INITIAL_EMPLOYEES.forEach(emp => {
      const key = partitionBy === 'dept' ? emp.dept : 'ALL';
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push({ ...emp });
    });

    const results = [];

    Object.keys(grouped).forEach(partitionKey => {
      const rows = grouped[partitionKey];
      
      // Sort rows inside partition
      rows.sort((a, b) => orderDir === 'DESC' ? b.salary - a.salary : a.salary - b.salary);

      let currentRank = 1;
      let denseRank = 1;

      rows.forEach((row, index) => {
        let val = null;

        if (index > 0) {
          const prev = rows[index - 1];
          if (prev.salary !== row.salary) {
            currentRank = index + 1;
            denseRank = denseRank + 1;
          }
        }

        switch (selectedFunc) {
          case 'ROW_NUMBER':
            val = index + 1;
            break;
          case 'RANK':
            val = currentRank;
            break;
          case 'DENSE_RANK':
            val = denseRank;
            break;
          case 'NTILE(2)':
            val = Math.floor((index / rows.length) * 2) + 1;
            break;
          case 'LAG(salary)':
            val = index > 0 ? rows[index - 1].salary : 'NULL';
            break;
          case 'LEAD(salary)':
            val = index < rows.length - 1 ? rows[index + 1].salary : 'NULL';
            break;
          default:
            val = denseRank;
        }

        results.push({
          ...row,
          partitionKey,
          windowValue: val
        });
      });
    });

    return results;
  }, [selectedFunc, partitionBy, orderDir]);

  const generatedSql = `SELECT \n  employee_id, \n  dept, \n  salary,\n  ${selectedFunc}() OVER (\n    ${partitionBy !== 'NONE' ? `PARTITION BY ${partitionBy} ` : ''}ORDER BY salary ${orderDir}\n  ) AS output_val\nFROM employees;`;

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6">
      
      {/* Header & Description */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-extrabold text-slate-100">Interactive SQL Window Function Simulator</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Test how <code className="text-cyan-300 font-mono">ROW_NUMBER</code>, <code className="text-cyan-300 font-mono">RANK</code>, <code className="text-cyan-300 font-mono">DENSE_RANK</code>, and <code className="text-cyan-300 font-mono">LAG/LEAD</code> calculate outputs live over partitions.
          </p>
        </div>
        <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-800/60 rounded-full text-cyan-400 text-xs font-semibold">
          Live Execution Engine
        </span>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/70 p-4 rounded-xl border border-slate-800">
        
        {/* Function Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Window Function</label>
          <select
            value={selectedFunc}
            onChange={(e) => setSelectedFunc(e.target.value)}
            className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono focus:border-cyan-500"
          >
            <option value="DENSE_RANK">DENSE_RANK()</option>
            <option value="RANK">RANK()</option>
            <option value="ROW_NUMBER">ROW_NUMBER()</option>
            <option value="NTILE(2)">NTILE(2)</option>
            <option value="LAG(salary)">LAG(salary)</option>
            <option value="LEAD(salary)">LEAD(salary)</option>
          </select>
        </div>

        {/* Partition By */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">PARTITION BY Clause</label>
          <select
            value={partitionBy}
            onChange={(e) => setPartitionBy(e.target.value)}
            className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono focus:border-cyan-500"
          >
            <option value="dept">PARTITION BY dept</option>
            <option value="NONE">No Partition (Whole Table)</option>
          </select>
        </div>

        {/* Order Direction */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">ORDER BY Direction</label>
          <select
            value={orderDir}
            onChange={(e) => setOrderDir(e.target.value)}
            className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono focus:border-cyan-500"
          >
            <option value="DESC">ORDER BY salary DESC</option>
            <option value="ASC">ORDER BY salary ASC</option>
          </select>
        </div>

      </div>

      {/* Generated SQL Code Box */}
      <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 font-mono text-xs text-cyan-300 relative group">
        <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-sans mb-2 font-bold tracking-wider">
          <span className="flex items-center gap-1.5"><Code className="w-3.5 h-3.5 text-cyan-400" /> Generated SQL Query</span>
        </div>
        <pre>{generatedSql}</pre>
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Emp ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Department (Partition)</th>
              <th className="p-3">Salary</th>
              <th className="p-3 bg-cyan-950/60 text-cyan-300 border-l border-cyan-800/50">Computed Window Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-950/50">
            {calculatedData.map((row, idx) => (
              <tr key={row.id} className="hover:bg-slate-900/50 transition-colors">
                <td className="p-3 font-mono text-slate-400">{row.id}</td>
                <td className="p-3 font-semibold text-slate-200">{row.name}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {row.dept}
                  </span>
                </td>
                <td className="p-3 font-mono font-bold text-amber-400">${row.salary.toLocaleString()}</td>
                <td className="p-3 font-mono font-bold text-cyan-300 bg-cyan-950/30 border-l border-cyan-900/60">
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {row.windowValue}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
