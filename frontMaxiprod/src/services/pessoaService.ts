import api from './api';
import { Pessoa } from '../types';

export const getPessoas = async (): Promise<Pessoa[]> => {
    // GET /api/pessoa
    const response = await api.get<Pessoa[]>('/pessoa');
    return response.data;
};

export const createPessoa = async (nome: string, idade: number) : Promise<void> =>{
    // POST /api/pessoa
    await api.post('/pessoa', { nome, idade });
}

export const deletePessoa = async (id: string): Promise<void> => {
    // DELETE /api/pessoa/{id}
    await api.delete(`/pessoa/${id}`);
};