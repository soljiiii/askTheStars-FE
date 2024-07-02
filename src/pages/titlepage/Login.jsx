import {Link} from "react-router-dom";
import Header from "../../layouts/Header";
import "../../styles/Login.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
const [loginId, setLoginId] = useState("");
const [loginPw, setLoginPw] = useState("");
const navigate = useNavigate();

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
        axios.post(`http://localhost:80/login`,data, {withCredentials:true})
        .then(response =>{
            console.log(response.data);
            if(response.data==="Invalid credentials"){
                alert("로그인 정보가 일치하지 않습니다");
            }
            else
            navigate(`/`);
        })
        .catch(error =>{
            console.error("there was an error!", error);
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