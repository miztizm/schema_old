import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useApiService } from '../composables/useApiService';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  user_avatar: string;
  user_username: string;
  user_subtitle: string;
  button_text?: string;
}

export const useNewsStore = defineStore('news', () => {
  const newsItems = ref<NewsItem[]>([]);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const { useApi } = useApiService();

  // Function to fetch all news items
  async function fetchNews() {
    const endpoint = 'news';
    isLoading.value = true; // Set loading state to true before fetching

    try {
    //  console.log('Fetching news from:', endpoint);

      const response = await useApi<NewsItem[]>('GET', endpoint, null, {}, isLoading, 'news', true);
     // console.log('Response from fetchData:', response);

      if (Array.isArray(response)) {
        newsItems.value = response;
       // console.log('Loaded news items:', newsItems.value);
      } else {
        console.warn('Fetched data is not an array:', response);
        newsItems.value = [];
      }
    } catch (err: any) {
      console.error('Error fetching news:', err);
      error.value = 'Failed to load news. Please try again.';
    } finally {
      isLoading.value = false; // Set loading state to false after fetching
    }
  }

  // Function to add a new news item
  async function addNews(newNewsItem: Partial<NewsItem>) {
    const endpoint = '/engine/news';
    try {
      // Passing null for stateRef as you don't need to update any state here
      const response = await useApi<NewsItem>('POST', endpoint, null, newNewsItem, isLoading, 'creating news', false);
      // Add the new news item to the local state
      newsItems.value.push(response as NewsItem);
      console.log('News item added successfully:', response);
    } catch (err: any) {
      console.error(`Error creating news item: ${err}`);
      error.value = `Error creating news item: ${err.message}`;
    }
  }

  return {
    newsItems,
    isLoading,
    error,
    fetchNews,
    addNews,
  };
});
