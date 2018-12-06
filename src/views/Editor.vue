<template>
  <div>
    <blue-editor menu="true" v-model="text"/>
    <v-btn @click="log">Log data</v-btn>
  </div>
</template>

<script>
import BlueEditor from "@/components/BlueEditor";
export default {
  components: {
    BlueEditor
  },
  data(){
    return {
      text: ""
    };
  },
  methods: {
    log(){console.log(this.text)}
  }
};
</script>

<style>

</style>
