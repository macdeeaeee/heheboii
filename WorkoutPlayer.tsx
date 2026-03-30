import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, SkipForward, CheckCircle } from 'lucide-react';
import { ExerciseType } from '../types';
import { EXERCISES } from '../data';
import { ExerciseAnimation } from './ExerciseAnimation';

interface WorkoutPlayerProps {
  exerciseIds: string[];
  onComplete: (duration: number) => void;
  onClose: () => void;
}

export const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ exerciseIds, onComplete, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(0);

  const currentExerciseId = exerciseIds[currentIndex];
  const exercise = EXERCISES[currentExerciseId];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Init exercise state
  useEffect(() => {
    if (exercise.type === ExerciseType.TIMER) {
      setTimeLeft(exercise.durationSeconds || 30);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, exercise]);

  // Timer logic
  useEffect(() => {
    if (isPlaying && timeLeft > 0 && exercise.type === ExerciseType.TIMER) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
        setTotalTimeElapsed(prev => prev + 1);
      }, 1000);
    } else if (timeLeft === 0 && exercise.type === ExerciseType.TIMER) {
      handleNext();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, timeLeft, exercise.type]);

  const handleNext = () => {
    if (currentIndex < exerciseIds.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete(totalTimeElapsed);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const progressPercent = ((currentIndex) / exerciseIds.length) * 100;

  return (
    <div className="fixed inset-0 bg-background z-[60] flex flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button onClick={onClose} className="p-3 bg-card rounded-full active:scale-95 transition-transform">
          <X size={24} className="text-slate-400" />
        </button>
        <div className="h-1.5 flex-1 mx-6 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <button onClick={handleNext} className="p-3 bg-card rounded-full active:scale-95 transition-transform">
          <SkipForward size={24} className="text-slate-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-between px-6 pb-12 pt-4">
        
        {/* Top: Exercise Name */}
        <div className="text-center w-full">
          <h2 className="text-4xl font-bold tracking-tight mb-2">{exercise.title}</h2>
        </div>

        {/* Center: Animation */}
        <div className="w-full aspect-square max-w-sm rounded-[3rem] overflow-hidden bg-card border border-slate-800 shadow-2xl relative flex items-center justify-center">
           <ExerciseAnimation type={exercise.animationType} />
           {/* Subtle Glow */}
           <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 to-transparent pointer-events-none" />
        </div>

        {/* Bottom: Timer & Cue */}
        <div className="w-full flex flex-col items-center">
          <p className="text-xl text-slate-300 font-medium mb-8 text-center px-4">
            {exercise.instructions[0]}
          </p>

          {exercise.type === ExerciseType.TIMER ? (
            <div className="flex flex-col items-center gap-6">
              <span className="text-7xl font-bold tracking-tighter font-mono">
                {timeLeft}<span className="text-3xl text-slate-500 ml-1">s</span>
              </span>
              <button 
                onClick={togglePlay}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-xl active:scale-95 transition-transform"
              >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 w-full max-w-xs">
              <span className="text-7xl font-bold tracking-tighter font-mono">
                {exercise.targetReps}<span className="text-3xl text-slate-500 ml-2">reps</span>
              </span>
              <button 
                onClick={handleNext}
                className="w-full py-5 bg-white text-black rounded-full font-bold text-lg shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <CheckCircle size={24} /> Complete Set
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};