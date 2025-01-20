import axios from "axios";

const url = import.meta.env.VITE_API_URL;

function autenticar(usuario) {
    return axios.post(`${url}/login`, {email: usuario.email, password: usuario.senha})
    .then((response) => {
        console.log("AUTENTICAR", response)
        return { sucesso: true, dados: response.data }
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
    return axios.post(`${url}/users`, {email: usuario.email, password: usuario.senha})
    .then((response) => {
        console.log("RESPONSE", response)
        return {sucesso: true, dados: response.data}
    })
    .catch((error) => {
        console.log("ERROR", error)
        if (error.response) {
            return {sucesso: false, mensagem: error.response.data}
        } else {
            return {sucesso: false, mensagem: "Ocorreu um erro!"}
        }
    })
};

function pesquisarPedidos(){
    return axios.get(`${url}/pedidos`)
    .then((response) => {
        //console.log("RESULTADO RESPONSE", response)
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

export { autenticar, cadastrar, pesquisarPedidos, pesquisarProdutos };