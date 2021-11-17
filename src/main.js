import { createApp } from 'vue';
// add createRouter
// add createWebHistory
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue';
// import TeamsList
import TeamsList from './components/teams/TeamsList.vue'
// import usersList
import UsersList from './components/users/UsersList.vue'
// import TeamMembers
import TeamMembers from './components/teams/TeamMembers.vue'

const app = createApp(App)

// define router
const router = createRouter({
    //  add history
    history: createWebHistory(),
    // add routes array
    routes : [
        {path : '/teams', component : TeamsList },
        {path : '/users', component : UsersList },
        // add /: specify. Order matters!
        // add TeamMembers component 
        {path : '/teams/:teamId', component : TeamMembers },
    ],
    linkActiveClass: 'router-link-active'
})

app.use(router)

app.mount('#app');
