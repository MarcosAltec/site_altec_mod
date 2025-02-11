import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Cabecalho from "../components/Cabecalho";
import Conteudo from "../components/Conteudo";
import Rodape from "../components/Rodape";
import Botao from "../components/Botao";

function Carrinho() {
    const { resgatarCarrinho, searchProduct } = useContext(AuthContext)
    const [erro, setErro] = useState("");
    const [item, setItem] = useState([]);
    const produto = item[0];

    useEffect(() => {
        const fetchData =  async () => {
            const codigo = await resgatarCarrinho();
            const produto = await searchProduct(codigo);
            if (produto.status === 404) {
                setErro("Não foi encontrado itens no carrinho")
            } else {
                setItem(produto);
            }
        }
        fetchData();
    }, [resgatarCarrinho, searchProduct]);

    return(
        <>
            <Cabecalho />
            <Conteudo>
                {erro ? (
                    <p>{erro}</p>
                ) : (
                    <>
                    <h3>AVISO! No momento o nosso site está suportando apenas um produto no carrinho por vez!</h3>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2">Produto</th>
                                <th>Valor Unitário</th>
                                <th>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produto ? (
                                <tr>
                                    <td><img src={produto.link_foto} alt="" /></td>
                                    <td>{produto.nome_mod}</td>
                                    <td>{produto.preco}</td>
                                    <td>1</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="4">Nenhum produto no carrinho</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Botao tipo="submit" texto="Comprar" />
                    </>
                )}
            </Conteudo>
            <Rodape />
        </>
    )
};

export default Carrinho;