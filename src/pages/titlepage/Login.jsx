import {Link} from "react-router-dom";
import Header from "../../layouts/Header";
import "../../styles/Login.css"
import { useState } from "react";

function Login() {
const [loginId, setLoginId] = useState("");
const [loginPw, setLoginPw] = useState("");

function handleLoginIdChange(e){
    if(e.target.value.length<=20)
        setLoginId(e.target.value);
}
function handleLoginPwChange(e){
    if(e.target.value.length<=20)
        setLoginPw(e.target.value);
}

function handleLogin(){
    if(loginId===""||loginPw===""){
        alert("아이디와 비밀번호를 입력해주세요!")
    }
    else{
        const data = {
            memberId : loginId,
            memberPw : loginPw
        }
        axios.post(`http://localhost:80/login`,data)
        .then(response =>{

        })
    }
}

    return (
        <>
            <Header/>
            <div className="allLoginBox">
                <div className="loginTitle">LOGIN</div>
                <div className="loginBox">
                    <div className="loginIdBox">
                        <input 
                            className="loginId"
                            value={loginId}
                            onChange={handleLoginIdChange}
                        />    
                    </div>
                    <div className="loginPwBox">
                        <input 
                            className="loginPw"
                            value={loginPw}
                            onChange={handleLoginPwChange}
                        />    
                    </div>
                    <div className="loginButtonBox">
                        <button className="loginButton" onClick={handleLogin}>LOGIN</button>
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