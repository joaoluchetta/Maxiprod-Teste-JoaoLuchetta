import { useEffect, useState } from 'react';
import { Pessoa } from '../types';
import { deletePessoa, getPessoas } from '../services/pessoaService';
import { CadastroPessoa } from './CadastroPessoa';

export const ListagemPessoas = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  
  const carregarPessoas = async () => {
    try {
      const dados = await getPessoas();
      setPessoas(dados);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
      alert("Erro ao conectar com a API. Verifique se o Backend está rodando e o CORS liberado.");
    }
  };

  const handleExcluir = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta pessoa? Todas as suas transações serão apagadas.")) {
      try {
        await deletePessoa(id);
        carregarPessoas(); 
        alert("Pessoa removida com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir pessoa.");
      }
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Controle de Gastos - Pessoas</h1>
      
      <CadastroPessoa onSucesso={carregarPessoas} />
      
      <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#EAEBED', color: 'black' }}>
            <th>Nome</th>
            <th>Idade</th>
            <th>Total Receitas</th>
            <th>Total Despesas</th>
            <th>Saldo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.idade}</td>
              <td style={{ color: 'green' }}>{p.totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td style={{ color: 'red' }}>{p.totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td style={{ fontWeight: 'bold' }}>{p.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>
                <button
                    onClick={() => handleExcluir(p.id)}
                    style={{ color: 'red', cursor: 'pointer' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};