<template>
  <div class="cover">
    <img v-if="imgUrl" :src="imgUrl" />
    <loader v-else />
  </div>
</template>

<style lang="postcss" scoped>
.cover {
  position: relative;
  width: 240px;
  height: 240px;
}
.cover img {
  width: 240px;
  height: 240px;
  display: block;
  border: none;
  border-radius: 120px;
  box-shadow: 0px 0px 2px 3px #0b0a31;
  transform: scale3d(0.82, 0.82, 1);
}
</style>

<script>
import Loader from './Loader'

function convertUint8ArrayToBase64 (bytes) {
  // prevent Maximum call stack size exceeded
  const chunkSize = 0x8000
  let index = 0
  let length = bytes.length
  let result = ''
  let slice
  while (index < length) {
    slice = bytes.slice(index, Math.min(index + chunkSize, length))
    result += String.fromCharCode.apply(null, slice)
    index += chunkSize
  }
  return btoa(result)
}

export default {
  name: 'cover',
  props: ['data', 'mime'],
  methods: {},
  computed: {
    imgUrl () {
      if (this.data instanceof Uint8Array) {
        return `data:${this.mime};base64,${convertUint8ArrayToBase64(this.data)}`
      }
      return this.data
    }
  },
  components: {
    Loader
  }
}
</script>

