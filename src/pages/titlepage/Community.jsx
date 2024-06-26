import {Link} from "react-router-dom";
import Header from "../../layouts/Header";
import { useEffect } from "react";
import "../../styles/Community.css";

function Community() {

    //글쓰기 버튼 클릭
    function wrtieButton(){

    }
    //글 불러오기
    useEffect(()=>{

    },[])

    return (
        <>
            <Header/>
            <div className="communityContainer">
                <div className="communityButtonContainer">
                    <button className="writeButton">글쓰기</button>
                </div>
                <div className="postList"></div>
                <div className="pagingBox"></div>
            </div>
        </>
    )
}

export default Community
