import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, List, BarChart2, BookOpen, UserCircle } from 'lucide-react';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/programs', icon: List, label: 'Plans' },
    { path: '/persona', icon: UserCircle, label: 'Persona' },
    { path: '/progress', icon: BarChart2, label: 'Progress' },
    { path: '/library', icon: BookOpen, label: 'Library' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-white/5 px-6 py-4 pb-8 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
            isActive(item.path) ? 'text-white' : 'text-slate-600'
          }`}
        >
          <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
        </button>
      ))}
    </div>
  );
};