import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
          <Routes>
            {/* ✅ ALWAYS SHOW AUTH FIRST ON "/" */}
            <Route path="/" element={<Auth />} />
            {/* ✅ HOME AFTER LOGIN */}
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
