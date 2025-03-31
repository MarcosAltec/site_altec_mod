import Botao from "./Botao";
import InputSenha from "./InputSenha";
import { useForm } from "react-hook-form";

function NovaSenha(props){
    const { register, handleSubmit, formState: { errors }} = useForm({})

    return(
        <>
            <p>{props.parag}</p>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <InputSenha register={register} error={errors.senha}/>
                <Botao tipo={props.tipo} texto={props.texto}/>
            </form>
            <p>{props.msg}</p>
        </>
    )
}

export default NovaSenha;