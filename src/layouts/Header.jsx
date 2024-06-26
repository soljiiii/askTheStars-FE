import {Link} from "react-router-dom";
import "../styles/layouts.css"
import { useEffect } from "react";
import { useState } from "react";
import { getCookie } from "../util/util";
import axios from "axios";

function Header(){

    const [accessToken, setAccessToken] = useState(null);

    useEffect(()=>{
        const cookieValue = getCookie("accessToken");
        if(cookieValue){
            setAccessToken(cookieValue);
        }
        else{
            setAccessToken(null);
        }
    },[])

    function handleLogOut(){
        axios.post(`http://localhost:80/logout`,{},{
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        .then(response=>{
            console.log("Logout Successfully");
            window.location.reload();
        })
        .catch(error=>{
            console.error("logout failed", error)
        })
    }

    return(
        <div className="headerBox">
            <div className="headerLogo">
                <Link to="/"><img className="logoImage" src="/logo.png"/></Link><br/>
            </div>
            <div className="headerLinkBox">
                <div className="headerLogin">
                    {accessToken?
                    (<button className="logoutButton" onClick={handleLogOut}>LOGOUT</button>)
                    :(<Link to="/login" className="headerLoginLink">LOGIN</Link>)}
                    
                </div>
                <div className="headerMypage">
                    <Link to="/mypage"><img className="menuImage" src="/menu.png"/></Link><br/>
                </div>
            </div>
        </div>
    );
}

export default Header