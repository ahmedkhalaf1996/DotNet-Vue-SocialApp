<template>
     <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain x">
        
        <q-btn flat to="/"  >
          <q-icon left size="3em" name="eva-camera-outline" />
          <q-toolbar-title class="text-grand-hotel text-bold"   >
          Home
        </q-toolbar-title>
        </q-btn>
       
        <q-separator class="large-screen-only" vertical spaced />
       
        <q-toolbar-title class="text-center" >
          <q-input bottom-slots class="nuks" label="search" @keyup.enter="GoSearch($event)"  >
         </q-input>
        </q-toolbar-title>
          <q-btn v-show="GetUserData()?.result" round>
           <q-avatar size="42px" v-if="GetUserData()?.result?.imageUrl">
            <img  :src="GetUserData()?.result?.imageUrl">
           </q-avatar>
           <q-avatar size="42px" v-else>
            <img  src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png">
           </q-avatar>
           <q-menu >
        <q-list style="min-width: 100px">

          <q-item clickable v-close-popup>
            <q-item-section @click="Profile">Profile</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section @click="LogUserOut">Logout</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
          </q-btn>

          
      </q-toolbar>
    </q-header>
</template>

<script>


import { mapActions , mapGetters, mapMutations } from 'vuex';

export default {
  name:'Navbar',
  data(){
    return{
      userData:null
    }
  },
  computed: {
    ...mapGetters(["GetUserData"]), // get auth data
  },
  mounted(){
    this.SetData()
  //  console.log('auth',  this.GetUserData())
  },
  methods:{
    ...mapMutations(['SetData']),
    ...mapActions(['logout']),
    GoSearch(e){
      this.$router.push({path: `/Search`, query:{search:  e.target.value}})
      // console.log('search', e.target.value)
    },
    LogUserOut(){
      this.logout()
      this.$router.push('/Auth')
    },
    Profile(){
      let id = this.GetUserData()?.result?._id
      this.$router.push(`/Profile/${id}`)

    }
  }
}
</script>

<style lang="sass">
.nuks
 width:250px
 text-align: center
 display: inline-block !important
</style>