import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function MemberDelete({accessToken}){

    const [deletePw, setDeletePw] = useState("");
    const navigate = useNavigate();

    function handleDeleteInputChange(e){
        if(e.target.value.length<=20)
            setDeletePw(e.target.value);
    }

    function handleDeleteMember(){
        axios.post(`http://localhost:80/deleteMember`,{},{
            params: {
                memberPw: deletePw
            },    
            headers:{
                Authorization: `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        .then(response=>{
            if(response.data==="ok"){
                alert("안녕히 가세요.")
                navigate(`/`);
            }
            else{
                alert("비밀번호가 일치하지 않습니다.")
            }
        })
    }

    return(
        <>
            <div className="memberDeleteContainer">
                탈퇴를 위해 비밀번호를 입력해주세요
                <div className="memberDeleteRealBox">
                    <div className="memberDeleteInputBox">
                        <input 
                            className="memberDeleteInput"
                            onChange={handleDeleteInputChange}
                            value={deletePw}
                        />
                    </div>
                    <div className="memberDeleteRealButtonBox">
                        <button className="memberDeleteRealButton" onClick={handleDeleteMember}>
                            탈퇴하기
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MemberDelete