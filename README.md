# Redux Adaptation for flux-todomvc tutorial 

You can find the original project [here](https://github.com/facebook/flux/tree/master/examples/flux-todomvc/)<br>
This project is a Redux adaptation of [this project](https://github.com/EdgarArguelles/react-es6-flux-ToDo) (only replacing Browserify for Webpack and Jest for Mocha)

# Stack:
- React with ECMAScript 6
- Redux
- Webpack
- Babel
- Eslint
- Karma / Mocha
- Sass
- Gulp
- Npm

## Gulp Build tasks:
- evaluate JS code via Eslint
- test JS code via Karma / Mocha
- compile ES6 via Babel
- compile Sass into css code
- bundle JS and CSS files
- uglify JS (only in production-ready)
- migrates the built app and assets to the dist folder
- runs a dev webserver
- opens your browser at the dev URL
- reloads the browser upon save

# Global Install
    npm i gulp gulp-cli webpack webpack-dev-server -g

# Install
    npm i

# Build
    gulp build
    
# Run
    gulp