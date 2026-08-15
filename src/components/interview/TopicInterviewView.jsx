import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Code, 
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
  const [copiedCodeId, setCopiedCodeId] = useState(null);
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
    <div className="space-y-6">
      
      {/* Premium Topic Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-r from-[#0c1322] via-[#111a2e] to-[#1d1945] border-indigo-900/40 text-white shadow-xl' 
          : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-indigo-100 text-slate-900 shadow-md'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{topic.category} • 200+ Technical Questions</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading flex items-center gap-3">
              {topic.name} {activeSubtopicObj ? `→ ${activeSubtopicObj.name}` : 'Interview Bank'}
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {topic.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-4 rounded-2xl border text-center ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-sm'}`}>
              <div className="text-[10px] font-bold uppercase text-slate-400">Total Questions</div>
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{topic.questions.length} Qs</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-bold">{topicMasteredCount} Mastered ({topicPct}%)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Pagination Control Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0d1527] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search across 200 ${topic.name} questions...`}
            value={searchFilter}
            onChange={(e) => {
              setSearchFilter(e.target.value);
              setCurrentPage(1);
            }}
            className={`w-full text-xs pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
              isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          />
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-inherit text-xs font-semibold">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => {
                setSelectedDifficulty(diff);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedDifficulty === diff 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Pagination Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-inherit disabled:opacity-30 hover:bg-indigo-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4 text-indigo-500" />
          </button>
          <span className="font-mono text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-inherit disabled:opacity-30 hover:bg-indigo-50 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4 text-indigo-500" />
          </button>
        </div>

      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
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
                    : 'bg-white border-slate-200/90 shadow-sm hover:border-indigo-300'
                }`}
              >
                
                {/* Question Card Header */}
                <div className="p-5 flex items-start justify-between gap-4">
                  
                  <div className="space-y-2 flex-1 min-w-0">
                    
                    {/* Badges & Tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md font-mono shadow-sm">
                        Q{overallIdx} / 200
                      </span>

                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
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
                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight font-heading">
                      {q.question}
                    </h3>

                  </div>

                  {/* Actions: Mastered Toggle & Expand */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleMasteredClick(q.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isMastered 
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-sm' 
                          : isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {isMastered ? 'Mastered ✓' : 'Mark Mastered'}
                    </button>

                    <button
                      onClick={() => toggleQA(q.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Answer & Technical Code Details */}
                {isExpanded && (
                  <div className={`p-5 border-t space-y-4 text-xs sm:text-sm leading-relaxed ${
                    isDarkMode ? 'bg-[#070c17] border-slate-800 text-slate-300' : 'bg-slate-50/80 border-slate-200 text-slate-700'
                  }`}>
                    
                    {/* Technical Concept Explanation */}
                    <div className="space-y-1.5">
                      <div className="font-extrabold uppercase text-[10px] tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                        Simple Explanation & Easy Rule
                      </div>
                      <p className="whitespace-pre-line leading-relaxed">{q.conceptExplanation}</p>
                    </div>

                    {/* Production Code Snippet with VS Code Syntax Highlighting */}
                    {q.codeSnippet && (
                      <VsCodeEditor
                        code={q.codeSnippet.code}
                        language={q.codeSnippet.language}
                        title={q.codeSnippet.title}
                        isEditable={true}
                      />
                    )}

                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className={`p-12 rounded-3xl border text-center space-y-2 ${
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
        <div className="flex items-center justify-between pt-4 border-t border-inherit text-xs font-semibold">
          <span className="text-slate-400 font-mono">
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
            <span className="font-mono px-2">Page {currentPage} / {totalPages}</span>
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
