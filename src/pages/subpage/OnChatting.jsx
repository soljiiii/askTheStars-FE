import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { getCookie } from "../../util/util";
import axios from "axios";
import {Stomp} from '@stomp/stompjs';

function OnChatting(){

    const {roomId} = useParams();
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatClient,setChatClient]= useState(null);

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

    console.log("roomId:",roomId);
    console.log("userID:",userId);

    if(!chatClient && roomId && userId){
        //서버연결
        const websocket = new WebSocket('ws://localhost:80/websocket');
        //stomp 클라이언트 생성
        const stomp = Stomp.over(()=>websocket);
        console.log("클라이언트 생성");

        const connectCallback=()=>{
            console.log("WebSocket 연결 성공");
            console.log("Room ID:", roomId);
            console.log("User ID:", userId);
            //채팅방 생성
            stomp.send('/pub/createChatRoom',{},JSON.stringify({roomId, userId}));
            //채팅방 입장
            stomp.send('/pub/joinChatRoom',{},JSON.stringify({roomId, userId}));
            //채팅방 구독
            stomp.subscribe('/sub/'+roomId,(message=>{
                const receive = JSON.parse(message.body);
                console.log(receive)
                //받은 메세지 처리
                setMessages(preMessages=>[...preMessages, receive])
                console.log(messages)          
            }))
        }
        const errorCallback=()=>{
            console.error('websocket 서버 연결 실패');
        }

        stomp.connect({}, connectCallback, errorCallback);

        setChatClient(stomp);
    }

    //메세지 전송
    const sendMessage=()=>{
        if(!chatClient){
            console.error("사용자가 존재하지 않습니다");
            return;
        }
        chatClient.send('/pub/sendMessage',{},JSON.stringify({roomId, userId, message}));
        console.log(message);
    }
    
    const enter = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

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
                    <input 
                        className="messageInput" 
                        value={message}
                        onChange = {(e) => setMessage(e.target.value)}
                        onKeyDown = {enter}
                        placeholder = '메시지를 입력하세요.'
                    />
                </div>
                <div className="sendButtonBox">
                    <button className="sendButton" onClick={sendMessage}>보내기</button>
                </div>
            </div>

        </div>
    );
}
export default OnChatting;