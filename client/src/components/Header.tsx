import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaDumbbell, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setDarkMode(isDark);
  };

  return (
    <header className="sticky top-0 z-50 glass-card">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg">
            <FaDumbbell size={24} />
          </div>
          <span className="text-2xl font-bold font-heading text-gray-900 dark:text-white tracking-tight">
            OptiFit <span className="text-primary-600 dark:text-primary-400">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Dashboard</Link>
              <Link to="/generate" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">New Plan</Link>
              <Link to="/history" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">History</Link>
              <Link to="/chat" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">AI Coach</Link>
              <div className="flex items-center gap-4 border-l border-gray-200 dark:border-gray-700 pl-6">
                <span className="text-sm text-gray-500">🔥 {user.streak} days</span>
                <button onClick={logout} className="text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition-colors">Logout</button>
              </div>
            </>
          ) : (
            <>
              <a href="/#features" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Features</a>
              <a href="/#science" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">The Science</a>
              <a href="/#faq" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">FAQ</a>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-2"></div>
              <Link to="/login" className="text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors font-bold">Log In</Link>
              <Link to="/register" className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-none font-bold hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-colors">Initialize Profile</Link>
            </>
          )}
          
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button 
          className="md:hidden p-2 text-gray-600 dark:text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95"
        >
          <div className="flex flex-col p-4 gap-4">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg">Dashboard</Link>
                <Link to="/generate" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg">New Plan</Link>
                <Link to="/history" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg">History</Link>
                <Link to="/chat" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg">AI Coach</Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="p-2 text-lg text-left text-red-500">Logout</button>
              </>
            ) : (
              <>
                <a href="/#features" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg">Features</a>
                <a href="/#science" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg">The Science</a>
                <a href="/#faq" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg">FAQ</a>
                <div className="h-px w-full bg-gray-200 dark:bg-gray-800 my-2"></div>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg font-bold">Log In</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="p-2 text-lg text-primary-600 font-bold">Initialize Profile</Link>
              </>
            )}
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-lg text-left flex items-center gap-2"
            >
              {darkMode ? <><FaSun /> Light Mode</> : <><FaMoon /> Dark Mode</>}
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}