import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Produto from "../components/Produto";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import Conteudo from "../components/Conteudo";

function Home() {
    const { consultarProdutos } = useContext(AuthContext);
    const [produtos, setProduto] = useState([])
    const [status, setStatus] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const produto = await consultarProdutos();
            setProduto(produto.response)
            setStatus(produto.status)
        };
        fetchData();
    }, [consultarProdutos]);
    return(
        <>
            <Cabecalho />
            <Conteudo>
                {status ? (
                    <Produto itens={produtos}/>
                ) : (
                    <p>Falha ao carregar produtos!</p>
                )}                    
            </Conteudo>
            <Rodape />
        </>
    )
}

export default Home;