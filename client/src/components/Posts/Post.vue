<template>
      <div>
      <!-- show post  -->
      <q-card v-if="!EditPost" class="card-post q-mb-md" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img v-if="user?.imageUrl" :src="user?.imageUrl" />
                <img v-else src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">{{ user.name }}</q-item-label>
              <q-item-label caption>
              {{ getTime() }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />
          
          <q-img style="cursor: pointer"
            @click="GoToDeatils"
            to="/PostDeatils"
            :src="post.selectedFile"
          />


          <q-card-section>
            <div class="text-h6">{{post.title}}</div>
            <div class="text-subtitle1">{{post.message}}</div>
            <q-separator />
            <div class="text-subtitle4" 
                 v-for="(comment, index) in post.comments" :key="index">{{comment}}
            </div>


            <q-btn  v-if="!UserLike" @click="Like" flat round color="red" icon="eva-heart-outline" >
              {{LikesCount()}}
            </q-btn>
            <q-btn v-else  @click="Like"  flat round color="red" icon="eva-heart" >
            {{LikesCount()}}
            </q-btn>

          </q-card-section>

        <q-input outlined v-model="form.text" label="add comment" >
          <q-btn v-if="form.text !==''" @click="AddComment" flat round color="primary" icon="eva-plus-square" />
        </q-input>
        

      </q-card>
      <!-- edit post -->
      <div v-else class="q-pa-md  items-start q-gutter-md">
      <q-card class="my-card col-12">
       <q-card-section>

        <div class="text-h6">Create Post</div>


          <q-input dense v-model="post.title" autofocus placeholder="Post Title" />
          <div >
            <q-input
              v-model="post.message"
              placeholder="what's on your mind?"
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

    
          <div >
            <q-img
            :src="post.selectedFile"
              spinner-color="red"
              style="height: 140px; max-width: 150px"
            />
         </div>

         <q-btn flat label="Update" v-close-popup @click="FireUpdate" />


      </q-card-section>
      


    </q-card>
      </div>
      
      </div>
</template>

<script>
  import moment from 'moment';
  import { mapActions } from 'vuex';

export default {
  props:['EditPost','post'],
  name:'Post',
  data(){
    return {
     // data: { title:'', body:'', img:null},
      user:{},
      form:{text:''}, // comment 
      file:null,
      UserLike:false
    }
  },
  watch:{
  file(){
    this.ConvertTobas64()
  }
},
 methods:{
  ...mapActions(['GetUserByID','LikePostByUser','commentPost', 'updatePost']),
  GoToDeatils(){
    this.$router.push({path: `/PostDeatils/${this.post._id}`})
  },
  async FireUpdate(){
    // this.EditPost = !this.EditPost
    const  PostData = { id:this.post._id  ,title:this.post.title, 
                        selectedFile:this.post.selectedFile,
                        message:this.post.message  }

    const res = await this.updatePost(PostData)

    if(res){
     this.$emit('changeEdit')
    }
  },
  getTime(){
    return moment(this.post?.createdAt).fromNow()
  },
  Like(){
   this.LikePostByUser(this.post._id)
   if(this.UserLike){
    this.post.likes =this.post.likes.filter(id => id != this.user._id)
   } else {
    this.post.likes.push(this.user._id)
   }
   this.UserLike = !this.UserLike
  },
  LikesCount(){
    if(this.post.likes.length > 0){
      return String(this.post.likes.length  );
    }
  },
  AddComment(){
    console.log(this.form.text)
    this.post.comments.push(this.form.text)

    // store
    this.commentPost({value:this.form.text, id:this.post._id}) // value id
    // end
    this.form.text = ''

  },
  ConvertTobas64(){
    var reader = [];
    reader = new FileReader();   
    reader.readAsDataURL(this.file);

    new Promise(() => {  
        reader.onload =  ()=> {
            this.post.selectedFile =  reader.result
     };
    })
  }
 },
 
 async mounted(){

  const {user} = await this.GetUserByID(this.post?.creator)
  this.user = user 
  //console.log('user data', this.user)
  // get if user liked the post or not
  const islike = this.post.likes.find((like) => like === this.user._id)
  if(islike){
    this.UserLike = true
  } else {
    this.UserLike = false
  }
 }, 
}
</script>

<style>

</style>