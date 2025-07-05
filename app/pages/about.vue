<script setup lang="ts">
import { joinURL } from 'ufo'
const route = useRoute()
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const currentPageSegment = computed(() => route.path.split('/')[1])
console.log(currentPageSegment)
const currentLocale = locale.value || 'en'
// Reactive path based on route + locale

const localizedPath = computed(() => `/${locale.value}/${currentPageSegment.value}`)

console.log('localizedPath', localizedPath)


console.log('currentLocale', currentLocale)
definePageMeta({
  layout: 'default',
  heroBackground: 'z-10',
    requiresAuth: false
})


/*  const { data: page, error, status } = await useAsyncData('index',
  () => queryContent('/').findOne(),
  {
     server: false, // Fetch on the server
    lazy: true,
     }
) */
//const { data: page, status, error  } = await useAsyncData('index', () => queryContent('/').findOne())
// Use a static key (e.g. "page") + an async fetch function
const { data: page, pending, error, refresh } = await useAsyncData(
  'page',
  async () => {
    try {
      const content = await queryContent(localizedPath.value).findOne()
      if (!content) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found' })
      }
      return content
    } catch (err) {
      console.error('Content fetch error:', err)
      throw createError({ statusCode: 500, statusMessage: 'Failed to fetch content' })
    }
  }
)

// Watch for changes in the current language
// Optionally, manually refresh when locale changes
watch(locale, () => {
  refresh()
})

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
console.log('PAGE', page)
console.log('PAGE.value', page.value)
/*  watchEffect(() => {
   console.log('Page value changed:', page.value)
 })

 watch(() => status.value, (isPending) => {
  console.log('Loading state:', isPending)
}); */

/*  watch(() => error.value, (err) => {
  if (err) {
    console.error('Error fetching page:', err)
  }
}); */
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

const site = useSiteConfig()
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
  <div v-else-if="error" class="error-message">
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
      <UButton
        label="Try again"
        color="gray"
        size="lg"
      />
    </div>

</BasePlaceholderPage>
  </div>
  <div v-else class="dark:bg-sblack-800 lifting-content">

<!-- Use UContainer as the main wrapper -->
<UContainer class="flex flex-col relative min-h-screen w-full overflow-hidden">
    <!-- Spacing around main content -->
    <div class="pt-[50px] lg:pb-[60px] lg:px-4 flex flex-col items-center justify-center">
      <div class="relative w-full max-w-7xl">

        <!-- First row -->
        <div class="flex">
          <!-- Left column -->
          <div class="m-auto p-5 lg:p-10 lg:w-1/2">
            <h1
  class="text-4xl font-semibold leading-tight text-muted-800 mx-auto mb-4 max-w-2xl dark:text-white uppercase tracking-[1px]"
  style="font-family: 'Agency FB Cyrillic';"
>
<!--   {{ t('about.network') }} --> {{ page?.section_network?.title }}
</h1>

            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ page?.section_network?.description }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ page?.section_network?.description_2 }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ page?.section_network?.description_3 }}
            </p>
          </div>

          <!-- Right column (image) -->
          <div class="hidden lg:flex lg:w-1/2 justify-end items-center pr-10">
            <img src="/assets/landing/id.svg" alt="ID Card" class="w-full" />
          </div>
        </div>

        <!-- Second row -->
        <div class="flex">
          <!-- Left column (image) -->
          <div class="hidden lg:flex lg:w-1/2 justify-end items-center pr-10">
            <img src="/assets/landing/mobile.svg" alt="ID Card with Lanyard" class="w-full" />
          </div>

          <!-- Right column -->
          <div class="m-auto p-5 lg:p-10 lg:w-1/2">
            <h1
  class="text-4xl font-semibold leading-tight text-muted-800 mx-auto mb-4 max-w-2xl dark:text-white uppercase tracking-[1px]"
  style="font-family: 'Agency FB Cyrillic';"
>
{{ page?.section_2030?.title }} 
              <span
                class="text-red-500 font-hairline underline decoration-dotted underline-offset-4"
              >
              2030
              </span>
</h1>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ page?.section_2030?.description }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ page?.section_2030?.description_2 }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ page?.section_2030?.description_3 }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ page?.section_2030?.description_4 }}
            </p>
          </div>
        </div>

      </div>
    </div>
    <!-- Footer -->
     <!-- <LandingFooter />-->
  </UContainer>
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
