<template>
    <div id="app" v-bind:class="{ 'standalone': !embedded }">

        <div id="header">
            <div id="top-menu">
                <button id="menu-dropdown-button" type="button" v-on:click="toggleMenu"></button>
                <lang-menu />
            </div>
            <div id="menu-dropdown-content" class="collapse" v-bind:class="{ 'show': menuOpened }">
                <h2 id="title">
                    <a href="https://map.geo.admin.ch" target="_self">map.geo.admin.ch</a>
                </h2>
                <menu-item  v-for="item in menuItems"
                            v-if="item"
                            v-bind:item="item[lang]"
                            v-bind:lang="lang"
                            v-bind:on-menu-item-click="toggleMenu" />
            </div>
            <div id="heading">
                <h2>{{ headerMessage }}</h2>
            </div>
        </div>

        <div v-if="loading" id="loading">
            <h4>{{ loadingMessage }}... <i class="fa fa-spin fa-spinner"></i></h4>
        </div>

        <div v-if="!loading" id="content">
            <help-item v-for="item in helpItems"
                       v-bind:key="item.id"
                       v-bind:item="item[lang]" />
        </div>

        <div v-if="!embedded" id="footer">
            <hr>
            <p>Karten der Schweiz - Cartes de la Suisse : <a href="https://map.geo.admin.ch" target="_blank">map.geo.admin.ch</a> | das Geoportal des Bundes - le géoportail fédéral : <a href="http://www.geo.admin.ch" target="_blank">www.geo.admin.ch</a> | <a href="http://www.geo.admin.ch/internet/geoportal/de/home/geoadmin/contact.html#copyright" target="_blank"> Copyright</a></p>
        </div>
    </div>
</template>

<script>
    import store from "../store";
    import HelpItem from "./HelpItem";
    import MenuItem from "./MenuItem";
    import LangMenu from "./LangMenu";

    function applyUrlParamsToStore(urlParams) {
        if (urlParams.lang) {
            store.setLang(urlParams.lang);
        }
        if (urlParams.ids) {
            store.setIds(urlParams.ids.split(','));
        }
        if (urlParams.embedded) {
            store.setEmbedded(urlParams.embedded);
        }
        console.log('URL params', urlParams);
    }

    const loadMessages = {
        'en': 'Loading',
        'de': 'Laden',
        'fr': 'Chargement',
        'it': 'Caricamento'
    };
    const headerMessages = {
        'en': 'Mapviewer Help',
        'de': 'Hilfe Kartenviewer',
        'fr': 'Aide visualiseur de cartes',
        'it': 'Aiuto visualizzatore di carte'
    };

    export default {
        components: {LangMenu, MenuItem, HelpItem },
        computed: {
            loading() {
                return !store.ready;
            },
            embedded() {
                return store.embedded;
            },
            helpItems() {
                return store.helpItemsMatchingWantedIds;
            },
            menuItems() {
                return store.menu;
            },
            wantedIds() {
                return store.wantedIds;
            },
            lang() {
              return store.lang;
            },
            loadingMessage() {
                return loadMessages[store.lang];
            },
            headerMessage() {
                return headerMessages[store.lang];
            },
            menuOpened() {
                return store.menuOpened;
            }
        },
        mounted() {
            // gathering URL params
            applyUrlParamsToStore(this.$route.query);
        },
        methods: {
          toggleMenu() {
              store.toggleMenu();
          }
        },
        watch: {
            $route(to, _) {
                applyUrlParamsToStore(to.query);
            }
        }
    };
</script>
