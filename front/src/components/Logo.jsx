import { Link } from 'react-router-dom'
import logo from '../img/logo.png'

function Logo() {
    return (
        <Link to="/">
            <img className="logo" width="70px" src={logo} alt=""/>
        </Link>
    )
 }

 export default Logo;