<template>
  <div class="rain-effect" v-if="active">
    <div
      v-for="drop in drops"
      :key="drop.id"
      class="raindrop"
      :style="drop.style"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'RainEffect',
  props: {
    active: Boolean
  },
  data() {
    return {
      drops: []
    }
  },
  watch: {
    active(val) {
      if (val) this.generateRain()
      else this.drops = []
    }
  },
  mounted() {
    if (this.active) this.generateRain()
  },
  methods: {
    generateRain() {
      const drops = []
      const count = 40
      for (let i = 0; i < count; i++) {
        const left = Math.random() * 100
        const delay = Math.random() * 2
        const duration = 1.8 + Math.random() * 1.5
        const size = 8 + Math.random() * 8
        drops.push({
          id: i + '-' + Date.now(),
          style: {
            left: `${left}vw`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            width: `${size/4}px`,
            height: `${size}px`,
            opacity: 0.7 + Math.random() * 0.3
          }
        })
      }
      this.drops = drops
    }
  }
}
</script>

<style scoped>
.rain-effect {
  pointer-events: none;
  position: fixed;
  left: 0; top: 0; width: 100vw; height: 100vh;
  z-index: 9999;
}
.raindrop {
  position: absolute;
  top: -20px;
  background: linear-gradient(180deg, #2196f3 60%, #90caf9 100%);
  border-radius: 50px;
  animation: rain-fall linear infinite;
}
@keyframes rain-fall {
  0% { top: -20px; }
  100% { top: 100vh; }
}
</style>