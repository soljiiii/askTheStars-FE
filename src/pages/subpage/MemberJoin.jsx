import Header from "../../layouts/Header";
import JoinInput from "../../component/login/JoinInput";
import "../../styles/Login.css";
import Vertify from "../../component/login/Vertify";

function MemberJoin(){
    
    function handleJoinSumit(){
        alert("가입");
    }
    function handleCheck(){
        alert("체크");
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
                        />
                        <Vertify vertifyEvent={handleCheck}/>
                    </div>
                    <div className="pwInputBox">
                        <JoinInput
                            menu="PW"
                        />
                    </div>
                    <div className="nameInputBox">
                        <JoinInput
                            menu="NAME"
                        />
                    </div>
                    <div className="nickNmInputBox">
                        <JoinInput 
                            menu="NICK"
                        />
                        <Vertify vertifyEvent={handleCheck}/>
                    </div>
                    <div className="idNoBox">
                        <span className="idNoSpan">주민번호</span>
                        <input className="idNo1"/> ▫️ 
                        <input className="idNo2"/>
                    </div>
                    <div className="phoneBox">
                        <span className="phoneSpan">PHONE</span>
                        <input className="phone1"/> ▫️ 
                        <input className="phone2"/> ▫️ 
                        <input className="phone3"/>
                    </div>
                    <div className="emailBox">
                        <span className="emailSpan">e-mail</span>
                        <input className="email1"/> @ 
                        <input className="email2"/>
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