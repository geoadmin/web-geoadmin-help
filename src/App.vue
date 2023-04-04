<template>
    <div
        :class="{
            'mx-auto my-lg-5 py-3 px-5 rounded-4 shadow-lg': !store.embedded,
            'embedded pb-5': store.embedded,
        }"
        class="app-container bg-light mh-100"
    >
        <div v-if="!store.embedded" class="lang-menu d-flex flex-row-reverse p-3">
            <button
                id="menu-dropdown-button"
                class="d-md-none btn btn-secondary"
                type="button"
                @click="toggleMenu"
            >
                Menu
            </button>
            <div class="d-flex justify-items-center align-items-center">
                <router-link :to="`/?ids=01&lang=${currentLang}`">
                    <button class="d-md-none btn btn-outline-secondary me-1">Home</button>
                    <span class="d-none d-md-block me-1">Home</span>
                </router-link>
                <router-link
                    v-for="lang in store.possibleLanguages"
                    :key="lang"
                    :to="`/?ids=${store.wantedIds.join(',')}&lang=${lang}`"
                    class="lang-selector text-center me-1"
                >
                    <button
                        class="d-md-none btn"
                        :class="{
                            'btn-outline-primary': currentLang === lang,
                            'btn-outline-secondary': currentLang !== lang,
                        }"
                    >
                        {{ lang }}
                    </button>
                    <span class="d-none d-md-inline-block me-2">|</span>
                    <span class="d-none d-md-inline-block text-uppercase me-1">{{ lang }}</span>
                </router-link>
            </div>
        </div>
        <div class="content" :class="{ 'd-md-grid border-bottom': !store.embedded }">
            <h2 class="title p-3 border-bottom d-none d-md-block">
                <a href="https://map.geo.admin.ch" target="_blank">map.geo.admin.ch</a>
            </h2>
            <div v-if="!store.embedded" class="menu" :class="{ show: showMenu }">
                <div v-for="item in store.menu" :key="item.id" class="mx-3 mb-4">
                    <div class="category mb-1">
                        {{ item.title }}
                    </div>
                    <div
                        v-for="child in item.children"
                        :key="child.id"
                        class="menu-link"
                        :class="{ active: currentId === child.id }"
                    >
                        <router-link
                            :to="`/?ids=${child.id}&lang=${currentLang}`"
                            @click.native="onMenuItemClick"
                        >
                            {{ child.title }}
                        </router-link>
                    </div>
                </div>
            </div>
            <router-view class="help-content" />
        </div>

        <div v-if="!store.embedded" class="my-3 small text-center">
            <p>
                Karten der Schweiz - Cartes de la Suisse :
                <a href="https://map.geo.admin.ch" target="_blank">map.geo.admin.ch</a>
                &nbsp;|&nbsp; das Geoportal des Bundes - le géoportail fédéral :
                <a href="https://www.geo.admin.ch" target="_blank">www.geo.admin.ch</a>
                &nbsp;|&nbsp;
                <a :href="termOfUse.url" target="_blank">
                    {{ termOfUse.text }}
                </a>
            </p>
        </div>
    </div>
</template>

<script>
import store from './store'
import axios from 'axios'

function applyUrlParamsToStore(urlParams) {
    if (urlParams.lang) {
        store.setLang(urlParams.lang)
    }
    if (urlParams.id) {
        store.setIds([urlParams.id])
    } else if (urlParams.ids) {
        store.setIds(urlParams.ids.split(','))
    }
    store.setEmbedded(!!urlParams.embedded)
}

