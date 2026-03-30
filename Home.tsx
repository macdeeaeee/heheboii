import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProgress } from '../store';
import { UserProgress, Program } from '../types';
import { PROGRAMS, LOOKS } from '../data';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [recommendedProgram, setRecommendedProgram] = useState<Program>(PROGRAMS[0]);

  useEffect(() => {
    const p = getProgress();
    setProgress(p);
    
    if (p.completedSessions >= 21) {
       setRecommendedProgram(PROGRAMS[2]); // Posture
    } else if (p.completedSessions >= 7) {
       setRecommendedProgram(PROGRAMS[1]); // Mewing
    } else {
       setRecommendedProgram(PROGRAMS[0]); // Starter
    }
  }, []);

  if (!progress) return null;

  return (
    <div className="p-6 pb-24 space-y-8 bg-background min-h-screen text-white">
      {/* 1. HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Good Evening</h1>
          <p className="text-slate-400 mt-1">Stay consistent.</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold tracking-tighter">{progress.streak}</span>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Day Streak</p>
        </div>
      </div>

      {/* 2. MAIN CARD (FOCUS) */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Today's Routine</h2>
        <div 
          onClick={() => navigate(`/programs/${recommendedProgram.id}`)}
          className="relative w-full overflow-hidden rounded-3xl p-8 bg-card border border-slate-800 shadow-2xl cursor-pointer active:scale-[0.98] transition-all"
        >
          <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
            <div>
              <h3 className="text-2xl font-bold mb-2">{recommendedProgram.title}</h3>
              <p className="text-slate-400 text-sm line-clamp-2">{recommendedProgram.description}</p>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm font-medium text-slate-500">{recommendedProgram.durationDays} Days • ~10 Min</span>
              <button className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg shadow-primary-500/20">
                Start Now
              </button>
            </div>
          </div>
          
          {/* Subtle Gradient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        </div>
      </div>

      {/* 3. LOOKS MODE (SECONDARY) */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-semibold text-white">Looks Mode</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {LOOKS.slice(0, 3).map(look => (
            <div 
              key={look.id}
              onClick={() => navigate('/looks')}
              className="flex-shrink-0 w-64 bg-card border border-slate-800 rounded-2xl p-5 cursor-pointer active:scale-[0.98] transition-transform"
            >
              <h3 className="text-lg font-bold text-white mb-1">{look.name}</h3>
              <p className="text-xs text-slate-400 line-clamp-1">{look.outfitIdea}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};