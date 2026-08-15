import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Database, 
  Cpu, 
  Cloud, 
  Zap, 
  Layers, 
  Server, 
  Code, 
  Rocket, 
  MapPin, 
  FileCode2,
  Info,
  HelpCircle,
  Laptop,
  HardDrive
} from 'lucide-react';
import VsCodeEditor from '../common/VsCodeEditor';
import infographicData from '../../data/infographic_topics_db.json';

export default function TopicInfographicView({ topicId = 'python', selectedSubtopicId = null, isDarkMode }) {
  const mainData = infographicData[topicId] || infographicData['python'];

  // Check if a subtopic is selected and has subtopic-specific infographic data
  const subtopicData = (selectedSubtopicId && mainData.subtopicDetails && mainData.subtopicDetails[selectedSubtopicId])
    ? mainData.subtopicDetails[selectedSubtopicId]
    : null;

  // Active view payload
  const activeTitle = subtopicData ? subtopicData.title : mainData.title;
  const activeSubtitle = subtopicData ? subtopicData.subtitle : mainData.subtitle;
  const activeWhyList = subtopicData ? subtopicData.whyList : mainData.whyList;
  const activeBasicCode = subtopicData ? subtopicData.codeSnippet : mainData.basicCode;

  return (
    <div className={`p-3.5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border space-y-4 sm:space-y-6 transition-all ${
      isDarkMode 
        ? 'bg-[#090e1a] border-slate-800 text-slate-100 shadow-2xl' 
        : 'bg-[#f0f4fc] border-slate-200 text-slate-900 shadow-md'
    }`}>
      
      {/* 1. TOP HERO HEADER: What is Topic/Subtopic? & Why Topic/Subtopic? - 100% Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        
        {/* What is Topic? Box (7 Cols) */}
        <div className={`lg:col-span-7 p-4 sm:p-6 rounded-2xl border space-y-3 flex flex-col justify-between ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Infographic Concept Overview {selectedSubtopicId ? '• Subtopic Mode' : ''}</span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading text-indigo-600 dark:text-indigo-400 leading-tight">
              {activeTitle}
            </h1>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {activeSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span>Complete Architecture & Real-World Cheat Sheet</span>
          </div>
        </div>

        {/* Why Topic? Box (5 Cols) */}
        <div className={`lg:col-span-5 p-4 sm:p-6 rounded-2xl border space-y-3 ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className="text-sm sm:text-base font-extrabold font-heading text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Why {selectedSubtopicId ? 'This Concept' : topicId.toUpperCase()}?</span>
          </h3>

          <ul className="space-y-2 text-xs font-medium">
            {activeWhyList.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 2. MIDDLE SECTION: Where Used? & How it Works Flowchart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        
        {/* Where is it Used? (5 Grid Cards) - 4 Cols */}
        <div className={`lg:col-span-4 p-4 sm:p-5 rounded-2xl border space-y-3 ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className="text-xs sm:text-sm font-extrabold font-heading text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-500" />
            <span>Where is {topicId.toUpperCase()} Used?</span>
          </h3>

          <div className="space-y-2">
            {mainData.whereUsed.map((u, idx) => (
              <div key={idx} className={`p-2.5 rounded-xl border flex items-center gap-3 ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-500 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="font-extrabold text-xs text-indigo-600 dark:text-cyan-300 truncate">{u.title}</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it Works? Flowchart Diagram - 8 Cols */}
        <div className={`lg:col-span-8 p-4 sm:p-5 rounded-2xl border space-y-4 ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className="text-xs sm:text-sm font-extrabold font-heading text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-500" />
            <span>How {topicId.toUpperCase()} Works? (Architecture Flow)</span>
          </h3>

          {/* Flowchart Diagram Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {mainData.howItWorks.map((step, idx) => (
              <div key={idx} className={`p-3 rounded-xl border space-y-1.5 relative ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-indigo-50/60 border-indigo-100'
              }`}>
                <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {step.step}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {step.desc}
                </div>
                {idx < mainData.howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-indigo-500 font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* When to Use Checklist */}
          <div className={`p-3.5 rounded-xl border mt-3 space-y-2 ${
            isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className="text-[11px] font-extrabold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider font-mono">
              📌 When to Use {topicId.toUpperCase()}?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              {mainData.whenToUse.map((w, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-indigo-500 font-bold">📌</span>
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. CORE CONCEPTS TABLE & KEY FEATURES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
        
        {/* Core Concepts Table (8 Cols) */}
        <div className={`lg:col-span-8 p-4 sm:p-5 rounded-2xl border space-y-3 ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className="text-xs sm:text-sm font-extrabold font-heading text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>Core Concepts & Descriptions</span>
          </h3>

          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-slate-800 bg-slate-950 text-indigo-400' : 'bg-slate-100 text-slate-800'}`}>
                  <th className="p-2.5 font-extrabold font-mono">Concept</th>
                  <th className="p-2.5 font-extrabold font-mono">Purpose & Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                {mainData.coreConcepts.map((c, idx) => (
                  <tr key={idx} className={isDarkMode ? 'hover:bg-slate-900/60' : 'hover:bg-slate-50'}>
                    <td className="p-2.5 font-bold text-indigo-600 dark:text-cyan-400 font-mono whitespace-nowrap">{c.concept}</td>
                    <td className="p-2.5 text-slate-700 dark:text-slate-300">{c.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Features (4 Cols) */}
        <div className={`lg:col-span-4 p-4 sm:p-5 rounded-2xl border space-y-3 ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className="text-xs sm:text-sm font-extrabold font-heading text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-emerald-500" />
            <span>Key Features</span>
          </h3>

          <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Unified engine for batch & streaming processing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>High-level DataFrame API & SQL Query engine</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>In-memory computation for 100x speedup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Automatic parallelization across clusters</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. CODE EXAMPLES BOX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Basic Example */}
        <div className="space-y-2 overflow-x-auto max-w-full">
          <h4 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-indigo-500" />
            <span>Production Code Example</span>
          </h4>
          <VsCodeEditor
            code={typeof activeBasicCode === 'string' ? activeBasicCode : mainData.basicCode}
            language={topicId === 'sql' || topicId === 'hive' || topicId === 'snowflake' ? 'sql' : 'python'}
            title={`production_${topicId}_script.py`}
            isEditable={true}
          />
        </div>

        {/* Advanced Real-World Example */}
        <div className="space-y-2 overflow-x-auto max-w-full">
          <h4 className="text-xs font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-cyan-500" />
            <span>Advanced Real-World Pipeline Example</span>
          </h4>
          <VsCodeEditor
            code={mainData.advancedCode}
            language={topicId === 'sql' || topicId === 'hive' || topicId === 'snowflake' ? 'sql' : 'python'}
            title={`advanced_pipeline_${topicId}.py`}
            isEditable={true}
          />
        </div>

      </div>

      {/* 5. FOOTER: Where does it run? & Rocket Summary */}
      <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="space-y-1 text-center sm:text-left">
          <h5 className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono flex items-center justify-center sm:justify-start gap-1.5">
            <MapPin className="w-4 h-4 text-indigo-500" />
            <span>Where does {topicId.toUpperCase()} run?</span>
          </h5>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 flex-wrap text-xs font-medium">
            {mainData.platforms.map((p, idx) => (
              <span key={idx} className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-indigo-700 dark:text-cyan-300">
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 w-full sm:w-auto text-center sm:text-left justify-center">
          <Rocket className="w-4 h-4 text-indigo-500 flex-shrink-0" />
          <span>{mainData.summary}</span>
        </div>
      </div>

    </div>
  );
}
