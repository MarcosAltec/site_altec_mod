import Botao from "../components/Botao";
import { useForm } from "react-hook-form";
import InputCodigo from "../components/InputCodigo";

function ValidaCodigo(props) {
    const { register, handleSubmit, formState: { errors }} = useForm({})

    return(
        <>
            <p>{props.parag}</p>
            <form onSubmit={handleSubmit(props.onChecar)}>
                <InputCodigo register={register} error={errors.number}/>
                <Botao tipo={props.tipo} texto={props.texto}/>
            </form>
            <p>{props.msg}</p>
        </>
    )
};

export default ValidaCodigo;