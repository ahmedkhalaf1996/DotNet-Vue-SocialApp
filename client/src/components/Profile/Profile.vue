<template>
 <q-page class="constrain q-pa-md">
  <div class="row q-col-gutter-lg constrain">
  <ShowProfile 
       :UserData="UserData" 
       :UserPosts="UserPosts" 
       :isSameUser="isSameUser" 
       @EditProfile="EditMode = !EditMode" 
       v-if="!EditMode"/>
  
  <EditProfile
       :UserData="UserData" 
       :UserPosts="UserPosts" 
       :isSameUser="isSameUser" 
       @EditProfile="EditMode = !EditMode" 
       v-else />
   <div class="col-12">
    <q-separator inset />
    </div>

    <div class="col-4" v-for="post in UserPosts"  :key="post._id">
      <Post  :post="post" />

        <!-- <Post :id="1" /> -->
    </div>

  </div>
</q-page>
   
</template>

<script>
import Post from '../Posts/Post.vue';

import { mapActions } from 'vuex';
import ShowProfile from './ShowProfile.vue';
import EditProfile from './EditProfile.vue';



export default {
    data(){
      return {
        UserPosts:[],
        UserData:[],
        isSameUser:false,
        EditMode:false
      }
    },
    watch:{
      EditMode(){
        console.log('profile', this.EditMode)
      },
      $route(){
       this.GetAll()
      }
    },
    methods:{
      ...mapActions(['GetUserByID']),
      async GetAll(){
        const LogedInUser = JSON.parse(localStorage.getItem('profile'));
        const LogedINuserId = LogedInUser?.result?._id;
        const d = await this.GetUserByID(this.$route.params.id)
        
        this.UserData = d?.user
        this.UserPosts = d?.posts
        
        console.log(d)
        if(String(LogedINuserId) == String(d?.user?._id)){
          this.isSameUser = true
        } else {
          this.isSameUser = false

        }
      }
    },
    created(){
      this.GetAll()
       
       console.log('created','d')
    },
    mounted(){
       this.GetAll()
       
       console.log('mounted','d')
    },
    components: { Post, ShowProfile, EditProfile }
}
</script>

<style>

</style>