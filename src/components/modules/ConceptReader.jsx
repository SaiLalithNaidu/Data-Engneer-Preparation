import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Code, 
  FileText, 
  Cpu, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Award,
  Clock,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ConceptReader({ 
  topic, 
  isCompleted, 
  onToggleComplete, 
  onNavigateSimulator, 
  onOpenPdfModal,
  isDarkMode,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('notes');
  const [expandedQAs, setExpandedQAs] = useState({});
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  if (!topic) return null;

  const toggleQA = (idx) => {
    setExpandedQAs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCompleteClick = () => {
    onToggleComplete(topic.id);
    if (!isCompleted) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCopyCode = (code, idx) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  return (
    <div className={`rounded-3xl border transition-all shadow-xl p-6 sm:p-8 space-y-6 ${
      isDarkMode ? 'bg-[#0f172a] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      
      {/* Top Header Bar matching NxtWave Drawer Image 3 */}
      <div className="flex items-center justify-between pb-4 border-b border-inherit">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
            {topic.category}
          </span>
          <span className="text-xs font-semibold text-slate-500">⏱️ {topic.readingTime}</span>
        </div>

        {/* Mastered Button */}
        <button
          onClick={handleCompleteClick}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
            isCompleted 
              ? 'bg-emerald-600 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {isCompleted ? 'Topic Mastered ✓' : 'Mark as Mastered'}
        </button>
      </div>

      {/* Title & Description */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
          {topic.title}
        </h1>
        <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          {topic.summary}
        </p>
      </div>

      {/* Prominent Callout Card: Key Learning Outcomes matching NxtWave Reference Image 3 */}
      <div className={`p-5 rounded-2xl border ${
        isDarkMode ? 'bg-indigo-950/40 border-indigo-500/60' : 'bg-indigo-50/70 border-indigo-300'
      }`}>
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-300 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4" /> Key Learning Outcomes
        </h3>

        <ul className="space-y-2 text-xs font-medium">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Master core architectural concepts and production syntax pattern for {topic.title}.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Gain hands-on experience through interactive simulators and real-world code snippets.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Prepare for top tech company interview questions with step-by-step explanations.</span>
          </li>
        </ul>
      </div>

      {/* Navigation Tabs (Study Notes, Interview Q&A, Simulators) */}
      <div className="flex items-center gap-2 border-b border-inherit pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'notes' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Study Notes & Concepts
        </button>

        {topic.interviewQuestions && topic.interviewQuestions.length > 0 && (
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'questions' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            Top Interview Questions ({topic.interviewQuestions.length})
          </button>
        )}

        {topic.interactiveSimulatorId && (
          <button
            onClick={() => onNavigateSimulator(topic.interactiveSimulatorId)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 text-white hover:bg-cyan-500 transition-all ml-auto"
          >
            <Cpu className="w-4 h-4" />
            Launch Visual Simulator →
          </button>
        )}
      </div>

      {/* Tab 1: Detailed Study Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-6 text-xs sm:text-sm leading-relaxed">
          
          <div 
            className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(topic.content) }} 
          />

          {/* Code Examples Section */}
          {topic.codeExamples && topic.codeExamples.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-inherit">
              <h3 className="font-extrabold text-sm flex items-center gap-2">
                <Code className="w-4 h-4 text-indigo-500" /> Production Code & Query Patterns
              </h3>

              {topic.codeExamples.map((ex, idx) => (
                <div key={idx} className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-[#060b13] border-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'}`}>
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700 text-xs font-semibold text-slate-300">
                    <span>{ex.title}</span>
                    <button
                      onClick={() => handleCopyCode(ex.code, idx)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                    >
                      {copiedCodeIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedCodeIdx === idx ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto">
                    <code>{ex.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Tab 2: Interview Questions Accordion */}
      {activeTab === 'questions' && topic.interviewQuestions && (
        <div className="space-y-4">
          {topic.interviewQuestions.map((q, idx) => {
            const isExpanded = expandedQAs[idx];
            return (
              <div key={idx} className={`rounded-2xl border overflow-hidden transition-all ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  onClick={() => toggleQA(idx)}
                  className="w-full p-4 text-left flex items-start justify-between gap-4 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-600 text-white rounded">
                        Q{idx + 1}
                      </span>
                      {q.companyTags && q.companyTags.map((tag, tagIdx) => (
                        <span key={`${tag}-${tagIdx}`} className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm">{q.question}</h3>
                  </div>

                  <div className="p-1.5 rounded-lg border border-inherit">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className={`p-4 border-t text-xs leading-relaxed space-y-2 ${
                    isDarkMode ? 'bg-[#060b13] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}>
                    <div className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">Answer & Key Explanation</div>
                    <p className="whitespace-pre-line">{q.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

function formatMarkdown(text = '') {
  if (!text) return '';
  return text
    .replace(/^### (.*$)/gim, '<h3 class="text-base font-extrabold mt-4 mb-2">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-sm font-bold text-indigo-500 dark:text-indigo-300 mt-3 mb-1.5">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-indigo-600 dark:text-cyan-300 rounded font-mono text-xs">$1</code>')
    .replace(/\n\n/g, '<br/><br/>');
}
