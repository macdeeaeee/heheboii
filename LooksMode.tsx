import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { LOOKS } from '../data';

export const LooksMode: React.FC = () => {
  const navigate = useNavigate();
  const [activeLookId, setActiveLookId] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const activeLook = LOOKS.find(l => l.id === activeLookId);

  const handleToggleStep = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  if (activeLook) {
    const allItems = [...activeLook.postureCues, ...activeLook.groomingActions, activeLook.outfitIdea];
    
    return (
      <div className="p-6 pb-24 bg-background min-h-screen text-white">
        <button 
          onClick={() => setActiveLookId(null)}
          className="flex items-center gap-2 text-slate-400 mb-8 active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <h1 className="text-4xl font-bold mb-10 tracking-tight">{activeLook.name}</h1>

        <div className="space-y-4">
          {allItems.map((item, index) => {
            const stepId = `${activeLook.id}-${index}`;
            const isChecked = completedSteps[stepId];
            return (
              <div 
                key={index}
                onClick={() => handleToggleStep(stepId)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all active:scale-[0.98] flex items-center gap-6 ${
                  isChecked 
                    ? 'bg-primary-900/20 border-primary-500/50' 
                    : 'bg-card border-slate-800'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isChecked ? 'bg-primary-500 text-white' : 'bg-slate-800 border border-slate-700 text-transparent'
                }`}>
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className={`text-lg font-medium transition-colors ${
                  isChecked ? 'text-slate-500 line-through' : 'text-slate-200'
                }`}>
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 space-y-8 bg-background min-h-screen text-white">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-card border border-slate-800 text-slate-300 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Looks Mode</h1>
        </div>
      </div>

      <div className="space-y-6">
        {LOOKS.map(look => (
          <div 
            key={look.id}
            onClick={() => setActiveLookId(look.id)}
            className="relative w-full overflow-hidden rounded-3xl p-8 bg-card border border-slate-800 shadow-2xl cursor-pointer active:scale-[0.98] transition-all"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6">{look.name}</h2>
              
              <div className="space-y-3">
                {look.groomingActions.slice(0, 3).map((action, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-300">{action}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Subtle Edge Glow */}
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-tl from-primary-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};
