function InputCodigo (props) {

    const regras = {
        required: "Código necessário para validação",
        minLenght: {
            value: 6,
            message: "O código deve 6 caracteres"
        }
        //     value: 6,
        //     message: "O código deve ter 6 dígitos"
        // },
        // pattern: { 
        //     value: /^\d{6}$/,
        //     message: "O código deve conter exatamente 6 dígitos"
        // },
        // onChange: (e) => setCodigo(e.target.value)
    }
    return(
        <>
            <input type="text" {...props.register("number", regras)}/>
            {props.error && <p>{props.error.message}</p>}
        </>
    )
}

export default InputCodigo;