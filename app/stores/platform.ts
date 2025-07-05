import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useApiService } from '../composables/useApiService';
import type { PlatformData } from '../types/platform';

export const usePlatformStore = defineStore('platform', () => {
  const currentGameDay = ref<number | null>(null);
  const currentMission = ref<any | null>(null);
  const currentWave = ref<number | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const { useApi } = useApiService();

  async function fetchPlatformData() {
    const endpoint = 'platform.get';
    isLoading.value = true; // Set loading state to true before fetching

    try {
      // Corrected: provide the HTTP method 'GET' and use null for state ref
      const response = await useApi<PlatformData>('GET', endpoint, null, {}, isLoading, 'platform', true);
      
      if (response) {
        // Update individual states from the flattened response
        currentGameDay.value = response.currentGameDay || null;
        currentMission.value = response.currentMission || null;
        currentWave.value = response.currentWave || null;
      } else {
        console.warn('Fetched platform data is null or undefined:', response);
        resetPlatformData(); // Reset states in case of null or undefined response
      }
    } catch (err) {
      console.error('Error fetching platform data:', err);
      error.value = 'Failed to load platform data. Please try again.';
      resetPlatformData(); // Reset states in case of error
    } finally {
      isLoading.value = false; // Set loading state to false after fetching
    }
  }

  function resetPlatformData() {
    currentGameDay.value = null;
    currentMission.value = null;
    currentWave.value = null;
  }

  return {
    currentGameDay,
    currentMission,
    currentWave,
    isLoading,
    error,
    fetchPlatformData,
  };
});
