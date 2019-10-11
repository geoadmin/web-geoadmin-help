import Vue from 'vue';

const store = Vue.observable({
    ready: false,
    embedded: false,
    menu: [],
    menuOpened: false,
    helpItems: [],
    lang: 'en',
    helpItemsMatchingWantedIds: [],
    wantedIds: ['01'],
    setHelpItems: (data) => {
        store.helpItems = data;
        store.filterHelpItemsWithWantedIds();
        store.ready = true;
    },
    setIds: (ids) => {
        store.wantedIds = [...ids];
        store.filterHelpItemsWithWantedIds();
    },
    setLang: (lang) => {
        store.lang = lang;
    },
    filterHelpItemsWithWantedIds: () => {
        store.helpItemsMatchingWantedIds = [];
        store.wantedIds.forEach(oneId => {
            if (store.helpItems[oneId]) {
                store.helpItemsMatchingWantedIds.push(store.helpItems[oneId]);
            }
        });
    },
    setEmbedded(embedded) {
        store.embedded = embedded;
    },
    setMenu(menu) {
        store.menu = menu;
    },
    toggleMenu() {
        store.menuOpened = !store.menuOpened;
    }
});

export default store;
