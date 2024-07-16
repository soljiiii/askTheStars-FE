import { useEffect, useState } from "react";
import MyPageWriteComponent from "./MyPageWriteComponent";
import axios from "axios";
import { getCookie } from "../../util/util";


function MyWriteList({accessToken}){

    const [myPostList, setMyPostList] = useState([]);


    useEffect(()=>{
        if(accessToken!==null){
        axios.get(`http://localhost:80/getMyPost`,{
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
    )
}
export default MyWriteList;