<script setup>
const newsStore = useNewsStore();
import { marked } from 'marked';
onMounted(async () => {
 // console.log('Fetching news items...');
  await newsStore.fetchNews();
 // console.log('News items after fetch:', newsStore.newsItems);
});

const reactiveNewsItems = computed(() => [...newsStore.newsItems]);
const { isLoading, error } = newsStore;

//console.log('isLoading:', isLoading);
//console.log('error:', error);
//console.log('reactiveNewsItems:', reactiveNewsItems.value);
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error loading news: {{ error }}</div>
    <div v-else-if="reactiveNewsItems.length === 0"> 
      <BaseCard
        elevated
        class="news"
      >  <div>
    <BasePlaceholderPage title="Loading news">
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
  </BaseCard> 
</div>
    <div v-else>
      <BaseCard
        elevated
        v-for="news in reactiveNewsItems"
        :key="news.id"
      > 
    <template #header>
   
      <div class="flex items-center gap-4">
          <BaseUserAvatar
            :src="news.user_avatar"
            :alt="news.user_username"
            size="md"
            rounded="full"
            mask="blob"
            class="bg-muted-100 dark:bg-muted-900"
          />
          <div>

            <BaseUserProfile class="line-clamp-1 mb-0.5" :size="'sm'" :username="`${news.user_username}`" />
            <BaseParagraph
              size="xs"
              lead="none"
              class="text-gray-600 dark:text-gray-400 line-clamp-1"
            >
              {{ news.user_subtitle }}
            </BaseParagraph>
          </div>
        </div>
    </template>

        <div class="mb-6 text-justify news"> <!-- markdown -->
          <BaseParagraph size="sm"  lead="none" class="text-gray-500 dark:text-gray-400">
            <div v-html="marked.parse(news.content)"></div>
          </BaseParagraph>
        </div>
        <div>
         <!--  <BaseButton
            variant="pastel"
            rounded="md"
            color="primary"
            class="!h-8 !font-semibold !text-xs mb-1 w-full"
          >
            {{ news.button_text || 'View Profile' }}
          </BaseButton> -->
        </div>
      </BaseCard>
    </div>
  </div>
</template>


<style scoped>
::v-deep(.news p) {
  margin-top: 15px;
}
</style>
