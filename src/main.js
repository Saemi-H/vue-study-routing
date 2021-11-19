import { createApp } from 'vue';
import App from './App.vue';
import router from './router'

const app = createApp(App)

// router call beforeEach(function(to, from, next){}) = before each navigation, function will be called
// used checking user auth
// incoming guard
router.beforeEach(function(to, from, next){
    console.log("global before each", to, from);
    // next() => allow nevigation (t/f) / string / {name , params}
    
    // add if needsAuth
    if(to.meta.needsAuth){
        console.log("Needs Auth!!!");
    } 
    next()
})

// add afterEach. no next
router.afterEach(function(to, from) {
    // sending analytics data to the server
    console.log("after Global Route", to, from);

})

app.use(router)
app.mount('#app');
