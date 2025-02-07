import Cabecalho from "../components/Cabecalho";
import Conteudo from "../components/Conteudo";
import Rodape from "../components/Rodape";

function Carrinho() {
    return(
        <>
        <Cabecalho />
        <Conteudo>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Produto</th>
                        <th>Valor Unitário</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>img...</td>
                        <td>Nome...</td>
                        <td>Valor...</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </Conteudo>
        <Rodape />
        </>
    )
};

export default Carrinho;