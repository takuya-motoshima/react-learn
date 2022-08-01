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