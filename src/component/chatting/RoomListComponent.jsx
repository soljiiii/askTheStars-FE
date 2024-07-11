import { useNavigate } from "react-router-dom";
import "../../styles/Chatting.css"
import { useState } from "react";

function RoomListComponent({chat}){

    const navigate = useNavigate();   

    //join
    function joinChatiing(){
        if(chat.chatState===2){
            alert("이미 상담 중이에요!");
        }
        else{
            navigate(`/onchatting/${chat.chatNo}`);
        }
    }

    return(
        <>
            <div className="RoomListContainer">
                <div className="roomName">{chat.chatTitle}</div>
                {chat.chatState===1?(
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