import './Cabecalho.css'
import Logo from "./Logo";
import NavMenu from "./NavMenu";

function Cabecalho() {
    return(
        <header className="Cabecalho">
            <Logo />
            <NavMenu />
        </header>
    );
}

export default Cabecalho;