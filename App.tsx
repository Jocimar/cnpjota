
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Documentation } from './components/Documentation';
import { CnpjSearch } from './components/CnpjSearch';
import { About } from './components/About';
import { Privacy } from './components/Privacy';
import { Terms } from './components/Terms';
import { Status } from './components/Status';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <Header />
        
        <main className="flex-1 w-full px-4 md:px-8 py-8">
          <div className="w-full max-w-6xl mx-auto min-h-[400px]">
            <Routes>
              <Route path="/" element={<CnpjSearch />} />
              <Route path="/:cnpj" element={<CnpjSearch />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/privacidade" element={<Privacy />} />
              <Route path="/termos" element={<Terms />} />
              <Route path="/status" element={<Status />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        <div className="w-full px-4 md:px-8 pb-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 text-center italic leading-relaxed">
              *Este conteúdo contém links patrocinados. Ao comprar através dos nossos links, podemos receber uma comissão.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
