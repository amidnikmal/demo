<template>
  <div class="switch-symbol-container">
    <select v-model="symbol">
      <option :key="s.id" :value="s" v-for="s in symbols"> {{ s.symbol }} </option>
    </select>

    result: {{ symbol }}
  </div>
</template>

<script>


import { BinanceSymbolsResponse } from 'shell/BinanceSymbolsResponse'

export default {
  name: 'SwitchSymbol',

  data() {
    return {
      symbol: BinanceSymbolsResponse.data.find(s => s.base === 'BNB'),
      symbols: BinanceSymbolsResponse.data,
    }
  },

  mounted() {
    this.$store.commit("setEvent", { topic: 'symbolChange', event: { symbol: this.symbol } })
  },

  watch: {
    symbol: function() {
      this.$store.commit("setEvent", { topic: 'symbolChange', event: { symbol: this.symbol } })
    }
  }

}
</script>

