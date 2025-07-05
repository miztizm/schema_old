<template>
    <div class="cyber-terminal-overlay">
      <div class="terminal-window">
        <div class="terminal-commands">
          <div v-for="(cmd, key) in commands" :key="key" class="command">
            <button @click="executeCommand(key)">{{ cmd.desc }}</button>
          </div>
        </div>
        <button class="terminal-close" @click="$emit('close')">CLOSE PORTAL</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['commands'])
  const emit = defineEmits(['close'])
  
  const executeCommand = (cmd) => {
    if (props.commands[cmd]?.execute) {
      props.commands[cmd].execute()
    }
  }
  </script>
  
  <style>
  /* Keep existing terminal styles */
  .cyber-terminal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .terminal-window {
    border: 2px solid #0ff;
    padding: 2rem;
    background: #000;
    max-width: 600px;
    width: 90%;
  }
  
  .command button {
    background: transparent;
    border: 1px solid #0ff;
    color: #0ff;
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .command button:hover {
    background: #0ff;
    color: #000;
  }
  
  .terminal-close {
    margin-top: 1rem;
    background: #f00;
    border: none;
    padding: 0.5rem 1rem;
    color: white;
    cursor: pointer;
  }
  </style>