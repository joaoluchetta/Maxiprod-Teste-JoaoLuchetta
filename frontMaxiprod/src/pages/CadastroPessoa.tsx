import { useState } from 'react';
import { createPessoa } from '../services/pessoaService';

interface Props {
    onSucesso: () => void; // Função para atualizar a lista após cadastrar
}

export const CadastroPessoa = ({ onSucesso }: Props) => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState<number | ''>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !idade) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            await createPessoa(nome, Number(idade));
            setNome('');
            setIdade('');
            onSucesso(); // Recarrega a tabela de pessoas
            alert("Pessoa cadastrada com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar pessoa. Verifique o console.");
        }
    };

    return (
        <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd' }}>
            <h2>Cadastrar Nova Pessoa</h2>
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