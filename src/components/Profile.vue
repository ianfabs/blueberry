<template>
  <v-card>
    <v-list two-line>
      <v-list-tile>

        <v-list-tile-avatar>
          <v-icon large>account_circle</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title >
            Ian Fabs
          </v-list-tile-title>
          <v-list-tile-sub-title>
            Latest Post
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-spacer></v-spacer>
        <v-list-tile-action>
          <v-btn to="/feed" flat icon>
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "BlueProfile",
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card {
  border-radius: 10px;
  width: 60vw;
}
</style>
