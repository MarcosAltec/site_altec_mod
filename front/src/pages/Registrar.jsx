import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContexts";
import Conteudo from "../components/Conteudo";
import InputEmail from "../components/InputEmail";
import Botao from "../components/Botao";
import { useForm } from "react-hook-form";
import InputCodigo from "../components/InputCodigo";
import InputNome from "../components/InputNome";
import InputSenha from "../components/InputSenha"

function Registrar() {
    const navigate = useNavigate();
    const { usuario, validarCodigo, tempEmail, signup } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }} = useForm({})

    const onEnviar = async (data) => {
        console.log('data', data)
        await tempEmail(data.email)
    }

    const onValidar = async (data) => {
        await validarCodigo(data);
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
        <Conteudo>
            <h2>Registrar</h2>

            {!usuario.email ? (
                <>
                    <p>Por favor, insira um email válido.</p>            
                    <form onSubmit={handleSubmit(onEnviar)}>
                        <InputEmail register={register} error={errors.email}/>
                        <Botao tipo="submit" texto="Enviar"/>
                    </form>
                    <Link to="/login">Login</Link>
                </>
            ) : (
                <>
                <div>
                {!usuario.status ? (
                <>
                    <p>Para continuar com o processo de cadastro, é necessário validar o endereço de e-mail fornecido. Enviamos um código de verificação para o seu e-mail {usuario.email}. Por favor, verifique sua caixa de entrada e insira o código no campo abaixo.</p>
                    <form onSubmit={handleSubmit(onValidar)}>
                        <InputCodigo register={register} error={errors.number}/>
                        <Botao tipo="submit" texto="Validar"/>
                    </form>
                </>
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
        </Conteudo>
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