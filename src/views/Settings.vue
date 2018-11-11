<template>
  <v-navigation-drawer v-model="drawerChild" temporary absolute right>
  <!-- START PROFILE BAR -->
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>UserFullName</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
  <!-- END PROFILE BAR -->
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in settings"
        :key="item.title"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "BlueSettings",
  props: ["drawer"],
  data() {
    return {
      drawerChild: null,
      settings: [
        {
          title: "Dark Mode",
          icon: "settings"
        }
      ]
    };
  },
  watch: {
    drawer(value) {
      this.drawerChild = value;
    },
    drawerChild(value) {
      this.$emit("drawerStatus", value);
    }
  },
  created() {
    this.dataToggle = this.toggle;
  }
};
</script>

<style>
</style>
