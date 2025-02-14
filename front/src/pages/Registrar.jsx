import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContexts";
import Conteudo from "../components/Conteudo";
import InputEmail from "../components/InputEmail";
import Botao from "../components/Botao";
import { useForm } from "react-hook-form";

function Registrar() {
    const { register, handleSubmit, formState: { errors }} = useForm({})
    const [ email, setEmail ] = useState({ estado: false, email: null });

    const onConfirmar = (data) => {
        console.log("Passou aqui", data.email)
        setEmail({email: data.email})
    }

    const onValidar = () => {
        console.log("Validado")
    }

    console.log("ESTADO", email, setEmail)

    return(
        <Conteudo>
            <h2>Registrar</h2>

            <form onSubmit={handleSubmit(onConfirmar)}>
                <InputEmail register={register} error={errors.email}/>
                <Botao tipo="submit" texto="Enviar"/>
            </form>
            <Link to="/login">Login</Link>
            {email.estado && (
                <div>
                    <p>Um código de validação foi enviado para seu e-mail. Por favor, verifique e insira o código abaixo:</p>
                    <input type="text" placeholder="Código de validação" />
                    <Botao tipo="submit" texto="Validar" onClick={onValidar} />
                </div>
            )}
        </Conteudo>
    )
}

export default Registrar;



    // // const [erro, setErro] = useState("deu erro");
    // // const navigate = useNavigate();
    // // const {signup} = useContext(AuthContext)
    // // const onConfirmar = async (data) => {
    // //     const resultado = await signup(data);
    // //     if (resultado) {
    // //         setErro(resultado);
    // //     } else {
    // //         setErro("");
    // //         navigate("/perfil");
    // //     }
    // // }
    // {/* <Formulario onEnviar={onConfirmar} texto="Confirmar" /> */}