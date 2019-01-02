<template>
  <div>
    <blue-settings 
      :drawer="settingsPanel" 
      @drawerStatus="settingsPanel = $event"
    />
    <v-toolbar fixed>
      <v-toolbar-side-icon>
        <v-icon @click="$router.push('/')">keyboard_arrow_left</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>Ian Fabs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="sheet = true" color="primary">
          Create Post
        </v-btn>
        <v-btn flat @click.native.stop="settingsPanel = !settingsPanel" icon>
          <v-icon>settings</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <br/>
    <br>
    <template v-for="(post, index) in posts">
      <blue-post 
      :key="index"
      :author="post.author"
      :postedOn="post.postedOn"
      >
        <div v-html="post.content">{{post.content}}</div>
      </blue-post>
    </template>
    <br/>
    <br/>
    <v-bottom-sheet v-model="sheet">
      <v-list>
        <blue-editor menu v-model="activePostContent"/>
        <v-btn @click="submitPost">Submit your post</v-btn>
      </v-list>
    </v-bottom-sheet>
    <v-footer app fixed height="auto" secondary lighten-3>
      <v-layout justify-left column wrap>
        <v-flex
          secondary
          lighten-1
          py-3
          text-xs-center
          accent--text
          xs12
        >
          &copy;2018 — <strong>Blueboobs</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script>
import BluePost from "@/components/Post.vue";
import BlueEditor from "@/components/BlueEditor.vue";
import BlueSettings from "@/components/Settings.vue";
import { mapState } from "vuex";
import jraph from "jraph";
console.log("========================================================================");


export default {
  name: "Feed",
  data() {
    let vm = this;
    return {
      activePostContent: "",
      settingsPanel: null,
      sheet: null,
      posts: [
      {
        authorHandle: "ianfabs",
        content: "I love eggs",
        postedOn: "2018-10-31"
      }
      ]
    };
  },
  methods: {
    async submitPost(e) {
      /* this.posts.push({
        id: 3,
        content: this.activePostContent,
        author: "ianfabs",
        postedOn: new Date()
      }); */
      
    },
    changeDrawerStatus(value) {
      this.settingsPanel = value;
    }
  },
  computed: {
    ...mapState(['user', 'api'])
  },
  components: {
    BluePost,
    BlueEditor,
    BlueSettings
  },
  async created() {
    let posts = await jraph({
      url: this.api,
      options: {},
      query: `{
        posts(email: "${this.user.email}"){
          content
          authorEmail
          postedOn
        }
      }`
    });
    console.log(posts);
    this.posts = posts.posts;
  },
  mounted(){
    if(!this.user.email){
      this.$router.push("/login")
    }
  }
};
</script>

<style>
.m-word {
  border: 3px solid #c5cae9;
  background-color: bisque;
  border-radius: 5px;
  padding: 1vmax;
  white-space: nowrap;
}
</style>
