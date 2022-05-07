<template>
  <div id="app">
    <MarketDepthTable />
  </div>
</template>


<script>
import MarketDepthTable from './components/MarketDepthTable'


export default {
  components: {
    MarketDepthTable
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
