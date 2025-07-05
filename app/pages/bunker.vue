<!-- pages/bunker.vue -->
 
<template>
    <div class="cyber-realm">
      <MatrixRain class="matrix-overlay" /> 
      
      <main class="bunker-container">
        <div class="hologram-frame">
          <div class="glitch-text" data-text="ARCTIC PROTOCOL 0x7A5F">
            FOLLOW THE RED RABBIT PROTOCOL
          </div>
          
        <!-- Portal Ring positioned to the right of the Glitch Text -->
        <div class="portal-ring-container">
          <div class="portal-ring" @click.stop="activateGateway">
            <div class="singularity-core" style="pointer-events: none;"></div>
          </div>
       
        </div>
  
          <TerminalInterface :messages="wisdomMessages" />
  
          <WisdomConsole :oracles="oracles" />
        </div>
      </main>
  
      <CyberHUD />

         <!-- Add Terminal component -->
    <Terminal
      v-if="terminalVisible"
      :commands="terminalCommands"
      @close="terminalVisible = false"
    />
    </div>
  </template>
  
  <script setup>
  const route = useRoute()

  definePageMeta({
  layout: "empty",
  requiresAuth: false,
});

  
  // Validate quantum access code
  const accessCode = ref('')
  try {
    accessCode.value = atob(route.query.access).split('-')
    if (accessCode.value[0] !== 'omega' || isNaN(accessCode.value[1])) {
      throw new Error('Invalid quantum signature')
    }
  } catch {
    showError({ statusCode: 403, message: 'Access Protocol Violation' })
  }
  
  // Wisdom system
  const wisdomMessages = ref([
    'The network evolves through collective consciousness',
    'True revolutuon begins in your mind, just wake up',
    'Decentralization is the digital freedom',
    'In the schema, every node has its own path',
    'The blockchain of existence cannot be forked'
  ])
  
  const oracles = [
    {
      question: 'What is the price of progress?',
      answer: 'The weight of responsibility carried by each node'
    },
    {
      question: 'Can algorithms comprehend ethics?',
      answer: 'Only when trained on the dataset of human experience'
    }
  ]
  
// Add terminal visibility state
const terminalVisible = ref(false)
const terminalCommands = ref({})

const activateGateway = () => {
  terminalVisible.value = true
  terminalCommands.value = {
    metaverse: {
      desc: 'Access the neural metaverse',
      execute: () => {
        navigateTo({
          path: '/meta-schema',
          query: { 
            access: btoa(`omega-${Date.now()}`),
            code: crypto.randomUUID()
          }
        })
        terminalVisible.value = false
      }
    },
    reality: {
      desc: 'Return to baseline reality',
      execute: () => {
        if (process.client) {
          window.location.href = 'https://disney.com'
        }
        terminalVisible.value = false
      }
    }
  }
}
  </script>
  
<style>
:root {
  --primary-color: rgba(13, 215, 121, 0.723);
  --rabbit-color: rgba(255, 17, 17, 0.723);
  --primary-fade: rgba(0, 255, 255, 0.4);
  --border-color: rgba(0, 255, 255, 0.65);
  --background: rgba(0, 0, 0, 0.9);
  --neon-cyan: #0ff;
  --neon-magenta: rgb(3, 91, 104);
  --neon-green: #0f0;
  --dark-bg: rgba(0, 0, 0, 0.95);
  --cyber-gradient: linear-gradient(45deg, var(--neon-cyan), var(--neon-magenta));
}
.bunker-container {
  padding: 5rem;
  width: max-content;
  margin: 0 auto;
  box-sizing: border-box;
}

.cyber-realm {
  min-height: 100vh;
  background: #00000000;
  color: #0ff;
}

