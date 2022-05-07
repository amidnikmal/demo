const { defineConfig } = require('@vue/cli-service')

const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: 'http://localhost:8002/',

  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'shell',
        filename: 'remoteEntry.js',
        remotes: {
          market_depth_table: 'market_depth_table@http://localhost:8001/remoteEntry.js',
          switch_symbol: 'switch_symbol@http://localhost:8003/remoteEntry.js',
          shell: 'bus@http://localhost:8002/remoteEntry.js'
        },
        exposes: {
          './store': './src/store',
          './Binance': './src/Binance',
          './BinanceSymbolsResponse': './src/BinanceSymbolsResponse'
        },
        shared: require('./package.json').dependencies,
      }),
    ],
  },

  devServer: {
    port: 8002
  }
})
