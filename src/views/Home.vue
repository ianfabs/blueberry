<template>
  <div>
    <blue-profile></blue-profile>
  </div>
</template>

<script>
import BluePost from "@/components/Post";
import BlueProfile from "@/components/Profile";

export default {
  name: "Home",
  components: {
    BluePost,
    BlueProfile
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
