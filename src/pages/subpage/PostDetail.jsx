import Header from "../../layouts/Header"
import ReplyComponent from "../../component/community/ReplyComponent"
import "../../styles/Community.css"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { formatDate } from "../../util/util";
import axios from "axios"
import { getCookie } from "../../util/util"

function PostDetail(){

    const {postNo} = useParams();
    const [detail, setDetail] = useState([]);
    const [replyList, setReplyList] = useState([]);
    const [replyContent, setReplyContent] = useState("");
    const [accessToken, setAccessToken] =useState(null);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    //쿠키 가져오기
    useEffect(()=>{
        const cookieValue = getCookie("accessToken");
        if(cookieValue){
            setAccessToken(cookieValue);
        }
        else{
            setAccessToken(null);
        }
    },[])

    //JWT 토큰 주인 ID
    useEffect(()=>{
        axios.get(`http://localhost:80/getMemberId`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            withCredential:true
        })
        .then(response=>{
            setUserId(response.data);
        })
    },[accessToken])

    //렌더링할때 글 불러오기
    useEffect(()=>{
        axios.get(`http://localhost:80/postDetail/${postNo}`)
        .then(response=>{
            setDetail(response.data)
        })
    },[])

    //댓글 불러오기
    useEffect(()=>{
        axios.get(`http://localhost:80/replyList/${postNo}`)
        .then(response=>{
            console.log(response.data)
            setReplyList(response.data);
        })
    },[])

    function postDate(dateString){
        const date = new Date(dateString);
        const year = date.getFullYear;
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        
        return `${year}-${month}-${day}`;
    }

    //댓글 쓰기 onChange
    function handleReplyContentChange(e){
        if(e.target.value.length<=300)
            setReplyContent(e.target.value);
    }

    //댓글 쓰기
    function handleSubmitReply(){
        if(accessToken===null){
            alert("로그인 후 이용해주세요!")
        }
        else{
            if(replyContent===""){
                alert("내용을 작성해주세요!");
            }
            else{
                const data = {
                    postNo:postNo,
                    replyContent:replyContent
                }
                axios.post(`http://localhost:80/writeReply`,data,{
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredential:true
                })
                .then(response=>{
                    console.log("작성완료")
                    window.location.reload();
                })
            }
        }
    }

    //글 수정
    function handleModifyPost(){
        navigate(`/community/postmodify/${postNo}`)
    }

    //글 삭제
    function handleDeletePost(){
        axios.delete(`http://localhost:80/deletePost/${postNo}`)
        .then(response=>{
            alert("글삭제 완료!")
            navigate(`/community/1`)
        })
    }

    if(detail.memberId===userId){
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
                                <div className="likeStubBox">
                                    <button className="likeButton">👍</button>
                                    <span className="likeCnt">Liked : {detail.likedCnt}</span>
                                </div>
                                <div className="postStubBox">
                                    <button className="postModifyButton" onClick={handleModifyPost}>글수정</button>
                                    <button className="postDeleteButton" onClick={handleDeletePost}>글삭제</button>
                                </div>
                            </div>
                        </div>
                        <div className="writeReplyBox">
                            <textarea 
                                className="replyInput" 
                                value={replyContent}
                                onChange={handleReplyContentChange}
                                placeholder="댓글을 입력하세요."
                            />
                            <button className="replySubmitButton" onClick={handleSubmitReply}>댓글쓰기</button>
                        </div>
                        <div className="replyBox">
                            {replyList.map((reply,index)=>(
                                <ReplyComponent
                                    key={index}
                                    replyList={reply}
                                    userId={userId}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else{
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
                                <div className="likeStubBox">
                                    <button className="likeButton">👍</button>
                                    <span className="likeCnt">Liked : {detail.likedCnt}</span>
                                </div>
                                <div className="postStubBox">
                                
                                </div>
                            </div>
                        </div>
                        <div className="writeReplyBox">
                            <textarea 
                                className="replyInput" 
                                value={replyContent}
                                onChange={handleReplyContentChange}
                                placeholder="댓글을 입력하세요."
                            />
                            <button className="replySubmitButton" onClick={handleSubmitReply}>댓글쓰기</button>
                        </div>
                        <div className="replyBox">
                            {replyList.map((reply,index)=>(
                                <ReplyComponent
                                    key={index}
                                    replyList={reply}
                                    userId={userId}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default PostDetail