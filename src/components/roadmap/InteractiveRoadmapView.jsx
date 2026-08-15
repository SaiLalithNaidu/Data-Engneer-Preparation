import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Star, 
  ArrowDown, 
  Rocket, 
  Code, 
  Database, 
  Zap, 
  Server, 
  Cloud, 
  CloudRain, 
  Cpu, 
  Snowflake, 
  Layers, 
  GitBranch,
  Play,
  Award,
  BookOpen
} from 'lucide-react';

const ROADMAP_NODES = [
  { step: 1, id: "python-de", title: "Python", icon: Code, star: false, time: "15 min", desc: "Data Structures, Pandas, APIs, PostgreSQL ETL" },
  { step: 2, id: "sql-intensive", title: "SQL", icon: Database, star: false, time: "15 min", desc: "Joins, Window Functions, CTEs, Data Modeling" },
  { step: 3, id: "pyspark-internals", title: "PySpark", icon: Zap, star: true, time: "20 min", desc: "Spark Architecture, RDD vs DataFrame, AQE, Salting, Skew" },
  { step: 4, id: "hadoop-hive", title: "Hadoop + Hive", icon: Server, star: false, time: "12 min", desc: "HDFS, MapReduce, YARN, HiveQL External Tables" },
  { step: 5, id: "aws-s3", title: "AWS S3", icon: Cloud, star: true, time: "10 min", desc: "Object Storage, Medallion Architecture (Bronze/Silver/Gold), IAM" },
  { step: 6, id: "aws-glue-athena", title: "Glue + Athena", icon: CloudRain, star: true, time: "15 min", desc: "Data Catalog Crawlers, PySpark ETL Jobs, Serverless SQL" },
  { step: 7, id: "aws-emr", title: "EMR", icon: Cpu, star: false, time: "12 min", desc: "Managed Spark/Hadoop EC2 Clusters, Master/Core/Task Nodes" },
  { step: 8, id: "snowflake-dwh", title: "Snowflake", icon: Snowflake, star: true, time: "15 min", desc: "3-Layer Architecture, Micro-partitions, Zero-Copy Clone, Snowpipe" },
  { step: 9, id: "dbt-transformations", title: "dbt", icon: Layers, star: true, time: "15 min", desc: "SQL Transformations, Staging → Marts, Jinja, Incremental Models" },
  { step: 10, id: "airflow-orchestration", title: "Airflow", icon: GitBranch, star: true, time: "15 min", desc: "DAGs, Taskflow API, Operators, Sensors, XComs, Cron Schedules" },
  { step: 11, id: "capstone-real-project", title: "REAL PROJECT", icon: Rocket, star: false, isCapstone: true, time: "25 min", desc: "End-to-End AI Cloud Platform: API → S3 → PySpark → Snowflake → dbt → Airflow" }
];

