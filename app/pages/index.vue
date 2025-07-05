<script setup lang="ts">
import { joinURL } from 'ufo'
const route = useRoute()

definePageMeta({
  heroBackground: 'z-10',
  middleware: ["guest"],
  requiresAuth: false
})

const site = useSiteConfig()
if (!site) {
  throw createError({ statusCode: 500, statusMessage: 'Site configuration is missing' })
}
const title = 'Schema: Your Gateway to Digital Liberation'
const description = 'Nuxt is an open source framework that makes web development intuitive and powerful. Create performant and production-grade full-stack web apps and websites with confidence.'


useSeoMeta({
  title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: joinURL(site.url, '/new-social.jpg'),
  twitterImage: joinURL(site.url, '/new-social.jpg')
})

const uwuCookie = useCookie<boolean>('uwu-mode', {
  default: () => false
})

if ('uwu' in route.query) {
  const enableUwu = !['0', 'false'].includes(route.query.uwu as string)
  uwuCookie.value = enableUwu
}

/*  const { data: page, error, status } = await useAsyncData('index',
  () => queryContent('/').findOne(),
  {
     server: false, // Fetch on the server
    lazy: true,
     }
) */
//const { data: page, status, error  } = await useAsyncData('index', () => queryContent('/').findOne())
const { data: page, status, error } = await useAsyncData('index', async () => {
  try {
    const content = await queryContent('/').findOne();
    if (!content) {
      throw createError({ statusCode: 404, statusMessage: 'Page not found' });
    }
    return content;
  } catch (e) {
    console.error('Content fetch error:', e);
    throw createError({ statusCode: 500, statusMessage: 'Failed to fetch content' });
  }
});
/* const { data: page, status, error } = await useAsyncData(
  'index',
  async () => {
    try {
      const content = await queryContent('/').findOne()
      if (!content) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found' })
      }
      return content
    } catch (e) {
      console.error('Content fetch error:', e)
      throw createError({ statusCode: 500, statusMessage: 'Failed to fetch content' })
    }
  },
  {
    server: true, // Fetch on the server
    lazy: false,  // Block rendering until data is ready
  }
) */
/*  const { data: page } = await useAsyncData('landing-page', () =>
   queryContent('/').findOne()
 ) */
/*  onMounted(() => {
  if (!page.value) {
    queryContent('/')
      .findOne()
      .then((result) => page.value = result)
      console.log('result page.value', page.value)
      console.log('result page', page)
  }
}) */
/* console.log('PAGE', page)
console.log('PAGE.value', page.value)
 watchEffect(() => {
   console.log('Page value changed:', page.value)
 })

 watch(status, (isPending) => {
   console.log('Loading state:', isPending)
 })

 watch(error, (err) => {
  if (err) {
    console.error('Error fetching page:', err)
  }
}) */
/*
 onMounted(() => {
  if (!import.meta.server) {
    // Force client-side revalidation
    useAsyncData('index', () => queryContent('/').findOne(), { lazy: true })
  }
}) */
/* <template>
  <div v-if="!page">
    Loading...
  </div>
  <div v-else>
    <!-- Your content -->
  </div>
</template> */
const videoModalOpen = ref(false)



/*   if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}  */

const { locale, locales } = useI18n()
const { t } = useI18n();
const toast = useToast()

</script>

<template>

 <div v-if="status === 'pending'" class="loading-overlay">
  <BasePlaceholderPage title="Loading Framework" subtitle="Please wait while we load the content" image-size="xl">
    <!-- Placeholder Image (Light and Dark Mode) -->
    <template #image>
      <div class="flex justify-center items-center">
        <img
          class="block dark:hidden"
          src="/assets/components/loader.svg"
          alt="Placeholder image"
          style="width: 120px; height: auto;"
        >
        <img
          class="hidden dark:block"
          src="/assets/components/loader.svg"
          alt="Placeholder image"
          style="width: 120px; height: auto;"
        >
      </div>
    </template>
