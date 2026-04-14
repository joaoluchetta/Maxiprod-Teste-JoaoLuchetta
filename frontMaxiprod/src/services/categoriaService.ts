import api from './api';
import type { Categoria } from '../types';

export const getCategorias = async (): Promise<Categoria[]> => {
    const response = await api.get<Categoria[]>('/categoria');
    return response.data;
};

export const createCategoria = async (descricao: string, finalidade: number): Promise<void> => {
    await api.post('/categoria', { descricao, finalidade });
};