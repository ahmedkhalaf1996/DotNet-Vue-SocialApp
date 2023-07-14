<template>
    <div class="row col-12 constrain" >
       <div class="col-4 text-center"  >
        <q-avatar size="150px">
         <img :src="UserData?.imageUrl">
       </q-avatar>
       </div>
       <div class="col-8 text-left"  >
        <i>Edit profile</i>
       <div class="text-h6 q-pa-lg" style="margin:auto">
        <q-btn v-if="isSameUser" @click="Save" flat  label="Save" />
           
       </div>



        <q-input dense v-model="UserData.name" autofocus placeholder="UserData Title" />
          <div >
            <q-input
              v-model="UserData.bio"
              placeholder="what's on your mind? Your bio"
              type="textarea"
             
            />
          </div>
          <div class="q-pa-md">
            <q-file
            v-model="file"
              label="Pick Image"
              filled
            />
          </div>






       </div>
   
      </div>
   </template>
   
   <script>
    import { mapActions } from 'vuex';

   export default {
   props:['UserPosts','UserData','isSameUser'],
   data(){
    return{
        file:null,
    }
   },
   watch:{
    file(){
      this.ConvertTobas64()
    }
   },
   methods:{
    ...mapActions(['UpdateUserData']),

    async Save(){
        // 
        let userData = { _id:this.UserData._id, name:this.UserData.name,
                           bio:this.UserData.bio, imageUrl:this.UserData.imageUrl }
        
        const Update = await this.UpdateUserData(userData)
        
        if(Update){
            this.$emit('EditProfile')
        }
        
        // console.log('Edit ', this.UserData)
    },
    ConvertTobas64(){
        var reader = [];
        reader = new FileReader();   
        reader.readAsDataURL(this.file);

        new Promise(() => {  
            reader.onload =  ()=> {
                this.UserData.imageUrl =  reader.result
        };
        })
      }
     }
   }
   </script>
   
   