import Header from "../../layouts/Header";
import JoinInput from "../../component/login/JoinInput";
import "../../styles/Login.css";
import Vertify from "../../component/login/Vertify";
import axios from "axios";
import { useEffect, useState } from "react";

function MemberJoin(){
    const[userId, setUserId] = useState("");
    const[userNick, setUserNick] = useState("");
    const[idExistState,setIdExistState] = useState(3);
    const[nickExistState,setNickExistState] = useState(3);

    const[userPw,setUserPw] = useState("");
    const[userNm,setUserNm] = useState("");
    const[phone1,setPhone1] = useState("");
    const[phone2,setPhone2] = useState("");
    const[phone3,setPhone3] = useState("");
    const[identityNo1,setIdentityNo1] = useState("");
    const[identityNo2,setIdentityNo2] = useState("");
    const[email1,setEmail1] = useState("");
    const[email2,setEmail2] = useState("");

    //input 작성 onchange
    function handleIdChange(newValue){
        setUserId(newValue);
    }
    function handleNickChange(newValue){
        setUserNick(newValue);
    }
    function handlePwChange(newValue){
        setUserPw(newValue);
    }
    function handleNmChange(newValue){
        setUserNm(newValue);
    }

    function handleIdNo1Change(e){
        setIdentityNo1(e.target.value);
    }
    function handleIdNo2Change(e){
        setIdentityNo2(e.target.value);
    }
    function handlePhone1Change(e){
        setPhone1(e.target.value);
    }
    function handlePhone2Change(e){
        setPhone2(e.target.value);
    }
    function handlePhone3Change(e){
        setPhone3(e.target.value);
    }
    function handleEmail1Change(e){
        setEmail1(e.target.value);
    }
    function handleEmail2Change(e){
        setEmail2(e.target.value);
    }
    
    //중복확인 체크 버튼 클릭
    function handleIdCheck(){
        const data = {
            memberId : userId
        }
        console.log(userId);
        axios.get(`http://localhost:80/idCheck`,{params:data})
        .then(response => {
            if(response.data==""){
                setIdExistState(3);
            }
            if(response.data==1){
                setIdExistState(1);
            }
            else{
                setIdExistState(0);
            }
        })
    }
    
    function handleNickCheck(){
        const data =
        {
            memberNickNm : userNick
        }
        axios.get(`http://localhost:80/nickNmCheck`,{params:data})
        .then(response => {
            if(response.data==""){
                setNickExistState(3);
            }
            if(response.data==1){
                setNickExistState(1);
            }
            else{
                setNickExistState(0);
            }
        })
    }
    
    //회원가입 버튼 클릭
    //중복 아이디, 닉네임은 사용 못하게 *
    //아이디, pw, 이름, 닉네임 20자 이내
    //주민번호 숫자만 + 6자리, 7자리
    //휴대폰번호 숫자만 + 3자리, 4자리, 4자리
    //이메일 30자이내
    function handleJoinSumit(){
        const data = {
            memberId :userId,
            memberPw :userPw,
            memberNm :userNm,
            memberNickNm :userNick,
            phone1 :phone1,
            phone2 :phone2,
            phone3 :phone3,
            identityNo1 :identityNo1,
            identityNo2 :identityNo2,
            email1 :email1,
            email2 :email2
        }
        console.log(data);
        axios.post(`http://localhost:80/memberJoin`,{param:data})
        .then(response =>{

        })
    }

    return(
        <>
            <Header/>
            <div className="allJoinBox">
                <span className="joinSpan">
                    별박사님 반가워요!
                </span>
                <div className="joinBox">
                    <div className="idInputBox">
                        <JoinInput
                            menu="ID"
                            value={userId}
                            onChange={handleIdChange}
                        />
                        <Vertify 
                            vertifyEvent={handleIdCheck}
                            existState={idExistState}
                        />
                    </div>
                    <div className="pwInputBox">
                        <JoinInput
                            menu="PW"
                            value={userPw}
                            onChange={handlePwChange}
                        />
                    </div>
                    <div className="nameInputBox">
                        <JoinInput
                            menu="NAME"
                            value={userNm}
                            onChange={handleNmChange}
                        />
                    </div>
                    <div className="nickNmInputBox">
                        <JoinInput 
                            menu="NICK"
                            value={userNick}
                            onChange={handleNickChange}
                        />
                        <Vertify 
                            vertifyEvent={handleNickCheck}
                            existState={nickExistState}
                        />
                    </div>
                    <div className="idNoBox">
                        <span className="idNoSpan">주민번호</span>
                        <input 
                            className="idNo1"
                            value={identityNo1}
                            onChange={handleIdNo1Change}
                        /> ▫️ 
                        <input className="idNo2"
                            value={identityNo2}
                            onChange={handleIdNo2Change}
                        />
                    </div>
                    <div className="phoneBox">
                        <span className="phoneSpan">PHONE</span>
                        <input 
                            className="phone1"
                            value={phone1}
                            onChange={handlePhone1Change}
                        /> ▫️ 
                        <input 
                            className="phone2"
                            value={phone2}
                            onChange={handlePhone2Change}
                        /> ▫️ 
                        <input 
                            className="phone3"
                            value={phone3}
                            onChange={handlePhone3Change}
                        />
                    </div>
                    <div className="emailBox">
                        <span className="emailSpan">e-mail</span>
                        <input 
                            className="email1"
                            value={email1}
                            onChange={handleEmail1Change}
                        /> @ 
                        <input 
                            className="email2"
                            value={email2}
                            onChange={handleEmail2Change}
                        />
                    </div>
                </div>
                <div className="joinSubmitButtonBox">
                    <button className="joinSubmitButton" onClick={handleJoinSumit}>
                        별박사 되기
                    </button>
                </div>
            </div>
        </>
    );
}
export default MemberJoin