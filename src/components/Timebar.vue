<template>
  <div class="wrapper">
    <div class="bar" :style="{width}">
      <div class="bar-inner" :style="transformStyle"></div>
    </div>
    <div class="time">
      <span class="mark">{{curTime}}</span>
      <span class="mark">{{totalTime}}</span>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px auto 8px;
}
.bar {
  position: relative;
  width: 240px;
  height: 2px;
  border-radius: 1px;
  background-color: #0b0a31;
  overflow: hidden;
}
.bar-inner {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  border-radius: 1px;
  // background-color: rgb(220,31,48);
  background-color: rgb(204,161,49);
}
.time {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  // color: #6c7ce8;
  color: rgb(77,77,137);
  font-size: 12px;
}
.mark {
  transform: translate3d(0, 0, 0);
  line-height: 1.6;
}
</style>


<script>
const formatTime = (t) => {
  const second = t % 60
  const minute = (t - second) / 60
  return t < 60 ? (t | 0) : `${minute}:${
    second < 10 ? ('0' + (second | 0)) : (second | 0)
  }`
}

export default {
  name: 'timebar',
  props: ['current', 'count', 'width'],
  computed: {
    transformStyle () {
      const right = (this.current / this.count * 100).toFixed(4) + '%'
      return {
        transform: `translate3d(${right},0,0)`
      }
    },
    curTime () {
      return formatTime(this.current)
    },
    totalTime () {
      return formatTime(this.count)
    }
  }
}
</script>

