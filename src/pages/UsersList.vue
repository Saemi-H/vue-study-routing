<template>
<button @click="confirmInput">Confirm</button>
<!-- bind saveChange function -->
<button @click="changesSaved">saveChanges</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data(){
    return {
      changesSaved: false,
    }
  },
  methods:{
    confirmInput(){
      this.$router.push('/teams')
    },
},

 // add saveChanges function
  saveChanges(){
    this.changesSaved = true
  },
  // add beforeRouterEnter function using beforeEach
  beforeRouterEnter(to, from, next){
    next()
  },
  // add beforeRouteLeave function
  beforeRouteLeave(to, from, next){
      // if changeSaved call next
      if(this.changesSaved === true){
        next()
      }else{
        // else confirm leave? + next
      const leavingPage = confirm("didn't save the changes!!!!!!!")
      next(leavingPage)
      }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>