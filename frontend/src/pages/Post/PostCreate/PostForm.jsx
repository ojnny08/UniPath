import CreatePost from "../../../components/Post/CreatePost/CreatePost"
import { useNavigate } from "react-router-dom"

const PostForm = () => {
    const navigate = useNavigate()
    return (
        <CreatePost onPostCreate={() => navigate('/home')}/>
    )
    
}
export default PostForm