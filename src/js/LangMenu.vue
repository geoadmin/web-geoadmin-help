<template>
    <div id="lang-menu">
        <router-link v-bind:to="'/?ids=01&lang=' + lang">Home</router-link>
        <router-link v-for="lang in possibleLanguages"
                     v-bind:key="lang"
                     v-bind:to="'/?ids=' + ids + '&lang=' + lang"
                     class="lang-selector">
            {{ lang }}
        </router-link>
    </div>
</template>
<script>
    import store from "../store";

    export default {
        computed: {
            lang: () => {
                return store.lang;
            },
            ids: () => {
                return store.wantedIds.join(',');
            },
            possibleLanguages: () => {
                return ['en','de','fr','it'];
            }
        }
    }
</script>
