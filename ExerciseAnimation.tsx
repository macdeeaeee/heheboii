import React from 'react';
import { AnimationType } from '../types';

interface ExerciseAnimationProps {
  type: AnimationType;
  className?: string;
}

export const ExerciseAnimation: React.FC<ExerciseAnimationProps> = ({ type, className = '' }) => {
  // Base colors
  const skinColor = "#1e293b"; // slate-800
  const outlineColor = "#64748b"; // slate-500
  const highlightColor = "#8b5cf6"; // primary-500

  // Animation class determination
  const getAnimClass = () => {
    switch (type) {
      case 'chin-lift': return 'anim-chin-lift';
      case 'chin-tuck': return 'anim-chin-tuck';
      case 'neck-tilt': return 'anim-neck-tilt';
      case 'jaw-release': return 'anim-jaw-slide';
      default: return '';
    }
  };

  const animClass = getAnimClass();

  return (
    <div className={`w-full h-full flex items-center justify-center bg-slate-900 ${className}`}>
      <svg viewBox="0 0 200 250" className="w-full h-full max-h-[300px]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="face-clip">
            <rect x="0" y="0" width="200" height="250" />
          </clipPath>
        </defs>
        
        {/* Static Body/Shoulders */}
        <path d="M40 220 C40 200 60 190 70 185 L 130 185 C 140 190 160 200 160 220 V 250 H 40 V 220" fill={skinColor} stroke={outlineColor} strokeWidth="2" />
        
        {/* Animated Head Group */}
        <g className={animClass} style={{ transformOrigin: '100px 170px' }}>
          {/* Neck */}
          <path d="M85 150 L 85 190" stroke={outlineColor} strokeWidth="2" />
          <path d="M115 150 L 115 190" stroke={outlineColor} strokeWidth="2" />

          {/* Head Shape (Neutral) */}
          <path d="M60 80 C 60 30 140 30 140 80 V 130 C 140 160 100 170 60 130 V 80" fill="#0f1115" stroke={outlineColor} strokeWidth="3" />
          
          {/* Features */}
          {/* Eyes */}
          <path d="M75 90 Q 80 85 85 90" stroke={outlineColor} strokeWidth="2" fill="none" />
          <path d="M115 90 Q 120 85 125 90" stroke={outlineColor} strokeWidth="2" fill="none" />
          
          {/* Nose */}
          <path d="M100 95 L 95 110 H 105" stroke={outlineColor} strokeWidth="1.5" fill="none" />
          
          {/* Mouth */}
          <path d="M90 130 Q 100 135 110 130" stroke={outlineColor} strokeWidth="1.5" fill="none" />

          {/* Mewing Indicator (Tongue Highlight) */}
          {type === 'tongue-press' && (
            <g className="anim-tongue-pulse">
               <circle cx="100" cy="90" r="15" fill={highlightColor} opacity="0.5" />
               <path d="M100 115 L100 90" stroke={highlightColor} strokeWidth="2" strokeDasharray="4 2" />
               <text x="130" y="60" fontSize="10" fill={highlightColor} fontWeight="bold">PRESS</text>
            </g>
          )}

          {/* Jaw Highlight */}
          {(type === 'jaw-release' || type === 'chin-lift') && (
             <path d="M60 130 Q 100 170 140 130" stroke={highlightColor} strokeWidth="3" opacity="0.6" fill="none" />
          )}

          {/* Ear */}
          <path d="M140 100 Q 148 100 148 110 Q 148 120 140 120" fill="#0f1115" stroke={outlineColor} strokeWidth="2" />
        </g>
        
        {/* Posture/Alignment Guides (Static overlay) */}
        {type === 'chin-tuck' && (
           <g opacity="0.4">
              <line x1="160" y1="50" x2="160" y2="200" stroke={highlightColor} strokeWidth="2" strokeDasharray="5 5" />
              <text x="165" y="100" fontSize="10" fill={highlightColor} style={{ writingMode: 'vertical-rl'}}>ALIGN</text>
           </g>
        )}
      </svg>
    </div>
  );
};