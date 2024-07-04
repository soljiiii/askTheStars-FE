import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import RoomListComponent from '../../component/chatting/RoomListComponent';
import CreateRoomModal from '../../component/chatting/CreateRoomModal';

function Chatting() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function modalOpenState(){
        if(isModalOpen===true){
            setIsModalOpen(false);
        }
        else{
            setIsModalOpen(true);
        }
    }

    return ReactDOM.createPortal(
        <div style={{ 
            position: 'fixed',
            width: '500px',
            height: '600px',
            backgroundColor: 'black',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
            zIndex: '1000',
            overflowY: 'auto'
        }}>
            <div className="chattingBox">
                <div className="buttonBox">
                    <button className="createRoomButton" onClick={modalOpenState}>방 만들기</button>
                    <CreateRoomModal
                        isOpen={isModalOpen}
                        onClose={modalOpenState}
                    />
                </div>
                <div className="roomList">
                    <RoomListComponent/>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Chatting;
