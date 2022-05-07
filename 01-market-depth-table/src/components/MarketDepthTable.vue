<template>
  <div class="order-book">
    <LoadingComp v-if="loading"/>

    <PricesTable v-bind="{ prices: asks, type: 'asks' }"/>

    <PricesTable v-bind="{ prices: bids, type: 'bids' }"/>
  </div>
</template>

<script>

import LoadingComp from './LoadingComp.vue'

import PricesTable from './PricesTable.vue'
import { Binance } from 'shell/Binance'
import { BinanceSymbolsResponse } from 'shell/BinanceSymbolsResponse'

export default {
  name: 'MarketDepthTable',

  components: {
    PricesTable,
    LoadingComp
  },
  
  data() {
    return {
      loading: false,
      symbol: BinanceSymbolsResponse.data.find(s => s.base === 'BNB'),    
      asks: {},
      bids: {}
    }
  },


  async mounted() {
    this.loading = true;

    const depthSnapshot = await Binance.startFetchData(this.resultingSymbol)
    this.prepareTable(depthSnapshot)

    this.loading = false;

    Binance.on('event', this.updateState)
  },

  watch: {
    "$store.state.event": function() {      
      this.symbol = this.$store.state.event
    }
  },

  methods: {
     arrayToObject(arr, key) {
       for (let item of arr) {
        this.$set(this[key],item[0], item[1])
       }
     },

    updateItem(value, key) {
      if (this[key][value[0]]) {
        this[key][value[0]] = value[1]
      }
    },

    updateState(event) {

      console.log('udpate state')

      if (!this.bids || !this.asks) {
        return
      }
      
      const { data: { b , a } } = event;

      for (let ask of a ) {
        this.updateItem(ask, 'asks')
      }

      for (let bid of b) { 
        this.updateItem(bid, 'bids')
      }
    },

    prepareTable(data) {
      const { asks, bids } = data
      this.arrayToObject(asks, 'asks')
      this.arrayToObject(bids, 'bids')
    }
  }
}

</script>


<style scoped>

.order-book {
  display: flex;
  /* flex: 1; */
  min-height: 100%;
  max-height: 100%;
  overflow: hidden;
}

.order-book .prices-container {
  overflow-y: scroll;
}
</style>
