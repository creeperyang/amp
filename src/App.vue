<template>
  <div id="app">
    <player :musicList="state.musicList" :initialIndex="0" v-on:error="this.onError"/>
    <transition name="slide-fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Player from '@/components/Player'
import store from '@/store'

export default {
  name: 'app',
  data () {
    return {
      state: store.state
    }
  },
  created () {
    console.log(this)
    this.$watch('state.error', (now, prev) => {
      if (now !== prev) {
        this.$router.push({
          path: now ? '/error' : '/'
        })
      }
    })
  },
  methods: {
    onError (e) {
      store.setError(e)
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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
