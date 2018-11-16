import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    user: {}
  },
  mutations: {
    increment (state){
      state.count++
    },
    setUser(state, {email}){
      state.user = {
        email
      }
      //Use local storage later
    }
  },
  actions: {
    async login(store, {email, password}){
      try{
        let authy = await firebase.auth().signInWithEmailAndPassword(email, password);
        if(authy){
          store.commit('setUser', {email});
          console.log('success');
        }
      }catch(e){
        console.error(e);
      }
    }
  }
})
