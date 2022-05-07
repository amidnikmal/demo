<template>
  <div id="app">

    <div class="app-header">


      <div class="title">
        {{ symbol ? symbol.symbol : '' }}
        
      </div>
      <div class="controls">
        <div class="switch" :class="{active: visiblePage ==='market_depth_table'}" @click="onClick('market_depth_table')">Bids/Asks</div>
        <div class="switch" :class="{active: visiblePage ==='switch_symbol'}" @click="onClick('switch_symbol')">Change Pair</div>
      </div>
    </div>

    <div class="content">
      <SwitchSymbol v-show="this.visiblePage == 'switch_symbol'" />
      <MarketDepthTable v-show="this.visiblePage == 'market_depth_table'" />
    </div>

  </div>
</template>

<script>


import SwitchSymbol from 'switch_symbol/SwitchSymbol'
import MarketDepthTable from 'market_depth_table/MarketDepthTable'
import { BinanceSymbolsResponse } from './BinanceSymbolsResponse'

export default {
  components: {
    MarketDepthTable,
    SwitchSymbol
  },

  data() {
    return {
      symbol:  BinanceSymbolsResponse.data.find(s => s.base === 'BNB'),

      // [ 'switch_symbol', 'market_depth_table' ]
      visiblePage: 'market_depth_table'
    }
  },

  watch: {
    "$store.state.event": function() {
      this.symbol = this.$store.state.event.event.symbol
    }
  },

  methods: {
    onClick(page) {
      this.visiblePage = page
    }
  }
}

</script>


<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app-header {
  display: flex;
}

.app-header .title {
  font-size: 16px;
}

.app-header .controls  {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.app-header .controls .switch {
  padding: 10px 16px;

  border: 1px solid blue;
  border-radius: 10px;
  cursor: pointer;
}

.app-header .controls .switch:not(:last-child) {
  margin-right: 10px;
}

.app-header .switch.active {
  background: blue;
  color: white;
}
</style>


