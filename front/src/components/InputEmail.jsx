import './Inputs.css'

function InputEmail(props) {
    const regras = {
        required: "Email é obrigatório",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de email inválido"}
    };
    return(
        <>
            <label htmlFor="email">Email: </label>
            <input type="email" {...props.register("email", regras)}/>
            {props.error && <p>{props.error.message}</p>}
        </>
    )
}

export default InputEmail;