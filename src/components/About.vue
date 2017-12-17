<template>
  <notice :message="message" :img="img"/>
</template>

<script>
import Notice from '@/components/Notice'

export default {
  name: 'error',
  data () {
    return {
      message: '简单的播放器，just for fun<br/><span style="color:#2a2869;">作者是一个单身程序员，小姐姐随便抱走:-)</span>',
      img: require('../assets/m.jpg')
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this.$router.go(-1)
    }, 10000)
  },
  beforeDestroy () {
    if (this.timer != null) {
      clearTimeout(this.timer)
    }
  },
  components: {
    Notice
  }
}
</script>
