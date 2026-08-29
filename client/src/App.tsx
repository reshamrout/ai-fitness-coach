import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Loader from './components/Loader';

// Lazy load pages for performance
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const GeneratePage = React.lazy(() => import('./pages/GeneratePage'));
const PlanViewPage = React.lazy(() => import('./pages/PlanViewPage'));
const HistoryPage = React.lazy(() => import('./pages/HistoryPage'));
const ChatPage = React.lazy(() => import('./pages/ChatPage'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            
            <Route path="/generate" element={
              <ProtectedRoute>
                <GeneratePage />
              </ProtectedRoute>
            } />
            
            <Route path="/plan/:id" element={
              <ProtectedRoute>
                <PlanViewPage />
              </ProtectedRoute>
            } />
            
            <Route path="/history" element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            } />

            <Route path="/chat" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
}
