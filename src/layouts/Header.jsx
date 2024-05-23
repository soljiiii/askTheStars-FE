import {Link} from "react-router-dom";
import "../styles/layouts.css"

function Header(){

    return(
        <div className="headerBox">
            <div className="headerLogo">
                <Link to="/"><img className="logoImage" src="/logo.png"/></Link><br/>
            </div>
            <div className="headerLinkBox">
                <div className="headerLogin">
                    <Link to="/login" className="headerLoginLink">LOGIN</Link><br/>
                </div>
                <div className="headerMypage">
                    <Link to="/mypage"><img className="menuImage" src="/menu.png"/></Link><br/>
                </div>
            </div>
        </div>
    );
}

export default Header