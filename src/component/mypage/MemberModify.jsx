import JoinInput from "../../component/login/JoinInput";
import "../../styles/Login.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MemberModify({accessToken}){

    const[memberInfo,setMemberInfo] = useState([]);

    const [userNm, setUserNm] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [identityNo1, setIdentityNo1] = useState("");
    const [identityNo2, setIdentityNo2] = useState("");
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState("");
    const navigate = useNavigate();

    const [newPw, setNewPw] = useState("");
    const [newPwConfirm, setNewPwConfirm] = useState("");

    //정보 불러오기
    useEffect(()=>{
        axios.get(`http://localhost:80/getMemberInfo`,{
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        .then(response=>{
            setMemberInfo(response.data);
            setUserNm(response.data.memberNm);
            setPhone1(response.data.phone1);
            setPhone2(response.data.phone2);
            setPhone3(response.data.phone3);
            setIdentityNo1(response.data.identityNo1);
            setIdentityNo2(response.data.identityNo2);
            setEmail1(response.data.email1);
            setEmail2(response.data.email2);
        })
    },[])
    console.log(memberInfo)
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
    function handleNewPwChange(e){
        if(e.target.value.length<=20)
        setNewPw(e.target.value);
    }
    function handleNewPwConfirmChange(e){
        if(e.target.value.length<=20)
        setNewPwConfirm(e.target.value);
    }

    //유효성 검사
    function validateFunc(data){

        //비밀번호
        if(newPw===""||newPwConfirm===""){
            return "비밀번호를 입력해주세요";
        }

        if(newPw!==newPwConfirm){
            return "비밀번호가 일치하지 않습니다"
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

    //수정하기 버튼
    function handleSubmitMemberModify(){
        const data = {
            memberId: memberInfo.memberId,
            memberPw: newPw,
            memberNm: userNm,
            identityNo1: identityNo1, 
            identityNo2: identityNo2,
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
        axios.post(`http://localhost:80/memberModify`,data)
        .then(response =>{
            console.log(response);
            alert("수정완료!");
            window.location.reload();
        })
        .catch(error=>{
            console.error(error);
        })
    }

    return(
        <>
            <div className="allJoinBox">
                <span className="joinSpan">
                    변경할 정보를 입력해주세요!
                </span>
                <div className="joinBox">
                    <div className="idInputBox">
                        <JoinInput
                            menu="ID"
                            value={memberInfo.memberId}
                            readonly={true}
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
                            value={memberInfo.memberNickNm}
                            readonly={true}
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
                <div className="memberModifyPw">
                    <input 
                        className="newPwInput"
                        placeholder="새 비밀번호를 입력해주세요!"
                        onChange={handleNewPwChange}
                    />
                    <input 
                        className="newPwConfirmInput"
                        placeholder="비밀번호 확인을 위해 입력해주세요."
                        onChange={handleNewPwConfirmChange}
                    />
                </div>
                <div className="joinSubmitButtonBox">
                    <button className="joinSubmitButton" onClick={handleSubmitMemberModify}>
                        수정하기
                    </button>
                </div>
            </div>
        </>
    );

}
export default MemberModify