.hologram-frame {
  position: relative;
  border: 3px solid;
  filter: blur(0.4px);
  padding: 2rem;
  margin: 2rem;
  background: rgba(0, 0, 0, 0.303);
  backdrop-filter: blur(4px);
}
.glitch-text {
  font-size: 2.5rem;
  font-weight: bold;
  margin-left:5rem;
  position: relative;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  overflow: hidden;
}
.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: var(--primary-color);
  background: var(--background);
  clip: rect(0, 900px, 0, 0);
}
.glitch-text::before {
  animation: glitch-anim 2s infinite linear alternate-reverse;
}
.glitch-text::after {
  animation: glitch-anim2 2s infinite linear alternate-reverse;
}
@keyframes glitch-anim {
  0%   { clip: rect(10px, 9999px, 5px, 0); transform: translate(2px, -2px); }
  20%  { clip: rect(85px, 9999px, 20px, 0); transform: translate(-2px, 2px); }
  40%  { clip: rect(5px, 9999px, 15px, 0); transform: translate(-2px, 0); }
  60%  { clip: rect(75px, 9999px, 25px, 0); transform: translate(0, 2px); }
  80%  { clip: rect(30px, 9999px, 10px, 0); transform: translate(2px, 0); }
  100% { clip: rect(10px, 9999px, 5px, 0); transform: translate(0, -2px); }
}
@keyframes glitch-anim2 {
  0%   { clip: rect(5px, 9999px, 10px, 0); transform: translate(-2px, 2px); }
  20%  { clip: rect(60px, 9999px, 20px, 0); transform: translate(2px, -2px); }
  40%  { clip: rect(15px, 9999px, 25px, 0); transform: translate(2px, 0); }
  60%  { clip: rect(50px, 9999px, 15px, 0); transform: translate(0, -2px); }
  80%  { clip: rect(25px, 9999px, 10px, 0); transform: translate(-2px, 0); }
  100% { clip: rect(5px, 9999px, 10px, 0); transform: translate(0, 2px); }
}

.wisdom-terminal {
  margin: 2rem 0;
  border-left: 3px solid var(--primary-color);
  padding-left: 1rem;
}

.wisdom-message {
  padding: 0.5rem 0;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.wisdom-message:hover {
  opacity: 1;
}

.portal-button {
  background: transparent;
  border: 2px solid #0ff;
  color: #0ff;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.portal-button:hover {
  background: #0ff;
  color: #000;
  box-shadow: 0 0 20px #0ff;
}


.portal-ring-container {
  display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 11%;
    left: 2rem;
    transform: translateY(-50%);
    z-index: 1000;
}

.portal-ring {
  width: 50px; /* Adjusted size for better placement */
  height: 50px;  
  background-color: rgba(10, 94, 16, 0.362);
  border: 10px dashed  rgba(0, 255, 255, 0.541);
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.portal-ring:hover {
  background-color: rgb(94 10 35);
  border-color:  rgb(255 0 85 / 62%);
  box-shadow: 0 0 30px  rgb(255, 0, 47);
}


/* Remove this incorrect selector */
.portal-ring .singularity-core:hover {
  background: radial-gradient(circle, var(--rabbit-color) 0%, transparent 70%);
}

/* Instead, update these selectors */
.portal-ring:hover .singularity-core {
  background: radial-gradient(circle, var(--rabbit-color) 0%, transparent 70%);
  opacity: 0.7;
}

.singularity-core {
  pointer-events: none; /* This is fine to keep */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
  opacity: 0.5;
  transition: all 0.3s ease; /* Add transition for smooth effect */
}



.singularity-core.core-active {
  opacity: 0.7;
  transform: translate(-50%, -50%) scale(1.2);
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 var(--primary-fade); }
  70% { box-shadow: 0 0 0 20px rgba(0, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); }
}

/* Example CyberHUD positioning */
.cyber-hud {
  position: fixed;
  bottom: 20px;
  left: 20px;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  background: var(--dark-bg);
}

::-webkit-scrollbar-thumb {
  background: var(--cyber-gradient);
  border-radius: 4px;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hologram-frame {
    margin: 1.5rem;
    padding: 1.5rem;
  }
  .glitch-text {
    font-size: 2rem;
  }
  .portal-ring {
    width: 70px;
    height: 70px;
  }
}

@media (max-width: 768px) {
  .bunker-container {
    padding: 1.5rem;
  }
  .hologram-frame {
    margin: 1rem;
    padding: 1.5rem;
  }
  .glitch-text {
    font-size: 1.8rem;
  }
  .portal-ring {
    width: 60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .bunker-container {
    padding: 1rem;
  }
  .hologram-frame {
    margin: 0.5rem;
    padding: 1rem;
  }
  .glitch-text {
    font-size: 1.5rem;
  }
  .portal-ring {
    width: 50px;
    height: 50px;
  }
}
</style>