// import Vue from 'vue';
// import Vuetify from 'vuetify';
// import 'vuetify/dist/vuetify.min.css'
// import 'tiptap-vuetify/dist/main.css'
// import ru from 'vuetify/lib/locale/ru'
// const vuetify = new Vuetify()
// Vue.use(Vuetify);
//
// export default new Vuetify({
//     lang: {
//         locales: { ru },
//         current: 'ru'
//     }
// })
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
