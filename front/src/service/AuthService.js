import axios from "axios";

const url = import.meta.env.VITE_API_URL;

function autenticar(usuario) {
    return axios.post(`${url}/login`, {email: usuario.email, password: usuario.senha})
    .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.email);
        // console.log("AUTENTICAR", response.data)
        return { sucesso: true, dados: response.data };
    })
    .catch((error) => {
        // console.log("ERROR AUTENTICAR", error)
        if (error.response) {
            return{sucesso: false, mensagem: error.response.data};
        } else {
            return{sucesso: false, mensagem: "Ocorreu um erro"}
        }
    })
};

function cadastrar(usuario) {
    // console.log("cadas", usuario)
    return axios.post(`${url}/usuarios`, {nome: usuario.name, email: usuario.email, senha: usuario.senha})
    .then((response) => {
        console.log("cadas", response)
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
    console.log("GGG", usuario.id)
    return axios.get(`${url}/pedidos`, {params: { identificador: usuario.id }})
    .then((response) => {
        console.log("PPP", response)
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
        // console.log('PESQ PROD', response.data)
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
        // console.log("AAAA", response.data)
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
        // console.log("CODIGO AA", response)
        return { sucesso: true, email: response.data};
    })
    .catch((error) => {
        // console.log("CODIGO BB", error)
        return { sucesso: false};
    })
}

function cadastroTemporario(email){
    return axios.post(`${url}/email-temp`, {email: email})
    .then((response) => {
        // console.log("RESPONSE II", response)
        return {sucesso: true, email: response.data}
    })
    .catch((error) => {
        // console.log("RESPONSE JJ", error.response.data, error.response.status)
        return {sucesso: false, mensagem: error.response}
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

export { 
    autenticar,
    cadastrar, 
    pesquisarPedidos, 
    pesquisarProdutos, 
    verificaToken, 
    pesquisarProduto, 
    verificarCodigo,
    cadastroTemporario
};