import { createContext, useEffect, useState } from "react";
import { 
    autenticar, 
    cadastrar, 
    pesquisarPedidos, 
    pesquisarProdutos, 
    pesquisarProduto, 
    verificarCodigo, 
    verificaToken,
    cadastroTemporario
} from "../service/AuthService";

const AuthContext = createContext();

function AuthProvider(props) {
    const [ usuario, setUsuario ] = useState({ token: null, nome: null, email: null, id: null, logado: false, status: false });
    const [ pedido, setPedido ] = useState([])
    // console.log("USUARIO", usuario);
    const login = async (usuario) => {
        const resposta = await autenticar(usuario);

        if (resposta.sucesso) {
            setUsuario({
                nome: resposta.dados.nome,
                token: resposta.dados.token,
                email: resposta.dados.email,
                id: resposta.dados.id,
                logado: true
            });
            console.log("HHHH", resposta)
            // setPedido(resposta.dados.pedidos);
            return {sucesso: true, dados: resposta.dados};
        } else {
            console.log("ERROR HHHH", resposta)
            return {sucesso: false, mensagem: "Ocorreu um erro"};
        }
    }

    const signup = async (dados) => {
        const pessoa = {
            name: dados.name,
            email: usuario.email,
            senha: dados.senha
        }
        const resposta = await cadastrar(pessoa);
        if (resposta.sucesso) {
            return true
        } else {
            return resposta.mensagem
        }
    }

    const meusPedidos = async () => {
        const resposta = await pesquisarPedidos(usuario);
        // console.log("MEUS PED", resposta)
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
        const resposta = await pesquisarProduto(codigo);
        if (resposta.sucesso) {
            return [resposta.dados];
        } else {
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

    const tempEmail = async (email) => {
        const resposta = await cadastroTemporario(email);
        if (resposta.sucesso) {
            console.log("DEU CERTO", resposta);
            setUsuario({
                token: null,
                email: resposta.email,
                id: null,
                logado: false,
                status: false
            });
            return resposta.sucesso
        } else {
            // console.log("FALHOU", resposta);
            return resposta.sucesso
        }
    }

    const validarCodigo = async (dados) => {
        const email = dados.email
        const codigo = dados.number
        const resposta = await verificarCodigo(email, codigo);
        if (resposta) {
            setUsuario({
                token: null,
                email: resposta.email,
                id: null,
                logado: false,
                status: true
            });
            console.log("VALIDA COD", resposta)
            // return resposta; 
        } else {
            console.log("VALIDA COD FAIL")
            return "Falha ao verificar codigo";
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

    const contexto = { 
        usuario,
        pedido, 
        login, 
        signup, 
        meusPedidos, 
        consultarProdutos, 
        searchProduct, 
        adicionarCarrinho, 
        resgatarCarrinho,
        validarCodigo,
        tempEmail
     }
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