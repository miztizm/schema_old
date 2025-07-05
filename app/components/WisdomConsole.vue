<!-- components/WisdomConsole.vue -->
<template>
    <div class="oracle-interface">
      <div 
        v-for="(oracle, index) in oracles" 
        :key="index"
        class="wisdom-card"
        @mouseenter="revealAnswer(index)"
        @mouseleave="activeIndex = -1"
      >
        <div class="question">{{ oracle.question }}</div>
        <div class="answer-container">
          <span class="answer-mask">{{ generateMask(oracle.answer) }}</span>
          <span class="answer-real">{{ oracle.answer }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['oracles'])
  const activeIndex = ref(-1)
  
  const generateMask = (text) => {
    return '█'.repeat(text.length)
  }
  
  const revealAnswer = (index) => {
    activeIndex.value = index
  }
  </script>
  
  <style>
  .wisdom-card {
    margin: 1rem 0;
    border-left: 2px solid #0ff;
    padding-left: 1rem;
    position: relative;
  }
  
  .answer-container {
    position: relative;
    min-height: 1.5em; /* Fixed height */
    font-family: monospace; /* Equal character width */
  }
  
  .answer-mask,
  .answer-real {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.3s ease;
  }
  
  .answer-mask {
    opacity: 1;
    color: #0ff;
  }
  
  .answer-real {
    opacity: 0;
    color: #fff;
  }
  
  .wisdom-card:hover .answer-mask {
    opacity: 0;
  }
  
  .wisdom-card:hover .answer-real {
    opacity: 1;
  }
  
  .question {
    color: #0ff;
    margin-bottom: 0.5rem;
    font-size: 0.9em;
  }
  </style>