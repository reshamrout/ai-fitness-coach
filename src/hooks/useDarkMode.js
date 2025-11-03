import { useState, useEffect } from 'react';
import React from 'react';

export default function useDarkMode() {
  // 1. Initialize state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default for server-side rendering
  });

  // 2. Use useEffect to apply the class to the <html> tag
  useEffect(() => {
    const root = window.document.documentElement; // This is the <html> tag
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // 3. Save the user's choice to localStorage
    window.localStorage.setItem('theme', theme);
    
  }, [theme]); // This effect runs every time 'theme' state changes

  // 4. The toggle function
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return [theme === 'dark', toggleDarkMode];
}