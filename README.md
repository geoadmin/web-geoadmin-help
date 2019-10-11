web-geoadmin-help
-----------------


## Developing

Checkout the project and inside it run
````
npm install
````

If you want to develop on your local machine, you can start a local dev server by running
````
npm run start:dev
````
The server will run on port `9000` (you will need to have run `npm install` once before)

## Building

This project uses webpack to bundle all dependencies (downloaded by `npm` into a single file).
There's to stagging or build possible, `development` or `production`

#### Development grade build
run (after at least one `npm install`)
````
webpack --mode development
````
And the content of `/dist` will be the webapp without minification.

#### Production grade build
By default, webpack uses production mode, so you can simply run
````
webpack
````
And the `/dist` folder will be our webapp ready for deploy

##Deploying

TODO