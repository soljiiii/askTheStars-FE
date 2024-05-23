import {Link} from "react-router-dom";
import Header from "../../layouts/Header";
import "../../styles/MainPage.css"

function MainPage() {
    return (
        <>
            <Header/>
            <div className="allContentBox">
                <div className="mainContentBox">
                    <div className="bannerBox">
                    </div>
                    <div className="topPostBox">
                        <div className="topPost">
                            
                        </div>
                        <button className="morePostButton">
                            <Link to="/community">▶more</Link><br/>
                        </button>
                    </div>
                </div>
                <div className="sideContentBox">
                    <div className="mainMyBox">
                        <Link to="/mypage">mypage</Link><br/>
                    </div>
                    <div className="chattinButtonBox">
                        <button className="chattingButton">
                            채팅 시작하기
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage