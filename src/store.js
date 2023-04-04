import { reactive } from 'vue'

const store = reactive({
    ready: false,
    embedded: false,
    menu: {},
    menuOpened: false,
    helpItems: [],
    lang: 'en',
    possibleLanguages: ['en', 'de', 'fr', 'it'],
    helpItemsMatchingWantedIds: [],
    wantedIds: ['01'],
    setHelpItems(data) {
        this.helpItems = data
        this.filterHelpItemsWithWantedIds()
        this.ready = true
    },
    setIds(ids) {
        this.wantedIds = [...ids]
        this.filterHelpItemsWithWantedIds()
    },
    async setLang(lang) {
        if (this.possibleLanguages.includes(lang)) {
            this.lang = lang
        } else {
            console.debug('unrecognized lang, will not load')
        }
    },
    filterHelpItemsWithWantedIds() {
        this.helpItemsMatchingWantedIds = []
        this.wantedIds.forEach((oneId) => {
            if (this.helpItems[oneId]) {
                this.helpItemsMatchingWantedIds.push(this.helpItems[oneId])
            }
        })
    },
    setEmbedded(embedded) {
        this.embedded = embedded
    },
    setMenu(menu) {
        // sorting menu by IDs value (don't know why they are shuffled...)
        const orderedMenu = []
        Object.keys(menu).forEach((key) => {
            orderedMenu.push(menu[key])
        })
        orderedMenu.sort((a, b) => (a.id > b.id ? 1 : -1))
        this.menu = orderedMenu
    },
    toggleMenu() {
        this.menuOpened = !this.menuOpened
    },
})

export default store
