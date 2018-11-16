<template>
  <div>
    <button @click="increment">Click me!</button>
    {{count}}
  </div>
</template>

<script lang="ts">
import { mapMutations, mapState } from "vuex";

export default {
  name: 'test',
  methods: {
    ...mapMutations(['increment'])
  },
  computed: {
    ...mapState(['count'])
  }
}
</script>

<style>

</style>
