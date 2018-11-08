<template>
  <v-app>
    <v-content>
      eggs
      <blue-editor menu/>
    </v-content>
  </v-app>
</template>

<script>
import BlueEditor from "@/components/BlueEditor"

console.log(BlueEditor)

export default {
  name: 'App',
  data () {
    return {
      //
    }
  },
  components: {BlueEditor}
}
</script>
