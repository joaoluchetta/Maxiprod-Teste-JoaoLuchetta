import { useEffect, useState } from 'react';
import { ListagemPessoas } from './pages/ListagemPessoas';
import { Categorias } from './pages/Categorias';
import { CadastroTransacao } from './pages/CadastroTransacao';
import { getPessoas } from './services/pessoaService';
import type { Pessoa } from './types';

function App() {
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);
    
    const atualizarDados = async () => {
        try {
            const dados = await getPessoas();
            setPessoas(dados);
        } catch (error) {
            console.error("Erro ao atualizar dashboard:", error);
        }
    };

    useEffect(() => {
        atualizarDados();
    }, []);

    return (
        <div className="App" style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
            <ListagemPessoas pessoas={pessoas} />
            
            <CadastroTransacao onSucess={atualizarDados} />

            <Categorias />
        </div>
    );
}

export default App;