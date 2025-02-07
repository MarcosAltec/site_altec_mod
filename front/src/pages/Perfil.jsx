import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../contexts/AuthContexts'
import MeusProdutos from "../components/MeusProdutos";
import { Link } from "react-router-dom";
import Conteudo from "../components/Conteudo";

function Perfil() {
    const { meusPedidos } = useContext(AuthContext)
    const [pedidos, setPedidos] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const lista = await meusPedidos();
            const pedidos = lista.dados
            setPedidos(pedidos)
        };
        fetchData();   
    }, [meusPedidos]);

    return (
        <Conteudo>
            <h2>Perfil do usuário</h2>
            <MeusProdutos itens={pedidos}/>
            <Link to="/">Home</Link>
        </Conteudo>
    )
}

export default Perfil;