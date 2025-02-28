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
            // console.log("JJJJJ", lista)
            if (lista) {
                const pedidos = lista.dados
                setPedidos(pedidos)
            }
        };
        fetchData();   
    }, [meusPedidos]);
    // console.log("PERFIL PED", pedidos)
    return (
        <Conteudo>
            <h2>Perfil do usuário</h2>
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