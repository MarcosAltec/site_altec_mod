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
    return axios.post(`${url}/usuarios`, {email: usuario.email, senha: usuario.senha})
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
    return axios.get(`${url}/pedidos`, {params: { identificador: usuario.id }})
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

export { autenticar, cadastrar, pesquisarPedidos, pesquisarProdutos, verificaToken, pesquisarProduto };