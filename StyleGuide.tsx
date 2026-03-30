import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scissors, Shirt } from 'lucide-react';

const HAIRSTYLES = {
  'Oval': ['Textured Fringe', 'Classic Taper', 'Buzz Cut'],
  'Square': ['Crew Cut', 'Faux Hawk', 'Slicked Back'],
  'Round': ['Pompadour', 'Quiff', 'High Fade'],
  'Diamond': ['Messy Fringe', 'Side Part', 'Long Flow']
};

const OUTFITS = [
  { name: 'Minimal Clean', items: ['Plain White Tee', 'Dark Denim', 'White Sneakers'] },
  { name: 'Smart Casual', items: ['Oxford Shirt', 'Chinos', 'Loafers'] },
  { name: 'Street', items: ['Oversized Hoodie', 'Cargo Pants', 'Chunky Sneakers'] },
  { name: 'Athleisure', items: ['Fitted Zip-up', 'Joggers', 'Running Shoes'] }
];

export const StyleGuide: React.FC = () => {
  const navigate = useNavigate();
  const [faceShape, setFaceShape] = useState<string>('Oval');
  const [activeTab, setActiveTab] = useState<'hair' | 'outfit'>('hair');

  return (
    <div className="p-6 pb-32 min-h-screen bg-background text-white flex flex-col items-center">
      <div className="w-full flex items-center gap-4 mb-12">
        <button onClick={() => navigate(-1)} className="p-3 bg-card rounded-full active:scale-95 transition-transform">
          <ArrowLeft size={24} className="text-slate-400" />
        </button>
        <h1 className="text-3xl font-bold tracking-tight">Style Guide</h1>
      </div>

      <div className="w-full flex gap-2 bg-card p-2 rounded-2xl mb-10">
        <button 
          onClick={() => setActiveTab('hair')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'hair' ? 'bg-white text-black shadow-md' : 'text-slate-400'}`}
        >
          <Scissors size={18} /> Hair
        </button>
        <button 
          onClick={() => setActiveTab('outfit')}
          className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'outfit' ? 'bg-white text-black shadow-md' : 'text-slate-400'}`}
        >
          <Shirt size={18} /> Outfits
        </button>
      </div>

      {activeTab === 'hair' && (
        <div className="w-full space-y-10 animate-in fade-in">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Face Shape</h3>
            <div className="flex flex-wrap gap-3">
              {Object.keys(HAIRSTYLES).map(shape => (
                <button
                  key={shape}
                  onClick={() => setFaceShape(shape)}
                  className={`px-5 py-3 rounded-full text-sm font-bold transition-colors ${
                    faceShape === shape 
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' 
                      : 'bg-card text-slate-300'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recommended Styles</h3>
            <div className="grid grid-cols-1 gap-4">
              {HAIRSTYLES[faceShape as keyof typeof HAIRSTYLES].map((style, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-card rounded-3xl">
                  <span className="text-xl font-bold">{style}</span>
                  <span className="text-slate-600 font-mono font-bold">{String(i + 1).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'outfit' && (
        <div className="w-full space-y-6 animate-in fade-in">
          {OUTFITS.map((outfit, i) => (
            <div key={i} className="bg-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">{outfit.name}</h3>
              <ul className="space-y-4">
                {outfit.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-4 text-slate-300">
                    <span className="text-primary-500 font-mono font-bold text-sm">{String(j + 1).padStart(2, '0')}</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
