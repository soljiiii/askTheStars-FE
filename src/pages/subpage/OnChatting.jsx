import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../../util/util";
import axios from "axios";
import {Stomp} from '@stomp/stompjs';



function OnChatting(){

    const {roomId} = useParams();
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatClient,setChatClient]= useState("")

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

    //서버연결
    if(!chatClient){
        const websocket = new WebSocket('ws://localhost:80/websocket');
        const stomp = Stomp.over(()=>websocket);
    
        const connectCallback=()=>{
            //채팅방 생성 요청
            stomp.send('/app/createChatRoom',{},JSON.stringify({roomId}));
            console.log("채팅방 생성 성공");
    
            //채팅방 입장 요청
            stomp.send('/app/joinChatRoom',{},JSON.stringify({roomId}));
            console.log('채팅방 입장 성공');
    
            //채팅방 구독 요청
            stomp.subscribe('/topic/'+roomId,(message)=>{
                const receive = JSON.parse(message.body);
                const newMessage = {
                    message: receive.message
                };
                setMessages(preMessages => [...preMessages, newMessage]);
                setMessage('');
            })
        }
        const errorCallback=()=>{
            console.log('서버연결실패');
        }
        stomp.connect({},connectCallback,errorCallback);
        setChatClient(stomp);
    }

        // 송신
        const sendMessage = () => {
            // chatClient가 존재하지 않으면 실행하지 않는다.
            if (!chatClient) {
                console.error('[chatClient]가 존재하지 않습니다.');
                return;
            }
    
            // 메시지 송신 요청
            chatClient.send('/app/sendMessage', {}, JSON.stringify({roomId, message}));
        };
    
        // 키보드 이벤트 핸들러 (enter키를 눌렀을 때 메시지 송신)
        const enter = (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        };
    
        useEffect(()=>{
            if(!chatClient) {
                chatClient.send('/pub/exitRoom', {}, ({roomId}));
                console.log('채팅방 퇴장 성공!');
                chatClient.disconnect();
            }
        }, []);

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