<template>
    <span contenteditable="false">
        <v-btn flat icon color="pink" @click="prevMood">
            <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        {{currentMood.text}}
        <v-btn flat icon color="pink" @click="nextMood">
            <v-icon>keyboard_arrow_right</v-icon>
        </v-btn>
    </span>
</template>

<script>
export default {
    name: "Mood",
    data(){
        return {
            currentMood: {},
            moods: [
                {
                    label: 'happy',
                    text: `😊 happy`
                },
                {
                    label: 'sad',
                    text: `😢 sad`
                },
                {
                    label: 'cool',
                    text: `😎 cool`
                },
                {
                    label: 'lovey',
                    text: `😘 lovey`
                },
                {
                    label: 'thinking',
                    text: `🤔 thinking`
                },
                {
                    label: 'naughty',
                    text: `😏 naughty`
                }
            ]
        };
    },
    methods: {
        nextMood() {
            this.currentMood = this.moods[(this.moods.indexOf(this.currentMood) + 1)%this.moods.length]
        },
        prevMood() {
            this.currentMood = this.moods[this.moods.indexOf(this.currentMood) - 1 >= 0 ? this.moods.indexOf(this.currentMood) - 1 : 0];
        },
    },
    created(){
        this.currentMood = this.moods[0];
    }
}
</script>

<style>

</style>
