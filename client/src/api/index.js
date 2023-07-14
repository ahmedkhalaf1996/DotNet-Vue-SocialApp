import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});


export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page, id) => API.get(`/posts?page=${page}&id=${id}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPostsUsersBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery}`);



export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchUserProfile = (id) => API.get(`/user/getUser/${id}`);
export const getSugUser = (id) => API.get(`/user/getSug?id=${id}`);
export const UpdateUser = (userData) => API.patch(`/user/Update/${userData._id}`, userData);
export const following = (id) => API.patch(`/user/${id}/following`);