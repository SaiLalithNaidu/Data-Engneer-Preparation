import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Cpu, 
  Layers, 
  BookOpen, 
  HelpCircle,
  Award,
  Zap
} from 'lucide-react';
import StepByStepRoadmap from '../roadmap/StepByStepRoadmap';

export default function DashboardView({ 
  modules = [], 
  completedTopicIds = [], 
  dailyStreak = 3, 
  isDarkMode, 
  onSelectTopic, 
  onNavigateTab,
  activeFilterTab
}) {
  // Flatten all topics for card grid rendering
  const allTopics = modules.flatMap(m => 
    m.topics.map(t => ({
      ...t,
      moduleTitle: m.title,
      moduleId: m.id,
      moduleIcon: m.icon,
      sourceFiles: m.sourceFiles
    }))
  );

  // Filter topics based on activeFilterTab
  const filteredTopics = allTopics.filter(t => {
    if (activeFilterTab === 'Skill-Wise') return true;
    if (activeFilterTab === 'Company-Wise') return t.difficulty === 'Hard' || t.interviewQuestions?.length > 0;
    if (activeFilterTab === 'Crash Courses') return t.readingTime.includes('8') || t.readingTime.includes('10');
    return true;
  });

  const completedCount = completedTopicIds.length;
  const totalCount = allTopics.length;
  const overallPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8">
      
      {/* Hero Banner Header matching Image 2 */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-r from-[#0b1120] via-[#0f172a] to-[#1e1b4b] border-slate-800 text-white' 
          : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-100 text-slate-900 bg-grid-pattern shadow-sm'
      }`}>
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NxtWave Style Data Engineering Learning Hub</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Explore Data Engineering Mastery Hub
          </h1>

          <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Master SQL window functions, PySpark 4.0, Snowflake architecture, Apache Airflow DAGs, and AWS Data Engineering through interactive simulators and curated interview guides.
          </p>

          {/* Quick Stats Strip */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'}`}>
              <div className="text-[10px] font-bold uppercase text-slate-400">Completion Score</div>
              <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">{overallPct}%</div>
            </div>

            <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'}`}>
              <div className="text-[10px] font-bold uppercase text-slate-400">Topics Completed</div>
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">{completedCount}/{totalCount}</div>
            </div>

            <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'}`}>
              <div className="text-[10px] font-bold uppercase text-slate-400">Active Streak</div>
              <div className="text-xl font-extrabold text-amber-500 font-mono mt-0.5 flex items-center gap-1">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                {dailyStreak} Days
              </div>
            </div>

            <div className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'}`}>
              <div className="text-[10px] font-bold uppercase text-slate-400">Interview Qs Ready</div>
              <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono mt-0.5">150+ Qs</div>
            </div>
          </div>

        </div>

      </div>

      {/* Step-by-Step Learning Roadmap Engine */}
      <StepByStepRoadmap
        completedTopicIds={completedTopicIds}
        onSelectTopic={onSelectTopic}
        isDarkMode={isDarkMode}
      />

      {/* Main Grid: Card Gallery matching NxtWave Reference Image 2 */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight font-heading flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" />
              Featured Study Modules & Concepts
            </h2>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Select any card to start reading interactive notes or practice interview questions.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
            {filteredTopics.length} Modules Available
          </span>
        </div>

        {/* 3-Column Grid Cards matching NxtWave Reference Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, idx) => {
            const isCompleted = completedTopicIds.includes(topic.id);
            
            // Generate visual color themes for top card thumbnail headers
            const colorThemes = [
              { bg: 'from-blue-600 to-indigo-700', badge: 'bg-amber-100 text-amber-800 border-amber-300', tag: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' },
              { bg: 'from-purple-600 to-pink-600', badge: 'bg-yellow-100 text-yellow-800 border-yellow-300', tag: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' },
              { bg: 'from-emerald-600 to-teal-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', tag: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' },
              { bg: 'from-cyan-600 to-blue-700', badge: 'bg-indigo-100 text-indigo-800 border-indigo-300', tag: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300' }
            ];

            const theme = colorThemes[idx % colorThemes.length];

            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.moduleId, topic.id)}
                className={`nxt-card rounded-2xl border overflow-hidden cursor-pointer flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-[#0f172a] border-slate-800 hover:border-indigo-500/50' 
                    : 'bg-white border-slate-200/90 shadow-sm hover:border-indigo-300'
                }`}
              >
                
                {/* Top Card Thumbnail Banner matching Image 2 */}
                <div className={`h-28 bg-gradient-to-r ${theme.bg} p-4 flex flex-col justify-between relative`}>
                  
                  {/* Top Badge (e.g., "Top Interview Target" or "FAANG Ready") */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm flex items-center gap-1 ${theme.badge}`}>
                      <Award className="w-3 h-3" />
                      {topic.difficulty === 'Hard' ? 'High Priority' : 'Core Concept'}
                    </span>

                    {isCompleted && (
                      <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3" /> Mastered
                      </span>
                    )}
                  </div>

                  {/* Category Pill Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 bg-white/90 text-slate-900 rounded-md font-mono shadow-sm">
                      {topic.category}
                    </span>
                    <span className="text-[10px] font-semibold text-white/90 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-md">
                      ⏱️ {topic.readingTime}
                    </span>
                  </div>

                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base leading-snug line-clamp-2 font-heading">
                      {topic.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {topic.summary}
                    </p>
                  </div>

                  {/* Card Footer matching author info on Image 2 */}
                  <div className="pt-3 border-t border-inherit flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-[10px]">
                        DE
                      </div>
                      <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {topic.moduleTitle}
                      </span>
                    </div>

                    <div className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                      Start →
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
