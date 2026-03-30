import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Programs } from './pages/Programs';
import { ProgramDetail } from './pages/ProgramDetail';
import { Progress } from './pages/Progress';
import { Library } from './pages/Library';

import { Persona } from './pages/Persona';
import { LooksMode } from './pages/LooksMode';
import { StyleGuide } from './pages/StyleGuide';

const Layout = () => {
  return (
    <div className="min-h-screen font-sans text-white bg-background mx-auto max-w-md shadow-2xl overflow-hidden relative">
       {/* Mobile Container Simulation */}
      <Outlet />
      <Navigation />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/:id" element={<ProgramDetail />} />
          <Route path="persona" element={<Persona />} />
          <Route path="looks" element={<LooksMode />} />
          <Route path="style" element={<StyleGuide />} />
          <Route path="progress" element={<Progress />} />
          <Route path="library" element={<Library />} />
        </Route>
      </Routes>
    </Router>
  );
}