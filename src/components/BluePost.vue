<template>
  <v-card width='80vw'>
    <v-card-text>
      {{content || ""}}
      <slot></slot>
    </v-card-text>
    <v-card-actions>
      <v-btn flat icon @click="favorite">
        <v-icon v-if="favorited">favorite</v-icon>
        <v-icon v-else>favorite_border</v-icon>
      </v-btn>
      <span>
        &#8212; posted {{ago}}
      </span>
      <v-spacer></v-spacer>
      <v-btn flat icon>
        <v-icon>share</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "BluePost",
  props: {
    content: String,
    author: String,
    postedOn: {
      default: null,
      type: Date
    }
  },
  data() {
    return {
      favorited: false
    };
  },
  computed: {
    ago() {
      const then = {
        year: this.postedOn.getFullYear(),
        month: this.postedOn.getMonth() + 1,
        day: this.postedOn.getDate(),
        hours: this.postedOn.getHours(),
        minutes: this.postedOn.getMinutes(),
        seconds: this.postedOn.getSeconds()
      };
      const timeNow = new Date();
      const now = {
        year: timeNow.getFullYear(),
        month: timeNow.getMonth() + 1,
        day: timeNow.getDate(),
        hours: timeNow.getHours(),
        minutes: timeNow.getMinutes(),
        seconds: timeNow.getSeconds()
      };
      const difference = {
        year: now.year - then.year,
        month: now.month - then.month,
        day: now.day - then.day,
        hours: now.hours - then.hours,
        minutes: now.minutes - then.minutes,
        seconds: now.seconds - then.seconds
      };
      let sentance = "";
      if (difference.year === 0) {
        if (difference.month === 0) {
          if (difference.day === 0) {
            if (difference.hours === 0) {
              if (difference.minutes === 0) {
                if (difference.seconds === 0) {
                } else sentance = `${difference.seconds} seconds ago`;
              } else sentance = `${difference.minutes} minutes ago`;
            } else sentance = `${difference.hours} hours ago`;
          } else sentance = `${difference.day} days ago`;
        } else sentance = `${difference.month} months ago`;
      } else sentance = `${difference.year} years ago`;
      return sentance;
    }
  },
  methods: {
    favorite() {
      this.favorited = !this.favorited;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card {
  width: 60vw;
  text-align: left;
  margin: 1vh auto;
}
.icon {
  font-family: "Material Icons", "Roboto", sans-serif;
  font-size: 2em;
  padding: 1vh 1vw;
}
</style>
