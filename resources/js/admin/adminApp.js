import Vue from 'vue';
import store from './store';
import router from "./router";
import vuetify from "./plugins/vuetify";


import App from "./App";


const app = new Vue({
    el: '#app',
    router,
    store,
    vuetify,
    // vuetify: new Vuetify({
    //     lang: {
    //         locales: { ru },
    //         current: 'ru'
    //     }
    // }),
    render: h => h(App),
});
