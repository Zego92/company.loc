import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth";
import dashboard from "./modules/dashboard";
import company from "./modules/company";
import employee from "./modules/employee";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        dashboard,
        company,
        employee
    }
})
