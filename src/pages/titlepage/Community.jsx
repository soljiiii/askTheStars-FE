import {Link} from "react-router-dom";
import Header from "../../layouts/Header";

function Community() {
    return (
        <>
            <Header/>
            <Link to="/community/write">글쓰기y</Link><br/>
            <Link to="/community/postdetail">글상세보기</Link><br/>
        </>
    )
}

export default Community
