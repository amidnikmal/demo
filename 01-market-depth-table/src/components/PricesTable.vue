<template>
  <div class="prices-container">
    <div class="prices-header">
    </div>

    <div class="prices-inner-container">
      <div class="prices-item" :key="key" v-for="(value, key) in prices">
        {{ key }} => {{ value }} => {{ Number(key) * Number(value) }}
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
    }
  }
}
</script>

<style scoped>

</style>