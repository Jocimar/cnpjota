
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Building2, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

export const Header: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
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

  const renderLink = (item: any) => {
    if (item.external || item.href.startsWith('http')) {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold uppercase tracking-widest transition-colors hover:text-emerald-600 text-slate-500 dark:text-slate-400"
        >
          {item.title}
        </a>
      );
    }
    return (
      <Link
        key={item.href}
        to={item.href}
        className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-emerald-600 ${
          location.pathname === item.href ? 'text-emerald-600' : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {item.title}
      </Link>
    );
  };

  const renderMobileLink = (item: any) => {
    const commonClasses = "flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300";
    
    if (item.external || item.href.startsWith('http')) {
      return (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
          className={commonClasses}
        >
          <item.icon className="h-5 w-5 text-emerald-600" />
          {item.title}
        </a>
      );
    }
    return (
      <Link
        key={item.href}
        to={item.href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={commonClasses}
      >
        <item.icon className="h-5 w-5 text-emerald-600" />
        {item.title}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-black text-2xl text-slate-900 dark:text-white tracking-tighter">
            <Building2 className="w-8 h-8 text-emerald-600" />
            <span>CNPJ<span className="text-emerald-600">J</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS[0].items.map((item) => renderLink(item))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-300"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS[0].items.map((item) => renderMobileLink(item))}
          </nav>
        </div>
      )}
    </header>
  );
};
