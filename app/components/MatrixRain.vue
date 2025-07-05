<template>
    <canvas ref="canvas" class="fixed inset-0 -z-50 opacity-20" />
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
  
  const canvas = ref(null)
  
  const draw = () => {
    if (!canvas.value) return
  
    const ctx = canvas.value.getContext('2d')
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.fillStyle = '#0F0'
  
    // Update drops
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)]
      ctx.fillText(char, i * 20, y)
      // Decrease the increment to slow down the drops
      drops[i] = y > canvas.value.height ? 0 : y + 15 // Changed from 20 to 5
    })
  }
  
  const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#'.split('')
  let drops = []
  
  const resizeCanvas = () => {
    if (canvas.value) {
      canvas.value.width = window.innerWidth
      canvas.value.height = window.innerHeight
      drops = Array(Math.floor(window.innerWidth / 20)).fill(0)
    }
  }
  
  const animate = () => {
    draw()
    // Reduce the frame rate by using setTimeout instead of requestAnimationFrame
    animationId = setTimeout(animate, 50) // Adjust the delay as needed
  }
  
  let animationId = null
  
  onMounted(() => {
    resizeCanvas()
    animate() // Start the animation
  })
  
  onUnmounted(() => {
    if (animationId) {
      clearTimeout(animationId)
    }
  })
  
  onBeforeUnmount(() => {
    if (animationId) {
      clearTimeout(animationId)
    }
  })
  
  // Handle window resize
  onMounted(() => {
    window.addEventListener('resize', resizeCanvas)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas)
  })
  </script>
  
  <style scoped>
  canvas {
    /* Optional: Add any additional styles if needed */
  }
  </style>