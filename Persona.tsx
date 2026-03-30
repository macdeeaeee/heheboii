import React, { useState, useEffect } from 'react';
import { PERSONAS } from '../data';
import { getProgress, selectPersona } from '../store';
import { CheckCircle2, Circle, Shirt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Persona: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const p = getProgress();
    setSelectedId(p.selectedPersona || PERSONAS[0].id);
  }, []);

  const handleSelect = (id: string) => {
    selectPersona(id);
    setSelectedId(id);
  };

  const currentPersona = PERSONAS.find(p => p.id === selectedId) || PERSONAS[0];

  return (
    <div className="p-6 pb-24 space-y-8 bg-background min-h-screen text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Persona</h1>
      </div>

      <div className="bg-card border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-3">{currentPersona.name}</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-[250px] mx-auto leading-relaxed">{currentPersona.description}</p>
          
          <div className="space-y-4 text-left">
            {currentPersona.habits.slice(0, 3).map((habit, i) => (
              <div key={i} className="flex items-center gap-3 bg-background/50 p-4 rounded-2xl border border-slate-800/50">
                <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                <span className="text-sm font-medium text-slate-200">{habit}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => navigate('/style')}
            className="w-full mt-8 flex items-center justify-center gap-2 py-4 bg-white text-black rounded-full font-bold transition-transform active:scale-95"
          >
            <Shirt size={18} />
            View Style Guide
          </button>
        </div>
        
        {/* Subtle Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-b from-primary-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Switch Persona</h3>
        <div className="grid grid-cols-2 gap-3">
          {PERSONAS.slice(0, 6).map(persona => {
            const isSelected = persona.id === selectedId;
            return (
              <div 
                key={persona.id}
                onClick={() => handleSelect(persona.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all active:scale-95 flex flex-col items-center text-center gap-2 ${
                  isSelected 
                    ? 'bg-primary-900/20 border-primary-500' 
                    : 'bg-card border-slate-800 hover:border-slate-700'
                }`}
              >
                <h4 className={`font-bold text-sm ${isSelected ? 'text-primary-400' : 'text-slate-200'}`}>
                  {persona.name}
                </h4>
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
