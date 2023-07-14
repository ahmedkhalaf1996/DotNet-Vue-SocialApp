import * as api from '../api/index.js';

const Posts = {
    state: { isLoading: true,post:[], posts: [], SearchResult:[] },
    getters: {
     GetPost: (state) => () => {
      return {...state.post};
     },
     GetAllPosts: (state) => () => {
        return {...state.posts};
     },
     GetSearchData: (state) => () => {
        return {...state.SearchResult};
     },
    },
    mutations: {
       Post(state, payload){
          state.post = payload;
       },
       Posts(state, payload){
         state.posts = payload
       },
       Search(state, payload){
        state.SearchResult = payload
       }
    },
    actions: {
        async getPost(context, id){
             try {
                let {data} =  await api.fetchPost(id);

                context.commit('Post',data)
                
                return data
             } catch (error) {
                console.log(error)
             }
        },
        async  getPosts(context, page){
            try {
                const user = JSON.parse(localStorage.getItem('profile'));
                const userId = user?.result?._id;
                if(userId){
                  const { data } = await api.fetchPosts(page, userId);
                  context.commit('Posts',data)
                  return data;
                }
            
              } catch (error) {
                console.log(error);
              }
        },
        async  getPostsUsersBySearch(context,serchData){
            try {
                
                const   { data }   = await api.fetchPostsUsersBySearch(serchData);
                context.commit('Search',data)
                return data;
              } catch (error) {
                console.log(error);
              }
        },
        async  createPost(context, post){
          try {
            const { data } = await api.createPost(post);

            context.commit('Post',data)

            return data;
          } catch (error) {
            return error;
          }
        },
        async  updatePost(context,PostData ){
          console.log(PostData.id, PostData)

            try {
              const { data } = await api.updatePost(PostData.id, PostData);
            context.commit('Post',data)
            console.log(data)
            return data;
            } catch (error) {
              console.log(error)
            }
        },
        async  LikePostByUser(context, id){
            const user = JSON.parse(localStorage.getItem('profile'));

            const { data } = await api.likePost(id, user?.token);
            context.commit('Post',data)
            console.log('data', data)
        },
        async  commentPost(context,form ){
         // console.log(data)
            const { data } = await api.comment(form.value, form.id);

            context.commit('Post',data)
        },
        async  deletePost (context, id){
            await await api.deletePost(id);
           // context.commit('',data)
        }

    }
}



export default Posts;