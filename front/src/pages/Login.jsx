import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";
import { AuthContext } from "../contexts/AuthContexts";

function Login() {
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const onEntrar = async (data) => {
        const resultado = await login(data);
        // console.log('LOGIN PAGINA', resultado.email)
        if (erro) {
            setErro(erro);
        } else {
            setErro("")
            navigate("/perfil")
        }
    }

    return (
        <>
        <h2>Página de Login</h2>
        {erro && <p>{erro}</p>}
        <Formulario onEnviar={onEntrar} texto="Entrar"/>
        <Link to="/registrar">Registrar</Link>
        </>
    )
}

export default Login;
