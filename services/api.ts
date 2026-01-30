
import { API_BASE_URL_V1, API_BASE_URL_V2 } from '../constants';
import { CompanyData } from '../types';

export const fetchCompanyByCnpj = async (cnpj: string): Promise<CompanyData> => {
  const cleanCnpj = cnpj.replace(/[^\d]/g, '');
  
  if (cleanCnpj.length !== 14) {
    throw new Error("CNPJ deve conter 14 dígitos.");
  }

  try {
    // Tenta primeiro a V2 (Geralmente tem e-mail e dados mais ricos)
    const responseV2 = await fetch(`${API_BASE_URL_V2}/${cleanCnpj}`);
    
    if (responseV2.ok) {
      return responseV2.json();
    }
    
    // Se não for 404, joga o erro para ser tratado
    if (responseV2.status !== 404) {
      throw new Error(`Erro na API V2: ${responseV2.status}`);
    }

    // Se for 404 na V2, tenta a V1 (Fallback de segurança)
    const responseV1 = await fetch(`${API_BASE_URL_V1}/${cleanCnpj}`);
    
    if (responseV1.ok) {
      return responseV1.json();
    }

    if (responseV1.status === 404) {
      throw new Error("CNPJ não encontrado em nossas bases.");
    }

    throw new Error("Erro ao consultar base de dados secundária.");

  } catch (error) {
    if (error instanceof Error && (error.message.includes("não encontrado") || error.message.includes("404"))) {
      throw error;
    }
    console.error("Erro na busca de CNPJ:", error);
    throw new Error("Erro ao consultar CNPJ. Verifique sua conexão ou tente novamente mais tarde.");
  }
};
