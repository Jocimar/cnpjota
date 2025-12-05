import React, { useState, useEffect } from 'react';
import { Sun, Moon, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    // Default to light mode unless explicitly set to dark in localStorage
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 px-4 md:px-8 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white mr-4">
        <Building2 className="w-7 h-7 text-emerald-600" />
        <span>CNPJJ</span>
      </Link>

      <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
        <button
          onClick={toggleTheme}
          className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-slate-100"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </header>
  );
};