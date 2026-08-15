import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizView({ quizzes = [] }) {
  const [selectedQuizId, setSelectedQuizId] = useState(quizzes[0]?.id || null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeQuiz = quizzes.find(q => q.id === selectedQuizId) || quizzes[0];
  const questions = activeQuiz?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIdx) => {
    if (selectedOptionIndex !== null) return; // Answer locked for current question
    setSelectedOptionIndex(optionIdx);
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIdx }));

    if (optionIdx === currentQuestion.correctIndex) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(userAnswers[currentQuestionIndex + 1] ?? null);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setUserAnswers({});
    setIsSubmitted(false);
  };

  // Score Calculation
  const correctCount = Object.keys(userAnswers).filter(
    idx => userAnswers[idx] === questions[idx].correctIndex
  ).length;

  const scorePct = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Selector Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-heading">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Data Engineer Mock Interview Quiz Mode
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Test your real-world SQL, PySpark & Snowflake interview readiness.</p>
        </div>

        <div className="flex items-center gap-2">
          {quizzes.map(q => (
            <button
              key={q.id}
              onClick={() => {
                setSelectedQuizId(q.id);
                handleResetQuiz();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedQuizId === q.id 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>

      {!isSubmitted ? (
        currentQuestion && (
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
            
            {/* Question Progress Bar */}
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="text-emerald-400 font-mono font-bold">Category: {activeQuiz.category}</span>
            </div>
            
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-lg md:text-xl font-extrabold text-white leading-relaxed font-heading">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedOptionIndex === optIdx;
                const isCorrect = optIdx === currentQuestion.correctIndex;
                const isAnswered = selectedOptionIndex !== null;

                let optionStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40';

                if (isAnswered) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                  } else {
                    optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-600';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-left text-xs md:text-sm transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-950 flex items-center justify-center font-mono font-bold text-xs">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box revealed after answering */}
            {selectedOptionIndex !== null && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1 animate-fadeIn">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">Explanation</span>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Next Question Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextQuestion}
                disabled={selectedOptionIndex === null}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-40 shadow-lg shadow-emerald-500/20"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'See Final Score 🏆'}
              </button>
            </div>

          </div>
        )
      ) : (
        /* Final Score Analytics View */
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-white font-heading">Quiz Completed!</h3>
            <p className="text-xs text-slate-400">Here is your interview readiness score</p>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 max-w-sm mx-auto space-y-2">
            <div className="text-4xl font-extrabold text-emerald-400 font-mono">{scorePct}%</div>
            <div className="text-xs font-semibold text-slate-300">
              {correctCount} out of {questions.length} Questions Correct
            </div>
          </div>

          <button
            onClick={handleResetQuiz}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 text-xs font-bold transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </button>
        </div>
      )}

    </div>
  );
}
