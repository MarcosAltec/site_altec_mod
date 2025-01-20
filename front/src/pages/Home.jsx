import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Produto from "../components/Produto";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import Conteudo from "../components/Conteudo";

function Home() {
    const { consultarProdutos } = useContext(AuthContext);
    const [produtos, setProduto] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const produto = await consultarProdutos();
            setProduto(produto)
        };
        fetchData();
    }, [consultarProdutos]);

    return(
        <>
            <Cabecalho />
            <Conteudo>
                <h1>Página Inicial</h1>
                <Produto itens={produtos}/>
            </Conteudo>
            <Rodape />
        </>
    )
}

export default Home;