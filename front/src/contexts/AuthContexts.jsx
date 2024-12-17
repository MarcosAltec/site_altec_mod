import { createContext, useState } from "react";
import { autenticar, cadastrar, alterar } from "../service/AuthService";

const AuthContext = createContext();

function AuthProvider(props) {
    const [ usuario, setUsuario ] = useState({id: null, email: null, logado: false, token: null});

    const login = async (usuario) => {
        //console.log(usuario)
        const resposta = await autenticar(usuario);

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
            setUsuario({id: resposta.dados.user.id, email: resposta.dados.user.email, logado: true, token: resposta.dados.accessToken});
            return null
        } else {
            return resposta.mensagem
        }
    }

    const contexto = {usuario, login, signup}
    return (
        <AuthContext.Provider value={contexto}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };