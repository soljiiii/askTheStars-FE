import MyPageWriteComponent from "./MyPageWriteComponent"
import "../../styles/MyPage.css";
import { useEffect, useState } from "react";
import axios from "axios";

function MyReplyList({accessToken}){
    
    const [myPostList, setMyPostList] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:80/getMyReply`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        .then(response=>{
            setMyPostList(response.data);
        })
    },[])

    return(
        <>
            <div className="myWriteListContainer">
                <div className="writeListBox">
                    <div className="writePostNoBox">글번호</div>
                    <div className="writeContentBox">댓글내용</div>
                    <div className="writeDateBox">작성날짜</div>
                </div>
                {myPostList.map((post, index)=>(
                    <MyPageWriteComponent
                        key={index}
                        myPostList={post}
                        state="reply"
                    />
                ))}
            </div>
        </>
    )
}
export default MyReplyList