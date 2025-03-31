import { useForm } from "react-hook-form"
import Botao from "../components/Botao";
import InputEmail from "../components/InputEmail";

function ValidaEmail(props) {
    const { register, handleSubmit, formState: { errors }} = useForm({ values: props.valores })

    return(
        <>
            <p>{props.parag}</p>            
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <InputEmail register={register} error={errors.email}/>
                <Botao tipo={props.tipo} texto={props.texto}/>
            </form>
            {<p>{props.msg}</p>}
        </>
    )
}

export default ValidaEmail;