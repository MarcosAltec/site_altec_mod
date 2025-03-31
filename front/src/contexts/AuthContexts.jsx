import { createContext, useEffect, useState } from "react";
import { 
    autenticar, 
    cadastrar, 
    pesquisarPedidos, 
    pesquisarProdutos, 
    pesquisarProduto, 
    verificarCodigo, 
    verificaToken,
    cadastroTemporario,
    criarPedido,
    buscarCliente,
    resgatarEmail,
    novaSenha
} from "../service/AuthService";

const AuthContext = createContext();

function AuthProvider(props) {
    const [ usuario, setUsuario ] = useState({ token: null, nome: null, email: null, id: null, logado: false, status: false });
    const [ pedido, setPedido ] = useState([])
    console.log("USUARIO", usuario);
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
            return {sucesso: true, dados: resposta.dados};
        } else {
            return {sucesso: false, mensagem: "Ocorreu um erro"};
        }
    }

    const signup = async (dados) => {
        const pessoa = {
            name: dados.name,
            email: usuario.email,
            senha: dados.senha
        }
        console.log("HHHH", pessoa)
        const resposta = await cadastrar(pessoa);
        if (resposta.sucesso) {
            return true
        } else {
            return resposta.mensagem
        }
    }

    const meusPedidos = async (email) => {
        let itens = {}
        if (email) {
            const resposta = await pesquisarPedidos(email);
            itens = resposta
        } else {
            const resposta = await pesquisarPedidos(usuario);
            itens = resposta
        }
        if (itens.sucesso) {
            return itens;
        } else {
            return itens.mensagem
        }
    };

    const consultarProdutos = async () => {
        const resposta = await pesquisarProdutos();
        if (resposta.sucesso) {
            return {status: true, response: resposta.dados};
        } else {
            return {status: false, response: resposta.mensagem}
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
            setUsuario({
                token: null,
                email: resposta.email,
                id: null,
                logado: false,
                status: false
            });
            return resposta.sucesso
        } else {
            return resposta
        }
    }

    const validarCodigo = async (dados) => {
        const email = usuario.email
        const codigo = dados.number
        const resposta = await verificarCodigo(email, codigo);
        if (resposta.sucesso) {
            return resposta; 
        } else {
            return resposta;
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
                            nome: resposta.dados.nome,
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
        
    const registrarPedido = async (dados) => {
        const resposta = await criarPedido(dados);
        return resposta
    };

    const localizarCliente = async (dados) => {
        const resposta = await buscarCliente(dados);
        if (resposta) {
            return resposta;
        } else {
            return "Usuário não encontrado";
        }
    };

    const recuperarEmail = async (dados) => {
        const resposta = await resgatarEmail(dados);
        if (resposta.sucesso) {
            setUsuario({
                token: null,
                email: resposta.email,
                id: null,
                logado: false,
                status: true
            });
        } else {
            return "Email não encontrado";
        }
    }

    const redefinirSenha = async (dados) => {
        const resposta = await novaSenha({ email: usuario.email, senha: dados.senha })
        if (resposta.sucesso) {
            setUsuario({
                token: null,
                email: null,
                id: null,
                logado: false,
                status: false
            });
            return resposta
        } else {
            // console.log("RESPOSTA SENHA ELSE", resposta)
            return resposta
        }
    }

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
        tempEmail,
        registrarPedido,
        localizarCliente,
        recuperarEmail,
        redefinirSenha
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