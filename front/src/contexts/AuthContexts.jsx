import { createContext, useState } from "react";
import { autenticar, cadastrar, pesquisarPedidos, pesquisarProdutos } from "../service/AuthService";

const AuthContext = createContext();

function AuthProvider(props) {
    const [ usuario, setUsuario ] = useState({id: null, email: null, logado: false, token: null});
    const [ pedido, setPedido ] = useState({id: null, descricao: null, link: null})

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

    const meusPedidos = async () => {
        const usuarioId = usuario.id
        //console.log("ID USUARIO", usuarioId)
        const resposta = await pesquisarPedidos();
        const meusPedidos = []

        if (resposta.sucesso) {
            for (let index = 0; index < resposta.dados.length; index++) {
                if(resposta.dados[index].usuario_id == usuarioId){
                    meusPedidos.push(resposta.dados[index])
                }
            }
        } else {
            return resposta.mensagem
        }
        return meusPedidos;
    };

    const consultarProdutos = async () => {
        const resposta = await pesquisarProdutos();
        return resposta.dados;
    }

    const contexto = {usuario, pedido, login, signup, meusPedidos, consultarProdutos}
    return (
        <AuthContext.Provider value={contexto}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };