const { defineConfig } = require('@vue/cli-service')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: 'http://localhost:8001/',

  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'market_depth_table',
        filename: 'remoteEntry.js',
        remotes: {
          shell: 'shell@http://localhost:8002/remoteEntry.js',
        },
        exposes: {
          './MarketDepthTable': './src/components/MarketDepthTable'
        },
        shared: require('./package.json').dependencies,
      }),
    ],
  },
  

  devServer: {
    port: 8001
  }
})
