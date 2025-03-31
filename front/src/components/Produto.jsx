import { Link } from "react-router-dom";
import './Produto.css'

function Produto(props){
    const formataLink = (str) => {
        return str.replace(/ /g, "_").toLowerCase();
    }
    const formataPreco = (preco) => {
        return Number(preco).toFixed(2).replace('.', ','); // Converte para "22,90"
    };


    return(
    <div className="grid-container">
        {props.itens.map((item, index) => (
            <div className="block" key={index}>
                <h2>{item.nome_mod}</h2>
                <img src={item.link_foto} alt="imagem" />
                <h3>R$ {formataPreco(item.preco)}</h3>
                <p>à vista, cartão ou pix</p>
                <Link className="produtoBotao" to={`/produto/${item.codigo}/${formataLink(item.nome_mod)}`}>Conheça o MOD</Link>
            </div>
        ))}
    </div>
    )
}

export default Produto;