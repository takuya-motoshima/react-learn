# Without Create React App
Create a react app without using libraries or frameworks such as "create-react-app" or "NextJS".

## Composition
```text
.
|- .babelrc
|- package-lock.json
|- package.json
|- webpack.config.js
|- public
|  |- index.html
|  `- dist
|     `- app.js
`-src
  |- App.js
  `- index.js
```

## Getting Started
1. Create a project folder of any name and navigate to the folder and then use npm init to create a package.json file inside the folder. Navigate to the folder.
    ```sh
    npm init -y
    ```
1. Install webpack dependencies.
    ```sh
    npm i --D webpack webpack-cli webpack-dev-server
    ```
    - webpack — Will allow us to bundle all of our code into a final build
    - webpack-cli — CLI tool for providing a flexible set of commands for developers to increase speed when setting up a custom webpack project. If you’re using webpack v4 or later and want to call webpack from the command line, you need this
    - webpack-dev-server — Webpack dev server is a mini Node.js Express server.It uses a library called SockJS to emulate a web socket. Will enable us to create a localhost dev environment
1. Install the Babel dependencies.
    ```sh
    npm i --D \
        babel-loader \
        @babel/preset-env \
        @babel/core \
        @babel/plugin-transform-runtime \
        @babel/preset-react
    ```
    - babel-loader — allows transpiling JavaScript files using babel and webpack. exposes a loader-builder utility that allows users to add custom handling of Babel’s configuration for each file that it processes.
    - @babel/preset-env — allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This both makes your life easier and JavaScript bundles smaller!
    - @babel/core — core package
    - @babel/plugin-transform-runtime — A plugin that enables the re-use of Babel’s injected helper code to save on codesize.
    - @babel/preset-react — use react preset when we are using Reactjs. Helps in converting html files to react based file
1.  Install react and react-dom.
    ```sh
    npm i react react-dom
    ```
1. Create index.html file.  
    Create folder called "public" in the root of the project. Inside that, create index.html.
    ```sh
    mkdir public
    tpuch public/index.html 
    ```

    Add the following code to index.html:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Without Create React App</title>
    </head>
    <body>
        <div id="root"></div>
        <!-- The output file of webpack config-->
        <script src="dist/app.js"></script>
    </body>
    </html>
    ```
1. Create src folder and inside that create a file called App.js.  
    Add the following code to it:
    ```js
    import React from 'react';

    export default () => {
      return (
        <h1>Hello World!</h1>
      )
    }
    ```
1. Create index.js file.  
    Create an index.js file in the src directory. This will serve as the entry point for webpack.  
    Add the following code to it
    ```js
    import React from 'react';
    import reactDom from 'react-dom';
    import App from './App';

    reactDom.render(<App />, document.getElementById('root'));
    ```
1. Create webpack.config.js file.
    Create a file called webpack.config.js at the root of project and add the following code.  
    On a higher note, this file contains configs that takes care of bundling the files into one single file and setting up the dev server.  
    ```js
    const path = require('path');

    module.exports={
      // mode: the environment - development, production, none. tells webpack to use its built-in optimizations accordingly. default is production 
      mode: 'development', 
      // entry: the entry point 
      entry: './src/index.js', 
      output: {
        // path: the folder path of the output file 
        path: path.join(__dirname, 'public/dist'),
        // filename: the name of the output file 
        filename: 'app.js'
      },
      // target: setting "node" as target app (server side), and setting it as "web" is for browser (client side). Default is "web"
      target: 'web',
      devServer: {
        // port: * port of dev server
        port: '3000',
        // static: This property tells Webpack what static file it should serve
        static: ['./public'],
        // open: * opens the browser after server is successfully started
        open: true,
        // hot: enabling and disabling HMR. takes "true", "false" and "only". "only" is used if enable Hot Module Replacement without page refresh as a fallback in case of build failures
        hot: true ,
        // liveReload: disable live reload on the browser. "hot" must be set to false for this to work
        liveReload: true
      },
      resolve: {
        // extensions: If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest. This is what enables users to leave off the extension when importing
        extensions: ['.js','.jsx','.json'] 
      },
      module: {
        // When you come across a path that resolves to a '.js or .jsx' file inside of a require()/import statement, use the babel-loader to transform it before you add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from being searched.
        rules: [
          {
            //kind of file extension this rule should look for and apply in test
            test: /\.(js|jsx)$/,
            // folder to be excluded
            exclude: /node_modules/,
            // loader which we are going to use
            use: 'babel-loader'
          }
        ]
      }
    }
    ```
1. Create .babelrc file.
    Create a file called .babelrc at the root and add the following code.  
    This is the configuration file for Babel, and you’ll use it to tell babel to use the plugin and presets defined inside.
    ```json
    {
      /* a preset is a set of plugins used to support particular language features. The two presets Babel uses by default: es2015, react */
      "presets": [
        "@babel/preset-env", //compiling ES2015+ syntax
        "@babel/preset-react" //for react
      ],
      /* Babel's code transformations are enabled by applying plugins (or presets) to your configuration file. */
      "plugins": [
        "@babel/plugin-transform-runtime"
      ]
    }
    ```
1. Update package.json file.  
    Add start and build scripts.
    * The start script asks to run the webpack-dev-server in our current project at port 3000, from the public folder.
    * The build command asks us to build this package in app.js file. It actually runs all logic in webpack.config.js file.
    ```json
    "scripts": {
      "start": "webpack-dev-server .",
      "build": "webpack ."
    },
    ```

    Set the entry point JS in the main field.  
    This must not conflict with entry in webpack.config.js.
    ```json
    "main": "src/index.js",
    ```
1. Run "npm run build".  
    Once added the above code, hit npm run build. it generates app.js file in our public/dist folder.
    ```sh
    npm run build
    ```
1. Run "npm start".  
    Start the application by giving npm start from terminal.  
    This will start our dev server.
    ```sh
    npm start
    ```
1. Access "http://localhost:3000" from your browser; you should see the React screen.  
    For the port number of the URL, use the port number set in devServer in webpack.config.js.