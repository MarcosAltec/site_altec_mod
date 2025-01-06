import { Link } from "react-router-dom";

function Produto(props){
    const formataLink = (str) => {
        return str.replace(/ /g, "_").toLowerCase();
    }

    return(
        <>
        {props.itens.map((item, index) => (
            <div key={index}>
            {console.log("ITEM", item)}
                <h2>{item.nome_mod}</h2>
                <img src="asdf" alt="imagem" />
                <h3>R$ {item.preco}</h3>
                <p>à vista, cartão ou pix</p>
                {}
                <Link to={`/${formataLink(item.nome_mod)}`}>Conheça o MOD</Link>
            </div>
        ))}
        
        </>
    )
}

export default Produto;