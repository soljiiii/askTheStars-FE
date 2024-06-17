import "../../styles/Common.css"

function JoinInput({menu, onChange, value}){

    function handleOnChange(event){
        const newValue = event.target.value;
        onChange(newValue);
    }

    return(
        <>
            <div className="joinInput">
                <span className="joinMenu">
                    {menu}
                </span>
                <input 
                    className="inputBox"
                    onChange={handleOnChange}  
                    value={value}  
                />
            </div>
        </>
    );
}
export default JoinInput