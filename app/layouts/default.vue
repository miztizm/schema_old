<script setup lang="ts">
import { debounce } from 'perfect-debounce'
import type { ParsedContent } from '@nuxt/content'
const route = useRoute()
const isHomePage = computed(() => route.path === '/') 


const search = ref(null)
const colorMode = useColorMode()
const { headerLinks, searchGroups, searchLinks } = useNavigation()
const color = computed(() => colorMode.value === 'dark' ? '#020420' : 'white')

const { data: navigation } = await useLazyAsyncData('navigation', () => fetchContentNavigation(), { default: () => [] })
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
  ogSiteName: 'Schema',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterSite: 'sch8ma'
})


watch(() => search.value?.commandPaletteRef?.query, debounce((query: string) => {
  if (!query) {
    return
  }

  useTrackEvent('Search', { props: { query: `${query} - ${search.value?.commandPaletteRef.results.length} results` } })
}, 500))

// Provide
provide('navigation', navigation)


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
  <div>
    <AppBanner
  id="schema-rebel-invite"
  to="https://discord.gg/RkZSmMqVWq"
  style="background: linear-gradient(135deg, #1E1E2F 0%, #5865F2 50%, #6A1B9A 100%);"
>
  <div class="flex items-center gap-1 text-white">
    <UIcon
      name="i-ph-hand-fist"
      class="w-5 h-5 flex-shrink-0 pointer-events-none lg:inline-block mr-1"
    />
    <span>Rebels Wanted: Break Algorithms!</span>
    <UButton
      label="Join the Discord"
      color="white"
      trailing-icon="i-ph-arrow-right"
      size="2xs"
      class="rounded-full ml-1"
    />
  </div>
</AppBanner>

<AppHeader :links="headerLinks" />


<UMain class="relative">
      <HeroBackground
        class="absolute w-full top-[1px] transition-all flex-shrink-0"
        :class="[
          isLoading ? 'animate-pulse' : (appear ? 'opacity-30' : 'opacity-20'),
          heroBackgroundClass
        ]"
      />
      <div :class="['flex items-center justify-center overlay', { 'h-screen': isHomePage }]">
 <div class="gradient" />

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
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: none;
}

.dark {
  .gradient {
    background: radial-gradient(50% 50% at 50% 50%, rgb(var(--color-primary-400) / 0.1) 0, rgb(var(--color-gray-950)) 100%);
  }
}

.overlay {
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
}

</style>
