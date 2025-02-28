function InputNome(props) {
    const regras = {
        required: "Nome é obrigatório"
    }
    return (
        <>
        <label htmlFor="name">Nome: </label>
        <input type="name" {...props.register("name", regras)}/>
        {props.error && <p>{props.error.message}</p>}
        </>
    )
}

export default InputNome;