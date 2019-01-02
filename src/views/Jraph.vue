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
    import {jraph, JraphOptions} from 'jraph';

    export default {
        data() {
            return {
                items: [],
                email: "ianfabs@outlook.com"
            }
        },
        async created(){
            let config = new JraphOptions();
            config.url = "":
            config.options.method = "POST";
            config.query = `{
                posts{
                    content
                }
            }`;
            this.items = await jraph(config);
        }
    }
</script>

<style scoped>

</style>