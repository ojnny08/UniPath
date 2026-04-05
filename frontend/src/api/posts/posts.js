import api from "../axiosInstance";

export const viewAllPosts = () => {
    return api.get('posts/view_all_posts/')
} 

export const createPost = (data) => {
    return api.post('posts/create_post/', data)
}

export const viewAuthorPosts = () => {
    return api.get('posts/view_author_posts/')
}

export const getPost = (id) => {
    return api.get(`posts/manage_post/${id}/`)
}
export const updatePost = (id, data) => {
    return api.get(`posts/manage_post/${id}/`, data)
}
export const deletePost = (id) => {
    return api.delete(`posts/manage_post/${id}/`)
}