import React, { useState } from 'react';
import { RotateCw, CheckCircle, Flame, Layers, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FlashcardsView({ flashcards = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCardIds, setKnownCardIds] = useState([]);

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center">
        <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-300">No Flashcards Available</h3>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleRate = (rating) => {
    if (rating === 'easy') {
      if (!knownCardIds.includes(currentCard.id)) {
        setKnownCardIds(prev => [...prev, currentCard.id]);
      }
    }
    handleNext();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Header & Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-heading">
            <Sparkles className="w-5 h-5 text-purple-400" />
            3D Spaced Repetition Flashcards
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Click card to flip and test memory recall.</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
            Card {currentIndex + 1} of {flashcards.length}
          </span>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[320px] cursor-pointer perspective-1000 select-none"
      >
        <div className={`w-full min-h-[320px] rounded-3xl transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          
          {/* Card Content */}
          <div className="glass-panel w-full min-h-[320px] rounded-3xl border border-slate-800 p-8 flex flex-col justify-between shadow-2xl relative">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 bg-slate-800 text-purple-300 rounded-full border border-slate-700">
                {currentCard.category}
              </span>
              <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                <RotateCw className="w-3.5 h-3.5" />
                {isFlipped ? 'ANSWER SIDE' : 'QUESTION SIDE (Click to Flip)'}
              </span>
            </div>

            {/* Middle Question / Answer */}
            <div className="py-6 text-center space-y-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question</span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white leading-relaxed">
                    {currentCard.question}
                  </h3>
                </div>
              ) : (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Answer & Explanation</span>
                  <p className="text-base md:text-lg font-medium text-cyan-200 leading-relaxed whitespace-pre-line">
                    {currentCard.answer}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Indicator */}
            <div className="text-center">
              <span className="text-[11px] text-slate-500">Tap anywhere on card to flip</span>
            </div>

          </div>

        </div>
      </div>

      {/* Controls & Rating Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 text-xs font-bold transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRate('hard')}
            className="px-3.5 py-2 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/80 rounded-xl text-xs font-bold transition-all"
          >
            Hard 😓
          </button>
          <button
            onClick={() => handleRate('medium')}
            className="px-3.5 py-2 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/80 rounded-xl text-xs font-bold transition-all"
          >
            Medium 🤔
          </button>
          <button
            onClick={() => handleRate('easy')}
            className="px-3.5 py-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/80 rounded-xl text-xs font-bold transition-all"
          >
            Easy (Mastered) 🎉
          </button>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 text-xs font-bold transition-all"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
