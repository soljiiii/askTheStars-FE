import { useNavigate } from "react-router-dom";
import "../../styles/Chatting.css"

function RoomListComponent(){

    const navigate = useNavigate();

    //방정보 불러오기
    

    function joinChatiing(){
        navigate(`/onchatting/${roomNo}`)
    }

    return(
        <>
            <div className="RoomListContainer">
                <div className="roomName">방제</div>
                <div className="roomState">상태</div>
                <div className="roomJoinButtonBox">
                    <button className="roomJoinButton" onClick={joinChatiing}>JOIN</button>
                </div>
            </div>
        </>
    );
}
export default RoomListComponent;