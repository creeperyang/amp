<template>
  <div class="loader">
    <div class="loader__figure"></div>
  </div>
</template>

<style scoped>
.loader,
.loader__figure {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  overflow: visible;
  padding-top: 2em;
  height: 0;
  width: 2em;
}

.loader__figure {
  height: 0;
  width: 0;
  box-sizing: border-box;
  border: 0 solid rgb(204,161,49);
  border-radius: 50%;
  animation: loader-figure 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
}

@keyframes loader-figure {
  0% {
    height: 0;
    width: 0;
    background-color: rgb(204,161,49);
  }
  29% {
    background-color: rgb(204,161,49);
  }
  30% {
    height: 2em;
    width: 2em;
    background-color: transparent;
    border-width: 1em;
    opacity: 1;
  }
  100% {
    height: 2em;
    width: 2em;
    border-width: 0;
    opacity: 0;
    background-color: transparent;
  }
}
</style>

<script>
// https://codepen.io/a-guerrero/pen/XbyPEj
export default {
  name: 'loader'
}
</script>
