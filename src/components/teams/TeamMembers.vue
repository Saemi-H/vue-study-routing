<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject:['users', 'teams'],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  created(){
    console.log(this.$route)
    console.log("team id", this.$route.params.teamId);
    this.$route.path  // /teams/t1
    // define teamId
    const teamId = this.$route.params.teamId 
    // define selectedTeam using teamId
   const selectedTeam = this.teams.find(team=> team.id === teamId)
   console.log("selectedTeam", selectedTeam); 
    // define members from selectedTeam
    const Members = selectedTeam.members
    console.log("members", Members);
    // add selectedMembers array
    const selectedMembers = []
// using for loop members
// *** for in : object , for of : array
    for (const mem of Members){
      console.log("members in Members", mem);
      // define selected user = find user id = member
      const selectedUser = this.users.find(user=> user.id === mem)
      console.log("selectedUser", selectedUser);
      // push selectedUser into selectedMembers
      selectedMembers.push(selectedUser)
      console.log("selectedMembers", selectedMembers);

    }
  // add selectedTeam as teamName
  this.teamName = selectedTeam.name
  // add selectedMembers as members
  this.members = selectedMembers
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>