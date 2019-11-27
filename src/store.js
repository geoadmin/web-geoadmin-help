import Vue from 'vue';

const store = Vue.observable({
    ready: false,
    embedded: false,
    menu: {},
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
        // sorting menu by IDs value (don't know why they are shuffled...)
        const orderedMenu = [];
        Object.keys(menu).forEach(key => {
            orderedMenu.push(menu[key]);
        });
        orderedMenu.sort((a,b) => a['en'].id > b['en'].id ? 1 : -1);
        store.menu = orderedMenu;
    },
    toggleMenu() {
        store.menuOpened = !store.menuOpened;
    }
});

export default store;
