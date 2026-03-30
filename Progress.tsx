import React, { useEffect, useState } from 'react';
import { getProgress } from '../store';
import { UserProgress } from '../types';

export const Progress: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!progress) return null;

  // Generate last 28 days for the calendar
  const today = new Date();
  const days = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateString = d.toISOString().split('T')[0];
    const isCompleted = progress.history.some(h => h.date === dateString);
    days.push({ date: d, isCompleted });
  }

  return (
    <div className="p-6 pb-24 bg-background min-h-screen text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold tracking-tight mb-12 w-full text-left">Progress</h1>

      {/* BIG Streak */}
      <div className="flex flex-col items-center justify-center mb-16">
        <span className="text-[8rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-blue-500">
          {progress.streak}
        </span>
        <span className="text-xl font-medium text-slate-400 uppercase tracking-widest mt-2">Day Streak</span>
      </div>

      {/* Total Sessions */}
      <div className="w-full bg-card p-6 rounded-3xl mb-8 flex justify-between items-center">
        <span className="text-lg font-medium text-slate-300">Total Sessions</span>
        <span className="text-3xl font-bold">{progress.completedSessions}</span>
      </div>

      {/* Calendar Dots */}
      <div className="w-full bg-card p-8 rounded-3xl">
        <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-6 text-center">Last 28 Days</h3>
        <div className="grid grid-cols-7 gap-3">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-full ${day.isCompleted ? 'bg-primary-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]' : 'bg-slate-800'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};