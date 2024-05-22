import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CommunityPage from "../subpage/CommunityPage"
import Write from "../subpage/Write"


function Community() {
    return (
        <>
            <BrowserRouter>
            <Routes>
                <Route path="/community" element={<CommunityPage/>}/>
                <Route path="/community/write" element={<Write/>}/>
            </Routes>
            </BrowserRouter>
        </>
    )
}

export default Community
