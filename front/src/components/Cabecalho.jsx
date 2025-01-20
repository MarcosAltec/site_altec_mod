import './Cabecalho.css'
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import { Link } from "react-router-dom";

function Cabecalho() {
    return(
        <header className="Cabecalho">
            <Logo />
            <NavMenu />
            <Link to={`/login`}>Entrar na sua conta</Link>
            <br />
            <Link to={`/registrar`}>Criar sua conta</Link>  
        </header>
    );
}

export default Cabecalho;