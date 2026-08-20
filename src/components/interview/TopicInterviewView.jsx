import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Search, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import VsCodeEditor from '../common/VsCodeEditor';

const QUESTIONS_PER_PAGE = 15;

export default function TopicInterviewView({ 
  topic, 
  selectedSubtopicId = null,
  masteredQIds = [], 
  onToggleMastered, 
  isDarkMode 
}) {
  const [expandedQIds, setExpandedQIds] = useState({});
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  if (!topic) return null;

  const toggleQA = (qId) => {
    setExpandedQIds(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleMasteredClick = (qId) => {
    const isNowMastered = !masteredQIds.includes(qId);
    onToggleMastered(qId);
    if (isNowMastered) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  // Filter questions based on subtopic, search & difficulty
  const activeSubtopicObj = topic.subtopics ? topic.subtopics.find(s => s.id === selectedSubtopicId) : null;

  const filteredQuestions = topic.questions.filter(q => {
    const matchesSubtopic = !selectedSubtopicId || q.subtopicId === selectedSubtopicId;

    const matchesSearch = searchFilter.trim() === '' || 
      q.question.toLowerCase().includes(searchFilter.toLowerCase()) ||
      q.conceptExplanation.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (q.companyTags && q.companyTags.some(tag => tag.toLowerCase().includes(searchFilter.toLowerCase())));

    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    return matchesSubtopic && matchesSearch && matchesDifficulty;
  });

  // Pagination math
  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  const topicMasteredCount = topic.questions.filter(q => masteredQIds.includes(q.id)).length;
  const topicPct = topic.questions.length > 0 ? Math.round((topicMasteredCount / topic.questions.length) * 100) : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Premium Topic Header Banner - 100% Mobile Responsive */}
      <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-[#090e1a] border-slate-800 text-white shadow-xl' 
          : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{topic.category} • 200+ Questions</span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              {topic.name} {activeSubtopicObj ? `→ ${activeSubtopicObj.name}` : 'Interview Bank'}
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {topic.description}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-center w-full sm:w-auto ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200 shadow-xs'}`}>
              <div className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Questions</div>
              <div className="text-xl sm:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{topic.questions.length} Qs</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">{topicMasteredCount} Mastered ({topicPct}%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Pagination Control Bar - 100% Mobile Responsive */}
      <div className={`p-3 sm:p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
        isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${topic.name} questions...`}
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full text-xs pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          />
        </div>

        {/* Difficulty Filter */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs font-semibold overflow-x-auto whitespace-nowrap ${
          isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1 flex-shrink-0" />
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => {
                setSelectedDifficulty(diff);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all text-xs ${
                selectedDifficulty === diff 
                  ? 'bg-indigo-600 text-white font-bold shadow-xs' 
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Pagination Navigation */}
        <div className="flex items-center justify-between md:justify-end gap-2 text-xs font-semibold">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-lg border disabled:opacity-30 transition-all ${
              isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-indigo-500" />
          </button>
          <span className={`font-mono text-[11px] sm:text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-1.5 rounded-lg border disabled:opacity-30 transition-all ${
              isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <ChevronRight className="w-4 h-4 text-indigo-500" />
          </button>
        </div>

      </div>

      {/* Question Cards List */}
      <div className="space-y-3.5">
        {paginatedQuestions.length > 0 ? (
          paginatedQuestions.map((q, idx) => {
            const overallIdx = startIndex + idx + 1;
            const isExpanded = expandedQIds[q.id] ?? true;
            const isMastered = masteredQIds.includes(q.id);

            return (
              <div
                key={q.id}
                className={`rounded-2xl border overflow-hidden transition-all ${
                  isDarkMode 
                    ? 'bg-[#0d1527] border-slate-800 hover:border-indigo-500/40 shadow-md' 
                    : 'bg-white border-slate-200 shadow-xs hover:border-indigo-300'
                }`}
              >
                
                {/* Question Card Header - 100% Mobile Responsive */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start justify-between gap-3">
                  
                  <div className="space-y-2 flex-1 min-w-0">
                    
                    {/* Badges & Tags */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-indigo-600 text-white rounded-md font-mono shadow-xs">
                        Q{overallIdx} / 200
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                        q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' :
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                      }`}>
                        {q.difficulty}
                      </span>

                      {q.companyTags && q.companyTags.map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200 dark:border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Question Statement */}
                    <h3 className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight font-heading leading-snug">
                      {q.question}
                    </h3>

                  </div>

                  {/* Actions: Mastered Toggle & Expand */}
                  <div className="flex items-center gap-2 self-end sm:self-start flex-shrink-0">
                    <button
                      onClick={() => handleMasteredClick(q.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isMastered 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                          : isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isMastered ? 'Mastered ✓' : 'Mark Mastered'}</span>
                    </button>

                    <button
                      onClick={() => toggleQA(q.id)}
                      className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Answer & Technical Code Details */}
                {isExpanded && (
                  <div className={`p-4 sm:p-5 border-t space-y-4 text-xs sm:text-sm leading-relaxed ${
                    isDarkMode ? 'bg-[#070c17] border-slate-800 text-slate-300' : 'bg-slate-50/80 border-slate-200 text-slate-700'
                  }`}>
                    
                    {/* Technical Concept Explanation */}
                    <div className="space-y-1.5">
                      <div className="font-extrabold uppercase text-[10px] tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                        Simple Explanation & Easy Rule
                      </div>
                      <p className="whitespace-pre-line leading-relaxed text-xs sm:text-sm">{q.conceptExplanation}</p>
                    </div>

                    {/* Production Code Snippet with VS Code Syntax Highlighting */}
                    {q.codeSnippet && (
                      <div className="overflow-x-auto max-w-full">
                        <VsCodeEditor
                          code={q.codeSnippet.code}
                          language={q.codeSnippet.language}
                          title={q.codeSnippet.title}
                          isEditable={true}
                        />
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className={`p-8 sm:p-12 rounded-3xl border text-center space-y-2 ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}>
            <HelpCircle className="w-10 h-10 mx-auto text-slate-400" />
            <h3 className="font-bold text-sm">No Questions Match Filter</h3>
            <p className="text-xs">Try adjusting your search query or difficulty filter.</p>
          </div>
        )}
      </div>

      {/* Bottom Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-inherit text-xs font-semibold">
          <span className="text-slate-400 font-mono text-[11px]">
            Showing {startIndex + 1} to {Math.min(startIndex + QUESTIONS_PER_PAGE, filteredQuestions.length)} of {filteredQuestions.length} Questions
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-inherit disabled:opacity-30 hover:bg-indigo-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold"
            >
              ← Previous
            </button>
            <span className="font-mono px-1 text-[11px]">Page {currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-xl border border-inherit disabled:opacity-30 hover:bg-indigo-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold"
            >
              Next →
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
