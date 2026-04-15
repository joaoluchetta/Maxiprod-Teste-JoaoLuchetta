import { useState, useEffect } from 'react';
import { createPessoa, updatePessoa } from '../services/pessoaService';
import { Pessoa } from '../types';
interface Props {
    onSucesso: () => void;
    pessoaParaEditar?: Pessoa | null;
}

export const CadastroPessoa = ({ onSucesso, pessoaParaEditar }: Props) => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState<number | ''>('');

    useEffect(() => {
        if (pessoaParaEditar) {
            setNome(pessoaParaEditar.nome);
            setIdade(pessoaParaEditar.idade);
        } else {
            setNome('');
            setIdade('');
        }
    }, [pessoaParaEditar]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !idade) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            if (pessoaParaEditar) {
                await updatePessoa(pessoaParaEditar.id, nome, Number(idade));
                // setIdade('');
                // onSucesso();
                window.location.reload()
                alert("Pessoa atualizada!");
                return;
            }
            await createPessoa(nome, Number(idade));
            // setNome('');
            // setIdade('');
            // onSucesso();
            window.location.reload()
            alert("Pessoa cadastrada com sucesso!");
        } catch (error) {
            alert("Erro ao cadastrar pessoa.", error.response.data);
        }
    };

    return (
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd' }}>
            <h3>{pessoaParaEditar ? 'Editar Pessoa' : 'Cadastrar Nova Pessoa'}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome (máx 200 caracteres)"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    maxLength={200}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value === '' ? '' : Number(e.target.value))}
                    style={{ marginRight: '10px' }}
                />
                <button type="submit">Salvar Pessoa</button>
            </form>
        </div>
    );
};