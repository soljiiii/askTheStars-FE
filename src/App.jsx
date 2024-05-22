import { useState } from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import MyPage from "./pages/MyPage"
import Community from"./pages/Community"
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/myPage" element={<MyPage/>}/>
          <Route path="/community" element={<Community/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
