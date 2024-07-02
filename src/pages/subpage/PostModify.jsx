import { Navigate, useNavigate, useParams } from "react-router-dom";
import Header from "../../layouts/Header";
import { useEffect, useState } from "react";
import axios from "axios";

function PostModify(){

    const {postNo} = useParams();
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    //랜더링 글 불러오기
    useEffect(()=>{
        axios.get(`http://localhost:80/postDetail/${postNo}`)
        .then(response=>{
            setSubject(response.data.title);
            setContent(response.data.postContent);
        })
    },[])

    //글수정 
    function handleModifySubject(e){
        if(e.target.value.length<=150)
            setSubject(e.target.value)
    }
    function handleModifyContent(e){
        if(e.target.value.length<=1000)
            setContent(e.target.value)
    }

    //글 수정 제출
    function handleSubmitModify(){
        const data = {
            postNo: postNo,
            title: subject,
            postContent: content
        }
        axios.post(`http://localhost:80/modifyPost`,data)
        .then(response=>{
            console.log(response.data)
            navigate(`/community/1`);
        })
    }

    return(
        <>
            <Header/>
            <div className="postContainer">
                <div className="subjectContainer">
                    <input 
                        className="subjectInput" 
                        placeholder="제목을 입력하세요." 
                        onChange={handleModifySubject}
                        value={subject}
                    />
                </div>
                <div className="contentContainer">
                    <textarea 
                        className="contentInput" 
                        placeholder="내용을 입력하세요." 
                        onChange={handleModifyContent}
                        value={content}
                    />
                </div>
                <div className="submitContainer">
                    <button className="postSubmitButton" onClick={handleSubmitModify}>수정하기</button>
                </div>
            </div>
        </>
    );
}
export default PostModify;