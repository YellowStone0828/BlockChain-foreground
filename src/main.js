import Vue from 'vue'
import Router from 'vue-router'
import { domain, fromNow } from './filters'
import App from './components/app.vue'
import login from './components/login.vue'
import main from './components/main.vue'
import adminService from './services/adminService'
import welcome from './components/welcome.vue'
//import adminList from './components/admin/adminList.vue'
import init from './components/init.vue'
import userSearch from './components/user/userSearch.vue'
import myLoans from './components/myLoans.vue'

// install router
Vue.use(Router);

// register filters globally
//Vue.filter('fromNow', fromNow);
//Vue.filter('domain', domain);

const routes = [
    {path: '/', component: login},
    {path: '/login', component: login},
    {path: '/main', component: main,
        children: [
            {path: '/init', component: init},
			{path: '/myLoans', component: myLoans}
        ]
    },
];

// routing
var router = new Router({routes});

/*router.map({
    '/': {
        component: login
    },

    '/login': {
        component: login
    },
    '/main': {
        component: main,
        subRoutes: {
            '/': {
                component: welcome
            },
            '/admin': {
                //component: adminList
            },
            '/adminDetail/:id': {
                component: adminDetail
            },
            '/adminDetail': {
                component: adminDetail
            },
            '/user': {
                component: userSearch
            },
            '/userList': {
                //component: userList
            }
        }
    }

});*/

router.beforeEach((to, from, next) => {
    if (!adminService.checkIsLogin() && to.path !== '/' && to.path !== '/login') {
        console.log('login')
        next('login');
    }
    next();
});

//router.start(app, '#app');
const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app');