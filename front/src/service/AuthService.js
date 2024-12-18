import axios from "axios";

const url = import.meta.env.VITE_API_URL;

function autenticar(usuario) {
    //console.log(usuario)
    return axios.post(`${url}/login`, {email: usuario.email, password: usuario.senha})

    .then((response) => {
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
    console.log(usuario)
    return axios.post(`${url}/users`, {email: usuario.email, password: usuario.senha})
    .then((response) => {
        return {sucesso: true, dados: response.data}
    })
    .catch((error) => {
        console.log(error)
        if (error.response) {
            return {sucesso: false, mensagem: error.response.data}
        } else {
            return {sucesso: false, mensagem: "Ocorreu um erro!"}
        }
    })
};

function alterar(){
    return
};

export {autenticar, cadastrar, alterar};