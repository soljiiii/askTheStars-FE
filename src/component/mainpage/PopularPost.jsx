import { useNavigate } from "react-router-dom";
import "../../styles/MainPage.css";
import { formatDate } from "../../util/util";

function PopularPost({post}){

    const navigate = useNavigate();

    function postDate(dateString){
        const date = new Date(dateString);
        const year = date.getFullYear;
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        
        return `${year}-${month}-${day}`;
    }

    function goToThisPost(){
        navigate(`/community/postdetail/${post.postNo}`)
    }
    return(
        <>
            <div className="popularPostContainer" onClick={goToThisPost}>
                <div className="popularPostTilteBox">{post.title}</div>
                <div className="popularPostIdBox">{post.memberId}</div>
                <div className="popularPostDate">{formatDate(post.wrtnDate)}</div>
            </div>
        </>
    );
}
export default PopularPost;