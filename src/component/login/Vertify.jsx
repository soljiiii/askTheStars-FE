import "../../styles/Common.css"

function Vertify({vertifyEvent, existState}) {
    return(
        <>
            <div className="vertifyBox">
                <div className="vertifyResult">
                    {existState===3?<span></span>:(existState===1?
                        <span className="vertifyDisable">이미 사용 중입니다</span>
                        :<span className="vertifyAble">사용 가능합니다</span>)
                    }

                </div>
                <button className="vertifyButton"
                    onClick={vertifyEvent}>
                    CHECK!
                </button>
            </div>
        </>
    );
}
export default Vertify