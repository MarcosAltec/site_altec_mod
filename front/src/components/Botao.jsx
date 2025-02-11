function Botao(props) {
    return (
        <>
         <button type={props.tipo} onClick={props.clicar}>{props.texto}</button>
        </>
    )
}

export default Botao;