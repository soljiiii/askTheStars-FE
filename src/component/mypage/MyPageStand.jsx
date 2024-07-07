import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function MyPageStand({accessToken}){

    const [userInfo, setUserInfo] = useState([]);

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

    console.log(userInfo);
    return(
        <>
        <div className="standMyPageContaienr">
            <div className="myPageInfoBox">
                <div className="myPageImageBox">
                    <img className="starImg" src={renderStarImg(userInfo.starImage)}/>
                </div>
                <div className="myPageIntroBox">
                    <div className="myPageIntroIdBox">ID : {userInfo.memberId}</div>
                    <div className="myPageIntroNickBox">NickName : {userInfo.memberNickNm}</div>
                    <div className="myPageIntroNmBox">Name : {userInfo.memberNm}</div>
                </div>
            </div>
        </div>
        </>
    );    
}
export default MyPageStand;