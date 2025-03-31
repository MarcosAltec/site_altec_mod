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
    console.log("PRODUTO 0", produto)

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

    const formataPreco = (preco) => {
        return Number(preco).toFixed(2).replace('.', ','); // Converte para "22,90"
    };

    const linkCompra = () => {
        if (produto && produto.link_compra) {
            window.open(produto.link_compra, '_blank'); // Abre o link em uma nova guia
        } else {
            console.error("Link de compra não disponível."); // Verifica se o link existe
        }    
    }

    return(
        <>
            <Cabecalho />
            <Conteudo>
                {erro ? (
                    <p>{erro}</p>
                ) : (
                    <>
                    <h3>AVISO! No momento o nosso site está suportando apenas um produto por vez no carrinho!</h3>
                    <p>Estamos trabalhando para melhorar a sua experiência em nosso site.</p>
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
                                    <td>R$ {formataPreco(produto.preco)}</td>
                                    <td>1</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="4">Nenhum produto no carrinho</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Botao tipo="submit" texto="Ir para pagamento" clicar={linkCompra} />
                    </>
                )}
            </Conteudo>
            <Rodape />
        </>
    )
};

export default Carrinho;