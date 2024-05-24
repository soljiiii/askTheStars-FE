import {Link} from "react-router-dom";
import Header from "../../layouts/Header";
import "../../styles/Login.css"

function Login() {
    return (
        <>
            <Header/>
            <div className="allLoginBox">
                <div className="loginTitle">LOGIN</div>
                <div className="loginBox">
                    <div className="loginIdBox">
                        <input className="loginId"/>    
                    </div>
                    <div className="loginPwBox">
                        <input className="loginPw"/>    
                    </div>
                    <div className="loginButtonBox">
                        <button className="loginButton">LOGIN</button>
                    </div>
                </div>
                <Link to="/login/memberjoin" className="joinButtonLink">
                    <button className="joinButton">JOIN</button>
                </Link>
            </div>
        </>
    )
}

export default Login