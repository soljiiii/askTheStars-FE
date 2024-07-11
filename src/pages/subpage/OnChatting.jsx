import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { getCookie } from "../../util/util";
import axios from "axios";
import {Stomp} from '@stomp/stompjs';
import MyChat from "../../component/chatting/MyChat";
import YourChat from "../../component/chatting/YourChat";
function OnChatting(){

    const {roomId} = useParams();
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState("");
    const [myMessage, setMyMessage] = useState("");
    const [yourMessage, setYourMessage] = useState([]);
    const [chatClient,setChatClient]= useState(null);
    const [chatState, setChatState] = useState("");
    const navigate = useNavigate();

    
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
                //받은 메세지 처리
                setYourMessage(preMessage=>[...preMessage, receive])
                console.log(receive);
                
                if(receive.type==='join'){
                    setChatState(receive.userId,+"가 참여");
                    console.log(chatState)
                }
                else if(receive.type==='leave'){
                    setChatState(receive.userId,+"가 퇴장");
                    console.log(chatState)
                }
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
        chatClient.send('/pub/sendMessage',{},JSON.stringify({roomId, userId, myMessage}));
        console.log(myMessage);
    }
    
    const enter = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    //방 나가기
    function exitRoom(){
        // chatClient.send('/pub/exitRoom',{},JSON.stringify({roomId}))
        // chatClient.disconnect();
        navigate(`/chatting`)
        window.location.reload();
        console.log("나가기");
    }

    //창 닫으면 채팅 통신 끊기
    window.addEventListener('beforeunload', function(event) {
        // WebSocket을 통한 메시지 전송 및 연결 종료
        if (chatClient) {
            chatClient.send('/pub/exitRoom', {}, JSON.stringify({ roomId }));
            chatClient.disconnect();
        }
    });
    
    

    return(
        <div style={{ 
            position: 'fixed',
            width: '500px',
            height: '600px',
            backgroundColor: 'black',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
            zIndex: '1000',
            overflowY: 'auto',
            overflow: 'hidden'
        }}>
            <div className="exitButtonBox">
                <div className="stateBox"></div>
                <button className="exitButton" onClick={exitRoom}>나가기</button>
            </div>
            <div className="chatContainer">
                <div className="chatBox">
                    {chatState!==null?(<span>{chatState}</span>):(<></>)}
                <MyChat/>
                <YourChat/>
                </div>
            </div>
            <div className="sendContainer">
                <div className="messageBox">
                    <textarea
                        className="messageInput" 
                        value={myMessage}
                        onChange = {(e) => setMyMessage(e.target.value)}
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