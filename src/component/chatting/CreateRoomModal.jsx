import { useState } from "react";
import "../../styles/Chatting.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCookie } from "../../util/util";

function CreateRoomModal({ isOpen, onClose }) {
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [chatClient, setChatClient] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [userId, setUserId] = useState("");

    // input 값 onChange 및 저장
    function handleRoomNameOnChange(e) {
        if (e.target.value.length < 30) {
            setRoomName(e.target.value);
        }
    }

    // x표시 누르면 onClose
    function onCloseModal() {
        setRoomName("");
        onClose();
    }

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

    // 방 만들기 요청 서버로 보내기
    function createRoomSubmit() {
        const data = { chatTitle: roomName };
        console.log(data);

        if (roomName !== "") {
            axios.post(`http://localhost:80/createChat`, data,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                },
                withCredential:true
            })
                .then(response => {
                    const roomId = response.data;
                    console.log(roomId);
                    if (typeof roomId === 'number') {
                        setRoomId(roomId);
                        console.log("Room ID:", roomId);
                        navigate(`../onchatting/${roomId}`);
                    } else {
                        alert("이미 존재하는 이름입니다. 새로 작성해주세요.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("방 생성에 실패했습니다.");
                });
        } else {
            alert("방 이름을 입력해주세요.");
        }
    }
    return (
        <>
            {isOpen && (
                <div className="modalContainer">
                    <div className="closeBox">
                        <button className="closeButton" onClick={onCloseModal}>X</button>
                    </div>
                    <div className="roomNameInputBox">
                        <input
                            className="roomNameInput"
                            placeholder="방 이름을 입력하세요."
                            value={roomName}
                            onChange={handleRoomNameOnChange}
                        />
                    </div>
                    <div className="finalCreateRoomButtonBox">
                        <button className="finalCreateRoomButton" onClick={createRoomSubmit}>만들기</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateRoomModal;
