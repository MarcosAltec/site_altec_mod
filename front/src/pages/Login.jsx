import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";
import { AuthContext } from "../contexts/AuthContexts";
import Conteudo from "../components/Conteudo";
import './Login.css'
import Rodape from "../components/Rodape";
const emailHost = import.meta.env.VITE_EMAIL_HOST

function Login() {
    const [erro, setErro] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const onEntrar = async (data) => {
        const resultado = await login(data);
        if (resultado.sucesso) {
            if (resultado.dados.email === emailHost){
                navigate("/perfil-host")
            }else{
                navigate("/perfil")
                }
            setErro("")
        } else {
            alert("Nome ou email iválidos")
            setErro(erro);            
        }
    }

    return (
        <>
        <Conteudo>
            <div className="pagLogin">
                <h2>Login</h2>
                {erro && <p>{erro}</p>}
                <Formulario onEnviar={onEntrar} texto="Entrar" tipo="submit"/>
                <div className="loginLinks">
                    <Link to="/registrar">Registrar </Link>
                    <Link to="/recuperar-senha"> Esqueceu a senha?</Link>
                </div>
            </div>
        </Conteudo>
        <Rodape />
        </>
    )
}

export default Login;
