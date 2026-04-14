import { useEffect, useState } from 'react';
import { getPessoas } from '../services/pessoaService';
import { getCategorias } from '../services/categoriaService';
import { createTransacao } from '../services/transacaoService';
import { Pessoa, Categoria, FinalidadeCategoria } from '../types';

// interface Props {
//     onSucess: () => void;
// }

export const CadastroTransacao = ({ onSucesso }: Props) => {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    
    const [pessoaId, setPessoaId] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState<number>(null);
    const [tipo, setTipo] = useState<number>(1); 

    useEffect(() => {
        async function carregarDados() {
            const [dadosPessoas, dadosCategorias] = await Promise.all([getPessoas(), getCategorias()]);
            setPessoas(dadosPessoas);
            setCategorias(dadosCategorias);
        }
        carregarDados();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pessoaId || !categoriaId || !descricao || valor <= 0) {
            return alert("Preencha todos os campos corretamente.");
        }

        try {
            await createTransacao({ pessoaId, categoriaId, descricao, valor, tipo });
            alert("Transação realizada com sucesso!");
            window.location.reload()
            // onSucesso();
            // setDescricao('');
            // setValor(null);
        } catch (error: any) {
            const mensagem = error.response?.data || "Erro ao realizar transação.";
            alert(mensagem);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #666', marginTop: '20px' }}>
            <h2>Nova Transação</h2>
            <form onSubmit={handleSubmit}>
                <select value={pessoaId} onChange={(e) => setPessoaId(e.target.value)}>
                    <option value="">Selecione a Pessoa</option>
                    {pessoas.map(p => <option key={p.id} value={p.id}>{p.nome} ({p.idade} anos)</option>)}
                </select>

                <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                    <option value="">Selecione a Categoria</option>
                    {categorias.map(c => <option key={c.id} value={c.id}>{c.descricao}</option>)}
                </select>

                <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} maxLength={400} />
                <input type="number" placeholder="Valor" value={valor} onChange={(e) => setValor(Number(e.target.value))} />

                <select value={tipo} onChange={(e) => setTipo(Number(e.target.value))}>
                    <option value={1}>Receita</option>
                    <option value={2}>Despesa</option>
                </select>

                <button type="submit">Lançar Transação</button>
            </form>
        </div>
    );
};