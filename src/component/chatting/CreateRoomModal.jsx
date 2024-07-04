import { useState } from "react";
import "../../styles/Chatting.css";

function CreateRoomModal({isOpen, onClose}){

    const [roomName, setRoomName] = useState();

    //input 값 onChange 및 저장
    function handleRoomNameOnChante(e){
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
    //방 이름 유효성 검사

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
                        onChange={handleRoomNameOnChante}
                    />
                </div>
                <div className="finalCreateRoomButtonBox">
                    <button className="finalCreateRoomButton">만들기</button>
                </div>
            </div>
        )}
        </>
    );
}
export default CreateRoomModal;