</BasePlaceholderPage>
  </div>
  <div v-else-if="status === 'error'" class="error-message">
    <BasePlaceholderPage title="Failed to load content"
    :subtitle="error.message"
    image-size="xl"
    :classes="{
      wrapper: 'max-w-3xl mx-auto shadow-lg dark:shadow-none',
      inner: 'space-y-8',
      img: 'mb-6 animate-pulse',
      content: 'space-y-4',
      title: 'text-3xl font-bold tracking-tight text-primary-800 dark:text-primary-300',
      subtitle: 'text-lg leading-relaxed max-w-prose'
    }"
  >
    <!-- Image Slot -->
    <template #image>
      <NuxtLink to="/">
        <UIcon
          name="lineicons:sad"
          class="w-full h-full text-primary-500 dark:text-primary-600"
        />
      </NuxtLink>
    </template>

    <!-- Default Slot (Actions) -->
    <div class="flex gap-3 justify-center">
      <NuxtLink to="/">
      <UButton
        label="Try again"
        color="gray"
        size="lg"
      />
      </NuxtLink>
    </div>

</BasePlaceholderPage>
  </div>
  <div v-else class="dark:bg-sblack-800 lifting-content">

    <div class="map absolute left-1/2 hidden sm:block top-[15%] -translate-x-1/2 -translate-y-1/2 p-2.5 z-10 opacity-10">
    <IntroWorld id="WorldMap" class="w-auto" />
  </div>
    <LandingHero
      :ui="{ base: 'relative z-[1] -mt-[8rem] sm:-mt-[11rem]' }"
      class=" md:pb-12"
      :orientation="uwuCookie ? 'horizontal' : 'vertical'"
    >
      <template #top>
       <!--  <HomeHeroBackground v-if="!uwuCookie" class="absolute -top-[calc(--header-height50px)] inset-x-0 w-full hidden lg:block" /> -->
        <svg class="cxema-logo relative left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 z-20 max-h-[200px] sm:max-h-[250px]" style="opacity: 1;"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6260 7070">
    <g id="l7k50ZCdQCnwMdZN64m5wPz" fill="rgb(226,31,38)" style="transform: none;">
        <g>
            <path id="pMn9k8SPH" d="M3455 6234 c-115 -19 -285 -58 -342 -80 -38 -14 -143 -45 -235 -69 -200 -53 -304 -91 -553 -203 -104 -46 -259 -116 -344 -154 -156 -70 -284 -146 -377 -224 -61 -52 -91 -64 -121 -53 -53 20 -13 102 126 259 60 68 62 72 25 45 -23 -17 -107 -91 -188 -165 -80 -74 -169 -147 -197 -161 -56 -28 -81 -60 -105 -134 -21 -65 -38 -83 -63 -68 -17 10 -19 8 -24 -30 -9 -65 9 -215 32 -281 12 -33 21 -69 21 -80 0 -12 7 -30 15 -40 19 -26 19 -60 -1 -102 -21 -43 -47 -44 -132 -4 -34 16 -62 27 -62 25 0 -3 43 -51 95 -107 52 -57 95 -106 95 -110 0 -5 -9 -8 -20 -8 -27 0 -231 44 -349 75 -52 14 -95 24 -97 22 -2 -2 74 -47 169 -100 94 -53 186 -106 202 -118 l30 -21 -75 6 -75 6 61 -39 c34 -22 71 -44 83 -50 31 -17 26 -27 -24 -46 -34 -13 -64 -16 -122 -13 l-78 5 64 -29 c36 -17 117 -43 180 -60 120 -31 179 -56 292 -126 208 -127 384 -200 453 -187 36 7 179 -36 269 -82 55 -28 127 -89 127 -109 0 -7 -15 -21 -32 -30 -18 -9 -73 -56 -123 -103 -111 -107 -147 -132 -302 -210 -89 -44 -126 -68 -137 -88 -23 -44 -99 -113 -266 -238 -85 -65 -146 -115 -135 -111 37 11 127 26 156 26 22 0 29 -5 29 -20 0 -22 -21 -36 -90 -56 -68 -20 -272 -126 -329 -171 -27 -21 -53 -50 -60 -64 -13 -30 -56 -56 -166 -98 -44 -17 -89 -38 -100 -47 -19 -14 -17 -14 23 -8 69 11 53 -15 -80 -130 -108 -92 -248 -234 -248 -250 0 -11 103 45 179 96 141 96 264 137 441 148 88 5 142 14 183 29 32 12 94 24 138 28 87 7 92 2 67 -52 -6 -14 -9 -27 -6 -30 3 -3 99 33 214 81 115 47 272 108 349 136 77 28 187 72 244 99 88 41 113 49 163 49 39 0 90 10 146 29 48 16 112 37 142 46 30 9 93 39 139 67 47 28 119 66 160 85 42 18 142 67 223 108 80 41 155 75 167 75 32 0 266 -147 377 -237 95 -77 184 -138 266 -183 21 -11 42 -29 48 -39 15 -29 12 -83 -5 -108 -14 -20 -13 -23 15 -40 16 -9 30 -25 30 -34 0 -29 -52 -81 -105 -105 l-50 -23 130 -1 c273 -3 272 -44 -8 -258 -78 -59 -164 -125 -191 -146 -69 -53 -126 -77 -208 -87 -38 -5 -88 -18 -111 -29 -72 -36 -190 -107 -242 -146 -58 -44 -107 -59 -248 -74 -56 -6 -172 -27 -257 -46 -176 -39 -336 -63 -629 -95 -219 -24 -239 -23 -338 21 -30 13 -43 25 -43 38 0 22 125 149 168 171 15 7 54 37 87 66 33 28 87 70 120 92 75 51 190 143 179 143 -5 0 -25 -4 -44 -9 -111 -28 -117 -21 -32 41 119 87 260 215 285 257 l18 31 -34 -16 c-73 -35 -92 18 -29 77 69 65 176 145 352 263 96 65 182 125 190 133 32 33 -513 -253 -559 -293 -50 -43 -134 -94 -158 -94 -8 0 -45 -14 -83 -30 -38 -17 -81 -31 -97 -31 -21 -1 -23 -3 -8 -6 45 -11 33 -22 -47 -47 -91 -28 -177 -78 -380 -221 -110 -78 -123 -85 -126 -65 -2 12 -9 19 -15 17 -20 -6 -85 -98 -127 -180 -37 -73 -40 -84 -40 -161 0 -165 36 -270 134 -387 133 -159 244 -220 551 -302 112 -29 131 -31 280 -31 202 1 541 34 808 80 248 42 662 192 1050 380 163 79 302 144 307 144 6 0 15 -11 21 -24 16 -34 -23 -102 -119 -206 l-77 -84 86 64 c48 36 115 89 150 119 l64 54 3 -29 c6 -58 13 -57 41 2 31 66 53 88 93 98 37 8 73 56 114 150 19 44 36 82 40 85 8 9 24 -21 24 -49 l1 -25 11 25 c6 14 10 86 10 160 0 93 6 166 19 235 10 55 19 110 19 122 0 22 9 27 73 39 l37 6 -45 47 c-61 62 -115 144 -122 185 l-5 33 103 8 104 7 -94 44 -93 44 3 87 4 88 -21 -24 c-12 -14 -26 -21 -33 -17 -16 10 -59 97 -91 186 l-28 74 -113 38 c-148 49 -366 157 -418 206 -45 43 -60 84 -40 109 8 9 32 30 54 46 32 24 35 28 15 23 -14 -3 -74 -9 -135 -12 -127 -7 -168 3 -163 38 4 27 94 102 207 171 69 43 95 67 149 137 37 47 85 108 108 135 23 28 56 73 73 100 37 59 120 146 176 185 56 39 407 400 423 435 8 17 19 41 26 55 7 15 42 42 86 67 155 86 179 113 99 113 -50 0 -51 19 -1 48 40 22 165 147 278 276 81 93 64 87 -94 -32 -53 -40 -119 -86 -147 -102 -76 -43 -189 -77 -300 -90 -75 -8 -114 -18 -156 -40 -56 -28 -246 -76 -258 -65 -3 4 4 25 17 47 12 23 21 42 20 43 -4 4 -327 -149 -621 -294 -257 -126 -271 -131 -315 -125 -43 5 -58 0 -187 -62 -77 -37 -194 -104 -260 -148 -66 -44 -148 -90 -185 -103 -36 -13 -86 -33 -113 -45 l-47 -21 -25 23 c-13 13 -29 38 -35 56 l-11 34 -31 -16 c-52 -27 -104 -12 -215 63 -54 37 -192 118 -308 181 -115 63 -248 138 -295 166 -83 50 -84 52 -103 112 -32 99 -25 114 106 236 61 58 130 116 153 130 66 42 244 116 504 209 l245 88 -105 1 c-146 2 -212 27 -149 57 84 40 444 205 546 249 204 89 273 102 543 105 l175 1 90 -43 c50 -24 93 -45 96 -46 4 -2 4 8 2 22 -4 17 -1 25 8 25 24 -1 93 -36 114 -59 19 -22 19 -23 0 -57 -22 -41 -70 -81 -135 -114 -46 -23 -482 -331 -477 -336 2 -2 52 15 111 37 59 23 110 39 113 35 22 -22 -67 -117 -289 -309 -36 -32 -73 -69 -82 -82 l-16 -24 35 15 c46 19 91 18 99 -2 11 -28 -25 -76 -143 -197 l-115 -118 74 27 c52 18 127 61 240 138 125 85 183 117 244 138 55 18 75 29 63 34 -32 12 -16 29 61 66 72 34 253 169 347 258 22 21 51 43 64 50 24 12 24 12 18 -24 -3 -20 -4 -36 -2 -36 10 0 102 151 126 208 53 128 46 260 -24 407 -78 164 -281 318 -488 369 -180 44 -534 84 -624 70z" style="
    fill: #d03737;
