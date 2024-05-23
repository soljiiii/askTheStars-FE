import {Link} from "react-router-dom";

function Community() {
    return (
        <>
            <Link to="/community/write">글쓰기y</Link><br/>
            <Link to="/community/postdetail">글상세보기</Link><br/>
        </>
    )
}

export default Community
