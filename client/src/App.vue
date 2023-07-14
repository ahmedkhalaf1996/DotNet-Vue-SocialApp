<template>
  <q-layout view="lHh Lpr lFf">
   
   <Navbar/>
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<script>
import Navbar from "./views/Navbar.vue";
import { mapMutations } from 'vuex';

export default {
    name: "MainLayout",
    methods:{
      ...mapMutations(['SetData']),

    },
    mounted(){
      this.SetData()
    },
    components: { Navbar }
}
</script>


<style lang="sass">
.q-toolbar
  @media (min-width: $breakpoint-sm-min)
   height: 77px
.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center
.q-footer
  .q-tab__icon
    font-size: 30px
</style>