<template>
  <notice title=":(" :message="message" />
</template>

<script>
import Notice from '@/components/Notice'
import store from '@/store'

export default {
  name: 'error',
  data () {
    return {
      state: store.state
    }
  },
  mounted () {
    setTimeout(() => {
      this.$router.go(-1)
    }, 3000)
  },
  computed: {
    message () {
      return this.state.error || ''
    }
  },
  components: {
    Notice
  }
}
</script>
