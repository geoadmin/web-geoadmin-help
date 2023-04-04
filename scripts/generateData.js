#!/usr/bin/env node

const fs = require('fs')
const { google } = require('googleapis')

const googleApiKey = 'AIzaSyDTp5iwOQzABZdnTD1t1C3546SV8I-7B7k'
const spreadsheetId = '15JQBRjkLi7ZUvE8v76doc-Mq0eXVGihksylfGScAHNM'

const sheets = google.sheets({ version: 'v4', auth: googleApiKey })
sheets.spreadsheets.values.get(
    {
        spreadsheetId,
        range: "A2:J217",
        majorDimension: "ROWS"
    }, (err, res) => {
        if (err) {
            console.log('The API returned an error', err)
            return -1
        }
        const langs = {}
        let lastMenuId = null;
        res.data.values.forEach(row => {
            const id = row[0],
                title = row[1],
                content = row[2],
                lang = row[5];
            // separating menu items from help items (menu items have a content set to '#')
            if (!langs[lang]) {
                langs[lang] = {
                    menu: {},
                    items: {}
                };
            }
            if (content === '#') {
                langs[lang].menu[id] = {
                    id: id,
                    title: title,
                    children: []
                };
                lastMenuId = id;
            } else {
                langs[lang].items[id] = {
                    id: id,
                    title: title,
                    content: content,
                    legend: row[3],
                    image: row[4],
                    isHomepage: id === '01'
                };
                // adding a menu entry for this help item
                if (lang && lastMenuId && langs[lang].menu[lastMenuId]) {
                    langs[lang].menu[lastMenuId].children.push({
                        id: id,
                        title: title
                    })
                }
            }

        });
        Object.keys(langs).forEach((lang) => {
            fs.writeFileSync(`public/menu.${lang}.json`, JSON.stringify(langs[lang].menu, null, '\t'))
            fs.writeFileSync(`public/help.${lang}.json`, JSON.stringify(langs[lang].items, null, '\t'))
        })
        console.log('done')
    }
)
