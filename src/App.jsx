import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/titlepage/MainPage';
import Community from './pages/titlepage/Community';
import Login from './pages/titlepage/Login';
import MyPage from './pages/titlepage/MyPage';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/community/*" element={<Community/>}/>
          <Route path="/login/*" element={<Login/>}/>
          <Route path="/mypage/*" element={<MyPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
