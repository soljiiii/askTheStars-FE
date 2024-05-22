import {Link} from "react-router-dom";

function MainMenu (){
    return(
        <>
            <Link to="/myPage">MyPage</Link>
            <Link to="/login">login</Link>
            <Link to="/community">community</Link>
        </>
    );
}
export default MainMenu