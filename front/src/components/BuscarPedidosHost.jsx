import InputEmail from "./InputEmail";
import { useForm } from "react-hook-form";
import Botao from ".//Botao";

function BuscarPedidosHost(props){
    const { register, handleSubmit, formState: { errors}} = useForm({});
    
    return(
        <div>
            <h4>Localizar pedidos por cliente.</h4>
            <form onSubmit={handleSubmit(props.onBuscar)}>
                <InputEmail register={register} error={errors.email}/>
                <Botao tipo="submit" texto="Buscar pedidos"/>
            </form>
            {props.pedidos ? (
                props.pedidos.map((item, index) => (
                    <li key={index}>
                        <span>{`${index + 1} - ${item.nome_mod}`}</span>
                    </li>
                ))
            ) : (
                <p>Não existe pedidos para este usuário.</p>
            )}
        </div>
    )
};

export default BuscarPedidosHost;