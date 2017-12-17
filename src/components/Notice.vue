<template>
  <div class="notice-container">
    <svg class="icon-close" v-on:click="back">
      <use xlink:href="#icon-close"></use>
    </svg>
    <div class="notice-title">
      {{title}}
    </div>
    <div class="notice-message">
      {{message}}
    </div>
  </div>
</template>

<style scoped>
.notice-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 308px;
  background: #121138;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  color: #d2d2ea;
}
.notice-title {
  text-align: center;
  font-size: 18px;
  margin: 12px 0;
}
.notice-message {
  padding: 12px;
  font-size: 12px;
  text-align: center;
}

.icon-close {
  position: absolute;
  right: 8px;
  top: 8px;
  fill: #d2d2ea;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.icon-close:hover {
  fill: #fff;
}
</style>

<script>
export default {
  name: 'notice',
  props: ['title', 'message'],
  data () {
    return {
      // title: 'Notice',
      // message: 'nothing -------'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

