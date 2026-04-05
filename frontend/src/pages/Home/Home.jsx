import './Home.css'
import { viewAllPosts } from '../../api/posts/posts'
import { useEffect, useState } from 'react'
import PostCard from '../../components/Post/PostCard/PostCard'
import CreatePost from '../../components/Post/CreatePost/CreatePost'

const Home = () => {
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
            try {
                const res = await viewAllPosts()
                setPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }

    const handlePostCreate = (newPost) => {
        setPosts([newPost, ...posts])
    }

    const handleDeleted = (id) => {
        setPosts(posts.filter(p => p.id != id))
    }
    
    const handleUpdate = (id, newData) => {
        setPosts(posts.map(post => post.id === id ? {...post, ...newData} : post))
    }
    
     
    return (
        <div >
            <CreatePost onPostCreate={handlePostCreate}/>
            {posts.map((item) => (
                <PostCard 
                    key={item.id}
                    post={item}
                    onPostDelete={handleDeleted}
                    onPostUpdate={handleUpdate}/>
            ))}
        </div>
    )
}

export default Home