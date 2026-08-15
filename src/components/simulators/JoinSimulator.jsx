import React, { useState, useMemo } from 'react';
import { Layers, ArrowRight, Code, Sparkles, Check, X } from 'lucide-react';

const TABLE_A = [
  { id: 1, name: 'Alice', dept_id: 10 },
  { id: 2, name: 'Bob', dept_id: 20 },
  { id: 3, name: 'Charlie', dept_id: 30 },
  { id: 4, name: 'Diana', dept_id: null },
];

const TABLE_B = [
  { dept_id: 10, dept_name: 'Engineering' },
  { dept_id: 20, dept_name: 'Sales' },
  { dept_id: 40, dept_name: 'Marketing' },
];

export default function JoinSimulator() {
  const [joinType, setJoinType] = useState('INNER');

  const joinedResult = useMemo(() => {
    switch (joinType) {
      case 'INNER':
        return TABLE_A
          .filter(a => TABLE_B.some(b => b.dept_id === a.dept_id))
          .map(a => {
            const b = TABLE_B.find(b => b.dept_id === a.dept_id);
            return { ...a, dept_name: b.dept_name };
          });

      case 'LEFT':
        return TABLE_A.map(a => {
          const b = TABLE_B.find(b => b.dept_id === a.dept_id);
          return { ...a, dept_name: b ? b.dept_name : 'NULL' };
        });

      case 'RIGHT':
        return TABLE_B.map(b => {
          const a = TABLE_A.find(a => a.dept_id === b.dept_id);
          return {
            id: a ? a.id : 'NULL',
            name: a ? a.name : 'NULL',
            dept_id: b.dept_id,
            dept_name: b.dept_name
          };
        });

      case 'FULL':
        const matched = TABLE_A.map(a => {
          const b = TABLE_B.find(b => b.dept_id === a.dept_id);
          return { ...a, dept_name: b ? b.dept_name : 'NULL' };
        });
        const unmatchedB = TABLE_B
          .filter(b => !TABLE_A.some(a => a.dept_id === b.dept_id))
          .map(b => ({ id: 'NULL', name: 'NULL', dept_id: b.dept_id, dept_name: b.dept_name }));
        return [...matched, ...unmatchedB];

      case 'LEFT_SEMI':
        return TABLE_A
          .filter(a => TABLE_B.some(b => b.dept_id === a.dept_id))
          .map(a => ({ id: a.id, name: a.name, dept_id: a.dept_id }));

      case 'LEFT_ANTI':
        return TABLE_A
          .filter(a => !TABLE_B.some(b => b.dept_id === a.dept_id))
          .map(a => ({ id: a.id, name: a.name, dept_id: a.dept_id }));

      default:
        return TABLE_A;
    }
  }, [joinType]);

  const pysparkJoinMode = {
    INNER: 'inner',
    LEFT: 'left',
    RIGHT: 'right',
    FULL: 'full',
    LEFT_SEMI: 'left_semi',
    LEFT_ANTI: 'left_anti'
  }[joinType];

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-slate-100">SQL & PySpark Join Logic Visualizer</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compare row matching behavior across Inner, Left, Right, Full Outer, Left Semi, and Left Anti joins.
          </p>
        </div>
      </div>

      {/* Join Type Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['INNER', 'LEFT', 'RIGHT', 'FULL', 'LEFT_SEMI', 'LEFT_ANTI'].map((type) => (
          <button
            key={type}
            onClick={() => setJoinType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              joinType === type 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20' 
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {type.replace('_', ' ')} JOIN
          </button>
        ))}
      </div>

      {/* Code comparison box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* SQL Snippet */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
          <div className="text-slate-500 text-[10px] uppercase font-sans font-bold mb-1">SQL Query</div>
          <div className="text-cyan-300">
            {joinType === 'LEFT_SEMI' && `SELECT emp.* FROM emp \nWHERE EXISTS (SELECT 1 FROM dept WHERE emp.dept_id = dept.dept_id);`}
            {joinType === 'LEFT_ANTI' && `SELECT emp.* FROM emp \nWHERE NOT EXISTS (SELECT 1 FROM dept WHERE emp.dept_id = dept.dept_id);`}
            {joinType !== 'LEFT_SEMI' && joinType !== 'LEFT_ANTI' && (
              `SELECT emp.id, emp.name, dept.dept_name\nFROM emp ${joinType} JOIN dept\nON emp.dept_id = dept.dept_id;`
            )}
          </div>
        </div>

        {/* PySpark Snippet */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
          <div className="text-slate-500 text-[10px] uppercase font-sans font-bold mb-1">PySpark DataFrame API</div>
          <div className="text-purple-300">
            {`emp_df.join(\n  dept_df,\n  on="dept_id",\n  how="${pysparkJoinMode}"\n).show()`}
          </div>
        </div>

      </div>

      {/* Input Data Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Table A */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <h3 className="font-bold text-slate-300 mb-2 flex items-center justify-between">
            <span>Table A: Employees (Left)</span>
            <span className="text-[10px] text-slate-500 font-mono">4 Rows</span>
          </h3>
          <table className="w-full text-left text-slate-300">
            <thead className="text-[10px] uppercase text-slate-400 border-b border-slate-800">
              <tr><th className="py-1">id</th><th className="py-1">name</th><th className="py-1">dept_id</th></tr>
            </thead>
            <tbody>
              {TABLE_A.map(r => (
                <tr key={r.id} className="border-b border-slate-800/40">
                  <td className="py-1 font-mono">{r.id}</td>
                  <td className="py-1 font-semibold">{r.name}</td>
                  <td className="py-1 font-mono text-amber-400">{r.dept_id ?? 'NULL'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table B */}
        <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
          <h3 className="font-bold text-slate-300 mb-2 flex items-center justify-between">
            <span>Table B: Departments (Right)</span>
            <span className="text-[10px] text-slate-500 font-mono">3 Rows</span>
          </h3>
          <table className="w-full text-left text-slate-300">
            <thead className="text-[10px] uppercase text-slate-400 border-b border-slate-800">
              <tr><th className="py-1">dept_id</th><th className="py-1">dept_name</th></tr>
            </thead>
            <tbody>
              {TABLE_B.map(r => (
                <tr key={r.dept_id} className="border-b border-slate-800/40">
                  <td className="py-1 font-mono text-amber-400">{r.dept_id}</td>
                  <td className="py-1 font-semibold text-cyan-300">{r.dept_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Resulting Output Table */}
      <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/60">
        <h3 className="font-extrabold text-sm text-indigo-300 mb-3 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-indigo-400" />
          Resulting DataFrame ({joinedResult.length} Rows Returned)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-2">id</th>
                <th className="p-2">name</th>
                <th className="p-2">dept_id</th>
                {joinType !== 'LEFT_SEMI' && joinType !== 'LEFT_ANTI' && <th className="p-2 text-cyan-400">dept_name</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {joinedResult.map((r, i) => (
                <tr key={i} className="hover:bg-slate-900/60">
                  <td className="p-2 text-slate-400">{r.id}</td>
                  <td className="p-2 font-sans font-semibold text-slate-100">{r.name}</td>
                  <td className="p-2 text-amber-400">{r.dept_id ?? 'NULL'}</td>
                  {joinType !== 'LEFT_SEMI' && joinType !== 'LEFT_ANTI' && (
                    <td className={`p-2 font-semibold ${r.dept_name === 'NULL' ? 'text-rose-400 italic' : 'text-cyan-300'}`}>
                      {r.dept_name}
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
