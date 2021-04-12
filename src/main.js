import Vue from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'

//load CSS
import '../public/css/materialdesignicons.min.css'
import '../public/css/vendor.bundle.base.css'
import '../public/css/styles.css'
import '../public/css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// load js
import '../public/js/vendor.bundle.base.js'
import '../public/js/polyfill.min.js'

import moment from "moment";
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).locale('id').format('D MMM YYYY HH:mm')
  }
})
Vue.filter('format', function(value) {
  if (value) {
    return moment(String(value)).locale('id').format('D MMM YYYY ')
  }
})

Vue.use(BootstrapVue)
Vue.use(VueCookies)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  router,
  store,
  methods: {
    isAuthenticate : function(){
      if(localStorage.getItem("Authorization")){
        let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("Authorization")

        axios.get("/login/check", conf)
        .then(response => {
          if(response.data.status){
            this.$store.commit('userDetail', response.data.data)
          } else {
            this.$store.commit('logout')
            router.push('/login') 
          }
        })
        .catch(error => {
          this.$store.commit(error,'logout')
        });
      } else {
        this.$store.commit('logout')
      }
    },
  },
  render: h => h(App)
}).$mount('#app')

