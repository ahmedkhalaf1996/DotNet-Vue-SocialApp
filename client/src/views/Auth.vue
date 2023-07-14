<template>

<q-page class="constrain q-pa-md">
   <div class="row q-col-gutter-lg">
   <div class="col-5">
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card"  style="width: 100%; padding: 10px;">
        <h1 class="text-h6 text-center">sigin in</h1>
        <q-card-section>
            <form @submit.prevent.stop="Login" class="q-gutter-md" >
            <q-input
                filled
                v-model="data.email"
                label="Your Email *"
                hint="Email"
                lazy-rules
            />

            <q-input
                filled
                type="password"
                v-model="data.password"
                label="password"
                lazy-rules
            />
            <div>
                <q-btn label="sigin in" type="submit" color="primary" />
            </div>
        </form>
        </q-card-section>
        </q-card>
    </div>
   </div>

   <div class="col-7"> 
    <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card"  style="width:100%; padding: 10px;">
        <h1 class="text-h6 text-center">Sigin up</h1>

        <q-card-section>
            <form @submit.prevent.stop="Register" class="q-gutter-md" >
            <q-input
                filled
                v-model="data.firstName"
                label="Your firstname *"
                hint="firstname and surname"
                lazy-rules
            />
            <q-input
                filled
                v-model="data.lastName"
                label="Your lastname *"
                hint="lastname and surlastname"
                lazy-rules
            />
            <q-input
                filled
                v-model="data.email"
                label="Your email *"
                hint="email and suremail"
                lazy-rules
            />
            <q-input
                ref="password"
                filled
                type="password"
                v-model="data.password"
                label="password"
                lazy-rules
            />
            <div>
                <q-btn label="sigin up" type="submit" color="positive" />
            </div>
        </form>
        </q-card-section>
        </q-card>
    </div>
   </div>


</div>
</q-page>

</template>

<script>
import { mapActions } from 'vuex';

export default {
      
      data () {
        return {
         data:{
          email:'', 
          password:'', 
          firstName:'', 
          lastName:'' 
        }
        }
      },
    
      methods: {
        ...mapActions(['signin', 'signup']),
        
       async Login(){
          var validate = true
         if(this.data.email == ''){
          validate = false
          this.$q.notify({
            icon: 'eva-alert-circle-outline',
            type: 'negative',
            message: `email is Required`
           })
         } else if(this.data.password == ''){
          validate = false
          this.$q.notify({
                  icon: 'eva-alert-circle-outline',
                  type: 'negative',
                  message: `password is Required`
                })
         }
         // succufully
         if(validate){
          var formdata = {email:this.data.email, password:this.data.password}
          const data = await this.signin(formdata)

          if(data.message){
            this.$q.notify({
                icon: 'eva-alert-circle-outline',
                type: 'negative',
                message: `${data.message}`
              });
          }else {
            // meaning succufully 
            this.$q.notify({
                icon: 'eva-alert-circle-outline',
                type: 'positive',
                message: `succufully sigin up`
              })
              this.$router.push('/')
          }
         }
        },
       async Register(){
          // validation
          var isValidate = true;
          for (const key in this.data) {
              const val = this.data[key];
              if(val === ''){
                this.$q.notify({
                  icon: 'eva-alert-circle-outline',
                  type: 'negative',
                  message: `${key} is Required`
                });
                isValidate = false
              }
          }
          // validation end
          // rgister
          if(isValidate){
           const data = await this.signup(this.data)

           if(data.message){
              this.$q.notify({
                  icon: 'eva-alert-circle-outline',
                  type: 'negative',
                  message: `${data.message} `
                });
            }else {
              // meaning succufully 
              this.$q.notify({
                  icon: 'eva-alert-circle-outline',
                  type: 'positive',
                  message: `succufully sigin up`
                })
                console.log(data)
                this.$router.push(`/`)
            }
          }
        }
      }
    }
    </script>

<style>

</style>