import { Link } from "react-router-dom";
import Conteudo from "../components/Conteudo";

function Erro404() {
    return(
        <Conteudo>
            <h2>Página não encontrada</h2>
            <Link to='/'>Voltar para Home.</Link>
        </Conteudo>
    )
}

export default Erro404;