# web-geoadmin-help

This is the help for https://map.geo.admin.ch

There's two use cases for this webapp, one is to serve the help through a website (https://help.map.geo.admin.ch) and the other is to be embedded into an `iframe` in https://map.geo.admin.ch

Here is a list of all URL param to achieve this :

| Param | Default value | Note |
|:---:|:---:|---|
| ids | `01` | List of IDs (separated by `,`) of help items from the Google Spreadsheet |
| lang | `en` | Language to be used, possible values are `en`, `de`, `fr` and `it` |
| embedded | `false` | Flag that tells the app how to serve the help. If embedded, the side menu and language selector will be removed, and the content will take the whole page (no image background and centered content) |

### Developing

Checkout the project and inside it run
````
npm install
````

If you want to develop on your local machine, you can start a local dev server by running
````
npm run start:dev
````
The server will run on port `9000` (you will need to have run `npm install` once before)

### Building

This project uses webpack to bundle all dependencies (downloaded by `npm` into a single file).
There's to stagging or build possible, `development` or `production`

##### Development grade build
run (after at least one `npm install`)
````
webpack --mode development
````
And the content of `/dist` will be the webapp without minification.

##### Production grade build
By default, webpack uses production mode, so you can simply run
````
webpack
````
And the `/dist` folder will be our webapp ready for deploy

### Deploying

After running a `npm install` run

```
npm run deploy
```

This will use your AWS `[default]` profile stored in `~/.aws/credentials` to deploy to AWS S3 (bucket `help.geo.admin.ch`), make sure that it is set prior to run this command.
