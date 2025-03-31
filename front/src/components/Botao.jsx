import './Botao.css'

function Botao(props) {
    return (
        <>
         <button className='botao' type={props.tipo} onClick={props.clicar}>{props.texto}</button>
        </>
    )
}

export default Botao;