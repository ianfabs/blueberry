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
        <blue-editor menu="true" v-model="activePostContent"/>
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
import BluePost from "@/components/Post";
import BlueEditor from "@/components/BlueEditor";
import BlueSettings from "@/components/Settings";

async function jraph(argv) {
  let url = argv.url;
  let headers = { "Content-Type": "application/json" };
  let body = JSON.stringify({ query: argv.query });
  let fetch_options = {
    method: argv.method,
    headers,
    body
  };
  //returns request as JSON
  return (await fetch(url, fetch_options).then(res => res.json())).data;
  //return fetch(url, fetch_options).then(res => res.json());
}

export default {
  name: "Feed",
  data() {
    let vm = this;
    return {
      activePostContent: "",
      settingsPanel: null,
      sheet: null,
      user: {
        handle: "ianfabs",
        name: "Ian Fabs"
      },
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
    submitPost(e) {
      this.posts.push({
        id: 3,
        content: this.activePostContent,
        author: "ianfabs",
        postedOn: new Date()
      });
    },
    changeDrawerStatus(value) {
      this.settingsPanel = value;
    }
  },
  components: {
    BluePost,
    BlueEditor,
    BlueSettings
  },
  async created() {
    let posts = await jraph({
      url: "https://csb-8kj415zvx9-ysgmolcfdk.now.sh/",
      method: "POST",
      query: `{
        posts(handle: "${this.user.handle}"){
          content
          authorHandle
          postedOn
        }
      }`
    });
    console.log(posts);
    this.posts = posts.posts;
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
