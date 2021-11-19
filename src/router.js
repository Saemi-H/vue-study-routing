import {createRouter, createWebHistory} from 'vue-router'
// import TeamsList
import TeamsList from './pages/TeamsList.vue'
// import usersList
import UsersList from './pages/UsersList.vue'
// import TeamMembers
import TeamMembers from './components/teams/TeamMembers.vue'
import NotFound from './pages/NotFound.vue'
import TeamsFooter from './pages/TeamsFooter.vue'
import UsersFooter from './pages/UsersFooter.vue'

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
        {
            // add name
            name:'teams',
            path: '/teams',

            // add meta
            meta :{needsAuth : true},
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
            // add beforeenter function using next
            beforeEnter(to, from, next){
                console.log("users beforeEnter", to, from);
                next()
            }
        },

        // redirecting invalid value. no need to sign component : only one lasts
        {path : '/:notFound(.*)', component : NotFound },    
    ],
    linkActiveClass: 'router-link-active',
    // add scroll behavior method : scrollBehavior(to,from,savedPosition)
    scrollBehavior(to, from, savedPosition){
        // scrollBehavior(_, _2, savedPosition){ : _, _2 => 2 arguments, but not using them
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

export default router
