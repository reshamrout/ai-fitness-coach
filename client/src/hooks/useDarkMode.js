import { useState, useEffect } from 'react';
import React from 'react';

export default function useDarkMode() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; 
  });

  useEffect(() => {
    const root = window.document.documentElement; 
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    
    window.localStorage.setItem('theme', theme);
    
  }, [theme]); 

  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return [theme === 'dark', toggleDarkMode];
}