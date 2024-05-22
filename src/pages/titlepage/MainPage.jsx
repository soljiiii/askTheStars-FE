import {Link} from "react-router-dom";

function MainPage() {
    return (
        <>
            <Link to="/mypage">MyPage</Link><br/>
            <Link to="/login">login</Link><br/>
            <Link to="/community">community</Link><br/>
        </>
    )
}

export default MainPage