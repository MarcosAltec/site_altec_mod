import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Conteudo from "../components/Conteudo";
import ValidaEmail from "../components/ValidaEmail";
import ValidaCodigo from "../components/ValidaCodigo";
import NovaSenha from "../components/NovaSenha";
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Rodape from "../components/Rodape";

function RecuperarSenha() {
    const { usuario, recuperarEmail, validarCodigo, redefinirSenha } = useContext(AuthContext);
    const [ msg, setMsg ] = useState({ status: null, mensagem: null });
    const navigate = useNavigate()

    const onEnviar = async (data) => {
        const resposta = await recuperarEmail(data.email)
        setMsg({ status: false, mensagem: resposta });
    };
    const onValidar = async (data) => {
        const resposta = await validarCodigo(data)
        setMsg({ status: resposta.sucesso, mensagem: resposta.dados })
    }
    const onNovaSenha = async (data) => {
        const resposta = await redefinirSenha(data)
        if (resposta.sucesso) {
            alert("Senha atualizada com sucesso!")
            navigate('/login')
        } else {
            alert("Houve uma falha desconhecida!")
        }
    }
    return(
        <>
        <Conteudo>
            <div className="pagLogin">
            <h2>Página de recuperação de senha.</h2>
            {!usuario.status ? (
                <>
                <ValidaEmail onSubmit={onEnviar} parag="Por favor, insira o email que você cadastrou." tipo="submit" texto="Solicitar código" msg={msg.mensagem}/>
                </>
            ) : (
                <div>
                    {!msg.status ? (
                        <ValidaCodigo parag="Por favor, insira abaixo o código que enviamos ao seu email."
                        onChecar={onValidar} tipo="submit" texto="Prosseguir" msg={msg.mensagem}/>
                    ) : (
                        <NovaSenha onSubmit={onNovaSenha} parag="Por favor, digite sua nova senha no campo abaixo."
                        tipo="submit" texto="Salvar" />
                    )}
                </div>
            )}
            </div>
        </Conteudo>
        <Rodape />
        </>
    )
};

export default RecuperarSenha;