import Vue from 'vue'
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Company from "../views/Company";
import Employee from "../views/Employee";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {name: 'Login'}
    },
    {
        path: '/login',
        name: 'Login',
        meta:{layout: 'auth', title: 'Admin Panel | Login Page'},
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta:{layout: 'main', title: 'Admin Panel | Dashboard'},
        component: Dashboard
    },
    {
        path: '/companies',
        name: 'Companies',
        meta:{layout: 'main', title: 'Admin Panel | Companies'},
        component: Company
    },
    {
        path: '/employees',
        name: 'Employees',
        meta:{layout: 'main', title: 'Admin Panel | Employees'},
        component: Employee
    },

];

const router = new VueRouter({
    // mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});


export default router
