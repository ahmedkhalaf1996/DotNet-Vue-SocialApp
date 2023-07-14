<template>
  <q-page class="constrain q-pa-md">
   <div class="row q-col-gutter-lg">
    <div class="col-3">
      <Sidebar />
    </div>
    <div v-if="!load" class="col-6">
      <div class="q-pa-md">
    <q-card>
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="200px" square />

      <q-card-actions class="q-gutter-md">
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </q-card-actions>
    </q-card>
    </div>
    </div>
    <div v-else  class="col-6" >
        <Post v-for="post in posts" :key="post._id" :post="post" />
     </div>
     
     <div class="col-3">
       <Rightbar />
     </div>
     
     <Add @Created="GetAllPosts" />
    </div>
    <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="current"
      color="primary"
      :max="max"
      :max-pages="5"
      :ellipses="false"
      :boundary-numbers="false"
    />
  </div>
  </q-page>
</template>


<script>

import Post from '@/components/Posts/Post.vue'
import Rightbar from '@/components/Rightbar/Rightbar.vue';
import Sidebar from '../components/Sidebar/Sidebar.vue';
import Add from './Add.vue';

import { mapActions } from 'vuex';

export default {
    name: "Home",
    components: { Post, Rightbar, Sidebar, Add },
    data(){
     return {
      current:1,
      max:0,
      posts:[],
      load:false
     }
    },
    watch:{
     current(){
      this.GetAllPosts()
     }
    },
    methods:{
      ...mapActions(['getPosts']),
     async GetAllPosts(){
       // console.log('getPosts')
        const data = await this.getPosts(this.current)
       // console.log('post data',data)
        if(data?.data){
          this.max = data?.numberOfPages;
        this.posts = data?.data;
        }

        if(data) {
          this.load = true
        }
      }

    },
    async mounted(){
      this.GetAllPosts()
    }, 
}
</script>

<style lang="sass">
// .card-post
//   .q-img
//     min-height: 200px
</style>