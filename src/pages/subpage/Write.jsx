import { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import "../../styles/Community.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../../util/util";

function Write(){
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [accessToken, setAccessToken] =useState(null);

    function handleSubject(e){
        if(e.target.value.length<=150)
            setSubject(e.target.value)
    }
    function handleContent(e){
        if(e.target.value.length<=1000)
            setContent(e.target.value)
    }

    useEffect(()=>{
        const cookieValue = getCookie("accessToken");
        if(cookieValue){
            setAccessToken(cookieValue);
        }
        else{
            setAccessToken(null);
        }
    },[])

    function postWriteSubmit(){
        const data = {
            title:subject,
            postContent: content
        }
        if(accessToken!==null){
            if(subject===""){
                alert("제목을 입력해주세요!")
            }
            else{
                axios.post(`http://localhost:80/postWrite`,data,{
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredential:true
                })
                .then(response=>{
                    console.log("작성완료");
                    navigate(`/community/1`)
                })
            }
        }
        else{
            alert("로그인 후 이용해주세요")
        }
    }
    return(
        <>
        <Header/>
            <div className="postContainer">
                <div className="subjectContainer">
                    <input 
                        className="subjectInput" 
                        placeholder="제목을 입력하세요." 
                        onChange={handleSubject}
                        value={subject}
                    />
                </div>
                <div className="contentContainer">
                    <textarea 
                        className="contentInput" 
                        placeholder="내용을 입력하세요." 
                        onChange={handleContent}
                        value={content}
                    />
                </div>
                <div className="submitContainer">
                    <button className="postSubmitButton" onClick={postWriteSubmit}>글쓰기</button>
                </div>
            </div>
        </>
    )
}
export default Write;