import { useState } from "react";
import "../../styles/Chatting.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Client } from '@stomp/stompjs';


function CreateRoomModal({isOpen, onClose}){

    const [roomName, setRoomName] = useState("");
    const navigate = useNavigate();
    const [chatClient, setChatClient] = useState("");

    //input 값 onChange 및 저장
    function handleRoomNameOnChange(e){
        if(e.target.value.length<30){
            setRoomName(e.target.value);
        }
    }

    //x표시 누르면 onClose
    function onCloseModal(){
        setRoomName("");
        onClose();
    }

    //방 만들기 요청 서버로 보내기
    function createRoomSubmit(){
        const data = {
            chatTitle:roomName
        }
        console.log(data);
        if(roomName!==""){
            axios.post(`http://localhost:80/createChat`,data)
            .then(response=>{
                console.log(response.data);
                if (typeof response.data === 'number') {
                    const roomNo = response.data;

                    stompClient.activate();
                    stompClient.onConnect=(frame)=>{
                        console.log('connect'+frame);

                        const roomId = roomName;

                        stompClient.publish({
                            destination:'app/createRoom',
                            body:JSON.stringify({roomName})
                        })

                        stompClient.subscribe(`/topic/room/${roomName}`, (message) => {
                            console.log('Joined room:', roomName);
                            console.log('Received message:', message.body);
                            // 메시지 처리 로직 추가
                        });
                    }

                    navigate(`../onchatting/${roomNo}`);
                } else {
                    alert("이미 존재하는 이름입니다 새로 작성해주세요");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("dpfj");
            });
        }
        else{
            alert("방 이름을 입력해주세요");
        }
    }
    

    return(
        <>
        {isOpen&&(
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