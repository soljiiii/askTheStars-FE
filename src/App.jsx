import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/titlepage/MainPage';
import Community from './pages/titlepage/Community';
import Login from './pages/titlepage/Login';
import MyPage from './pages/titlepage/MyPage';
import PostDetail from './pages/subpage/PostDetail';
import Write from './pages/subpage/Write';
import MemberJoin from './pages/subpage/MemberJoin';
import PostModify from './pages/subpage/PostModify';
import Chatting from './pages/subpage/Chatting'
import OnChatting from './pages/subpage/OnChatting';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage/>}/>

          <Route path="/chatting" element={<Chatting/>}/>
          <Route path="/onchatting/:roomId" element={<OnChatting/>}/>

          <Route path="/community/:page" element={<Community/>}/>
          <Route path="/community/write" element={<Write/>}/>
          <Route path="/community/postdetail/:postNo" element={<PostDetail/>}/>
          <Route path="/community/postmodify/:postNo" element={<PostModify/>}/>

          <Route path="/login/*" element={<Login/>}/>
          <Route path="/login/memberJoin" element={<MemberJoin/>}/>

          <Route path="/mypage/*" element={<MyPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
