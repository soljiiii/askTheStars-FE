import {Link, useNavigate} from "react-router-dom";
import Header from "../../layouts/Header";
import "../../styles/MainPage.css"
import MainBanner from "../../component/mainpage/MainBanner";
import { useState } from "react";
import { getCookie } from "../../util/util";
import { useEffect } from "react";
import axios from "axios";
import { useLayoutEffect } from "react";
import PopularPost from "../../component/mainpage/PopularPost";

function MainPage() {

    const navigate = useNavigate();
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [accessToken, setAccessToken] = useState(null);
    const [userInfo,setUserInfo] = useState([]);
    const [selectedOption, setSelectedOption] = useState("vwCnt");
    const [popularPost, setPopularPost] = useState([]);


    function chattingPopUp() {
        if(accessToken!==null){
            const url = "http://localhost:5173/chatting";
            const name = "_blank";
            const specs = "width=500,height=600,resizable=no,scrollbars=yes,status=no";
            window.open(url, name, specs);
        }
        else{
            alert("로그인 후 이용 가능해요!");
        }
    }    
    useLayoutEffect(()=>{
        const cookieValue = getCookie("accessToken");
        if(cookieValue){
            setAccessToken(cookieValue);
        }
        else{
            setAccessToken(null);
        }
    },[])

    useEffect(()=>{
        if(accessToken!==null)
        axios.get(`http://localhost:80/getUserInfo`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        .then(response=>{
            setUserInfo(response.data);
        })
    },[accessToken])

    function renderStarImg(state){
        switch(state){
            case 0:
                return "/star1.png"
            case 1:
                return "/star2.png"
            case 2:
                return "/star3.png"
            case 3:
                return "/star4.png"
            case 4:
                return "/star5.png"
        }
    }

    function goToLogin(){
        navigate(`/login`);
    }

    function handleSelectOnChange(event){
        setSelectedOption(event.target.value);
    }

    //글 불러오기
    useEffect(()=>{
        axios.get(`http://localhost:80/getHotPost`,{
            params:{selectedOption:selectedOption}
        })
        .then(response=>{
            setPopularPost(response.data);
            console.log(response.data);
        })
    },[selectedOption])
    
    return (
        <>
            <Header/>
            <div className="allContentBox">
                <div className="mainContentBox">
                    <div className="bannerBox">
                        <MainBanner/>
                    </div>
                    <div className="topPostBox">
                        <div className="topPostSubBox">
                            <div className="topPostSubSelect">
                                <select  className="selectOption" id="topPostOption" value={selectedOption} onChange={handleSelectOnChange}>
                                    <option value="vwCnt">조회수</option>
                                    <option value="likeCnt">좋아요수</option>
                                    <option value="newPost">최신순</option>
                                </select>
                            </div>
                            <div className="topPostSub">실시간 인기글 🔥</div>
                            <button className="morePostButton">
                                <Link to="/community/1" className="morePostButtonLink">▶ 전체보기</Link><br/>
                            </button>
                        </div>
                        <div className="topPostContentBox">
                            <div className="topPostCountBox">
                                <div className="count">1</div>
                                <div className="count">2</div>
                                <div className="count">3</div>
                                <div className="count">4</div>
                                <div className="count">5</div>
                            </div>
                            <div className="topPostContent">
                                {popularPost.map((post,index)=>(
                                    <PopularPost
                                        key={index}
                                        post={post}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sideContentBox">
                    {accessToken!==null?(
                        <div className="mainMyBox">
                            <div className="mainMyImgBox">
                                <img className="mainMyImg" src={renderStarImg(userInfo.starImage)}/>
                            </div>
                            <Link to="/mypage" className="settingIconLink">
                                <img src="/setting.png" className="settingIcon"/>
                            </Link><br/>
                        </div>
                    ):(
                        <div className="mainMyBox">
                            <div className="noSessionMyBox">
                                <div className="noSessionText1">나의 프로필</div>
                                <div className="noSessionText2">로그인 후 이용 가능해요!</div>
                                <button className="noSessionLoginButton" onClick={goToLogin}>로그인하러가기</button>
                            </div>
                        </div>
                    )}
                    <div className="chattinButtonBox">
                        <button className="chattingButton" onClick={chattingPopUp}>
                            초신성 상담
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage