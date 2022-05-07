const { defineConfig } = require('@vue/cli-service')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: 'http://localhost:8003/',

  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'switch_symbol',
        filename: 'remoteEntry.js',
        remotes: {
          shell: 'shell@http://localhost:8002/remoteEntry.js',
        },
        exposes: {
          './SwitchSymbol': './src/components/SwitchSymbol'
        },
        shared: require('./package.json').dependencies,
      }),
    ],
  },
  

  devServer: {
    port: 8003
  }
})
