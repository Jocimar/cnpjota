import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Documentation } from './components/Documentation';
import { CnpjSearch } from './components/CnpjSearch';
import { About } from './components/About';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <Header />
        
        {/* Structure updated to match Footer.tsx: 
            Wrapper gets padding (px-4 md:px-8), 
            Inner container gets max-width (max-w-6xl) and centers (mx-auto).
            This ensures content aligns vertically with footer content. */}
        <main className="flex-1 w-full px-4 md:px-8 py-4 md:py-8">
          <div className="w-full max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<CnpjSearch />} />
              <Route path="/docs" element={<Documentation />} />
              
              {/* New Pages */}
              <Route path="/sobre" element={<About />} />
              <Route path="/privacidade" element={<Privacy />} />
              <Route path="/termos" element={<Terms />} />

              {/* Status route placeholder */}
              <Route path="/status" element={
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Todos os sistemas operacionais</h2>
                  <p className="text-slate-500">Nenhuma instabilidade detectada nas APIs parceiras.</p>
                </div>
              } />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;