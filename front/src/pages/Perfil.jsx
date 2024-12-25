import { useContext, useState } from "react";
import Botao from "../components/Botao";
import { AuthContext } from '../contexts/AuthContexts'


function Perfil() {
    const [erro, setErro] = useState("deu erro");
    const { consultaProdutos } = useContext(AuthContext)
    

    return (
        <>
            <h2>Perfil do usuário</h2>
            <Botao onClink={consultaProdutos()} texto="Buscar produtos"/>
        </>
    )
}

export default Perfil;