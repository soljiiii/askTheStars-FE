import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MyMenu from "../subpage/MyMenu"
import MemberDelete from "../subpage/MemberDelete"
import MemberModify from "../subpage/MemberModify"
import MyLikedPostList from "../subpage/MyLikedPostList"
import MyReplyList from "../subpage/MyReplyList"
import MyWriteList from "../subpage/MyWriteList"

function MyPage() {
    return (
        <>
        <Routes>
            <Route path="/myPage/memberDelete" element={<MemberDelete/>}/>
            <Route path="/myPage/memberModify" element={<MemberModify/>}/>
            <Route path="/myPage/myLikedPostList" element={<MyLikedPostList/>}/>
            <Route path="/myPage/myReplyList" element={<MyReplyList/>}/>
            <Route path="/myPage/myWriteList" element={<MyWriteList/>}/>
        </Routes>
        </>
    )
}

export default MyPage