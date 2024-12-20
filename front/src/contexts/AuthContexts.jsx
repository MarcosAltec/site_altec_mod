import { createContext, useState } from "react";
import { autenticar, cadastrar, alterar } from "../service/AuthService";

const AuthContext = createContext();

function AuthProvider(props) {
    const [ usuario, setUsuario ] = useState({id: null, email: null, logado: false, token: null});
    const [ pedido, setPedido ] = useState({id: null, descricao: null, preco: null, link: null})

    const login = async (usuario) => {
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

    const consultaProdutos = async (id) => {
        const resposta = await pesquidaPruduto(id);
        if (resposta.sucesso) {
            setPedido({
                    id: resposta.dados.id, 
                    descricao: resposta.dados.descricao, 
                    preco: resposta.dados.preco, 
                    link: resposta.dados.link,
            })
            return "";
        } else{
            return resposta.mensagem;
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