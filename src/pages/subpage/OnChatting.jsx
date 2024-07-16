import { useEffect, useState, useRef } from "react";
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
    const [userCnt, setUserCnt] = useState(0);
    const chatContainerRef = useRef(null);
    const [chatInfo, setChatInfo] = useState([]);

    
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

    //채팅방 정보 가져오기
    useEffect(()=>{
        axios.get(`http://localhost:80/getChatInfo/${roomId}`)
        .then(response=>{
            console.log(response.data);
            setChatInfo(response.data);
        })
    },[])

    useEffect(()=>{
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
                    // setYourMessage(preMessage=>[...preMessage, receive])
                    console.log(receive);
                    setYourMessage(prevMessage => [...prevMessage, receive]);
                }))
            }
            const errorCallback=()=>{
                console.error('websocket 서버 연결 실패');
                alert("서버에 이상이 있습니다. 다시 접속해주세요.")
            }

            stomp.connect({}, connectCallback, errorCallback);
            setChatClient(stomp);

            return () => {
                if(stomp && stomp.connected){
                    stomp.send('/pub/exitRoom', {}, JSON.stringify({roomId, userId}));
                    stomp.disconnect();
                    console.log("WebSocket 연결 종료");
                }
            };
        }
    },[userId, chatClient])

    // 페이지가 닫힐 때 서버에 신호 보내기
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (chatClient && chatClient.connected) {
                chatClient.send('/pub/exitRoom', {}, JSON.stringify({ roomId, userId }));
                chatClient.disconnect();
                console.log("WebSocket 연결 종료");
            }
            const confirmationMessage = '정말로 이 페이지를 떠나시겠습니까?';
            event.returnValue = confirmationMessage; // 표준에 따라 필요
            return confirmationMessage;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [chatClient, roomId, userId]);

    //메세지 전송
    const sendMessage=()=>{
        if(!chatClient|| !chatClient.connected){
            console.error("사용자가 존재하지 않습니다");
            alert("서버에 이상이 있습니다. 로그인 상태를 확인하고 다시 접속해주세요")
            chatClient.send('/pub/exitRoom',{},JSON.stringify({roomId, userId}))
            chatClient.disconnect();
        }
        chatClient.send('/pub/sendMessage',{},JSON.stringify({roomId, userId, myMessage}));
        setMyMessage("");
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [yourMessage]);

    //방 나가기
    function exitRoom(){
        if(chatClient){
            chatClient.send('/pub/exitRoom',{},JSON.stringify({roomId, userId}))
            chatClient.disconnect();
            navigate(`/chatting`);
        }
        else{
            alert("서버에 문제가 있습니다. 창을 닫고 다시 시도 해주세요")
            chatClient.send('/pub/exitRoom', {}, JSON.stringify({ roomId, userId }));
            chatClient.disconnect();
        }
    }

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
            <div className="chatContainer" ref={chatContainerRef}>
                {yourMessage.map((chat,index)=>(
                    chat.userId===userId?(
                        chat.chatTitle!==null?(
                        <MyChat
                            key={index}
                            msg={chat.myMessage}
                        />
                        ):(<></>)
                    ):(
                        chat.chatTitle!==null?(
                        <YourChat
                        key={index}
                        msg={chat.myMessage}
                        />
                        ):(<></>)
                    )
                ))}
            </div>
            <div className="sendContainer">
                <div className="messageBox">
                    <textarea
                        className="messageInput" 
                        value={myMessage}
                        onChange = {(e) => setMyMessage(e.target.value)}
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
