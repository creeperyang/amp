<template>
  <div id="app">
    <player :musicList="musicList" :initialIndex="0"/>
    <router-view/>
  </div>
</template>

<script>
import Player from '@/components/Player'
import store from '@/store'

export default {
  name: 'app',
  data () {
    return {
      musicList: store.state.musicList
    }
  },
  components: {
    Player
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: rgb(32, 31, 74)
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  margin: auto;
}
</style>
