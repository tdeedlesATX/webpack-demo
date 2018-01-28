exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: "errors-only",
    host, // Defaults to `localhost`
    port, // Defaults to 8080
    overlay: {
      errors: true,
      warnings: true,
    },
  },
});

exports.loadStyles = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.less$/,
        include,
        exclude,
        use: [
          // creates style nodes from JS strings
          "style-loader",
          // translates CSS into CommonJS 
          "css-loader", 
          // compiles Less to CSS 
          "less-loader"
          ],
      },
    ],
  },
});