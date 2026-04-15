import { useEffect, useState } from 'react';
import { Pessoa } from '../types';
import { deletePessoa, getPessoas } from '../services/pessoaService';
import { CadastroPessoa } from './CadastroPessoa';

interface Props {
  onSucesso: () => void;
}

export const ListagemPessoas = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [pessoaEmEdicao, setPessoaEmEdicao] = useState<Pessoa | null>(null);
  
  const totalGeralReceitas = pessoas.reduce((acc, p) => acc + p.totalReceitas, 0);
  const totalGeralDespesas = pessoas.reduce((acc, p) => acc + p.totalDespesas, 0);
  const saldoGeral = totalGeralReceitas - totalGeralDespesas;

  
  const carregarPessoas = async () => {
    try {
      const dados = await getPessoas();
      setPessoas(dados);
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
      alert("Erro ao conectar com a API.");
    }
  };

  const handleExcluir = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta pessoa? Todas as suas transações serão apagadas.")) {
      try {
        await deletePessoa(id);
        window.location.reload()
        alert("Pessoa removida com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir pessoa.");
      }
    }
  };

  const handleEditar = (pessoa: Pessoa) => {
    setPessoaEmEdicao(pessoa); 
    window.scrollTo(0, 0);
  };

  const finalizarAcao = () => {
    setPessoaEmEdicao(null); 
    carregarPessoas(); 
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Controle de Gastos - Pessoas</h1>
      
      <CadastroPessoa 
          onSucesso={carregarPessoas} 
          pessoaParaEditar={pessoaEmEdicao}
      />
      
      <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eaebed', color: 'black' }}>
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
                <button onClick={() => handleEditar(p)} style={{ marginRight: '10px' }}>
                  Editar
                </button>
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
        <tfoot>
        <tr style={{ color: 'black', backgroundColor: '#eaebed', fontWeight: 'bold' }}>
          <td colSpan={2}>TOTAL GERAL</td>
          <td style={{ color: 'green' }}>{totalGeralReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          <td style={{ color: 'red' }}>{totalGeralDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          <td style={{ color: 'blue' , borderTop: '2px solid black' }}>{saldoGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};