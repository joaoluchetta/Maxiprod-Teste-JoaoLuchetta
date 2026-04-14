import api from './api';

export interface TransacaoRequest {
    descricao: string;
    valor: number;
    tipo: number; // 1 para Receita, 2 para Despesa
    categoriaId: string;
    pessoaId: string;
}

export const createTransacao = async (transacao: TransacaoRequest): Promise<void> => {
    await api.post('/transacao', transacao);
};