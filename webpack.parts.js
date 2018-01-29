const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port, hot} = {hot: true}) => ({
  devServer: {
    stats: {
      colors: true,
      chunkModules:false,
      cached: false,
      cachedAssets: false,
    },
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

exports.extractCSS = ({include, exclude, use, hot}) => {
  // output extracted CSS to a file
  const extractTextPlugin = new ExtractTextPlugin({
    // `allChunks` is needed with CommonsChunkPlugin to 
    // extract from extracted chunks as well.
    allChunks: true,
    filename: 'styles/[name].css',
  });

  
  
  return {
    module: {
      rules: [
        {
          test: /\.less$/,
          include,
          exclude,
          use: ['css-hot-loader'].concat(extractTextPlugin.extract({
            use,
            fallback: "style-loader",
          })),
        },
      ],
    },
    plugins: [extractTextPlugin],
  };
}