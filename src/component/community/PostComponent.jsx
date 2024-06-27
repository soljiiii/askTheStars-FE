import { Link } from "react-router-dom";
import "../../styles/Community.css"
import { formatDate } from "../../util/util";

function PostComponent({writeList}){

    function postDate(dateString){
        const date = new Date(dateString);
        const year = date.getFullYear;
        const month = String(date.getMonth()+1).padStart(2,'0');
        const day = String(date.getDate()).padStart(2,'0');
        
        return `${year}-${month}-${day}`;
    }

    return(
        <>
            <div className="postComponentContainer">
                <div className="postNoBox">
                    {writeList.postNo}
                </div>
                <div className="postTitleBox">
                    <Link className="postTitleLink" to={`/community/postdetail/${writeList.postNo}`}>
                        {writeList.title}
                    </Link>
                </div>
                <div className="postDateBox">
                    {formatDate(writeList.wrtnDate)}
                </div>
                <div className="postVwCntBox">
                    {writeList.vwCnt}
                </div>
                <div className="postWriterBox">
                    {writeList.memberId}
                </div>
            </div>
        </>
    );
}
export default PostComponent;