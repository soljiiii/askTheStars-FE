import { useEffect, useState } from "react";
import { formatDate } from "../../util/util";
import { getCookie } from "../../util/util";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from 'react';

function RepComponent({replyList, userId}){

    const [accessToken, setAccessToken] =useState(null);
    const [replyModify, setReplyModify] = useState(0);
    const [replyContent, setReplyContet] = useState("");
    const navigate = useNavigate();

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
    function handleModifyReply(){
        setReplyModify(1);
    }

    function handleReplyModifyOnChange(e){
        if(e.target.value.length<=300)
            setReplyContet(e.target.value);
    }
    
    //댓글 수정 완료
    function handleModifyReplyComplete(){
        const data = {
            replyNo: replyList.replyNo,
            postNo: replyList.postNo,
            memberId: userId,
            replyContent: replyContent
        }
        axios.post(`http://localhost:80/modifyReply`, data)
        .then(response=>{
            console.log(response.data);
            setReplyModify(0);
            window.location.reload();
        })
    }

    //댓글 삭제
    function handleDeleteReply(){
        axios.delete(`http://localhost:80/deleteReply/${replyList.replyNo}`)
        .then(response=>{
            console.log(response.data);
            window.location.reload();
        })
    }


    if(replyList.memberId===userId){
        if(replyModify===0){
            return(
                <>
                    <div className="replyContainer">
                        <div className="replyInfoBox">
                            <div className="replyIdBox">{replyList.memberId}</div>
                            <div className="replyDateBox">{formatDate(replyList.wrtnDate)}</div>
                        </div>
                        <textarea 
                            className="replyContentBox" 
                            readOnly
                            defaultValue={replyList.replyContent}
                        />
                        <div className="replyButtonBox">
                            <button className="replyModifyButton" onClick={handleModifyReply}>댓글수정</button>
                            <button className="replyDeleteButton" onClick={handleDeleteReply}>댓글삭제</button>
                        </div>
                    </div>
                </>
            );
        }
        else{
            return(
                <>
                    <div className="replyContainer">
                        <div className="replyInfoBox">
                            <div className="replyIdBox">{replyList.memberId}</div>
                            <div className="replyDateBox">{formatDate(replyList.wrtnDate)}</div>
                        </div>
                        <textarea 
                            className="replyContentBox" 
                            defaultValue={replyList.replyContent}
                            onChange={handleReplyModifyOnChange}
                        />
                        <div className="replyButtonBox">
                            <button className="replyModifyButton" onClick={handleModifyReplyComplete}>수정완료</button>
                            <button className="replyDeleteButton" onClick={handleDeleteReply}>댓글삭제</button>
                        </div>
                    </div>
                </>
            );
        }
    }
    else{
        return(
            <>
                <div className="replyContainer">
                    <div className="replyInfoBox">
                        <div className="replyIdBox">{replyList.memberId}</div>
                        <div className="replyDateBox">{formatDate(replyList.wrtnDate)}</div>
                    </div>
                    <textarea 
                        className="replyContentBox" 
                        readOnly
                        defaultValue={replyList.replyContent}
                    />
                    <div className="replyButtonBox">
                    </div>
                </div>
            </>
        );
    }
}
export default RepComponent;