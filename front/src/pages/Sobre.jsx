import Cabecalho from '../components/Cabecalho';
import Conteudo from '../components/Conteudo';
import Rodape from '../components/Rodape';
import sobreData from './sobre.json';

function Sobre() {
    return(
        <>
        <Cabecalho />
        <Conteudo>
            <h1>{sobreData.titulo}</h1>
            {sobreData.paragrafos.map((paragrafo, index) =>
                <p key={index}>{paragrafo}</p>
            )}
        </Conteudo>
        <Rodape />
        </>
    )
}

export default Sobre;