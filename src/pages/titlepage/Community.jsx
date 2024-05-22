import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CommunityPage from "../subpage/CommunityPage"
import Write from "../subpage/Write"
import PostDetail from "../subpage/PostDetail"


function Community() {
    return (
        <>
        <Routes>
            <Route path="/community/write" element={<Write/>}/>
            <Route path="/community/postdetail" element={<PostDetail/>}/>
        </Routes>
        </>
    )
}

export default Community
