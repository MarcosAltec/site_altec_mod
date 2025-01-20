import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContexts";
import Formulario from "../components/Formulario";
import Conteudo from "../components/Conteudo";

function Registrar() {
    const [erro, setErro] = useState("deu erro");
    const navigate = useNavigate();
    const {signup} = useContext(AuthContext)
    const onConfirmar = async (data) => {
        const resultado = await signup(data);
        if (resultado) {
            setErro(resultado);
        } else {
            setErro("");
            navigate("/registrar");
        }
    }
    return(
        <Conteudo>
            <h1>Registrar</h1>

            <Formulario onEnviar={onConfirmar} texto="Confirmar" />
            <Link to="/login">Login</Link>
        </Conteudo>
    )
}

export default Registrar;