import Header from "../../layouts/Header";
import JoinInput from "../../component/login/JoinInput";
import "../../styles/Login.css";
import Vertify from "../../component/login/Vertify";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    //input 작성 onchange
    function handleIdChange(newValue){
        if(newValue.length<=20)
        setUserId(newValue);
    }
    function handleNickChange(newValue){
        if(newValue.length<=10)
        setUserNick(newValue);
    }
    function handlePwChange(newValue){
        if(newValue.length<=20)
        setUserPw(newValue);
    }
    function handleNmChange(newValue){
        if(newValue.length<=20)
        setUserNm(newValue);
    }

    function handleIdNo1Change(e){
        if(e.target.value.length<=6)
        setIdentityNo1(e.target.value);
    }
    function handleIdNo2Change(e){
        if(e.target.value.length<=7)
        setIdentityNo2(e.target.value);
    }
    function handlePhone1Change(e){
        if(e.target.value.length<=3)
        setPhone1(e.target.value);
    }
    function handlePhone2Change(e){
        if(e.target.value.length<=4)
        setPhone2(e.target.value);
    }
    function handlePhone3Change(e){
        if(e.target.value.length<=4)
        setPhone3(e.target.value);
    }
    function handleEmail1Change(e){
        if(e.target.value.length<=20)
        setEmail1(e.target.value);
    }
    function handleEmail2Change(e){
        if(e.target.value.length<=20)
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
    
    //회원가입버튼 클릭

    //유효성 검사
    function validateFunc(data){

        //아이디*닉네임 유효성 검사
        if(userId===""){
            return"ID를 입력해주세요";
        }
        if(userNick===""){
            return"닉네임을 입력해주세요";
        }
        if(idExistState==1||nickExistState==1){
            return "이미 사용중이에요! 다시 입력해주세요!";
        }
        if(idExistState==3||nickExistState==3){
            return "중복검사를 진행해주세요!";
        }

        //비밀번호
        if(userPw===""){
            return "비밀번호를 입력해주세요";
        }

        //이름
        if(userNm===""){
            return "이름을 입력해주세요";
        }

        //주민번호
        if (identityNo1.length !== 6 || identityNo2.length !== 7) {
            return "주민번호 자릿수를 확인해주세요!";
        }
        if (identityNo1===""||identityNo2==""){
            return "주민번호를 입력해주세요";
        }

        //핸드폰번호
        if (phone1.length !== 3 || phone2.length !== 4 || phone3.length !== 4) {
            return "휴대전화 자릿수를 확인해주세요!";
        }
        if (phone1===""||phone2===""||phone3===""){
            return "휴대전화 번호를 입력해주세요"
        }

        //이메일
        if (email1===""||email2===""){
            return "이메일을 입력해주세요"
        }

        return null;

    }

    //회원가입 버튼 클릭
    function handleJoinSumit(){
        const data = {
            memberId: userId,
            memberNickNm: userNick,
            memberPw: userPw,
            memberNm: userNm,
            identityNo: identityNo1 + identityNo2,
            phone1: phone1,
            phone2: phone2,
            phone3: phone3,
            email1: email1,
            email2: email2
        }
        const errMsg = validateFunc(data);
        
        if(errMsg) {
            alert(errMsg);
            return;
        }

        console.log(data);
        axios.post(`http://localhost:80/memberJoin`,data)
        .then(response =>{
            console.log(response);
            navigate(`/login`);
        })
        .catch(error=>{
            console.error(error);
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