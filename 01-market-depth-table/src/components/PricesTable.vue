<template>
  <div class="prices-container">
    <div class="prices-header-container">
      {{ type }}
      <div class="prices-header">

        <div class="column" :key="col" v-for="col in columns">
          {{ col }} ({{ titles[col] }})
        </div>
      </div>
    </div>

    <div class="prices-inner-container">
      <div class="prices-item" :key="key" v-for="(value, key) in prices">
        <div class="column" > {{ key }} </div>
        <div class="column" > {{ value }} </div>
        <div class="column" > {{ (Number(key) * Number(value)).toFixed(5) }} </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  props: {
    type: {
      type: String,
      default: 'asks'
    },

    prices: {
      type: Object,
      required: true
    },

    symbol: {
      type: Object,
      required: true
    },
  },

  data() {
    return {
      columns: ['price', 'amount', 'total']
    }
  },

  computed: {
    // totalTotal() {
    //   const length = Object.keys(this.prices).length
    //   return Object.entries(this.prices).reduce((acc, [key, value]) => acc + Number(key) * Number(value), 0)/length
    // },

    // price() {
    //    const length = Object.keys(this.prices).length
    //   return Object.values(this.prices).reduce((acc, val) => acc + Number(val), 0)/length
    // },

    // values() {
    //   return {
    //     total: this.totalTotal ? this.totalTotal.toFixed(6) : 0,
    //     price: this.price ? this.price.toFixed(6) : 0,
    //   }
    // }
    
    titles() {
      return {
        price: this.symbol.quote,
        amount: this.symbol.base,
        total: 'Total'
      }
    }
  }

}
</script>

<style scoped>
.prices-header-container {
  position: sticky; top: 0;
  background: white;
}

.prices-header {
  display: flex;
}

.prices-header .column {
  width: 150px;
}


.prices-item {
  display: flex;
  flex-direction: row;
}

.prices-item .column {
  width: 150px;
}
</style>