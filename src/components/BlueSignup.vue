<template>
    <div class="signup">
        <h1>Signup</h1>
        <v-form v-model="valid">
          <v-text-field
            v-model="email"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
          ></v-text-field>
          <v-btn
           :disabled="!valid"
           @click="signUp"
            >
           submit
            </v-btn>
        </v-form>
        <small>
            Already got an account? No prob, bob! Login in <router-link to="/login">here</router-link>
        </small>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'BlueSignup',
    data(){
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        signUp(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                function(user){
                    alert('Account Created!');
                },
                function(err){
                    alert('Oops ' + err.message);
                }
            )
        }
    }
}
</script>

<style scoped>

</style>
