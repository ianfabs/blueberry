<template>
  <v-app>
    
    <v-container>
      <v-layout justify-center :align-center="false">
        <router-view/>
        <br/>
        <br/>
        <br/>
        <br/>
      </v-layout>
    </v-container>
    
  </v-app>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      settingsPanel: null
    };
  },
  computed: {
    showToolbar: function() {
      return this.$route.path.match("feed") ? true : false;
    }
  },
  components: {
  },
  methods: {
    changeDrawerStatus(value) {
      this.settingsPanel = value;
    }
  }
};
</script>

<style>
.v-card.full {
  border-radius: 10px;
  width: 100%;
}
</style>
