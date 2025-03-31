import { useForm } from "react-hook-form";
import InputEmail from "./InputEmail";
import InputCodigo from "./InputCodigo";
import Botao from "./Botao";

function CriarPedidoHost(props) {
    const { register, handleSubmit, formState: { errors }} = useForm({ values: props.valores });

    return(
        <div>
            <h4>Área de cadastro de pedido.</h4>
            <form onSubmit={handleSubmit(props.onEnviar)}>
                <InputEmail register={register} error={errors.email} /> <br/>
                <InputCodigo register={register} error={errors.number}>
                    <ul>
                        <li>100 - Invictus 1200</li>
                        <li>101 - Invictus HD</li>
                        <li>102 - Invictus DD</li>
                        <li>103 - Invictus DD 15M</li>
                        <li>104 - New G7 DD</li>
                        <li>105 - G7 DD 15M</li>
                    </ul>
                </InputCodigo> <br/>
                <Botao tipo={props.tipo} texto={props.texto}/>
            </form>
            <p>{props.res}</p>
        </div>
    )
}

export default CriarPedidoHost;