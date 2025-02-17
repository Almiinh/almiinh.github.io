npm init -y

## Install Webpack: one of the most popular JavaScript bundlers
npm install --save-dev webpack webpack-cli

## Add Webpack HTML Handling Plugin
npm install --save-dev html-webpack-plugin

## Add Webpack CSS Plugin
npm install --save-dev style-loader css-loader

## Add HTML Image Loader
npm install --save-dev html-loader

```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```

## Add Webpack Dev Server
npm install --save-dev webpack-dev-server

## Build Webpack
npx webpack

## Serve Webpack
npx webpack serve