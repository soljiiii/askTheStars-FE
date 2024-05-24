import "../../styles/Common.css"

function JoinInput({menu}){
    return(
        <>
            <div className="joinInput">
                <span className="joinMenu">
                    {menu}
                </span>
                <input className="inputBox"/>
            </div>
        </>
    );
}
export default JoinInput