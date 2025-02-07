import { Link } from "react-router-dom";

function NavMenu() {
    return (
        <nav>
            <ul>
                <Link to="/sobre">Sobre</Link>
                <Link to="/suporte">Suporte</Link>
                <Link to="/perguntas-frequentes">Perguntas frequentes</Link>
                <br />
                <Link to={`/login`}>Entrar na sua conta</Link>
                <Link to={`/registrar`}>Criar sua conta</Link>  
            </ul>
        </nav>
    )
}

export default NavMenu;