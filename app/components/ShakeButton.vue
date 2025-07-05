<template>

    <UButton @click="shakeScreen" :disabled="isShaking" class="!text-white landing-button shake-button" to="/auth/signup" size="lg">
        {{ t('landing.cta_text') }}
            </UButton>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  const isShaking = ref(false);
  
  const shakeScreen = () => {
    isShaking.value = true;
    const body = document.body;
    body.classList.add('shake');
  
    setTimeout(() => {
      body.classList.remove('shake');
      isShaking.value = false;
    }, 500);
  };
  </script>
  
  <style scoped>
  .shake-button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
  }
  
  .shake-button:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
  
  .shake-button:hover {
    background-color: #2980b9;
  }
  </style>