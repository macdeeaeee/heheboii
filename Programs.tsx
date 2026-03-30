import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROGRAMS } from '../data';

export const Programs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 pb-24 bg-background min-h-screen text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold tracking-tight mb-12 w-full text-left">Programs</h1>
      
      <div className="w-full space-y-6">
        {PROGRAMS.map((program) => (
          <div 
            key={program.id}
            onClick={() => navigate(`/programs/${program.id}`)}
            className="bg-card rounded-[2rem] p-8 active:scale-95 transition-transform cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-400">
                {program.difficulty}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {program.durationDays} Days
              </span>
            </div>
            
            <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
            <p className="text-slate-400 text-base leading-relaxed line-clamp-2">{program.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};