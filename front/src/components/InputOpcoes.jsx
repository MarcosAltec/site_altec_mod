function InputOpcoes(props) {
    return (
        <div>
            <label htmlFor="opcao">Escolha uma opção:</label>
            <select id="opcao" {...register("opcao", { required: "Selecione uma opção" })}>
                <option value="">-- Selecione --</option>
                {props.opcoes.map((opcao, index) => (
                    <option key={index} value={opcao}>
                        {opcao}
                    </option>
                ))}
            </select>
            {error && <span style={{ color: "red" }}>{error.message}</span>}
        </div>
    );
}

export default InputOpcoes;