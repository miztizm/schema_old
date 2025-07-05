<script setup lang="ts">
// Global imports and logic that applies to ALL pages
const colorMode = useColorMode()
const color = computed(() => colorMode.value === 'dark' ? '#020420' : 'white')
import './styles/twoslash.css'

useHead({
  titleTemplate: title => title ? `${title} · Schema` : 'Schema: Powering a Digital Future',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/icon.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <UNotifications />
      <UModals />
    </ClientOnly>
  </div>
</template>

<style>
#kapa-widget-container {
  visibility: hidden;
}
</style>
