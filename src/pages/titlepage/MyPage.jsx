import {Link} from "react-router-dom";
import Header from "../../layouts/Header";


function MyPage() {
    return (
        <>
            <Header/>
            <Link to="/mypage/memberdelete">회원삭제</Link><br/>
            <Link to="/mypage/membermodify">회원수정</Link><br/>
            <Link to="/mypage/mylikedpostlist">좋아요누른글</Link><br/>
            <Link to="/mypage/myreplylist">댓글</Link><br/>
            <Link to="/mypage/mywritelist">글목록</Link><br/>
        </>
    )
}

export default MyPage