import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChannelProvider } from './context/ChannelContext';
import LandingPage from './pages/LandingPage';
import AdminPanel from './pages/AdminPanel';

const App: React.FC = () => {
  return (
    <ChannelProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </ChannelProvider>
  );
};

export default App;