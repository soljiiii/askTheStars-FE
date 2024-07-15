import { useNavigate } from "react-router-dom";
import "../../styles/Chatting.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../../util/util";

function RoomListComponent({chat}){

    const navigate = useNavigate();  
    const [userCnt, setUserCnt]= useState(0); 
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

    useEffect(()=>{
        axios.get(`http://localhost:80/getUserCnt/${chat.chatNo}`)
        .then(response=>{
            setUserCnt(response.data);
        })
    },[userCnt])

    //join
    function joinChatiing(){
        if(userCnt===2){
            alert("이미 진행 중인 상담입니다")
        }
        if(userCnt===1){
            navigate(`../onchatting/${chat.chatNo}`);
        }
    }

    return(
        <>
            <div className="RoomListContainer">
                <div className="roomName">{chat.chatTitle}</div>
                {userCnt===1?(
                    <div className="roomState">
                        <div>대기중</div>
                        <div>🟢</div>
                    </div>
                ):(
                    <div className="roomState">
                        <div>상담중</div>
                        <div>🔴</div>
                    </div>
                )}
                <div className="roomJoinButtonBox">
                    <button className="roomJoinButton" onClick={joinChatiing}>JOIN</button>
                </div>
            </div>
        </>
    );
}
export default RoomListComponent;