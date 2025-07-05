<script setup lang="ts">
const { footerLinks } = useNavigation()
</script>

<template>
  <UFooter
    :ui="{
      bottom: { wrapper: 'border-t border-gray-200 dark:border-zinc-950', container: '!py-6' },
      top: { wrapper: 'border-t border-gray-200 dark:border-zinc-950', container: 'py-8 lg:py-12' }
    }"
  >
  <!--   <template #top>
      <UFooterColumns :links="footerLinks">
        <NuxtLink
      to="https://schema.cx"
      class="dark:bg-transparent absolute inset-x-0 -top-4 mx-auto flex h-9 w-14 items-center justify-center bg-white"
    >
   <Logo
  class="h-7 w-7"
  alt="Schema Logo"
  height="28"
  width="28"
  loading="lazy"
  decoding="async"
/>
    </NuxtLink>
        <template #right>
          <NewsletterForm />
        </template>
      </UFooterColumns>
    </template> -->

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} Schema <!-- - <NuxtLink class="hover:underline" to="https://go.schema.cx/license" target="_blank">
          MIT License
        </NuxtLink> -->
      </p>
    </template>

    <template #right>
      <UButton aria-label="Schema on X" to="https://go.schema.cx/x" target="_blank" icon="i-simple-icons-x" v-bind="($ui.button.secondary as any)" />
      <UButton aria-label="Schema on LinkedIn" to="https://go.schema.cx/linkedin" target="_blank" icon="i-simple-icons-linkedin" v-bind="($ui.button.secondary as any)" />
      <UButton aria-label="Schema on Discord" to="https://go.schema.cx/discord" target="_blank" icon="i-simple-icons-discord" v-bind="($ui.button.secondary as any)" />
      <UButton aria-label="Schema on GitHub" to="https://go.schema.cx/github" target="_blank" icon="i-simple-icons-github" v-bind="($ui.button.secondary as any)" />
    </template>
  </UFooter>
</template>
