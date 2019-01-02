<template>
    <div>
        <span>
            {{items}}
        </span>
        <ul>
            <li v-for="item of items" :key="item">
                {{item.content}}
            </li>
        </ul>
    </div>
</template>

<script>
    import {jraph} from 'jraph';

    export default {
        data() {
            return {
                items: [],
                email: "ianfabs@outlook.com"
            }
        },
        async created(){
            const jql = jraph(`https://csb-8kj415zvx9-yaccgwjitv.now.sh/`, {});
            const request = jql`{
                posts{
                    content
                }
            }`;
            this.items = await request;
        }
    }
</script>

<style scoped>

</style>