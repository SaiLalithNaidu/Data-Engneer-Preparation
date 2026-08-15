import React, { useState } from 'react';
import {
  Code,
  Database,
  Cpu,
  Cloud,
  Zap,
  Server,
  Snowflake,
  Layers,
  Trophy,
  FileText,
  Sun,
  Moon,
  Sparkles,
  X,
  ChevronDown,
  ChevronRight,
  FileCode2
} from 'lucide-react';

const TOPIC_ICONS = {
  python: Code,
  sql: Database,
  "python-etl": Cpu,
  aws: Cloud,
  pyspark: Zap,
  hive: Server,
  hadoop: Server,
  snowflake: Snowflake,
  dbt: Layers
};

export default function Sidebar({
  topics = [],
  selectedTopicId,
  setSelectedTopicId,
  selectedSubtopicId,
  setSelectedSubtopicId,
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  masteredQIds = [],
  onOpenPdfModal,
  isMobileOpen = false,
  onCloseMobile = () => { }
}) {
  const [expandedTopicIds, setExpandedTopicIds] = useState({
    [selectedTopicId || 'python']: true
  });

  const totalQuestions = topics.reduce((acc, t) => acc + t.questions.length, 0);
  const masteredCount = masteredQIds.length;

  const toggleTopicTree = (tId, e) => {
    e.stopPropagation();
    setExpandedTopicIds(prev => ({
      ...prev,
      [tId]: !prev[tId]
    }));
  };

  const handleSelectParentTopic = (tId) => {
    setSelectedTopicId(tId);
    setSelectedSubtopicId(null);
    setActiveTab('topic');
    setExpandedTopicIds(prev => ({ ...prev, [tId]: true }));
  };

  const handleSelectSubtopic = (tId, subId) => {
    setSelectedTopicId(tId);
    setSelectedSubtopicId(subId);
    setActiveTab('topic');
  };

  const sidebarContent = (
    <div className={`w-[295px] flex-shrink-0 h-full flex flex-col border-r select-none transition-colors duration-300 ${isDarkMode ? 'bg-[#0b111e] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
      }`}>

      {/* Brand Header */}
      <div className="p-4 border-b flex items-center justify-between border-inherit flex-shrink-0">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 p-0.5 shadow-sm flex-shrink-0">
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-base tracking-tight font-heading bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                DataEng
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded">
                TREE VIEW
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Full Topic Names Visible</p>
          </div>
        </div>

        {/* Close Button on Mobile Drawer */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tree Navigation Container */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">

        {/* Practice Mode Quick Button */}
        <button
          onClick={() => {
            setActiveTab('practice');
            onCloseMobile();
          }}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'practice'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
              : isDarkMode ? 'bg-slate-900 text-amber-300 border border-slate-800' : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
        >
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Mock Technical Practice</span>
          </div>
          <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
            Test
          </span>
        </button>

        {/* Section Header */}
        <div>
          <div className="sidebar-section-title">
            <span>Topic Tree Navigation</span>
          </div>

          {/* Collapsible Tree Structure with Full Names Visible */}
          <div className="space-y-1 mt-1">
            {topics.map((t) => {
              const IconComponent = TOPIC_ICONS[t.id] || Database;
              const isTopicActive = activeTab === 'topic' && selectedTopicId === t.id;
              const isExpanded = expandedTopicIds[t.id] ?? (selectedTopicId === t.id);
              const topicMastered = t.questions.filter(q => masteredQIds.includes(q.id)).length;

              return (
                <div key={t.id} className="space-y-1">

                  {/* Main Parent Topic Tree Node */}
                  <div
                    onClick={() => handleSelectParentTopic(t.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${isTopicActive && !selectedSubtopicId
                        ? isDarkMode
                          ? 'bg-indigo-950/90 text-indigo-300 border border-indigo-800 shadow-sm'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                        : isDarkMode
                          ? 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0 pr-1">
                      {/* Chevron Arrow */}
                      <button
                        onClick={(e) => toggleTopicTree(t.id, e)}
                        className="p-1 hover:bg-black/10 rounded transition-all text-slate-400 hover:text-indigo-500 flex-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-indigo-500" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Icon */}
                      <IconComponent className={`w-4 h-4 flex-shrink-0 ${isTopicActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`} />
                      <span className="font-bold text-xs sm:text-sm leading-tight text-left">
                        {t.name}
                      </span>
                    </div>

                    {/* Progress Badge */}
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${topicMastered === t.questions.length && t.questions.length > 0
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-100 text-slate-400'
                      }`}>
                      {topicMastered}/{t.questions.length}
                    </span>
                  </div>

                  {/* Child Subtopic Tree Nodes (FULL NAMES VISIBLE ON 1 OR 2 LINES!) */}
                  {isExpanded && t.subtopics && (
                    <div className="pl-3.5 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-3 py-1">
                      {t.subtopics.map((sub) => {
                        const isSubActive = isTopicActive && selectedSubtopicId === sub.id;
                        const subMasteredCount = t.questions.filter(q => q.subtopicId === sub.id && masteredQIds.includes(q.id)).length;

                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              handleSelectSubtopic(t.id, sub.id);
                              onCloseMobile();
                            }}
                            className={`w-full flex items-start justify-between px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all text-left ${isSubActive
                                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                                : isDarkMode
                                  ? 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                              }`}
                          >
                            <div className="flex items-start gap-1.5 flex-1 min-w-0 pr-1">
                              <FileCode2 className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${isSubActive ? 'text-white' : 'text-indigo-400'}`} />
                              <span className="leading-snug break-words font-medium">
                                {sub.name}
                              </span>
                            </div>

                            <span className={`text-[9px] font-mono font-bold px-1 py-0.2 rounded flex-shrink-0 mt-0.5 ${isSubActive ? 'bg-white/20 text-white' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                              }`}>
                              {subMasteredCount}/{sub.qCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Source PDF Library Link */}
        <div className="pt-2">
          <button
            onClick={() => {
              onOpenPdfModal();
              onCloseMobile();
            }}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${isDarkMode ? 'bg-slate-900 text-cyan-300 border border-slate-800' : 'bg-slate-50 text-cyan-700 border border-cyan-100'
              }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-cyan-500" />
              <span>Original Study PDFs</span>
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
              18 PDFs
            </span>
          </button>
        </div>

      </div>

      {/* Footer & Day / Night Theme Switcher */}
      <div className="p-4 border-t border-inherit space-y-3 flex-shrink-0">

        {/* Overall Mastered Questions Progress */}
        <div className={`p-3 rounded-xl border text-xs space-y-2 ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
          <div className="flex items-center justify-between font-bold">
            <span className="text-slate-400 text-[11px] uppercase font-mono">Mastered Progress</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">
              {masteredCount}/{totalQuestions} Qs
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${totalQuestions > 0 ? Math.round((masteredCount / totalQuestions) * 100) : 0}%` }}
            />
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${isDarkMode
              ? 'bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-800'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>{isDarkMode ? 'Night Mode' : 'Day Mode'}</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
            Switch
          </span>
        </button>

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 flex-shrink-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Over Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />
          <div className="relative flex-1 max-w-[295px] w-full h-full z-10 animate-slide-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
