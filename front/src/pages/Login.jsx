import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";
import { AuthContext } from "../contexts/AuthContexts";
import Conteudo from "../components/Conteudo";

function Login() {
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const onEntrar = async (data) => {
        const resultado = await login(data);
        console.log('LOGIN PAGINA', resultado)
        if (resultado.sucesso) {
            navigate("/perfil")
            setErro("")
        } else {
            alert("Nome ou email iválidos")
            setErro(erro);            
        }
    }

    return (
        <Conteudo>
            <h2>Página de Login</h2>
            {erro && <p>{erro}</p>}
            <Formulario onEnviar={onEntrar} texto="Entrar" tipo="submit"/>
            <Link to="/registrar">Registrar</Link>
        </Conteudo>
    )
}

export default Login;
