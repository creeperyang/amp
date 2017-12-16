<template>
  <div class="spectrum-container">
    <canvas :style="style" :width="width" :height="height" ref="canvas"></canvas>
  </div>
</template>

<style>
.spectrum-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}
.spectrum-canvas {
  display: block;
}
</style>


<script>
export default {
  name: 'spectrum',
  props: ['width', 'height', 'analyser', 'current'],
  computed: {
    style () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },
  mounted () {
    this.ctx = this.$refs.canvas.getContext('2d')
    this.$watch('current', () => {
      if (!this.drawing) {
        this.drawSpectrum()
      }
    })
  },
  methods: {
    drawSpectrum () {
      const ctx = this.ctx
      const analyser = this.analyser
      if (!analyser) return
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)

      const SPACER_WIDTH = 3
      const BAR_WIDTH = 1
      const OFFSET = 100
      const width = this.width
      const height = this.height
      const barCount = Math.round(width / SPACER_WIDTH)
      let i
      let magnitude
      this.drawing = true
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#0b0a31'

      for (i = 0; i < barCount; ++i) {
        magnitude = dataArray[i + OFFSET] / 5
        ctx.fillRect(i * SPACER_WIDTH, 0, BAR_WIDTH, magnitude)
      }
      this.drawing = false
    }
  }
}
</script>
