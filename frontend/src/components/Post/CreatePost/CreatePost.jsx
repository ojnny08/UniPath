import { useState } from "react";
import { createPost } from "../../../api/posts/posts";
import './CreatePost.css'

const CreatePost = ({ onPostCreate }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await createPost({ title, body })
            onPostCreate(res.data)
        } catch (error) {
            alert('Post failed to create')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="post-create">
            <div className="post-create-header">
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                />
            </div>
            <div className="post-create-body">
                <textarea 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="write something..."/>
            </div>
            <button type="submit">Post</button>
        </form>
    )
}

export default CreatePost