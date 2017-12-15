<template>
  <div class="ctrl-container">
    <svg class="ctrl-icon icon-skip-back" v-on:click="switchMusic(-1)">
      <use xlink:href="#icon-skip-back"></use>
    </svg>
    <svg class="ctrl-icon icon-play" v-if="!playing" v-on:click="playOrPauseMusic">
      <use xlink:href="#icon-play"></use>
    </svg>
    <svg class="ctrl-icon icon-play" v-else v-on:click="playOrPauseMusic">
      <use xlink:href="#icon-pause"></use>
    </svg>
    <svg class="ctrl-icon icon-skip-forward" v-on:click="switchMusic(1)">
      <use xlink:href="#icon-skip-forward"></use>
    </svg>
  </div>
</template>

<style scoped>
.ctrl-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.ctrl-icon {
  fill: #f0f0f0;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.ctrl-icon:hover {
  fill: #fff;
  transform: scale3d(1.1, 1.1, 1.1);
}
.icon-play {
  width: 44px;
  height: 44px;
  margin: 16px 30px;
}
</style>


<script>
export default {
  name: 'controller',
  data () {
    return {
      playing: true
    }
  },
  methods: {
    playOrPauseMusic () {
      this.playing = !this.playing
      this.$emit(this.playing ? 'play' : 'pause')
    },
    switchMusic (delta) {
      this.$emit(delta > 0 ? 'next' : 'prev')
    }
  }
}
</script>
