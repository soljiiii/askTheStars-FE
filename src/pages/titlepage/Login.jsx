import {Link} from "react-router-dom";
import Header from "../../layouts/Header";

function Login() {
    return (
        <>
            <Header/>
            <div className="loginBox">
                <div className="loginIdBox">
                    <input className="loginId"/>    
                </div>
                <div className="loginPwBox">
                    <input className="loginPw"/>    
                </div>
                <div className="loginButtonBox">
                    <button className="loginButton">로그인</button>
                </div>
            </div>
                <Link to="/login/memberjoin">
                    <button className="joinButton">회원가입</button>
                </Link>
        </>
    )
}

export default Login