import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from "../subpage/LoginPage"
import MemberJoin from "../subpage/MemberJoin"

function Login() {
    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/login/memberJoin" element={<MemberJoin/>}/>
            </Routes>
            </BrowserRouter>
        </>
    )
}

export default Login