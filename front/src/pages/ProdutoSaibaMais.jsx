import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts" 
import { useContext, useEffect, useState } from "react";
import Botao from "../components/Botao";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import Conteudo from "../components/Conteudo";
import Carrocel from "../components/Carrocel";

function ProdutoSaibaMais() {
    const id  = useParams();
    const { searchProduct } = useContext(AuthContext);
    const [produto, setProduto] = useState([]);
  
    useEffect(() => {
        const fetchData = async (id) => {
            const produto = await searchProduct(id);
            setProduto(produto);
        };
        fetchData(id);
    }, [searchProduct]);

    return (
        <>
            <Cabecalho />
            <Conteudo>
            <Carrocel itens={produto}/>
                {produto.map((item, index) => (
                    <div key={index}>
                        <h2>{item.nome_mod}</h2>
                        <h3>à vista R$ {item.preco}</h3>
                        <p>à vista no boleto ou cartão de crédito</p>
                        <Botao texto="COLOCAR NO CARRINHO" />
                        <br />
                        <h2>Sobre o MOD</h2>
                        <ul>
                            <li>{item.sobre_o_mod}</li>
                            <h3>Carroceria</h3>
                            <li>{item.carroceria}</li>
                            <h3>Chassis</h3>
                                {item.chassis.map((chassis, chassisIndex) => (
                                    <li key={chassisIndex}>{chassis}</li>
                                ))}
                            <h3>Motor</h3>
                                {item.motor.map((motor, motorIndex) => (
                                    <li key={motorIndex}>{motor}</li>
                                ))}
                            <h3>Transmissão</h3>
                                {item.transmissao.map((transmissao, transmissaoIndex) => (
                                    <li key={transmissaoIndex}>{transmissao}</li>
                                ))}
                            <h3>Interior</h3>
                            <li>{item.interior}</li>
                        </ul>
                    </div>
                ))}
            </Conteudo>
            <Rodape />
        </>
    )
}

export default ProdutoSaibaMais;