"></path>
            <path id="pbcZjDPFV" d="M3592 2548 c-29 -29 3 -88 48 -88 59 0 56 69 -3 90 -36 12 -31 12 -45 -2z"></path>
        </g>
    </g>
</svg>
      </template>

      <!--   <template #headline>
        <NuxtLink :to="page.hero.cta.to">
          <UBadge variant="subtle" size="lg" class="relative rounded-full font-semibold dark:hover:bg-primary-400/15 dark:hover:ring-primary-700">
            {{ page?.hero.cta.label }}
            <UIcon
              v-if="page?.hero.cta.icon"
              :name="page?.hero.cta.icon"
              class="ml-1 w-4 h-4 pointer-events-none"
            />
          </UBadge>
        </NuxtLink>
      </template> -->

      <template #title> 
<!-- <span style="font-family: 'Agency FB', sans-serif;"  class="text-primary text-6xl uppercase block lg:inline-block">Schema</span> -->
<br><span  class="text-3xl sm:text-4xl text-primary dark:text-white uppercase block lg:inline-block">{{ t(page.hero.title) }}</span>
      </template>

      <template #description>
        <div class="text-muted-500 xs:!text-base mx-auto max-w-2xl dark:text-gray-400/90 text-justify">{{ t(page.hero.intro) }}</div>
      </template>

      <template #links>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <ShakeButton />
          
        <!--     <UButton size="lg" color="gray" variant="ghost" trailing-icon="i-ph-play-circle" @click="videoModalOpen = true">
              Get Started
            </UButton> -->
          </div>
       <!--    <UInputCopy value="npx nuxi@latest init " label="npx nuxi@latest init <my-app>" class="w-full" /> -->
        </div>

        <UModal v-model="videoModalOpen" :ui="{ width: 'sm:max-w-4xl lg:max-w-5xl aspect-[16/9]' }">
          <div class="p-3 h-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube-nocookie.com/embed/HzdCvWKVZVM"
              title="Schema in 100 Seconds"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        </UModal>
      </template>


      <svg v-if="uwuCookie"  alt="Schema Logo in hairy style" class="mx-auto lg:my-16" style="opacity: 1;" width="455"
      height="456" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6260 7070">
    <g id="l7k50ZCdQCnwMdZN64m5wPz" fill="rgb(226,31,38)" style="transform: none;">
        <g>
            <path id="pMn9k8SPH" d="M3455 6234 c-115 -19 -285 -58 -342 -80 -38 -14 -143 -45 -235 -69 -200 -53 -304 -91 -553 -203 -104 -46 -259 -116 -344 -154 -156 -70 -284 -146 -377 -224 -61 -52 -91 -64 -121 -53 -53 20 -13 102 126 259 60 68 62 72 25 45 -23 -17 -107 -91 -188 -165 -80 -74 -169 -147 -197 -161 -56 -28 -81 -60 -105 -134 -21 -65 -38 -83 -63 -68 -17 10 -19 8 -24 -30 -9 -65 9 -215 32 -281 12 -33 21 -69 21 -80 0 -12 7 -30 15 -40 19 -26 19 -60 -1 -102 -21 -43 -47 -44 -132 -4 -34 16 -62 27 -62 25 0 -3 43 -51 95 -107 52 -57 95 -106 95 -110 0 -5 -9 -8 -20 -8 -27 0 -231 44 -349 75 -52 14 -95 24 -97 22 -2 -2 74 -47 169 -100 94 -53 186 -106 202 -118 l30 -21 -75 6 -75 6 61 -39 c34 -22 71 -44 83 -50 31 -17 26 -27 -24 -46 -34 -13 -64 -16 -122 -13 l-78 5 64 -29 c36 -17 117 -43 180 -60 120 -31 179 -56 292 -126 208 -127 384 -200 453 -187 36 7 179 -36 269 -82 55 -28 127 -89 127 -109 0 -7 -15 -21 -32 -30 -18 -9 -73 -56 -123 -103 -111 -107 -147 -132 -302 -210 -89 -44 -126 -68 -137 -88 -23 -44 -99 -113 -266 -238 -85 -65 -146 -115 -135 -111 37 11 127 26 156 26 22 0 29 -5 29 -20 0 -22 -21 -36 -90 -56 -68 -20 -272 -126 -329 -171 -27 -21 -53 -50 -60 -64 -13 -30 -56 -56 -166 -98 -44 -17 -89 -38 -100 -47 -19 -14 -17 -14 23 -8 69 11 53 -15 -80 -130 -108 -92 -248 -234 -248 -250 0 -11 103 45 179 96 141 96 264 137 441 148 88 5 142 14 183 29 32 12 94 24 138 28 87 7 92 2 67 -52 -6 -14 -9 -27 -6 -30 3 -3 99 33 214 81 115 47 272 108 349 136 77 28 187 72 244 99 88 41 113 49 163 49 39 0 90 10 146 29 48 16 112 37 142 46 30 9 93 39 139 67 47 28 119 66 160 85 42 18 142 67 223 108 80 41 155 75 167 75 32 0 266 -147 377 -237 95 -77 184 -138 266 -183 21 -11 42 -29 48 -39 15 -29 12 -83 -5 -108 -14 -20 -13 -23 15 -40 16 -9 30 -25 30 -34 0 -29 -52 -81 -105 -105 l-50 -23 130 -1 c273 -3 272 -44 -8 -258 -78 -59 -164 -125 -191 -146 -69 -53 -126 -77 -208 -87 -38 -5 -88 -18 -111 -29 -72 -36 -190 -107 -242 -146 -58 -44 -107 -59 -248 -74 -56 -6 -172 -27 -257 -46 -176 -39 -336 -63 -629 -95 -219 -24 -239 -23 -338 21 -30 13 -43 25 -43 38 0 22 125 149 168 171 15 7 54 37 87 66 33 28 87 70 120 92 75 51 190 143 179 143 -5 0 -25 -4 -44 -9 -111 -28 -117 -21 -32 41 119 87 260 215 285 257 l18 31 -34 -16 c-73 -35 -92 18 -29 77 69 65 176 145 352 263 96 65 182 125 190 133 32 33 -513 -253 -559 -293 -50 -43 -134 -94 -158 -94 -8 0 -45 -14 -83 -30 -38 -17 -81 -31 -97 -31 -21 -1 -23 -3 -8 -6 45 -11 33 -22 -47 -47 -91 -28 -177 -78 -380 -221 -110 -78 -123 -85 -126 -65 -2 12 -9 19 -15 17 -20 -6 -85 -98 -127 -180 -37 -73 -40 -84 -40 -161 0 -165 36 -270 134 -387 133 -159 244 -220 551 -302 112 -29 131 -31 280 -31 202 1 541 34 808 80 248 42 662 192 1050 380 163 79 302 144 307 144 6 0 15 -11 21 -24 16 -34 -23 -102 -119 -206 l-77 -84 86 64 c48 36 115 89 150 119 l64 54 3 -29 c6 -58 13 -57 41 2 31 66 53 88 93 98 37 8 73 56 114 150 19 44 36 82 40 85 8 9 24 -21 24 -49 l1 -25 11 25 c6 14 10 86 10 160 0 93 6 166 19 235 10 55 19 110 19 122 0 22 9 27 73 39 l37 6 -45 47 c-61 62 -115 144 -122 185 l-5 33 103 8 104 7 -94 44 -93 44 3 87 4 88 -21 -24 c-12 -14 -26 -21 -33 -17 -16 10 -59 97 -91 186 l-28 74 -113 38 c-148 49 -366 157 -418 206 -45 43 -60 84 -40 109 8 9 32 30 54 46 32 24 35 28 15 23 -14 -3 -74 -9 -135 -12 -127 -7 -168 3 -163 38 4 27 94 102 207 171 69 43 95 67 149 137 37 47 85 108 108 135 23 28 56 73 73 100 37 59 120 146 176 185 56 39 407 400 423 435 8 17 19 41 26 55 7 15 42 42 86 67 155 86 179 113 99 113 -50 0 -51 19 -1 48 40 22 165 147 278 276 81 93 64 87 -94 -32 -53 -40 -119 -86 -147 -102 -76 -43 -189 -77 -300 -90 -75 -8 -114 -18 -156 -40 -56 -28 -246 -76 -258 -65 -3 4 4 25 17 47 12 23 21 42 20 43 -4 4 -327 -149 -621 -294 -257 -126 -271 -131 -315 -125 -43 5 -58 0 -187 -62 -77 -37 -194 -104 -260 -148 -66 -44 -148 -90 -185 -103 -36 -13 -86 -33 -113 -45 l-47 -21 -25 23 c-13 13 -29 38 -35 56 l-11 34 -31 -16 c-52 -27 -104 -12 -215 63 -54 37 -192 118 -308 181 -115 63 -248 138 -295 166 -83 50 -84 52 -103 112 -32 99 -25 114 106 236 61 58 130 116 153 130 66 42 244 116 504 209 l245 88 -105 1 c-146 2 -212 27 -149 57 84 40 444 205 546 249 204 89 273 102 543 105 l175 1 90 -43 c50 -24 93 -45 96 -46 4 -2 4 8 2 22 -4 17 -1 25 8 25 24 -1 93 -36 114 -59 19 -22 19 -23 0 -57 -22 -41 -70 -81 -135 -114 -46 -23 -482 -331 -477 -336 2 -2 52 15 111 37 59 23 110 39 113 35 22 -22 -67 -117 -289 -309 -36 -32 -73 -69 -82 -82 l-16 -24 35 15 c46 19 91 18 99 -2 11 -28 -25 -76 -143 -197 l-115 -118 74 27 c52 18 127 61 240 138 125 85 183 117 244 138 55 18 75 29 63 34 -32 12 -16 29 61 66 72 34 253 169 347 258 22 21 51 43 64 50 24 12 24 12 18 -24 -3 -20 -4 -36 -2 -36 10 0 102 151 126 208 53 128 46 260 -24 407 -78 164 -281 318 -488 369 -180 44 -534 84 -624 70z" style="
    fill: #d03737;
