<template>
    <div class="signin">
        <h1>Sign In</h1>
        <v-form>
          <v-text-field
            label="Email"
            required
            type="email"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="Password"
            required
            type="password"
            v-model="password"
          ></v-text-field>
          <v-btn @click="login({email, password});$router.replace('/feed')">signin</v-btn>
        </v-form>
        <small>
            No account? No prob, bob! Sign up <router-link to="/signup">here</router-link>
        </small>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'BlueLogin',
    data(){
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapActions(['login'])
    }
}
</script>

<style scoped>

</style>
