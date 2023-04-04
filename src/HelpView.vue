<template>
    <div>
        <h2 v-if="!embedded" class="w-100 d-inline-flex help-title p-3 border-bottom">
            <SwissFlag class="me-2" />
            <span class="flex-grow-1">{{ headerMessage }}</span>
        </h2>
        <div v-if="storeIsReady" v-for="item in helpItems" :key="item.id" class="help-item p-3">
            <h2 v-if="!item.isHomepage" class="help-item-title">{{ item.title }}</h2>
            <div class="help-item-content mt-2" v-html="item.content"></div>
            <img v-if="item.image" :alt="item.title" :src="item.image" class="mt-2" />
        </div>
    </div>
</template>

<script>
import store from './store'
import SwissFlag from "@/SwissFlag.vue";

const headerMessages = {
    en: 'Mapviewer Help',
    de: 'Hilfe Kartenviewer',
    fr: 'Aide visualiseur de cartes',
    it: 'Aiuto visualizzatore di carte',
}

export default {
    components: {SwissFlag},
    computed: {
        storeIsReady() {
            return store.ready
        },
        embedded() {
            return store.embedded
        },
        helpItems() {
            return store.helpItemsMatchingWantedIds
        },
        headerMessage() {
            return headerMessages[store.lang]
        },
    },
}
</script>

<style lang="scss">
.help-title::before {

}
.help-item {
    &-content {
        display: flex;
        flex-direction: column;
    }
    .video {
        position: relative;
        padding-bottom: calc(9 / 16 * 100%); /* 16:9 */
        padding-top: 25px;
        height: 0;

        iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
