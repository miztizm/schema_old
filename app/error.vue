<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'
import type { NuxtError } from '#app'
const config = useRuntimeConfig();

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.'
})

defineProps<{ error: NuxtError }>()

const { headerLinks, searchGroups, searchLinks } = useNavigation()

const { data: navigation } = await useLazyAsyncData('navigation', () =>
  fetchContentNavigation({
    // Force local API call
    $fetch: $fetch.create({ baseURL: config.public.websiteUrl })
  }),
  { default: () => [] }
)
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', {
  default: () => [],
  server: false
})

provide('navigation', navigation)
</script>

<template>
  <div>
    <AppHeader :links="headerLinks" />

    <UContainer>
      <UMain>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UMain>
    </UContainer>

    <AppFooter />

    <ClientOnly>
      <UContentSearch
        :files="files"
        :navigation="navigation[0]?.children"
        :groups="searchGroups"
        :links="searchLinks"
        :fuse="{ resultLimit: 13 }"
      />

      <UNotifications />
    </ClientOnly>
  </div>
</template>
