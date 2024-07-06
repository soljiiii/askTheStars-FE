import "../../styles/MyPage.css"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import MyPageWriteComponent from "./MyPageWriteComponent";

function MyLikedPostList({accessToken}){

    const [myPostList, setMyPostList] = useState([]);

    useEffect(()=>{
        if(accessToken!==null){
        axios.get(`http://localhost:80/getMyLikedPost`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        .then(response=>{
            setMyPostList(response.data);
        })
    }
    },[accessToken])
    console.log(myPostList)

    return(
        <>
            <div className="myWriteListContainer">
                <div className="writeListBox">
                    <div className="writePostNoBox">글번호</div>
                    <div className="writeContentBox">글제목</div>
                    <div className="writeDateBox">작성날짜</div>
                </div>
                {myPostList.map((post, index)=>(
                    <MyPageWriteComponent
                        key={index}
                        myPostList={post}
                        state="post"
                    />
                ))}
            </div>  
        </>
    )
}
export default MyLikedPostList