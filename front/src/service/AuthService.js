import axios from "axios";

const url = import.meta.env.VITE_API_URL;

function autenticar(usuario) {
    return axios.post(`${url}/login`, {email: usuario.email, password: usuario.senha})
    .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        return { sucesso: true, dados: response.data };
    })
    .catch((error) => {
        if (error.response) {
            return{sucesso: false, mensagem: error.response.data};
        } else {
            return{sucesso: false, mensagem: "Ocorreu um erro"}
        }
    })
};

function cadastrar(usuario) {
    return axios.post(`${url}/usuarios`, {nome: usuario.name, email: usuario.email, senha: usuario.senha})
    .then((response) => {
        return {sucesso: true, dados: response.data}
    })
    .catch((error) => {
        if (error.response) {
            return {sucesso: false, mensagem: error.response.data}
        } else {
            return {sucesso: false, mensagem: "Ocorreu um erro!"}
        }
    })
};

function pesquisarPedidos(usuario){
    return axios.get(`${url}/pedidos`, {params: { cliente: usuario }})
    .then((response) => {
        return {sucesso: true, dados: response.data}
    })
    .catch((error) => {
        if (error.response) {
            return {sucesso: false, mensagem: error.response.data}
        } else {
            return {sucesso: false, mensagem: "Ocorreu um erro!"}
        }
    })
}

function pesquisarProdutos(){
    return axios.get(`${url}/produtos`)
    .then((response) => {
        return {sucesso: true, dados: response.data}
    })
    .catch((error) => {
        if (error.response) {
            return {sucesso: false, mensagem: error.response.data}
        } else {
            return {sucesso: false, mensagem: "Ocorreu um erro!"}
        }
    })
}

function pesquisarProduto(codigo){
    return axios.get(`${url}/produtos/id`, { params: { codigo }})
    .then((response) => {
        return {sucesso: true, dados: response.data}
    })
    .catch((error) => {
        if (error.response) {
            return {sucesso: false, mensagem: error.response}
        } else {
            return {sucesso: false, mensagem: "Ocorreu um erro!"}
        }
    })
}

function verificarCodigo(email, codigo){
    return axios.get(`${url}/validar-codigo`, { params: { email: email, codigo: codigo }})
    .then((response) => {
        return { sucesso: true, dados: response.data};
    })
    .catch((error) => {
        if (error.response) {
            return {sucesso: false, dados: error.response.data.msg}
        } else {
            return { sucesso: false, msg: "Erro desconhecido."}
        }
    })
}

function cadastroTemporario(email){
    return axios.post(`${url}/email-temp`, {email: email})
    .then((response) => {
        return {sucesso: true, email: response.data}
    })
    .catch((error) => {
        return {sucesso: false, mensagem: error.response.data.msg}
    });
}

function verificaToken(token, email) {
    return axios.get(`${url}/validar-token`, {
        headers: {
            'Authorization': token,
            email
        }
    })
    .then((response) => {
        return { sucesso: true, dados: response.data }
    })
    .catch((error) => {
        if (error.response) {
            return { sucesso: false, mensagem: error.response.data };
        } else {
            return { sucesso: false, mensagem: 'Ocorreu um erro!' };
        }
    })
}

function criarPedido(dados) {
    return axios.post(`${url}/pedidos`, dados)
    .then((response) => {
        return "Pedido cadastrado com sucesso";
    })
    .catch((error) =>{
        return "Falha ao cadastrar pedido"
    })
}

function buscarCliente(dados) {
    return axios.get(`${url}/buscar-cliente`, {params: dados})
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        if (error.response) {
            return { sucesso: false, mensagem: error.response };
        } else {
            return { sucesso: false, mensagem: "Ocorreu um erro desconhecido!" };
        };
    })
}

function resgatarEmail(email) {
    return axios.post(`${url}/recuperar-email`, {email})
    .then ((response) => {
        return { sucesso: true, email: response.data};
    })
    .catch((error) => {
        return { sucesso: false, mensagem: error.response };
    })
}

function novaSenha(dados){
    console.log("DADOS SENHA", dados)
    return axios.post(`${url}/nova-senha`, dados)
    .then((response) => {
        return { sucesso: true, dados: response};
    })
    .catch((error) => {
        return { sucesso: false, dados: error};
    })
}
export { 
    autenticar,
    cadastrar, 
    pesquisarPedidos, 
    pesquisarProdutos, 
    verificaToken, 
    pesquisarProduto, 
    verificarCodigo,
    cadastroTemporario,
    criarPedido,
    buscarCliente,
    resgatarEmail,
    novaSenha
};