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
import Employee from "../views/components/Employee/Employee";
import EmployeeInfo from "../views/components/Employee/EmployeeInfo";
import EmployeeEdit from "../views/components/Employee/EmployeeEdit";

import auth from "./middleware/auth";
import guest from "./middleware/guest";
import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {name: 'Login'}
    },
    {
        path: '/login',
        name: 'Login',
        meta:{layout: 'auth', title: 'Admin Panel | Login Page', middleware: [guest]},
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        meta:{layout: 'main', title: 'Admin Panel | Dashboard', middleware: [auth]},
        component: Dashboard
    },
    {
        path: '/companies',
        name: 'Companies',
        meta:{layout: 'main', title: 'Admin Panel | Companies', middleware: [auth]},
        component: Companies,
        children: [
            {
                path: ':id',
                name: 'Company',
                meta:{layout: 'main', title: 'Admin Panel | Companies', middleware: [auth]},
                component: Company,
                props: true,
                children: [
                    {
                        path: '/',
                        redirect: {name: 'CompanyInfo'}
                    },
                    {
                        path: 'info',
                        name: 'CompanyInfo',
                        meta:{layout: 'main', title: 'Admin Panel | Companies', middleware: [auth]},
                        component: CompanyInfo,
                        props: true
                    },
                    {
                        path: 'edit',
                        name: 'CompanyEdit',
                        meta:{layout: 'main', title: 'Admin Panel | Companies', middleware: [auth]},
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
        meta:{layout: 'main', title: 'Admin Panel | Employees', middleware: [auth]},
        component: Employees,
        children: [
            {
                path: ':id',
                name: 'Employee',
                meta:{layout: 'main', title: 'Admin Panel | Employees', middleware: [auth]},
                component: Employee,
                props: true,
                children: [
                    {
                        path: '/',
                        redirect: {name: 'EmployeeInfo'}
                    },
                    {
                        path: 'info',
                        name: 'EmployeeInfo',
                        meta:{layout: 'main', title: 'Admin Panel | Employees', middleware: [auth]},
                        component: EmployeeInfo,
                        props: true
                    },
                    {
                        path: 'edit',
                        name: 'EmployeeEdit',
                        meta:{layout: 'main', title: 'Admin Panel | Employees', middleware: [auth]},
                        component: EmployeeEdit,
                        props: true
                    }

                ]
            }
        ]
    },

];

const router = new VueRouter({
    // mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware;
    const context = {
        to,
        from,
        next,
        store
    };
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
});


export default router
