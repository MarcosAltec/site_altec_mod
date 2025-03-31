import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../contexts/AuthContexts'
import MeusProdutos from "../components/MeusProdutos";
import { Link } from "react-router-dom";
import Conteudo from "../components/Conteudo";

function Perfil() {
    const { meusPedidos, usuario } = useContext(AuthContext)
    const [pedidos, setPedidos] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const lista = await meusPedidos();
            if (lista) {
                const pedidos = lista.dados
                setPedidos(pedidos)
            }
        };
        fetchData();   
    }, [meusPedidos]);
    return (
        <Conteudo>
            <h2>Sua conta</h2>
            <h3>Olá, {usuario.nome}</h3>
            {pedidos ? (
                <MeusProdutos itens={pedidos}/>
            ) : (
                <p>Sem produtos</p>
            )}
            <Link to="/">Home</Link>
        </Conteudo>
    )
}

export default Perfil;