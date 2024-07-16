import "../../styles/Common.css"

function JoinInput({ menu, onChange, value, readonly }) {
    function handleOnChange(event) {
        const newValue = event.target.value;
        onChange(newValue);
    }

    return (
        <>
            <div className="joinInput">
                <span className="joinMenu">
                    {menu}
                </span>
                <input 
                    className="inputBox"
                    onChange={handleOnChange}  
                    value={value || ''} 
                    readOnly={readonly}
                />
            </div>
        </>
    );
}
export default JoinInput;
