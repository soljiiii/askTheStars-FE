import { Link } from "react-router-dom";

function MainPage(){
    return(
        <div>메인<br/>
        <Link to="/myPage">마이페이지</Link><br/>
        <Link to="/community">커뮤니티</Link><br/>
        <Link to="/login">로그인</Link>
        </div>
    );
}
export default MainPage;