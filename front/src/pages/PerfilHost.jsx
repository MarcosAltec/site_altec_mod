import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Conteudo from "../components/Conteudo";
import CriarPedidoHost from "../components/CriarPedidoHost";
import BuscarPedidosHost from "../components/BuscarPedidosHost";
import BuscarClienteHost from "../components/BuscarClienteHost";

function PerfilHost() {
    const { usuario, registrarPedido, meusPedidos, localizarCliente } = useContext(AuthContext);
    const [ resposta, setResposta ] = useState("");
    const [ itens, setItens ] = useState([]);
    const [ cliente, setCliente ] = useState({});

    const onSalvarPedido = async (data) => {
        const resposta = await registrarPedido(data);
        setResposta(resposta);
    }
    const onBuscarPedidos = async (data) => {
        const resposta = await meusPedidos(data);
        setItens(resposta.dados);
    }
    const onBuscarCliente = async (data) => {
        const resposta = await localizarCliente(data);
        if (resposta) {
            setCliente(resposta);
        } else {
            return "Usuário não encontrado...";
        }
    }
    // console.log("LKHJGKUBY", cliente)
    return(
        <Conteudo>
            <h2>Olá, {usuario.nome}!</h2>
            <p>Essa é a página do administrador.</p>
            <CriarPedidoHost onEnviar={onSalvarPedido} tipo="submit" texto="Salvar Pedido" res={resposta}/>
            <BuscarPedidosHost onBuscar={onBuscarPedidos} pedidos={itens}/>
            <BuscarClienteHost onBuscar={onBuscarCliente} res={cliente}/>
        </Conteudo>
    )
}

export default PerfilHost;