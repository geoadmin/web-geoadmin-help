import 'bootstrap'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import '../style/styles.scss'

import Vue from 'vue';

import router from "./router";
import store from "../store";

// init Google API and loading helpItems from spreadsheet
const gapiScript = document.createElement('script');
gapiScript.src = 'https://apis.google.com/js/api.js?onload=onGapiLoad';
window.onGapiLoad = function onGapiLoad() {
    gapi.load('client', () => {
        gapi.client.init({
            'apiKey': 'AIzaSyDTp5iwOQzABZdnTD1t1C3546SV8I-7B7k',
            'discoveryDocs': ['https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest'],
            'scope': 'profile'
        })
            .then(
                () => {
                    gapi.client.sheets.spreadsheets.values.get({
                        "spreadsheetId": "15JQBRjkLi7ZUvE8v76doc-Mq0eXVGihksylfGScAHNM",
                        "range": "A1:J217",
                        "majorDimension": "ROWS"
                    })
                        .then(data => {
                            const helpItems = {};
                            const menuItems = {};
                            let lastMenuId = null;
                            data.result.values.forEach(row => {
                                const id = row[0],
                                      title = row[1],
                                      content = row[2],
                                      lang = row[5];
                                // separating menu items from help items (menu items have a content set to '#')
                                if (content === '#') {
                                    if (!menuItems[id]) {
                                        menuItems[id] = [];
                                    }
                                    menuItems[id][lang] = {
                                        id: id,
                                        title: title,
                                        children: []
                                    };
                                    lastMenuId = id;
                                } else {
                                    if (!helpItems[id]) {
                                        helpItems[id] = [];
                                    }
                                    helpItems[id][lang] = {
                                        id: id,
                                        title: title,
                                        content: content,
                                        legend: row[3],
                                        image: row[4],
                                        isHomepage: () => id === '01'
                                    };
                                    // adding a menu entry for this help item
                                    if (lastMenuId && menuItems[lastMenuId][lang]) {
                                        menuItems[lastMenuId][lang].children.push({
                                            id: id,
                                            title: title
                                        })
                                    }
                                }

                            });
                            store.setHelpItems(helpItems);
                            store.setMenu(menuItems);
                        })
                },
                error => console.error('Error while loading helpItems from GoogleAPI', error)
            )
    });
};
document.body.appendChild(gapiScript);

new Vue({
    router,
    template: `<router-view class="view"></router-view>`
}).$mount('#app');
