import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import MainHome from './components/mainHome';
import ArenaPage from './components/ArenaPage';
import DgatePage from './components/DgatePafe';
import KnetPage from './components/knetPage';
import Exam from './components/Exam/Exam';
import ExamFinished from './components/Exam/ExamFinished';
import ExamCompleted from './components/Exam/ExamCompleted';
import SignInForm from './components/SignInForm';
import './scssStyle/App.scss';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/signin" element={<SignInForm />} />
          <Route element={<Layout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}>
            <Route path="/" element={<MainHome />} />
            <Route path="/arena" element={<ArenaPage />} />
            <Route path="/dgate" element={<DgatePage />} />
            <Route path="/knet" element={<KnetPage />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/exam-finished" element={<ExamFinished />} />
            <Route path="/exam-completed" element={<ExamCompleted />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

interface LayoutProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`mainContent ${!isSidebarOpen ? 'sidebarClosed' : ''}`}>
        <Outlet /> 
      </div>
    </>
  );
};

export default App;