const headerMessages = {
    en: 'Mapviewer Help',
    de: 'Hilfe Kartenviewer',
    fr: 'Aide visualiseur de cartes',
    it: 'Aiuto visualizzatore di carte',
}
const termsOfUses = {
    en: {
        text: 'Terms of Use',
        url: 'https://www.geo.admin.ch/en/general-terms-of-use-fsdi/',
    },
    de: {
        text: 'Nutzungsbedingungen',
        url: 'https://www.geo.admin.ch/de/allgemeine-nutzungsbedingungen-bgdi/',
    },
    fr: {
        text: 'Conditions d’utilisation',
        url: 'https://www.geo.admin.ch/fr/conditions-generales-utilisation-ifdg/',
    },
    it: {
        text: 'Condizioni di utilizzo',
        url: 'https://www.geo.admin.ch/it/condizioni-generali-di-utilizzo-ifdg/',
    },
}

export default {
    data() {
        return {
            store,
            showMenu: false,
        }
    },
    computed: {
        headerMessage() {
            return headerMessages[store.lang]
        },
        currentId() {
            return store.wantedIds.length === 1 ? store.wantedIds[0] : null
        },
        currentLang() {
            return store.lang
        },
        termOfUse() {
            return termsOfUses[this.currentLang]
        },
    },
    mounted() {
        console.log('app is mounted')
        // detecting navigator's locale as the default language
        // (if it is a language served by this app)
        let matchedLanguage = null
        if (navigator.languages) {
            // we keep the first match we found
            matchedLanguage = navigator.languages.find((lang) =>
                store.possibleLanguages.includes(lang)
            )
        }

        // default to user navigator's lang
        store.setLang(matchedLanguage || 'en')
        this.loadData()

        // gathering URL params
        applyUrlParamsToStore(this.$route.query)
    },
    methods: {
        async loadData() {
            store.setMenu((await axios.get(`./menu.${this.currentLang}.json`)).data)
            store.setHelpItems((await axios.get(`./help.${this.currentLang}.json`)).data)
        },
        toggleMenu() {
            this.showMenu = !this.showMenu
        },
        onMenuItemClick() {
            this.toggleMenu()
            window.scrollTo(0, 0)
        },
    },
    watch: {
        $route(to, _) {
            applyUrlParamsToStore(to.query)
        },
        currentLang() {
            this.loadData()
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'style/variables.scss';
@import 'bootstrap/scss/bootstrap-grid.scss';

$z-index-menu: 10;

.app-container {
    &:not(.embedded) {
        max-width: 1000px;
    }
}
.lang-menu {
    position: relative;
    z-index: $z-index-menu + 1;
}
.content {
    .title {
        grid-row-start: 1;
    }
    .menu {
        visibility: hidden;
        position: absolute;
        top: -100%;
        transition: visibility 0s, top 0.2s ease-out;
        &.show {
            visibility: visible;
            background: $light;
            width: 100%;
            left: 0;
            top: 100px;
            z-index: $z-index-menu;
            padding: -100px 25px 25px;
            border-bottom: 1px $gray-400 solid;
            box-shadow: 0 2rem 2rem rgba(0, 0, 0, 0.175);
        }
        .category {
            color: $help_blue;
        }
        a {
            color: $help_darkgray !important;
            text-decoration: none !important;
        }
        a:focus,
        a:hover {
            color: $help_darkgray !important;
            text-decoration: none !important;
        }
        .menu-link.active {
            position: relative;
            a {
                color: $help_red !important;
            }
            &::before {
                content: url('/img/arrow.png');
                color: $help_red;
                position: absolute;
                top: -1px;
                left: -10px;
            }
        }
    }
}
@include media-breakpoint-up(md) {
    .content {
        grid-gap: 10px;
        grid-template-columns: 1fr 2fr;
        .menu {
            position: relative;
            visibility: visible;
            top: 0 !important;
            transition: none;
            display: block;
            grid-row-start: 2;
            &.show {
                visibility: visible;
                background: none;
                width: auto;
                left: 0;
                top: 0;
                z-index: $z-index-menu;
                padding: 0;
                border-bottom: none;
            }
        }
        .help-content {
            grid-row-start: span 2;
        }
    }
}
</style>
