var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
       alias: {
            vue: 'vue/dist/vue.min.js' 
        } 
    },
    module: {
        rules: [
          {
            test: /\.vue$/,
            loader: [ 'vue-loader']
          }
        ]
      },
      plugins: [
        new VueLoaderPlugin()
      ]

};