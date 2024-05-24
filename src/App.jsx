import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/titlepage/MainPage';
import Community from './pages/titlepage/Community';
import Login from './pages/titlepage/Login';
import MyPage from './pages/titlepage/MyPage';
import PostDetail from './pages/subpage/PostDetail';
import Write from './pages/subpage/Write';
import MemberJoin from './pages/subpage/MemberJoin';
import MemberDelete from './pages/subpage/MemberDelete';
import MemberModify from './pages/subpage/MemberModify';
import MyLikedPostList from './pages/subpage/MyLikedPostList';
import MyReplyList from './pages/subpage/MyReplyList';
import MyWriteList from './pages/subpage/MyWriteList';
import MyAlarm from './pages/subpage/MyAlarm';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage/>}/>

          <Route path="/community/*" element={<Community/>}/>
          <Route path="/community/write" element={<Write/>}/>
          <Route path="/community/postdetail" element={<PostDetail/>}/>

          <Route path="/login/*" element={<Login/>}/>
          <Route path="/login/memberJoin" element={<MemberJoin/>}/>

          <Route path="/mypage/*" element={<MyPage/>}/>
          <Route path="/mypage/memberdelete" element={<MemberDelete/>}/>
          <Route path="/mypage/membermodify" element={<MemberModify/>}/>
          <Route path="/mypage/mylikedpostlist" element={<MyLikedPostList/>}/>
          <Route path="/mypage/myreplylist" element={<MyReplyList/>}/>
          <Route path="/mypage/mywritelist" element={<MyWriteList/>}/>
          <Route path="/mypage/alarm" element={<MyAlarm/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
