// composables/easterEggs.js
export const useCyberEggs = () => {
    const router = useRouter()
    const toast = useToast()

  
    // Konami Code Sequence
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
    ]
    let konamiProgress = 0
    let konamiTimeout
  
    const unlockEasterEgg = (type) => {
        if (type === 'konami') {
          console.log('[DEBUG] Attaching Konami listener')
          document.addEventListener('keydown', konamiHandler)
        toast.add({
          title: 'Cipher Activated',
          description: 'Enter sequence to breach firewalls',
          icon: 'i-ph-shield-warning',
          color: 'purple'
        })
        onUnmounted(() => {
            console.log('[DEBUG] Removing Konami listener')
            document.removeEventListener('keydown', konamiHandler)
          })
        }
      }
    const konamiHandler = (e) => {
      clearTimeout(konamiTimeout)
      konamiTimeout = setTimeout(() => {
        konamiProgress = 0
      }, 2000)
  
      if (e.code === konamiCode[konamiProgress]) {
        konamiProgress++
        if (konamiProgress === konamiCode.length) {
          document.removeEventListener('keydown', konamiHandler)
          router.push({
            path: '/bunker',
            query: { access: btoa('omega-' + Date.now()) }
          })
        }
      } else {
        konamiProgress = 0
      }
    }
  
    return {
      unlockEasterEgg
    }
  }