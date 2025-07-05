<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'
import { useAuthStore } from '@/base/stores/auth';
import { debounce } from 'perfect-debounce'
const colorMode = useColorMode()
const search = ref(null)
const config = useRuntimeConfig();

/* onMounted(async () => {
  const auth = useAuthStore()

  // Client-side session check
  if (!auth.isInitialized) {&²
    await auth.sync()
  }

  // Optional: Periodic session check
  setInterval(() => {
    if (auth.isAuthenticated) {
      auth.fetchUser().catch(() => auth.logout())
    }
  }, 60 * 1000) // Every minute
}) */

const { headerLinks, mobileNav, searchGroups, searchLinks } = useNavigation()
const color = computed(() => colorMode.value === 'dark' ? '#020420' : 'white')
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

useSeoMeta({
  ogSiteName: 'Nuxt',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: 'nuxt_js'
})



watch(() => search.value?.commandPaletteRef?.query, debounce((query: string) => {
  if (!query) {
    return
  }

  useTrackEvent('Search', { props: { query: `${query} - ${search.value?.commandPaletteRef.results.length} results` } })
}, 500))

// Provide
provide('navigation', navigation)

const route = useRoute()
const heroBackgroundClass = computed(() => route.meta?.heroBackground || '')
const { isLoading } = useLoadingIndicator()
const appear = ref(false)
const appeared = ref(false)
onMounted(() => {
  setTimeout(() => {
    appear.value = true
    setTimeout(() => {
      appeared.value = true
    }, 1000)
  }, 0)
})
</script>

<template>
<div class="min-h-screen flex flex-col">

<AppHeader :links="headerLinks" />

<UMain class="relative overlay">
      <HeroBackground
        class="absolute w-full top-[1px] transition-all flex-shrink-0"
        :class="[
          isLoading ? 'animate-pulse' : (appear ? 'opacity-30' : 'opacity-20'),
          heroBackgroundClass
        ]"
      />
      <div class="flex items-center justify-center mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-7 max-w-7xl">
<!--  <div class="gradient" />
 -->
        <slot />


    </div>
    </UMain>

    <AppFooter />

    <ClientOnly>
      <UContentSearch
        ref="search"
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
<style>
@keyframes lift-up {
  0% { transform: translateY(100px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.lifting-content {
  animation: lift-up 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
#schema-rebel-invite:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(88, 101, 242, 0.3);
}

.gradient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: none;
}

.dark {
  .gradient {
    background: radial-gradient(50% 50% at 50% 50%, rgb(var(--color-primary-400) / 0.1) 0, rgb(var(--color-gray-950)) 100%);
  }
}

/* .overlay {
  background-size: 100px 100px;
  background-image:
    linear-gradient(to right, rgb(var(--color-gray-200)) 0.5px, transparent 0.5px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 0.5px, transparent 0.5px);
}
.dark {
  .overlay {
    background-image:
      linear-gradient(to right, rgb(var(--color-gray-900)) 0.5px, transparent 0.5px),
      linear-gradient(to bottom, rgb(var(--color-gray-900)) 0.5px, transparent 0.5px);
  }
} */
</style>
