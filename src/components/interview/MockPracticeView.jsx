import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import VsCodeEditor from '../common/VsCodeEditor';

export default function MockPracticeView({ topics = [], isDarkMode }) {
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0]?.id || 'sql');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const activeTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const questions = activeTopic?.questions || [];
  const currentQ = questions[currentQIndex];

  const handleOptionSelect = (optIdx) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(optIdx);
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: optIdx }));
    
    // Confetti on correct answer
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOptionIndex(userAnswers[currentQIndex + 1] ?? null);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQIndex(0);
    setSelectedOptionIndex(null);
    setUserAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header & Topic Selector */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-inherit pb-4">
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2 font-heading">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Topic-Wise Technical Mock Practice Mode
          </h2>
          <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Test your technical readiness across Python, SQL, AWS, PySpark, Snowflake, and dbt.
          </p>
        </div>

        {/* Topic Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {topics.map(t => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTopicId(t.id);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTopicId === t.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                  : isDarkMode ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {!isFinished && currentQ ? (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 shadow-sm text-slate-900'
        }`}>
          
          <div className={`flex items-center justify-between text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>Question {currentQIndex + 1} of {questions.length}</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-mono">Topic: {activeTopic.name}</span>
          </div>

          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all"
              style={{ width: `${((currentQIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold tracking-tight font-heading">
            {currentQ.question}
          </h3>

          {/* Technical Concept Explanation & Code Box */}
          <div className={`p-5 rounded-2xl border text-xs space-y-3 ${
            isDarkMode ? 'bg-[#060b13] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] tracking-wider">
              Technical Concept & Explanation
            </div>
            <p className="whitespace-pre-line">{currentQ.conceptExplanation}</p>

            {currentQ.codeSnippet && (
              <VsCodeEditor
                code={currentQ.codeSnippet.code}
                language={currentQ.codeSnippet.language}
                title={currentQ.codeSnippet.title}
                isEditable={true}
              />
            )}
          </div>

          {/* Self Assessment Buttons */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Review the technical solution above.</div>
            
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2"
            >
              {currentQIndex < questions.length - 1 ? 'Next Question →' : 'Complete Topic Practice 🏆'}
            </button>
          </div>

        </div>
      ) : (
        <div className={`p-8 rounded-3xl border text-center space-y-6 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}>
          <Trophy className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-2xl font-extrabold font-heading">Topic Practice Complete!</h3>
          <p className="text-xs text-slate-400">You reviewed all technical questions for {activeTopic.name}.</p>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
          >
            Review Topic Again
          </button>
        </div>
      )}

    </div>
  );
}