export default function InteractiveRoadmapView({ 
  completedTopicIds = [], 
  onSelectTopic, 
  isDarkMode 
}) {
  const [selectedNode, setSelectedNode] = useState(ROADMAP_NODES[2]); // Default: PySpark ⭐

  const completedCount = ROADMAP_NODES.filter(n => completedTopicIds.includes(n.id)).length;
  const totalCount = ROADMAP_NODES.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDarkMode ? 'bg-gradient-to-r from-[#0b1120] via-[#0f172a] to-[#1e1b4b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20 mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Priority Cloud Data Engineer Pathway</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
              Data Engineer Interview Roadmap Flow
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Click any node in the interactive flow sequence below to view interview guides, code patterns, and concepts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400">Roadmap Progress</div>
              <div className="text-xl font-extrabold text-amber-500 font-mono">{pct}% ({completedCount}/{totalCount})</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container: Left Roadmap Flow Diagram, Right Active Node Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Node Flow Diagram (7 Cols) */}
        <div className={`lg:col-span-6 p-6 rounded-3xl border ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          
          <div className="flex items-center justify-between pb-4 border-b border-inherit mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Interactive Flow Sequence
            </span>
            <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500" /> ⭐ = High Priority Interview Skill
            </span>
          </div>

          {/* Start Badge */}
          <div className="flex flex-col items-center">
            <div className="px-5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs tracking-widest shadow-md">
              START
            </div>
            <ArrowDown className="w-5 h-5 text-emerald-500 my-2 animate-bounce" />
          </div>

          {/* Vertical Stack of Nodes with Connectors */}
          <div className="space-y-3">
            {ROADMAP_NODES.map((node, idx) => {
              const Icon = node.icon;
              const isSelected = selectedNode.id === node.id;
              const isDone = completedTopicIds.includes(node.id);

              return (
                <React.Fragment key={node.id}>
                  
                  {/* Node Box */}
                  <div
                    onClick={() => {
                      setSelectedNode(node);
                      onSelectTopic('sql-dwh', node.id);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/25 scale-[1.02]'
                        : isDone
                          ? isDarkMode ? 'bg-slate-900/90 border-emerald-500/50 text-slate-200' : 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                          : isDarkMode ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-indigo-500/50' : 'bg-slate-50/80 border-slate-200 text-slate-800 hover:border-indigo-300'
                    }`}
                  >
                    
                    <div className="flex items-center gap-3.5 min-w-0">
                      
                      {/* Node Icon Box */}
                      <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : node.isCapstone
                            ? 'bg-gradient-to-tr from-amber-500 to-rose-500 text-white'
                            : isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-sm sm:text-base tracking-tight font-heading truncate">
                            {node.title}
                          </h3>
                          {node.star && (
                            <span className="text-amber-400 text-xs flex items-center" title="Priority Skill">
                              ⭐
                            </span>
                          )}
                        </div>
                        <p className={`text-xs truncate ${isSelected ? 'text-indigo-100' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {node.desc}
                        </p>
                      </div>

                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-lg ${
                          isSelected ? 'bg-white/20 text-white' : isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-700'
                        }`}>
                          Step {node.step}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Down Connector Arrow */}
                  {idx < ROADMAP_NODES.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <ArrowDown className="w-4 h-4 text-slate-400 dark:text-slate-600" />
                    </div>
                  )}

                </React.Fragment>
              );
            })}
          </div>

          {/* End Capstone Badge */}
          <div className="flex flex-col items-center mt-4 pt-2">
            <ArrowDown className="w-5 h-5 text-rose-500 mb-2" />
            <div className="px-6 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-white font-extrabold text-xs tracking-wider shadow-lg flex items-center gap-2">
              <Rocket className="w-4 h-4" /> 🚀 REAL-WORLD CAPSTONE PROJECT READY
            </div>
          </div>

        </div>

        {/* Right Active Node Deep Dive Panel (6 Cols) */}
        <div className={`lg:col-span-6 p-6 rounded-3xl border flex flex-col justify-between space-y-6 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}>
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-inherit pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Step {selectedNode.step} of 11
                </span>
                {selectedNode.star && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300">
                    ⭐ Core Priority
                  </span>
                )}
              </div>

              <span className="text-xs font-semibold text-slate-400">⏱️ {selectedNode.time}</span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold tracking-tight font-heading flex items-center gap-2">
                {selectedNode.title}
              </h2>
              <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedNode.desc}
              </p>
            </div>

            {/* Key Deliverables & Outcomes */}
            <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-indigo-50/70 border-indigo-200'
            }`}>
              <h4 className="font-extrabold uppercase text-[10px] text-indigo-600 dark:text-indigo-400 tracking-wider">
                Target Interview Skills
              </h4>
              <ul className="space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Master production syntax and architecture for {selectedNode.title}.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Solve 20+ hands-on coding & troubleshooting scenario questions.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Integrate into end-to-end cloud pipeline architecture.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-inherit">
            <button
              onClick={() => onSelectTopic('sql-dwh', selectedNode.id)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-xs font-extrabold transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Start Reading {selectedNode.title} Study Guide →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
