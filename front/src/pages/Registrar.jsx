import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContexts";
import Conteudo from "../components/Conteudo";
import Botao from "../components/Botao";
import { useForm } from "react-hook-form";
import InputNome from "../components/InputNome";
import InputSenha from "../components/InputSenha"
import ValidaEmail from "../components/ValidaEmail";
import ValidaCodigo from "../components/ValidaCodigo";
import './Login.css'
import Rodape from "../components/Rodape";

function Registrar() {
    const navigate = useNavigate();
    const { usuario, validarCodigo, tempEmail, signup } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }} = useForm({})
    const [ validacao, setValidacao ] = useState({ status: null, msg: null })

    const onEnviar = async (data) => {
        const resposta = await tempEmail(data.email)
        if (resposta.sucesso) {
            setValidacao({
                status: null,
                msg: null
            })
        } else {
            setValidacao({
                status: resposta.sucesso,
                msg: resposta.mensagem
            })
        }
    }

    const onValidar = async (data) => {
        const resposta = await validarCodigo(data);
        if (resposta.sucesso) {
            setValidacao({
                status: resposta.sucesso,
                msg: resposta.dados
            })
        } else {
            setValidacao({
                status: resposta.sucesso,
                msg: resposta.dados
            })
        }
    }

    const onCadastrar = async (data) => {
        const pessoa = {
            name: data.name,
            senha: data.senha
        }
        const resposta = await signup(pessoa);
        if (resposta) {
            navigate('/login')
        }
    }
    return(
        <>
        <Conteudo>
            <div className="pagLogin">
            <h2>Registrar</h2>
            {!usuario.email ? (
                <>
                    <ValidaEmail onSubmit={onEnviar} parag="Por favor, insira um email válido." tipo="submit" texto="Enviar" msg={validacao.msg}/>
                    <Link to="/login">Login</Link>                    
                </>
            ) : (
                <>
                <div>
                {!validacao.status ? (
                    <ValidaCodigo 
                    parag={`Para continuar com o processo de cadastro, é necessário validar o endereço de e-mail fornecido. Enviamos um código de verificação para o seu e-mail ${usuario.email}. Por favor, verifique sua caixa de entrada e insira o código no campo abaixo.`}
                    onChecar={onValidar} tipo="submit" texto="Validar" msg={validacao.msg}
                    />
                ) : (
                    <>
                    <form onSubmit={handleSubmit(onCadastrar)}>
                        {<p>Seu email: {usuario.email}</p>}
                        <p>Agora vamos cadastrar seu nome e senha</p>
                        <InputNome register={register} error={errors.name}/> <br/>
                        <InputSenha register={register} error={errors.senha}/> <br/>
                        <Botao tipo="submit" texto="Cadastrar"/>
                    </form>
                    </>
                )}
                </div>
                </>
            )}
            </div>
        </Conteudo>
        <Rodape />
        </>
    )
}

export default Registrar;



    // // const [erro, setErro] = useState("deu erro");
    // // const navigate = useNavigate();
    // // const {signup} = useContext(AuthContext)
    // // const onEnviar = async (data) => {
    // //     const resultado = await signup(data);
    // //     if (resultado) {
    // //         setErro(resultado);
    // //     } else {
    // //         setErro("");
    // //         navigate("/perfil");
    // //     }
    // // }
    // {/* <Formulario onEnviar={onEnviar} texto="Confirmar" /> */}