<template>
    <div class="cyber-terminal">
      <div class="terminal-header">
        <span class="blink">></span> SCHEMA-META ACCESS v0x7A5F
        <span class="protocol-hash">#$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6</span>
      </div>
      <div class="terminal-body">
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          class="terminal-line"
        >
          <span class="prompt">root@schema:~$</span>
          <span 
            class="text" 
            :style="{ animationDelay: `${index * 1}s` }"
          >{{ msg }}</span>
          <div class="typing-cursor" :style="{ animationDelay: `${(index + 1) * 3}s` }"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    messages: {
      type: Array,
      default: () => []
    }
  })
  </script>
  
  <style>
  .cyber-terminal {
    border: 1px solid #0ff;
    background: rgba(0, 0, 0, 0.9);
    padding: 1rem;
    margin: 2rem 0;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
    position: relative;
    overflow: hidden;
  }
  
  .terminal-header {
    color: #0ff;
    border-bottom: 1px solid #0ff;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .protocol-hash {
    color: #0ff5;
    font-size: 0.8em;
  }
  
  .terminal-line {
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
    position: relative;
  }
  
  .prompt {
    color: #0f0;
    margin-right: 1rem;
    flex-shrink: 0;    font-size: 0.9rem;
    text-shadow: 0 0 5px #0f03;
  }
  
  .text {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    width: 0;    font-size: 0.9rem;
    animation: typing 3s steps(40) forwards;
    position: relative;
    color: #0ff;
  }
  
  .typing-cursor {
    position: absolute;
    right: -0.5em;
    width: 2px;
    height: 1em;
    background: #0ff;
    animation: blink 0.8s infinite;
    opacity: 0;
  }
  
  @keyframes typing {
    to {
      width: 100%;
    }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 0 }
    50% { opacity: 1 }
  }
  
  .blink {
    animation: terminal-blink 1s infinite;
  }
  
  @keyframes terminal-blink {
    0%, 100% { opacity: 1 }
    50% { opacity: 0.2 }
  }
  </style>