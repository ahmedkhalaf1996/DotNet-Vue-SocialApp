import * as api from '../api/index.js';

const Users = {
    state: { User: null },
    getters: {
     GetUser: (state) => () => {
       return state.User
    },
    },
    mutations: {
     UserData(state, payload){
       state.User =  payload?.data;
     }
    },
    actions: {
        async GetUserByID (context,id) {
            try {
              const { data } = await api.fetchUserProfile(id);
          
              context.commit('UserData',data.user)   
              
              return data;         
            } catch (error) {
              console.log(error);
            }
          },
        async UpdateUserData (context,userData) {
            try {
              const { data } = await api.UpdateUser(userData);
          
              context.commit('UserData',data) 

              return data;       
            } catch (error) {
              console.log(error);
            }
          },
          async FollowUser(context, ProfileID){
           try {
            const user = JSON.parse(localStorage.getItem('profile'));

            const { data } = await api.following(ProfileID, user?.token);
            
            return data;
           } catch (error) {
            console.log(error)
           }
          },
          async GetTheUserSug(context, id){
             try {
              const {data} = await api.getSugUser(id);

              return data
             } catch (error) {
              console.log(error)         
             }            
          }
    }
}



export default Users;