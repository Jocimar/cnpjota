import React, { useState } from 'react';
import { CompanyData } from '../types';
import { MapPin, Calendar, Users, Building2 } from 'lucide-react';

interface CompanyDetailsProps {
  data: CompanyData;
}

const CopyableValue: React.FC<{ value: string | number | null | undefined; className?: string }> = ({ value, className }) => {
  const [copied, setCopied] = useState(false);

  if (!value) return <span className={className}>-</span>;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(String(value));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative inline-block group">
      <span 
        onClick={handleCopy} 
        className={`cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors border-b border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 pb-0.5 select-none ${className}`}
        aria-label="Clique para copiar"
      >
        {value}
      </span>
      {/* Tooltip */}
      <div className={`
        absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 
        text-xs font-medium text-white rounded bg-slate-800 shadow-lg
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50
        ${copied ? 'bg-emerald-600' : 'bg-slate-800'}
      `}>
        {copied ? 'Copiado!' : 'Clique para copiar'}
        {/* Triangle Arrow */}
        <div className={`
          absolute top-full left-1/2 -translate-x-1/2 
          border-4 border-transparent 
          ${copied ? 'border-t-emerald-600' : 'border-t-slate-800'}
        `}></div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string | number | null | undefined }> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors px-2 -mx-2 rounded-sm">
    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
    <div className="text-right mt-1 sm:mt-0">
      <CopyableValue value={value} className="text-sm text-slate-900 dark:text-slate-100" />
    </div>
  </div>
);

const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-slate-100 text-slate-800' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
    {children}
  </span>
);

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ATIVA': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'BAIXADA': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{data.razao_social}</h2>
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                <Badge color={getStatusColor(data.descricao_situacao_cadastral)}>
                  {data.descricao_situacao_cadastral}
                </Badge>
                <Badge>
                  <span className="mr-1">CNPJ:</span>
                  <CopyableValue value={data.cnpj} className="font-mono hover:border-slate-400 dark:hover:border-slate-500" />
                </Badge>
                {data.opcao_pelo_simples && <Badge color="bg-blue-100 text-blue-800">Simples Nacional</Badge>}
                {data.opcao_pelo_mei && <Badge color="bg-purple-100 text-purple-800">MEI</Badge>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Main Info */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Building2 className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold">Dados Cadastrais</h3>
          </div>
          <div className="space-y-1">
            <DetailRow label="CNPJ" value={data.cnpj} />
            <DetailRow label="Razão Social" value={data.razao_social} />
            <DetailRow label="Nome Fantasia" value={data.nome_fantasia} />
            <DetailRow label="Capital Social" value={data.capital_social ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.capital_social) : '-'} />
            <DetailRow label="Data Abertura" value={data.data_inicio_atividade ? new Date(data.data_inicio_atividade).toLocaleDateString('pt-BR') : '-'} />
          </div>
        </div>

        {/* Address */}
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <MapPin className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold">Localização</h3>
          </div>
          <div className="space-y-1">
            <DetailRow label="Logradouro" value={`${data.descricao_tipo_de_logradouro} ${data.logradouro}, ${data.numero}`} />
            <DetailRow label="Complemento" value={data.complemento} />
            <DetailRow label="Bairro" value={data.bairro} />
            <DetailRow label="Município" value={`${data.municipio} - ${data.uf}`} />
            <DetailRow label="CEP" value={data.cep} />
            <DetailRow label="Telefone" value={data.ddd_telefone_1 ? `(${data.ddd_telefone_1})` : '-'} />
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-card p-6 shadow-sm">
         <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Calendar className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold">Atividade Econômica</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Principal</p>
              <div className="text-sm font-medium pl-1">
                 <CopyableValue value={`${data.cnae_fiscal} - ${data.cnae_fiscal_descricao}`} />
              </div>
            </div>
            {data.cnaes_secundarios && data.cnaes_secundarios.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Secundárias</p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {data.cnaes_secundarios.map((cnae) => (
                    <li key={cnae.codigo} className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800">
                      <span className="font-mono text-xs mr-2 opacity-70">{cnae.codigo}</span>
                      <CopyableValue value={cnae.descricao} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
      </div>

      {/* Partners */}
      {data.qsa && data.qsa.length > 0 && (
         <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-card p-6 shadow-sm">
         <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Users className="h-5 w-5 text-slate-500" />
            <h3 className="font-semibold">Quadro Societário</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.qsa.map((socio, idx) => (
              <div key={idx} className="flex items-start p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-full p-2 mr-3 mt-1">
                  <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">
                    <CopyableValue value={socio.nome_socio} />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Entrada: {socio.data_entrada_sociedade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};