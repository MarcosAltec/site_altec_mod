import Cabecalho from '../components/Cabecalho';
import Conteudo from '../components/Conteudo';
import Rodape from '../components/Rodape';
import Perguntas from './perguntas_frequentes.json';

function PerguntasFrequentes() {
    return(
        <>
        <Cabecalho />
        <Conteudo>
            <h1>{Perguntas.titulo}</h1>

            {Perguntas.pergutas.map((pergunta, index) =>
                <ul key={index}>
                    <li>{pergunta.questao}</li>
                    <p>{pergunta.resposta}</p>
                </ul>
            )}
        </Conteudo>
        <Rodape />
        </>
    )
}

export default PerguntasFrequentes;