import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase';

Vue.config.productionTip = false

var config = {
  apiKey: "AIzaSyDWWxDgR52ohj-uA4EKQ452ctqUpFrseNA",
  authDomain: "nician-sim.firebaseapp.com",
  databaseURL: "https://nician-sim.firebaseio.com",
  projectId: "nician-sim",
  storageBucket: "nician-sim.appspot.com",
  messagingSenderId: "24678600333"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
