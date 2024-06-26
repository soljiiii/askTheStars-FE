import {Link} from "react-router-dom";
import Header from "../../layouts/Header";
import "../../styles/MainPage.css"
import MainBanner from "../../component/mainpage/MainBanner";

function MainPage() {
    return (
        <>
            <Header/>
            <div className="allContentBox">
                <div className="mainContentBox">
                    <div className="bannerBox">
                        <MainBanner/>
                    </div>
                    <div className="topPostBox">
                        <div className="topPost">
                            
                        </div>
                        <button className="morePostButton">
                            <Link to="/community" className="morePostButtonLink">▶ 전체보기</Link><br/>
                        </button>
                    </div>
                </div>
                <div className="sideContentBox">
                    <div className="mainMyBox">
                        <Link to="/mypage" className="settingIconLink">
                            <img src="/setting.png" className="settingIcon"/>
                        </Link><br/>
                        <Link to="/mypage/alarm" className="messageIconLink">
                            <div className="messageIcon">내 소식</div>
                        </Link><br/>
                    </div>
                    <div className="chattinButtonBox">
                        <button className="chattingButton">
                            초신성 상담
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage