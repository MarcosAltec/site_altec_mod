import { createContext, useEffect, useState } from "react";
import { autenticar, cadastrar, pesquisarPedidos, pesquisarProdutos, pesquisarProduto, verificaToken } from "../service/AuthService";

const AuthContext = createContext();

function AuthProvider(props) {
    const [ usuario, setUsuario ] = useState({ token: null, email: null, id: null, logado: false });
    const [ pedido, setPedido ] = useState({id: null, descricao: null, link: null})

    const login = async (usuario) => {
        const resposta = await autenticar(usuario);

        if (resposta.sucesso) {
            setUsuario({
                token: resposta.dados.token,
                email: resposta.dados.email,
                id: resposta.dados.id,
                logado: true
            });
            setPedido(resposta.dados.pedidos);
            return resposta.dados;
        } else {
            return resposta.mensagen;
        }
    }

    const signup = async (usuario) => {
        const resposta = await cadastrar(usuario);
        if (resposta.sucesso) {
            setUsuario({
                token: resposta.dados.token,
                logado: true});
            return null
        } else {
            return resposta.mensagem
        }
    }

    const meusPedidos = async () => {
        const resposta = await pesquisarPedidos(usuario);

        if (resposta.sucesso) {
            return resposta;
        } else {
            return resposta.mensagem
        }
    };

    const consultarProdutos = async () => {
        const resposta = await pesquisarProdutos();
        if (resposta.sucesso) {
            return resposta.dados;
        } else {
            return resposta.mensagem
        }        
    };

    const searchProduct = async (codigo) => {
        // console.log("SEACH AQUIII")
        const resposta = await pesquisarProduto(codigo);
        if (resposta.sucesso) {
            // console.log("SEACH TRUE", resposta.dados)
            return [resposta.dados];
        } else {
            // console.log("SEACH FALSE", resposta.mensagem)
            return resposta.mensagem
        }
    };

    const adicionarCarrinho = (codigo) => {
        localStorage.setItem('produto', codigo);
    }

    const resgatarCarrinho = () => {
        const resposta = localStorage.getItem('produto');
        if (resposta) {
            return resposta;
        } else {
            return "Carrinho vazio";
        }
    }
    
    useEffect(() => {
        if (usuario.logado === false) {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (token) {
                verificaToken(token, email)
                .then((resposta) => {
                    if (resposta.sucesso) {
                        setUsuario({
                            token, 
                            email: resposta.dados.email,
                            id: resposta.dados.id,
                            logado: true
                        });
                    } else {
                        console.log('Token inaválido ou expirado', resposta.mensagem);
                    }
                })
            }
        }})    

    const contexto = { usuario, pedido, login, signup, meusPedidos, consultarProdutos, searchProduct, adicionarCarrinho, resgatarCarrinho }
    return (
        <AuthContext.Provider value={contexto}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };

    // const searchProduct = async (id) => {
    //     const resposta = await pesquisarProdutos();
    //     const resultado = []
    //     for (let index = 0; index < resposta.dados.length; index++) {
    //         if(resposta.dados[index].codigo == id.codigo){
    //             resultado.push(resposta.dados[index]);
    //             console.log(typeof(resultado))
    //         };  
    //     };
    //     return resultado;
    // };