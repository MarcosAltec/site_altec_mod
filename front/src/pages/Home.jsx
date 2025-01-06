import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Produto from "../components/Produto";

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
            <h1>Página Home</h1>
            <Produto itens={produtos}/>
        </>
    )
}

export default Home;