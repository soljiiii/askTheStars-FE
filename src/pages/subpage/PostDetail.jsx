import Header from "../../layouts/Header"
import replyComponent from "../../component/community/replyComponent"
import "../../styles/Community.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatDate } from "../../util/util";
import axios from "axios"

function PostDetail(){

    const {postNo} = useParams();
    const [detail, setDetail] = useState([]);

    //렌더링할때 글 불러오기
    useEffect(()=>{
        axios.get(`http://localhost:80/postDetail/${postNo}`)
        .then(response=>{
            console.log(response.data)
            setDetail(response.data)
        })
    },[])

    function postDate(dateString){
        const date = new Date(dateString);
        const year = date.getFullYear;
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        
        return `${year}-${month}-${day}`;
    }

    return(
        <>
        <Header/>
            <div className="postDetailContainer">
                <div className="postDetailBox">
                    <div className="postDetailTitleBox">
                        {detail.title}
                    </div>
                    <div className="postDetailStateBox">
                        <div className="postDetailVwCntBox">{detail.vwCnt}</div>
                        <div className="postDetailDateBox">{formatDate(detail.wrtnDate)}</div>
                        <div className="postDetailIdBox">{detail.memberId}</div>
                    </div>
                    <div className="postDetailContentBox">
                        <div className="contentBox">
                            {detail.postContent}
                        </div>
                        <div className="likeButtonBox">
                            <button className="likeButton">좋아요</button>
                        </div>
                    </div>
                    <div className="writeReplyBox">
                        <input className="replyInput"/>
                        <button className="replySubmitButton">댓글쓰기</button>
                    </div>
                    <div className="replyBox">
                        <replyComponent/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PostDetail