"></path>
            <path id="pbcZjDPFV" d="M3592 2548 c-29 -29 3 -88 48 -88 59 0 56 69 -3 90 -36 12 -31 12 -45 -2z"></path>
        </g>
    </g>
</svg>

    </LandingHero>
  </div>
</template>

<style scoped>
.dark .landing-button {
  background-color: rgb(255 0 0 / 31%);
}
.dark .landing-button:hover {
  background-color: #ff000036;
}
.landing-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 212px;
  background-color: rgb(206 44 29 / 90%);
  border: 1px solid rgba(255, 0, 0, .3);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  text-transform: uppercase;
  transition: background-color .15s ease-in-out, transform .15s ease-in-out, box-shadow .15s ease-in-out;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
body {
  transition: transform 0.5s;
}
.landing-button:hover {
  background-color: #b70000d4;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.landing-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  height: 100%;
  width: 100%;
  background-image: radial-gradient(circle at 50% 10px, #ff0000, transparent 30%);
  opacity: 0.3;
  transition: background-image .15s ease-in-out;
}

.landing-button:hover:before {
  background-image: radial-gradient(circle at 50% 0, #ff0000, transparent 20%);
}

.landing-button:after {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 1px;
  background-image: linear-gradient(to right, rgba(255, 0, 0, 0), #ff0000, rgba(255, 0, 0, 0));
  transition: background-image .15s ease-in-out;
}

.landing-button:hover:after {
  background-image: linear-gradient(to right, rgba(255, 0, 0, 0.3), #ff0000, rgba(255, 0, 0, 0.3)); /* Brighter edge lines */
}

/* Mobile-only adjustments */
@media (max-width: 640px) {
  .map {
    width: 100vw;
    transform: translate(10%, -40%);
    padding: 0;
  }
  #WorldMap {
    transform: scale(0.9) translateX(5%);
    max-width: 95vw !important;
  }
}
</style>
