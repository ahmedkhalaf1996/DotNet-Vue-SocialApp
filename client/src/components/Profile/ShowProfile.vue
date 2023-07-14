<template>
 <div class="row col-12 constrain" >
    <div class="col-4 text-center"  >
     <q-avatar size="150px">
      <img v-if="UserData?.imageUrl" :src="UserData?.imageUrl">
      <img v-else src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png">
    </q-avatar>
    </div>
    <div class="col-8 text-left"  >
    <div class="text-h6 q-pa-lg" style="margin:auto">
        {{UserData.name}}
        <q-btn v-if="isSameUser" @click="Edit" flat  label="Edit" />

        <!-- follow un follow -->
        <q-btn v-if="!isSameUser && !isUserFollowing"  
        @click="FollowOrUnFollow" flat style="color: #FF0080" label="Follow" />

        <q-btn v-if="!isSameUser && isUserFollowing"  
        @click="FollowOrUnFollow" flat class='primary' label="UN Follow" />

    </div>
    <q-separator inset />
     <div class="text-subtitle1 q-pa-lg" style="margin:auto">
       {{UserData.bio}}
        <div >
       <i>{{UserPosts.length}} Posts  </i>
      
       <i>
        <i v-if="UserData?.followers?.length > 0">
        {{UserData?.followers?.length }}</i> followers</i>
      
       <i ><i v-if="UserData?.following?.length > 0">
        {{UserData?.following?.length }}</i>  following </i>
     </div>
     </div>
   
    </div>

   </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
props:['UserPosts','UserData','isSameUser'],
  data(){
     return {
       isUserFollowing:false
     }
    },

  methods:{

    ...mapActions(['FollowUser','GetUserByID']),
    Edit(){
        this.$emit('EditProfile')
    },
    async FollowOrUnFollow(){
     let data = await this.FollowUser(this.UserData._id)
     console.log("aaaaaaaaaaaaaaaa",data)
     if(data){
      this.UserData.following = data?.updateduser1?.following
      this.UserData.followers = data?.updateduser1?.followers
      // change buttom
      
      this.checkUserFollowing()
     }
    },
    async checkUserFollowing(){
      const LogedInUserId = JSON.parse(localStorage.getItem('profile'))?.result?._id
      const id = this.UserData?._id
      
      const {user} = await this.GetUserByID(this.$route.params.id)
      console.log("u user", user)
      if(user && user?.followers.find((id) => id == LogedInUserId)){
        this.isUserFollowing = true
      } else {
        this.isUserFollowing = false
      }
    }
},
mounted(){
    this.checkUserFollowing()
    },
}
</script>

