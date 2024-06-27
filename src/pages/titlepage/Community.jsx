import {Link, useNavigate, useParams} from "react-router-dom";
import Header from "../../layouts/Header";
import { useEffect, useState } from "react";
import "../../styles/Community.css";
import { getCookie } from "../../util/util";
import axios from "axios";
import PostComponent from "../../component/community/PostComponent";
import MyWriteList from "../subpage/MyWriteList";
import Write from "../subpage/Write";
import Pagenation from "react-js-pagination";

function Community() {

    const {page} = useParams();
    const navigate = useNavigate();
    const [writeList, setWriteList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);


    //글쓰기 버튼 클릭
    function wrtieButton(){
        const refreshToken = getCookie("refreshToken");
        console.log(refreshToken)
        if(refreshToken===null){
            axios.post(`http://localhost:80/refresh-token`,{},{
                headers:{
                    Authorization: `Bearer ${refreshToken}`
                },
                withCredentials: true
            })
            .then(response=>{
                const accessToken = getCookie("accessToken");
                if(accessToken!==null){
                    navigate(`/community/write`)
                }
                else{
                    alert("로그인 후 이용해주세요!");
                }
            })
        }
        else{
            navigate(`/community/write`)
        }
        
    }

    //글 불러오기
    useEffect(()=>{
        axios.get(`http://localhost:80/writeList`,{
            params:{
                page: page
            }
        })
        .then(response=>{
            console.log(response.data);
            setWriteList(response.data.writeList);
            setTotalPage(response.data.totalItems);
        })
    },[page])

    function handlePageChange(pageNumber) {
        navigate(`/community/${pageNumber}`);
    }

    return (
        <>
            <Header/>
            <div className="communityContainer">
                <div className="communityButtonContainer">
                    <button className="writeButton" onClick={wrtieButton}>글쓰기</button>
                </div>
                <div className="postList">
                    {writeList.map((post, index) => (
                        <PostComponent
                            key={index}  
                            writeList={post}
                        />
                    ))}
                </div>
                <div className="pagingBox">
                    <Pagenation
                        activePage={parseInt(page)}
                        totalItemsCount={totalPage}
                        pageRangeDisplayed={10}
                        itemsCountPerPage={20}
                        prevPageText={"<"}
                        nextPageText={">"}
                        onChange={handlePageChange}
                        hideDisabled={false} 
                        hideFirstLastPages={true} 
                    />
                </div>
            </div>
        </>
    )
}

export default Community
