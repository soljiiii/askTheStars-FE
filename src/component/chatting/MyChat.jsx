function MyChat({msg}){
    return(
        <>
        <div className="myChatContainer">
            <div className="myChatBox">
                {msg}
            </div>
        </div>
        </>
    );
}
export default MyChat;