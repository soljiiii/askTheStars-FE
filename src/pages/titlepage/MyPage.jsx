import Header from "../../layouts/Header";
import { useState } from "react";
import "../../styles/MyPage.css"
import MyPageStand from "../../component/mypage/MyPageStand";
import MyWriteList from "../../component/mypage/MyWriteList";
import MyReplyList from "../../component/mypage/MyReplyList";
import MyLikedPostList from "../../component/mypage/MyLikedPostList";
import MemberModify from "../../component/mypage/MemberModify";
import MemberDelete from "../../component/mypage/MemberDelete";
import { getCookie } from "../../util/util";
import { useEffect } from "react";

function MyPage() {

    const [writeListClick, setWrtieListClick] = useState(false);
    const [myReplyListClick, setReplyListClick] = useState(false);
    const [myLikePostClick, setMyLikePostClick] = useState(false);
    const [memberModifyClick, setMemberModifyClick] = useState(false);
    const [memberDeleteClick, setMemberDeleteClick] = useState(false);
    const [myPageState, setMyPageState] = useState(0);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(()=>{
        const cookieValue = getCookie("accessToken");
        if(cookieValue){
            setAccessToken(cookieValue);
        }        
        else{
            setAccessToken(null);
        }
    },[])

    function handleWriteList(){
        setMyPageState(1);
        setWrtieListClick(true);
        setReplyListClick(false);
        setMyLikePostClick(false);
        setMemberModifyClick(false);
        setMemberDeleteClick(false);
    }
    
    function handleMyReplyList(){
        setMyPageState(2);
        setWrtieListClick(false);
        setReplyListClick(true);
        setMyLikePostClick(false);
        setMemberModifyClick(false);
        setMemberDeleteClick(false);
    }

    function handleMyLikePostList(){
        setMyPageState(3);
        setWrtieListClick(false);
        setReplyListClick(false);
        setMyLikePostClick(true);
        setMemberModifyClick(false);
        setMemberDeleteClick(false);
    }
    
    function handleMemberModifyButton(){
        setMyPageState(4);
        setWrtieListClick(false);
        setReplyListClick(false);
        setMyLikePostClick(false);
        setMemberModifyClick(true);
        setMemberDeleteClick(false);
    }
    
    function handleMemberDeleteButton(){
        setMyPageState(5);
        setWrtieListClick(false);
        setReplyListClick(false);
        setMyLikePostClick(false);
        setMemberModifyClick(false);
        setMemberDeleteClick(true);
    }

    function renderPageState(state){
        switch(state){
            case 0:
                return <MyPageStand
                        accessToken={accessToken}
                        />;
            case 1:
                return <MyWriteList
                        accessToken={accessToken}
                        />;
            case 2:
                return <MyReplyList
                        accessToken={accessToken}
                        />;
            case 3:
                return <MyLikedPostList
                        accessToken={accessToken}
                        />;
            case 4:
                return <MemberModify
                        accessToken={accessToken}
                        />;
            case 5:
                return <MemberDelete
                        accessToken={accessToken}
                        />;
            default:
                return <MyPageStand
                        accessToken={accessToken}
                        />;
        }
    }

    return (
        <>
            <Header/>
            <div className="myPageContainer">
                <div className="sideBannerContainer">
                    <div className="myWriteBox">
                        <button 
                            className={writeListClick?'writeListButtonclicked':'writeListButton'}
                            onClick={handleWriteList}
                            >내가 쓴 글
                        </button>
                    </div>
                    <div className="myReplyBox">
                        <button 
                            className={myReplyListClick?'myReplyButtonclicked':'myReplyButton'}
                            onClick={handleMyReplyList}
                            >내가 쓴 댓글
                        </button>
                    </div>
                    <div className="myLikePostBox">
                        <button 
                            className={myLikePostClick?"myLikePostButtonclicked":"myLikePostButton"}
                            onClick={handleMyLikePostList}
                            >내가 좋아한 글
                        </button>
                    </div>
                    <div className="memberModifyBox">
                        <button 
                            className={memberModifyClick?"memberModifyButtonclicked":"memberModifyButton"}
                            onClick={handleMemberModifyButton}
                            >회원수정
                        </button>
                    </div>
                    <div className="memberDeleteBox">
                        <button 
                            className={memberDeleteClick?"memberDeleteButtonclicked":"memberDeleteButton"}
                            onClick={handleMemberDeleteButton}
                            >회원탈퇴
                        </button>
                    </div>
                </div>
                <div className="myPageStateBox">
                    {renderPageState(myPageState)}
                </div>
            </div>
        </>
    )
}

export default MyPage