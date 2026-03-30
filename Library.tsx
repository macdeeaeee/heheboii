import React from 'react';
import { EXERCISES } from '../data';
import { ExerciseAnimation } from '../components/ExerciseAnimation';

export const Library: React.FC = () => {
  const exercises = Object.values(EXERCISES);

  return (
    <div className="p-6 pb-24 bg-background min-h-screen text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold tracking-tight mb-12 w-full text-left">Library</h1>

      <div className="w-full space-y-8">
        {exercises.map((ex) => (
          <div key={ex.id} className="bg-card rounded-[2rem] overflow-hidden flex flex-col">
            <div className="h-64 w-full bg-slate-900/50 flex items-center justify-center relative">
              <ExerciseAnimation type={ex.animationType} />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="p-8 pt-0 relative z-10">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-2xl font-bold">{ex.title}</h3>
                 <span className="text-xs font-bold uppercase tracking-widest text-primary-400">{ex.category}</span>
              </div>
              
              <p className="text-slate-400 text-base mb-6 leading-relaxed">{ex.description}</p>
              
              <div className="space-y-3">
                {ex.instructions.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-slate-600 font-mono font-bold">{i + 1}</span>
                    <p className="text-slate-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};