import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from "../subpage/LoginPage"
import MemberJoin from "../subpage/MemberJoin"

function Login() {
    return (
        <>
        <Routes>
            <Route path="/login/memberJoin" element={<MemberJoin/>}/>
        </Routes>
        </>
    )
}

export default Login