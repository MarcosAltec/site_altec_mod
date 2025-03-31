import { Link, useLocation, useNavigate } from "react-router-dom";
import Conteudo from "../components/Conteudo";
import { AuthContext } from "../contexts/AuthContexts";
import { useContext, useEffect } from "react";

function Erro404() {
    // const { usuario } = useContext(AuthContext);
    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     if (location.pathname === "/login" || "/registrar" && usuario.token) {
    //         if (usuario.email === "marcos@altecmod.com") {
    //             navigate("/perfil-host");
    //         } else {
    //             navigate("/perfil");
    //         }            
    //     } else if (location.pathname === "/perfil" || "/perfil-host" && !usuario.token) {
    //         navigate("/login");
    //     }
    // }, [location.pathname, usuario.token, navigate]);
    

    // console.log("URL atual:", location.pathname)
    return(
        <Conteudo>
            <h2>Página não encontrada</h2>
            <Link to='/'>Voltar para Home.</Link>
        </Conteudo>
    )
}

export default Erro404;