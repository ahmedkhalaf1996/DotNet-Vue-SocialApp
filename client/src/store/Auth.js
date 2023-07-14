import * as api from '../api/index.js';
import decode from 'jwt-decode';

const Auth = {
    state: { authData: null },
    getters: {
     GetUserData: (state) => () => {
       return state.authData;
    },
    },
    mutations: {
     Auth(state, payload){
      localStorage.setItem('profile', JSON.stringify({ ...payload }));
      
      state.authData =  payload;
      
    },
    SetData(state){
     const user = JSON.parse(localStorage.getItem('profile'))
     const token = user?.token;

     if (token) {
       const decodedToken = decode(token);
 
       if (decodedToken.exp * 1000 < new Date().getTime()) {
        Logout()
      };
     state.authData = user
    }
    },
    Logout(state){
        localStorage.clear();
        state.authData = null;
   
    }
    },
    actions: {
        async signin (context,formData) {
            try {
              const { data } = await api.signIn(formData);
              context.commit('Auth',data)
              return data
            } catch (error) {
              console.log(error);
              return error
            }
          },
        async signup(context, formData) {
            try {
              const { data } = await api.signUp(formData);
              context.commit('Auth',data)
              return data;
            } catch (error) {
              console.log(error);
              return error
            }
          },
        async logout (context){
          try {
            context.commit('Logout')
          } catch (error) {
            console.log(error)
          }
        }
          
    }
}



export default Auth;