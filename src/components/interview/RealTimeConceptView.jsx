import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  Layers, 
  FileCode2,
  Info
} from 'lucide-react';
import VsCodeEditor from '../common/VsCodeEditor';
import interviewDB from '../../data/interview_questions_db.json';

export default function RealTimeConceptView({ 
  topicId = 'python', 
  selectedSubtopicId = null,
  isDarkMode 
}) {
  const [activeConceptIdx, setActiveConceptIdx] = useState(0);

  // Find active topic from interviewDB
  const currentTopic = interviewDB.topics.find(t => t.id === topicId) || interviewDB.topics[0];

  // Find subtopics & filter questions
  const activeSubtopic = currentTopic.subtopics 
    ? currentTopic.subtopics.find(s => s.id === selectedSubtopicId) 
    : null;

  const relevantQuestions = currentTopic.questions.filter(q => 
    !selectedSubtopicId || q.subtopicId === selectedSubtopicId
  );

  const safeIdx = Math.min(activeConceptIdx, Math.max(0, relevantQuestions.length - 1));
  const activeQ = relevantQuestions[safeIdx] || currentTopic.questions[0];

  return (
    <div className="space-y-6">
      
      {/* Module Title Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-[#090e1a] border-slate-800 text-white shadow-xl' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
              <Sparkles className="w-4 h-4" />
              <span>Real-Time Concept Architecture Guide (What, Why, How)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              {currentTopic.name}: {activeSubtopic ? activeSubtopic.name : 'Core Concepts'}
            </h1>

            <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Concept {safeIdx + 1} of {relevantQuestions.length}: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{activeQ ? activeQ.question : 'Technical Overview'}</span>
            </p>
          </div>

          {/* Switch Concept Navigator */}
          {relevantQuestions.length > 1 && (
            <div className={`flex items-center gap-1.5 p-1.5 rounded-2xl border max-w-full overflow-x-auto ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              {relevantQuestions.slice(0, 5).map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setActiveConceptIdx(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    safeIdx === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  Concept {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Concept Breakdown Grid: WHAT, WHY, HOW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 🎯 WHAT IS IT */}
        <div className={`p-5 rounded-2xl border space-y-2.5 transition-all ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
            <Info className="w-4 h-4" />
            <span>🎯 WHAT is it?</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
            {activeQ ? activeQ.question : `Core technical functionality of ${currentTopic.name}.`}
          </p>
        </div>

        {/* ❓ WHY DO WE USE IT */}
        <div className={`p-5 rounded-2xl border space-y-2.5 transition-all ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">
            <HelpCircle className="w-4 h-4" />
            <span>❓ WHY & HOW it works?</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {activeQ ? activeQ.conceptExplanation : `Technical explanation for ${currentTopic.name}.`}
          </p>
        </div>

        {/* 🚀 WHERE & HOW DO WE USE IT */}
        <div className={`p-5 rounded-2xl border space-y-2.5 transition-all ${
          isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
            <Zap className="w-4 h-4" />
            <span>🚀 WHERE & HOW in Real-Time?</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Applied in production Airflow DAGs, AWS Data Lakes, PySpark streaming jobs, and Snowflake analytical warehouses to handle large scale data processing with zero system downtime.
          </p>
        </div>

      </div>

      {/* 🖼️ VISUAL ARCHITECTURE FLOWCHART DIAGRAM */}
      <div className={`p-6 rounded-2xl border space-y-4 ${
        isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2 font-extrabold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
          <Layers className="w-4 h-4" />
          <span>🖼️ Real-Time Production Architecture Diagram</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className={`p-4 rounded-xl border space-y-1.5 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-indigo-50/50 border-indigo-100'}`}>
            <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">1. Raw Data Ingestion</div>
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Fetch API / S3 CSV files</div>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-indigo-50/50 border-indigo-100'}`}>
            <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">2. Spark / SQL Transform</div>
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Executes {activeSubtopic ? activeSubtopic.name : currentTopic.name} transformation</div>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-indigo-50/50 border-indigo-100'}`}>
            <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">3. Data Quality Assertions</div>
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Validates nulls, schema & primary keys</div>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-indigo-50/50 border-indigo-100'}`}>
            <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">4. Snowflake / S3 Load</div>
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>Publishes clean data to reporting marts</div>
          </div>
        </div>
      </div>

      {/* 💻 PRODUCTION CODE & SQL EXAMPLE */}
      {activeQ && activeQ.codeSnippet && (
        <div className="space-y-2">
          <div className="font-extrabold uppercase text-xs tracking-wider text-indigo-600 dark:text-indigo-400 font-mono flex items-center gap-2">
            <FileCode2 className="w-4 h-4" />
            <span>💻 Real-Time Production Implementation Code ({activeQ.codeSnippet.title})</span>
          </div>

          <VsCodeEditor
            code={activeQ.codeSnippet.code}
            language={activeQ.codeSnippet.language}
            title={activeQ.codeSnippet.title}
            isEditable={true}
          />
        </div>
      )}

    </div>
  );
}
