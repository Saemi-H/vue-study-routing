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
import NotFound from './components/nav/NotFound.vue'
import TeamsFooter from './components/teams/TeamsFooter.vue'
import UsersFooter from './components/users/UsersFooter.vue'

const app = createApp(App)

// define router
const router = createRouter({
    //  add history
    history: createWebHistory(),
    // add routes array
    routes : [
        // **!!navigate by names than routes

        {path : '/', redirect : '/teams' }, // = {path : '/', component : TeamsList },  
        //{path : '/teams', component : TeamsList }, //{path : '/teams', component : TeamsList , alias : '/'},
        //{path : '/users', component : UsersList },
        // add /: specify. Order matters!
        // add TeamMembers component 
        //{path : '/teams/:teamId', component : TeamMembers, props: true },
        // => not just route. passing as props
        //  => could be child

        // redirecting invalid value. no need to sign component : only one lasts
        {path : '/:notFound(.*)', component : NotFound },
        {
            // add name
            name:'teams',
            path: '/teams',
            //component: TeamsList,
            // components : objects. default: unnamed router vue. parents have more than 1 components.
            components :{default:TeamsList, footer: TeamsFooter },
            // use router-view
            children: [
                // add name (strings)
                {name:'team-members',path: ':teamId', component: TeamMembers, props: true} // /teams/t1
            ]
        },
        // create Users path
        {   
            name: 'users',
            path: '/users',
            components:{default: UsersList, footer: UsersFooter},
        }
    ],
    linkActiveClass: 'router-link-active',
    // add scroll behavior method : scrollBehavior(to,from,savedPosition)
    scrollBehavior(to, from, savedPosition){
        // savedPosition = only when backbtn used
        console.log("scollBehavior", to, from, savedPosition);
        if(savedPosition){
            return savedPosition
        }
        return{
            left: 0, top:0 //to the top
        }
    }
})

app.use(router)

app.mount('#app');
