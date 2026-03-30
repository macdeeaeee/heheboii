import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle2 } from 'lucide-react';
import { PROGRAMS, EXERCISES } from '../data';
import { WorkoutPlayer } from '../components/WorkoutPlayer';
import { saveSession } from '../store';

export const ProgramDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  const program = PROGRAMS.find((p) => p.id === id);

  if (!program) return <div>Program not found</div>;

  const handleWorkoutComplete = (duration: number) => {
    saveSession(program.id, duration);
    setIsWorkoutActive(false);
    setShowCompletion(true);
  };

  if (showCompletion) {
     return (
       <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-8 text-center animate-in fade-in text-white">
          <div className="w-24 h-24 bg-primary-500/20 text-primary-500 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Session Complete</h1>
          <p className="text-slate-400 text-lg mb-12">Consistency builds the persona.</p>
          <button 
            onClick={() => {
              setShowCompletion(false);
              navigate('/');
            }}
            className="w-full max-w-xs py-5 bg-white text-black rounded-full font-bold text-lg shadow-xl active:scale-95 transition-transform"
          >
            Continue
          </button>
       </div>
     )
  }

  if (isWorkoutActive) {
    return (
      <WorkoutPlayer 
        exerciseIds={program.exercises} 
        onComplete={handleWorkoutComplete}
        onClose={() => setIsWorkoutActive(false)}
      />
    );
  }

  return (
    <div className="pb-32 bg-background min-h-screen text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full p-6 flex items-center justify-between mb-4">
        <button onClick={() => navigate(-1)} className="p-3 bg-card rounded-full active:scale-95 transition-transform">
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
      </div>

      <div className="w-full px-6 flex flex-col items-center text-center mb-12">
        <span className="text-primary-400 font-bold tracking-widest uppercase text-sm mb-4">{program.difficulty} • {program.durationDays} Days</span>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{program.title}</h1>
        <p className="text-slate-400 text-lg max-w-xs">{program.description}</p>
      </div>

      {/* Overview */}
      <div className="w-full px-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Today's Routine</h2>
          <span className="text-slate-500 font-medium">{program.exercises.length} Exercises</span>
        </div>

        <div className="space-y-3">
          {program.exercises.map((exId, index) => {
            const ex = EXERCISES[exId];
            if (!ex) return null;
            return (
              <div key={index} className="flex items-center justify-between bg-card p-5 rounded-3xl">
                <div className="flex items-center gap-4">
                  <span className="text-slate-500 font-mono font-bold">{String(index + 1).padStart(2, '0')}</span>
                  <h4 className="font-semibold text-lg">{ex.title}</h4>
                </div>
                <span className="text-slate-400 font-medium">
                  {ex.type === 'TIMER' ? `${ex.durationSeconds}s` : `${ex.targetReps}x`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent pb-8 flex justify-center">
        <button 
          onClick={() => setIsWorkoutActive(true)}
          className="w-full max-w-sm py-5 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Play size={24} fill="currentColor" />
          Start Session
        </button>
      </div>
    </div>
  );
};