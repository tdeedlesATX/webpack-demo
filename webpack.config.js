const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");

const parts = require("./webpack.parts");

const shouldExtractCSS = !!process.env.EXTRACT_CSS

const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build"),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: "[name].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack demo",
      }),
    ],
  },
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', 'less-loader']
  })
]);

const developmentConfigStyles = shouldExtractCSS 
? parts.extractCSS({
    use: ['css-loader', 'less-loader'],
    hot: true
  })
: parts.loadStyles();

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
    hot: shouldExtractCSS
  }),
  developmentConfigStyles,
]);

module.exports = env => {
  if (env === "production") {
    return merge(commonConfig, productionConfig);
  }

  return merge(commonConfig, developmentConfig);
};