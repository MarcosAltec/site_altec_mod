import { Link } from "react-router-dom";

function Rodape() {
    return (
        <footer>
            <div>
                <ul>
                    <Link to="/">Inicio</Link>
                    <Link to="/suporte">Suporte</Link>
                    <Link to="/parceiros">Parceiros</Link>
                    <Link to="perguntas_frequentes">Perguntas frequentes</Link>
                </ul>
            </div>
            <div>
                <h3>Redes Sociais</h3>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
            <div>
                <p>&copy; 2018-2025 - Altec Mod</p>
            </div>
        </footer>
    );
}

export default Rodape;