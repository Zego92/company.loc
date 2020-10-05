import Vue from 'vue'
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import Companies from "../views/Companies";
import Company from "../views/components/Company/Company";
import CompanyInfo from "../views/components/Company/CompanyInfo";
import CompanyEdit from "../views/components/Company/CompanyEdit";

import Employees from "../views/Employees";

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
        component: Companies,
        children: [
            {
                path: ':id',
                name: 'Company',
                meta:{layout: 'main', title: 'Admin Panel | Companies'},
                component: Company,
                props: true,
                children: [
                    {
                        path: '/',
                        redirect: {name: CompanyInfo}
                    },
                    {
                        path: 'info',
                        name: 'CompanyInfo',
                        meta:{layout: 'main', title: 'Admin Panel | Companies'},
                        component: CompanyInfo,
                        props: true
                    },
                    {
                        path: 'edit',
                        name: 'CompanyEdit',
                        meta:{layout: 'main', title: 'Admin Panel | Companies'},
                        component: CompanyEdit,
                        props: true
                    }
                ]
            }
        ]
    },
    {
        path: '/employees',
        name: 'Employees',
        meta:{layout: 'main', title: 'Admin Panel | Employees'},
        component: Employees
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
