<template>
  <div class="load-container">

       <CatSpinner class="cat-spiner"/>

    <div class="loading">
    </div>

 

  </div>
</template>


<script>
import CatSpinner from './CatSpinner'


export default {
  components: {
    CatSpinner
  },
}

</script>

<style scoped>

.load-container {
  display: contents;
}

.cat-spiner {
  position: absolute;
  z-index: 5000;
  left: 40%;
  bottom: 43%;
  transform: scale(1.4);
}

.loading {
  z-index: 1000;

  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  background: blue;

  opacity: 5%;
}
</style>