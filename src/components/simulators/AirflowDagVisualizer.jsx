import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Clock, AlertTriangle, Sparkles, Sliders } from 'lucide-react';

export default function AirflowDagVisualizer() {
  const [dagState, setDagState] = useState({
    extract_s3: 'success',
    validate_schema: 'success',
    spark_transform: 'running',
    snowflake_load: 'queued',
    alert_slack: 'queued'
  });

  const [isRunning, setIsRunning] = useState(false);
  const [cronExpression, setCronExpression] = useState('0 6 * * *');

  const triggerDagRun = () => {
    setIsRunning(true);
    setDagState({
      extract_s3: 'queued',
      validate_schema: 'queued',
      spark_transform: 'queued',
      snowflake_load: 'queued',
      alert_slack: 'queued'
    });

    setTimeout(() => {
      setDagState(s => ({ ...s, extract_s3: 'running' }));
    }, 400);

    setTimeout(() => {
      setDagState(s => ({ ...s, extract_s3: 'success', validate_schema: 'running' }));
    }, 1200);

    setTimeout(() => {
      setDagState(s => ({ ...s, validate_schema: 'success', spark_transform: 'running' }));
    }, 2200);

    setTimeout(() => {
      setDagState(s => ({ ...s, spark_transform: 'success', snowflake_load: 'running' }));
    }, 3400);

    setTimeout(() => {
      setDagState(s => ({ ...s, snowflake_load: 'success', alert_slack: 'success' }));
      setIsRunning(false);
    }, 4500);
  };

  const getCronDescription = (expr) => {
    switch (expr.trim()) {
      case '0 6 * * *': return 'Every day at 06:00 AM (0 6 * * *)';
      case '*/15 * * * *': return 'Every 15 minutes (*/15 * * * *)';
      case '0 0 * * 1': return 'Every Monday at midnight (0 0 * * 1)';
      case '@daily': return 'Once a day at midnight (@daily)';
      default: return 'Custom Schedule: ' + expr;
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-extrabold text-slate-100">Apache Airflow DAG & Pipeline Simulator</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate DAG task instance state transitions and test Cron schedule expressions live.
          </p>
        </div>

        <button
          onClick={triggerDagRun}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 disabled:opacity-50 transition-all"
        >
          <Play className="w-4 h-4 fill-white" />
          {isRunning ? 'Pipeline Running...' : 'Trigger DAG Run'}
        </button>
      </div>

      {/* DAG Dependency Flow */}
      <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
          DAG Graph: <code className="text-indigo-400">daily_telecom_etl_pipeline</code>
        </h3>

        <div className="flex items-center justify-between flex-wrap gap-3 py-4">
          
          {/* Node 1 */}
          <div className={`p-3.5 rounded-xl border flex flex-col items-center min-w-[120px] transition-all ${
            dagState.extract_s3 === 'success' ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300' :
            dagState.extract_s3 === 'running' ? 'bg-blue-950/60 border-blue-400 text-blue-300 animate-pulse' :
            'bg-slate-900 border-slate-800 text-slate-500'
          }`}>
            <span className="text-[10px] font-mono uppercase mb-1 font-bold">PythonOperator</span>
            <span className="text-xs font-bold">extract_s3</span>
            <span className="text-[9px] uppercase mt-1 px-2 py-0.5 rounded font-mono font-bold bg-slate-950">{dagState.extract_s3}</span>
          </div>

          <span className="text-slate-600 font-bold">→</span>

          {/* Node 2 */}
          <div className={`p-3.5 rounded-xl border flex flex-col items-center min-w-[120px] transition-all ${
            dagState.validate_schema === 'success' ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300' :
            dagState.validate_schema === 'running' ? 'bg-blue-950/60 border-blue-400 text-blue-300 animate-pulse' :
            'bg-slate-900 border-slate-800 text-slate-500'
          }`}>
            <span className="text-[10px] font-mono uppercase mb-1 font-bold">S3KeySensor</span>
            <span className="text-xs font-bold">validate_schema</span>
            <span className="text-[9px] uppercase mt-1 px-2 py-0.5 rounded font-mono font-bold bg-slate-950">{dagState.validate_schema}</span>
          </div>

          <span className="text-slate-600 font-bold">→</span>

          {/* Node 3 */}
          <div className={`p-3.5 rounded-xl border flex flex-col items-center min-w-[120px] transition-all ${
            dagState.spark_transform === 'success' ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300' :
            dagState.spark_transform === 'running' ? 'bg-blue-950/60 border-blue-400 text-blue-300 animate-pulse' :
            'bg-slate-900 border-slate-800 text-slate-500'
          }`}>
            <span className="text-[10px] font-mono uppercase mb-1 font-bold">EmrSubmitJob</span>
            <span className="text-xs font-bold">spark_transform</span>
            <span className="text-[9px] uppercase mt-1 px-2 py-0.5 rounded font-mono font-bold bg-slate-950">{dagState.spark_transform}</span>
          </div>

          <span className="text-slate-600 font-bold">→</span>

          {/* Node 4 */}
          <div className={`p-3.5 rounded-xl border flex flex-col items-center min-w-[120px] transition-all ${
            dagState.snowflake_load === 'success' ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300' :
            dagState.snowflake_load === 'running' ? 'bg-blue-950/60 border-blue-400 text-blue-300 animate-pulse' :
            'bg-slate-900 border-slate-800 text-slate-500'
          }`}>
            <span className="text-[10px] font-mono uppercase mb-1 font-bold">SnowflakeOp</span>
            <span className="text-xs font-bold">snowflake_load</span>
            <span className="text-[9px] uppercase mt-1 px-2 py-0.5 rounded font-mono font-bold bg-slate-950">{dagState.snowflake_load}</span>
          </div>

        </div>
      </div>

      {/* Cron Expression Tester */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" /> Cron Schedule Masterclass Expression Tester
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-slate-400 font-medium mb-1">Preset Schedules</label>
            <select
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              className="w-full bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono"
            >
              <option value="0 6 * * *">0 6 * * * (Daily at 6:00 AM)</option>
              <option value="*/15 * * * *">*/15 * * * * (Every 15 Minutes)</option>
              <option value="0 0 * * 1">0 0 * * 1 (Every Monday at Midnight)</option>
              <option value="@daily">@daily (Preset)</option>
            </select>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">Human Readable Schedule</div>
              <div className="text-xs font-bold text-indigo-300 mt-0.5">{getCronDescription(cronExpression)}</div>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

      </div>

    </div>
  );
}
