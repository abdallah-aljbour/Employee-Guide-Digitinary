import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainHome from './components/mainHome';
import ArenaPage from './components/ArenaPage';
import DgatePage from './components/DgatePafe';
import KnetPage from './components/knetPage';
import './scssStyle/App.scss';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`mainContent ${!isSidebarOpen ? 'sidebarClosed' : ''}`}>
          <Routes>
            <Route path="/" element={<MainHome />} />
            <Route path="/arena" element={<ArenaPage />} />
            <Route path="/dgate" element={<DgatePage />} />
            <Route path="/knet" element={<KnetPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;