import Botao from "./Botao";

function MeusProdutos(props) {

    return (
    <>
        <h2>Meu MODs</h2>
        <ul>
            {props.itens.map((item, index) => (
                <li key={index}>
                    <Botao texto="Baixar MOD">{item.link}</Botao>
                    <span> {item.descricao}</span>
                </li>
            ))}
        </ul>
    </>
    )
}

export default MeusProdutos;