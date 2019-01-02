import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import router from './router';
import { jraph } from 'jraph';
const jql = jraph(`https://csb-8kj415zvx9-yaccgwjitv.now.sh/`, {});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    user: {},
    api: "https://csb-8kj415zvx9-yaccgwjitv.now.sh/",
    posts: []
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setUser(state, { email }) {
      state.user = {
        email
      }
      //Use local storage later
    },
    mergePostsList(state, { authorEmail, postedOn, content }) {
      state.posts;
    }
  },
  actions: {
    async login(store, { email, password }) {
      try {
        let authy = await firebase.auth().signInWithEmailAndPassword(email, password);
        if (authy) {
          store.commit('setUser', { email });
          console.log('success');
          router.go(-1);
        }
      } catch (e) {
        console.error(e);
      }
    },
    /* This should be a mixin */
    async updatePosts(store, { authorEmail, postedOn, content }) {
      try {
        let createdPost = await jql`
        mutation{
          addPost(content: "${content}", authorEmail: "${authorEmail}", postedOn: "${postedOn}"){
            content
            postedOn
            authorEmail
          }
        }`;
        if (createdPost) {
          //store.commit('addPost', { post: createdPost.data.post });
          console.log('success');
          router.go(0);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
})
