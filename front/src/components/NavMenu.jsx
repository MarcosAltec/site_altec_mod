import IconeUsuario from "./IconeUsuario";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function NavMenu() {
    return (
        <nav>
            <div className="header">
                <Logo />
                <div>
                    <IconeUsuario />
                    <span>
                        <Link className="linkCabecalho" to="/login">Entrar na sua conta</Link>
                        <Link className="linkCabecalho" to="/registrar">Criar sua conta</Link>
                    </span>
                </div>
            </div>
            <div className="barrasMenus">
                <div><Link className="linkCabecalho" to="/sobre">Sobre</Link></div>
                <div><Link className="linkCabecalho" to="/suporte">Suporte</Link></div>
                <div><Link className="linkCabecalho" to="/perguntas-frequentes">Perguntas frequentes</Link></div>
            </div>
        </nav>
    )
}

export default NavMenu;