<template>
 <div>
  <q-item class="RightBar" 
          v-for="data in UsersData" 
          :key="data._id"
          :to="`/Profile/${data?._id}`" >
        <q-item-section avatar>
          <q-avatar>
            <img v-if="data.imageUrl" :src="data?.imageUrl">
            <img v-else src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">{{data?.name}}</q-item-label>
          <q-item-label caption>
            {{ data?.bio }}
          </q-item-label>
        </q-item-section>
      </q-item>

 </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name:'Rightbar',
  data(){
    return {
      UsersData:[]
    }
  },
  computed:{
    ...mapGetters(['GetUserData'])
  },
  methods:{
    ...mapActions(['GetTheUserSug'])
  },
  async mounted(){
    let LogedUser = this.GetUserData()?.result
     const {users} = await this.GetTheUserSug(LogedUser?._id)
     this.UsersData = users
    }
}
</script>
<style lang="sass">
.RightBar
  cursor: pointer

</style>