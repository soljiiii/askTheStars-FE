import { useState } from "react";
import "../../styles/MyPage.css";
import { formatDate } from "../../util/util";
import { useNavigate } from "react-router-dom";

function MyPageWriteComponent({myPostList, state}){

    const navigate = useNavigate();

    function postDate(dateString){
        const date = new Date(dateString);
        const year = date.getFullYear;
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        
        return `${year}-${month}-${day}`;
    }

    function goToThisPost(){
        navigate(`/community/postdetail/${myPostList.postNo}`)
    }

    return(
        <div className="myPageWriteComponentBox" onClick={goToThisPost}>
            <div className="myPageWritePostNo">{myPostList.postNo}</div>
            {state==="post"?
            (<div className="myPageWriteContent">{myPostList.title}</div>):
            (<div className="myPageWriteContent">{myPostList.replyContent}
            </div>)}
            
            <div className="myPageWriteDate">{formatDate(myPostList.wrtnDate)}</div>
        </div>
    );
}
export default MyPageWriteComponent;