import { createContext, useState } from "react";
import { autenticar, cadastrar, pesquidaPruduto } from "../service/AuthService";

const AuthContext = createContext();

function AuthProvider(props) {
    const [ usuario, setUsuario ] = useState({id: null, email: null, logado: false, token: null});
    const [ pedido, setPedido ] = useState({id: null, descricao: null, link: null})

    const login = async (usuario) => {
        const resposta = await autenticar(usuario);
        //console.log("LOGIN CONTEXTS", resposta.dados.user)

        if (resposta.sucesso) {
            setUsuario({
                id: resposta.dados.user.id,
                email: resposta.dados.user.email,
                logado: true,
                token: resposta.dados.accessToken,
            });
            return "";
        } else {
            return resposta.mensagen;
        }
    }

    const signup = async (usuario) => {
        const resposta = await cadastrar(usuario);
        console.log(usuario)
        if (resposta.sucesso) {
            setUsuario({
                id: resposta.dados.user.id, 
                email: resposta.dados.user.email,
                logado: true, 
                token: resposta.dados.accessToken});
            return null
        } else {
            return resposta.mensagem
        }
    }

    const consultaProdutos = async () => {
        const usuarioId = (usuario.id)
        //console.log("RESGATA ID", usuarioId)
        const resposta = await pesquidaPruduto(usuarioId);

        if (resposta.sucesso) {
            console.log("CONTEUDO RESPOSTA PRODUTO", resposta)
        } else {
            console.log("CONTEUDO RESPOSTA PRODUTO ELSE", resposta)
        }
    };

    const contexto = {usuario, pedido, login, signup, consultaProdutos}
    return (
        <AuthContext.Provider value={contexto}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };