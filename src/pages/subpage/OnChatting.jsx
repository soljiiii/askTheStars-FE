import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../util/util";
import axios from "axios";


function OnChatting(){

    const {roomId} = useParams();
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState("");

    //쿠키 가져오기
    useEffect(()=>{
        const cookieValue = getCookie("accessToken");
        if(cookieValue){
            setAccessToken(cookieValue);
        }
        else{
            setAccessToken(null);
        }
    },[])

    //JWT 토큰 주인 ID
    useEffect(()=>{
        axios.get(`http://localhost:80/getMemberId`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            withCredential:true
        })
        .then(response=>{
            setUserId(response.data);
        })
    },[accessToken])

    //나가기 처리

    //send 메세지

    return(
        <div style={{ 
            position: 'fixed',
            width: '500px',
            height: '600px',
            backgroundColor: 'black',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
            zIndex: '1000',
            overflowY: 'auto'
        }}>
            <div className="exitButtonBox">
                <button className="exitButton">나가기</button>
            </div>
            <div className="chattingContainer">

            </div>
            <div className="sendContainer">
                <div className="messageBox">
                    <input className="messageInput"/>
                </div>
                <div className="sendButtonBox">
                    <button className="sendButton">보내기</button>
                </div>
            </div>

        </div>
    );
}
export default OnChatting;