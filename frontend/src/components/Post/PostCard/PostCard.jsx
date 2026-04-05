import { useState } from "react";
import { deletePost, updatePost } from "../../../api/posts/posts";
import './PostCard.css'

const PostCard = ({ post, onPostDelete, onPostUpdate }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [editData, setEditData] = useState({
        title: post.title,
        body: post.body,
    })

    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    const handleSave = async () => {
        try {
            await updatePost(post.id, editData)
            onPostUpdate(post.id, editData)
            setIsEditing(false)
            setShowMenu(false)
        } catch (error) {
            alert('update failed')
        }
    }
    
    const handleEdit = () => {
        setIsEditing(true)
        setShowMenu(false)
    }

    const handleDelete = async () => {
        try {
            await deletePost(post.id)
            onPostDelete(post.id)
        } catch (error) {
            alert('delete failed')
        }
    }

    return (
        <div className="post-card">
            <div className="post-header">
                {isEditing ? (
                    <input 
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}/>
                ) : 
                <h1>{post.title}</h1>} 
            </div>

            <div className="post-body">
                {isEditing ? (
                    <textarea value={editData.body}
                    onChange={(e) => setEditData({...editData, body: e.target.value})}/>
                ) : 
                <p className="post-body">{post.body}</p>}
                <p className="post-author">{post.author}</p>
                <p className="post-author">{formattedDate}</p>
            </div>

            <div className="post-menu">
                <button onClick={() => setShowMenu(!showMenu)}>***</button>
                    {showMenu && (
                        <div className="post-menu-opts">
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                    )}
            </div>

            {isEditing && (
                <div className="post-btn">
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
            
        </div>
    )
}

export default PostCard