export interface ApiError {
  statusCode: number;
  message: string;
  details?: unknown;
  cause?: string;
}

export function getApiErrorTitle(statusCode: number): string {
  if (statusCode >= 500) {
    if (statusCode === 503) return 'Falha em Um de Nossos Serviços!';
    return 'Falha Interna do Servidor!';
  }

  switch (statusCode) {
    case 400:
      return 'Ops! Tem Algo Errado na Solicitação.';
    case 401:
      return 'Não Autorizado!';
    case 403:
      return 'Sem Permissão!';
    case 404:
      return 'Não Encontrado!';
    case 422:
      return 'Algo Errado ou Incompleto!';
    default:
      return 'Ops! Tem Algo Errado na Solicitação.';
  }
}
