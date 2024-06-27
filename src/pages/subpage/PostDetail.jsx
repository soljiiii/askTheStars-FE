import Header from "../../layouts/Header"
import replyComponent from "../../component/community/replyComponent"
import "../../styles/Community.css"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function PostDetail(){

    const {postNo} = useParams();

    //렌더링할때 글 불러오기
    useEffect(()=>{
        
    },[])

    return(
        <>
        <Header/>
            <div className="postDetailContainer">
                <div className="postDetailBox">
                    <div className="postDetailTitleBox">
                        글제목
                    </div>
                    <div className="postDetailStateBox">
                        <div className="postDetailVwCntBox">조회수</div>
                        <div className="postDetailDateBox">날짜</div>
                        <div className="postDetailIdBox">아이디</div>
                    </div>
                    <div className="postDetailContentBox">
                        <div className="contentBox">
                            글내용
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