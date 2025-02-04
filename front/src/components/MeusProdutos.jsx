import Botao from "./Botao";

function MeusProdutos(props) {

    return (
    <>
        <h2>Meu MODs</h2>
        <ul>
            {props.itens.map((item, index) => (
                <li key={index}>
                    <a href={item.link_download} target="_blank" rel="noopener noreferrer">
                        <Botao texto="Baixar MOD"></Botao>
                    </a>
                    <span> {item.nome_mod}</span>
                </li>
            ))}
        </ul>
    </>
    )
}

export default MeusProdutos;