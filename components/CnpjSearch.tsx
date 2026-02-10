
import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle, ArrowRight, CreditCard, Sparkles, LayoutDashboard, MousePointerClick, ShieldCheck, Database, Zap } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCompanyByCnpj } from '../services/api';
import { CompanyData } from '../types';
import { CompanyDetails } from './CompanyDetails';
import { AFFILIATE_LINK, SMB_STORE_DATA } from '../constants';

const HomePromoBanner: React.FC = () => (
  <a 
    href={AFFILIATE_LINK} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-lime-400 bg-gradient-to-br from-lime-400 via-lime-500 to-emerald-600 shadow-md transition-all hover:shadow-xl hover:-translate-y-1 min-h-[340px]"
  >
    <div className="relative z-10 flex flex-col h-full p-8">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black text-lime-400 uppercase tracking-widest">
          <Sparkles className="h-3 w-3" /> Oferta Exclusiva Ton
        </span>
      </div>
      <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">As Melhores Taxas <br/><span className="text-white">Para Seu Negócio</span></h2>
      <p className="mb-6 text-sm font-bold text-slate-900 leading-tight opacity-90 max-w-[220px]">Aumente suas vendas com a tecnologia Ton. Sem aluguel e com garantia vitalícia.</p>
      <div className="mt-auto">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white shadow-xl transition-all group-hover:scale-[1.02] active:scale-95 uppercase tracking-widest">
          Pedir Maquininha <ArrowRight className="ml-2 h-4 w-4 text-lime-400" />
        </div>
      </div>
    </div>
    <CreditCard className="absolute -bottom-4 -right-4 h-40 w-40 text-slate-900/10 -rotate-12 pointer-events-none" />
  </a>
);

const SMBHomeBanner: React.FC = () => (
  <a 
    href={SMB_STORE_DATA.link} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#1c222a] shadow-md transition-all hover:shadow-xl hover:-translate-y-1 min-h-[340px]"
  >
    <div className="relative z-10 flex flex-col h-full p-8">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#7cb50a] px-3 py-1 text-[10px] font-black text-[#1c222a] uppercase tracking-widest">SMB Store</span>
      </div>
      <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-3">{SMB_STORE_DATA.headline} <br/><span className="text-[#7cb50a]">Gestão Simples</span></h2>
      <p className="mb-6 text-sm font-bold text-slate-400 leading-tight max-w-[220px]">O sistema leve para seu caixa não travar. Controle tudo de forma simples e direta.</p>
      <div className="mt-auto">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#7cb50a] text-xs font-black text-[#1c222a] shadow-xl transition-all group-hover:scale-[1.02] active:scale-95 uppercase tracking-widest">
          {SMB_STORE_DATA.cta} <MousePointerClick className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
    <LayoutDashboard className="absolute -bottom-4 -right-4 h-40 w-40 text-white/5 -rotate-12 pointer-events-none" />
  </a>
);

export const CnpjSearch: React.FC = () => {
  const { cnpj: cnpjParam } = useParams();
  const navigate = useNavigate();
  const [cnpjInput, setCnpjInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CompanyData | null>(null);

  const formatCnpj = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 14);
    if (!digits) return '';
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnpjInput(formatCnpj(e.target.value));
  };

  const performSearch = async (cnpjToSearch: string) => {
    const clean = cnpjToSearch.replace(/\D/g, '');
    if (clean.length !== 14) {
      setError('O CNPJ deve ter 14 números.');
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await fetchCompanyByCnpj(clean);
      setData(result);
      setCnpjInput(formatCnpj(clean));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao consultar o CNPJ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cnpjParam) {
      const clean = cnpjParam.replace(/\D/g, '');
      if (clean.length === 14) performSearch(clean);
    } else {
      setData(null);
      setCnpjInput('');
      setError(null);
    }
  }, [cnpjParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = cnpjInput.replace(/\D/g, '');
    if (clean.length === 14) navigate(`/${clean}`);
    else setError('CNPJ incompleto. Digite os 14 números.');
  };

  return (
    <div className="w-full flex flex-col gap-8 opacity-100">
      {/* Campo de Busca - Essencial */}
      <div className={`w-full flex flex-col items-center gap-6 ${data ? 'py-4' : 'py-12'}`}>
        <div className="text-center space-y-2">
          <h1 className={`font-black tracking-tighter text-slate-900 dark:text-white uppercase leading-none ${data ? 'text-2xl' : 'text-4xl md:text-6xl'}`}>
            Consulta <span className="text-emerald-600">CNPJ</span> Grátis
          </h1>
          {!data && (
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-2xl mx-auto">
              Dados da Receita Federal e Simples Nacional em tempo real.
            </p>
          )}
        </div>

        <div className="w-full max-w-3xl">
          <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  value={cnpjInput}
                  onChange={handleInputChange}
                  placeholder="00.000.000/0000-00"
                  inputMode="numeric"
                  className="w-full h-14 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 px-4 pl-12 text-lg font-bold placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none dark:text-white"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="h-14 px-10 rounded-xl bg-emerald-600 text-white font-black uppercase tracking-widest hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center min-w-[180px]"
              >
                {loading ? <Loader2 className="animate-spin h-6 w-6" /> : 'Buscar Agora'}
              </button>
            </form>
          </div>
        </div>

        {error && (
          <div className="max-w-xl w-full bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-4 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" /> {error}
          </div>
        )}
      </div>

      <div className="w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="h-12 w-12 text-emerald-600 animate-spin" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Buscando dados...</p>
          </div>
        ) : data ? (
          <CompanyDetails data={data} />
        ) : (
          <div className="flex flex-col gap-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HomePromoBanner />
              <SMBHomeBanner />
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Zap className="h-8 w-8 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Velocidade</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">Consultas diretas das bases oficiais em tempo real.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Database className="h-8 w-8 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Completo</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">Acesse QSA, Capital Social e dados do Simples Nacional.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="h-8 w-8 text-purple-600 mb-6" />
                <h3 className="text-xl font-bold mb-3">Seguro</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">Não salvamos suas buscas. Sua privacidade em primeiro lugar.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
