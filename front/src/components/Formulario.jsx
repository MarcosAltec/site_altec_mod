import { useForm } from "react-hook-form"
import Botao from "../components/Botao";
import InputEmail from "../components/InputEmail";
import InputSenha from "../components/InputSenha";

function Formulario(props) {
    const { register, handleSubmit, formState: { errors }} = useForm({ values: props.valores })
    
    return(
        <form onSubmit={handleSubmit(props.onEnviar)}>
            <InputEmail register={register} error={errors.email} />
            <InputSenha register={register} error={errors.senha}/>
            <Botao tipo={props.tipo} texto={props.texto}/>
        </form>
    )
}

export default Formulario;