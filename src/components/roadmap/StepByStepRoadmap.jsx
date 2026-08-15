import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Sparkles, 
  Award, 
  BookOpen, 
  Play, 
  ChevronRight,
  Flame,
  Zap
} from 'lucide-react';

const STEP_ROADMAP = [
  { step: 1, topicId: 'sql-window-functions', title: 'Step 1: SQL Window Functions & Analytical Queries', category: 'SQL Core', estTime: '12 min', description: 'Master ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG and LEAD over partition clauses.' },
  { step: 2, topicId: 'sql-acid-properties', title: 'Step 2: ACID Properties & Isolation Levels', category: 'Database Eng', estTime: '8 min', description: 'Understand Atomicity, Consistency, Isolation, Durability and transaction phenomena.' },
  { step: 3, topicId: 'sql-joins-mastery', title: 'Step 3: SQL & PySpark Joins Deep Dive', category: 'SQL & PySpark', estTime: '10 min', description: 'Learn matching logic for Inner, Left, Right, Full Outer, Left Semi, and Left Anti joins.' },
  { step: 4, topicId: 'scd-data-modeling', title: 'Step 4: Slowly Changing Dimensions (SCD 1, 2, 3)', category: 'Data Warehousing', estTime: '10 min', description: 'Master surrogate keys, effective dates, and dimension historical tracking.' },
  { step: 5, topicId: 'spark-4-updates', title: 'Step 5: Spark 4.0 Architecture & Variant Type', category: 'Apache Spark', estTime: '10 min', description: 'Explore ANSI compliance, JSON Variant type, PySpark hints, and native XML.' },
  { step: 6, topicId: 'databricks-pyspark-guide', title: 'Step 6: Databricks & PySpark Optimization', category: 'Databricks', estTime: '12 min', description: 'Master S3/ADLS integration, Delta Lake ACID features, Auto-Loader, and Z-Ordering.' },
  { step: 7, topicId: 'snowflake-architecture', title: 'Step 7: Snowflake 3-Layer Architecture', category: 'Snowflake', estTime: '12 min', description: 'Deep dive into Storage (Micro-partitions), Compute (Virtual Warehouses), and Cloud Services.' },
  { step: 8, topicId: 'airflow-zero-to-hero', title: 'Step 8: Apache Airflow DAG Orchestration', category: 'Orchestration', estTime: '15 min', description: 'Learn DAG design, Operators vs Sensors, XComs, Executors, and Cron scheduling.' },
  { step: 9, topicId: 'aws-de-interview-qs', title: 'Step 9: AWS Data Engineering Core Services', category: 'AWS Cloud', estTime: '15 min', description: 'Master Redshift distribution keys, S3 storage tiers, Glue crawlers, and EMR clusters.' },
  { step: 10, topicId: 'de-architecture-challenges', title: 'Step 10: System Architecture & ETL vs ELT', category: 'Architecture', estTime: '10 min', description: 'Explore modern ELT pipelines, shared dev testing solutions, schema drift, and Git workflow.' }
];

export default function StepByStepRoadmap({ 
  completedTopicIds = [], 
  onSelectTopic, 
  isDarkMode 
}) {
  const currentStepIdx = STEP_ROADMAP.findIndex(s => !completedTopicIds.includes(s.topicId));
  const activeStep = currentStepIdx !== -1 ? STEP_ROADMAP[currentStepIdx] : STEP_ROADMAP[STEP_ROADMAP.length - 1];

  const handleStepClick = (topicId) => {
    onSelectTopic('sql-dwh', topicId);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
      isDarkMode ? 'bg-[#0f172a] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
    }`}>
      
      {/* Step Roadmap Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-inherit pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Step-by-Step Learning Path</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading">
            Data Engineering 10-Step Mastery Path
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Follow this sequential step-by-step roadmap to build foundational SQL knowledge through advanced cloud architecture.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {completedTopicIds.length} / {STEP_ROADMAP.length} Steps Mastered ✓
          </span>
        </div>
      </div>

      {/* Connected Timeline Progress Bar */}
      <div className="overflow-x-auto pb-4 pt-2">
        <div className="flex items-center min-w-max gap-3 px-2">
          {STEP_ROADMAP.map((item, idx) => {
            const isCompleted = completedTopicIds.includes(item.topicId);
            const isCurrent = activeStep.step === item.step;

            return (
              <React.Fragment key={item.step}>
                
                {/* Step Circle Pill */}
                <button
                  onClick={() => handleStepClick(item.topicId)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isCompleted 
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400' 
                      : isCurrent
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 ring-2 ring-indigo-400/50'
                        : isDarkMode
                          ? 'bg-slate-900 border border-slate-800 text-slate-500 hover:text-slate-300'
                          : 'bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] bg-black/20">
                    {item.step}
                  </span>
                  <span>{item.category}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </button>

                {idx < STEP_ROADMAP.length - 1 && (
                  <span className="text-slate-300 dark:text-slate-700 font-bold text-xs">→</span>
                )}

              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step List Sequence matching NxtWave Course Content Style */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-extrabold tracking-tight uppercase text-slate-400 font-mono">
          Sequential Roadmap Steps
        </h3>

        <div className="space-y-3">
          {STEP_ROADMAP.map((item) => {
            const isCompleted = completedTopicIds.includes(item.topicId);
            const isCurrent = activeStep.step === item.step;

            return (
              <div
                key={item.step}
                onClick={() => handleStepClick(item.topicId)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isCurrent 
                    ? isDarkMode 
                      ? 'bg-indigo-950/50 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/30' 
                      : 'bg-indigo-50/90 border-indigo-300 shadow-sm ring-1 ring-indigo-300'
                    : isCompleted
                      ? isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                      : isDarkMode ? 'bg-slate-950/40 border-slate-900 opacity-80' : 'bg-slate-50/60 border-slate-200 opacity-80'
                }`}
              >
                
                <div className="flex items-start gap-4">
                  {/* Step Badge */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm font-mono flex-shrink-0 ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white' 
                      : isCurrent
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {item.step}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded font-mono">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">⏱️ {item.estTime}</span>
                      
                      {isCurrent && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-500 text-white rounded-full flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-white" /> Next Up
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base font-heading">
                      {item.title}
                    </h4>

                    <p className={`text-xs line-clamp-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isCompleted ? (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-4 h-4" /> Mastered
                    </span>
                  ) : (
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      <Play className="w-3.5 h-3.5 fill-white" /> Start Step
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
