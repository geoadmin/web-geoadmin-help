<template>
    <div id="loading">
        <h4>{{ loadingMessage }}... <i class="fa fa-spin fa-spinner"></i></h4>
    </div>
</template>
<script>
import store from '@/store'

const loadMessages = {
    en: 'Loading',
    de: 'Laden',
    fr: 'Chargement',
    it: 'Caricamento',
}

export default {
    computed: {
        loadingMessage() {
            return loadMessages[store.lang]
        },
    },
}
</script>
