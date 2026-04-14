export interface Pessoa{
    id: string;
    nome: string;
    idade: number;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export enum FinalidadeCategoria{
    Receita = 1,
    Despesa = 2,
    Ambas = 3
}

export interface Categoria {
    id: string;
    descricao: string;
    finalidade: FinalidadeCategoria;
}