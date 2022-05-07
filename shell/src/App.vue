<template>
  <div id="app">

  <div class="app-header">
    header
    <button>Menu 1</button>
    <button>Menu 2</button>
  </div>


  <div class="content">
    <SwitchSymbol />
    <MarketDepthTable />
  </div>

  </div>
</template>

<script>



import SwitchSymbol from 'switch_symbol/SwitchSymbol'
import MarketDepthTable from 'market_depth_table/MarketDepthTable'


export default {
  components: {
    MarketDepthTable,
    SwitchSymbol
  },

  watch: {
    // "$store.state.event": function() {
    //   console.log('evnet has changd', this.$store.state.event)
    // }
  }
}

</script>


