import Botao from "./Botao";

function MeusProdutos(props) {

    return (
    <>
        <p>Nesta página você poderá baixar todos os seu MODs.</p>
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