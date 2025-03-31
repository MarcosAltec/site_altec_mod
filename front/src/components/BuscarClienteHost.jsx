import { useForm } from "react-hook-form";
import Botao from "./Botao";
import InputEmail from "./InputEmail";

function BuscarClienteHost(props) {
    const { register, handleSubmit, formState: { errors }} = useForm({});

    return(
        <div>
            <h4>Buscar cliente</h4>
            <form onSubmit={handleSubmit(props.onBuscar)}>
                <InputEmail register={register} error={errors.email}/>
                <Botao tipo="submit" texto="Localizar cliente"/>
            </form>
            {props.res ? (
                <div>
                    <p><strong>ID:</strong> {props.res.id}</p>
                    <p><strong>Nome:</strong> {props.res.nome}</p>
                    <p><strong>Email:</strong> {props.res.email}</p>
                </div>
            ) : (
                <p>Cliente não encontrado</p>
            )}
        </div>
    )
}

export default BuscarClienteHost;