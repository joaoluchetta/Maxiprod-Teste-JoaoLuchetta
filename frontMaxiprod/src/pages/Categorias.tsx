import { useEffect, useState } from 'react';
import type { Categoria } from '../types';
import { getCategorias, createCategoria } from '../services/categoriaService';
import { FinalidadeCategoria } from '../types';

export const Categorias = () => {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<number>(FinalidadeCategoria.Receita);

    useEffect(() => {
        carregarCategorias();
    }, []);

    async function carregarCategorias() {
        const dados = await getCategorias();
        setCategorias(dados);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!descricao) return alert("Preencha a descrição.");

        try {
            await createCategoria(descricao, finalidade);
            setDescricao('');
            carregarCategorias();
            alert("Categoria criada!");
        } catch (error) {
            alert("Erro ao criar categoria.");
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cadastro de Categorias</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Descrição (máx 400)"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    maxLength={400}
                />
                <select value={finalidade} onChange={(e) => setFinalidade(Number(e.target.value))}>
                    <option value={FinalidadeCategoria.Receita}>Receita</option>
                    <option value={FinalidadeCategoria.Despesa}>Despesa</option>
                    <option value={FinalidadeCategoria.Ambas}>Ambas</option>
                </select>
                <button type="submit">Cadastrar</button>
            </form>

            <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th>Descrição</th>
                    <th>Finalidade</th>
                </tr>
                </thead>
                <tbody>
                {categorias.map(c => (
                    <tr key={c.id}>
                        <td>{c.descricao}</td>
                        <td>{FinalidadeCategoria[c.finalidade]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};