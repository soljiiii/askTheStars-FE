import { useEffect, useState } from "react";
import { formatDate } from "../../util/util";
import { getCookie } from "../../util/util";

function replyComponent({replyList}){

    const [accessToken, setAccessToken] =useState(null);

    useEffect(()=>{
        const cookieValue = getCookie("accessToken");
        if(cookieValue){
            setAccessToken(cookieValue);
        }
        else{
            setAccessToken(null);
        }
    },[])

    function postDate(dateString){
        const date = new Date(dateString);
        const year = date.getFullYear;
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        
        return `${year}-${month}-${day}`;
    }


    //댓글 수정

    //댓글 삭제

    return(
        <>
            <div className="replyContainer">
                <div className="replyInfoBox">
                    <div className="replyIdBox">{replyList.memberId}</div>
                    <div className="replyDateBox">{formatDate(replyList.wrtnDate)}</div>
                </div>
                <div className="replyContentBox">
                    {replyList.replyContent}
                </div>
                <div className="replyButtonBox">
                    <button className="replyModifyButton">댓글수정</button>
                    <button className="replyDeleteButton">댓글삭제</button>
                </div>
            </div>
        </>
    );
}
export default replyComponent;