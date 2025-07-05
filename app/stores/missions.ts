import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useApiService } from '../composables/useApiService';

interface Mission {
  // Define mission properties as needed
  id: number;
  [key: string]: any;
}

interface MissionsData {
  data: Mission[];
  currentPage: number;
  lastPage: number;
  total: number;
}

export const useMissionsStore = defineStore('useMissions', () => {
  const useMissions = ref<Mission[] | null>(null);
  const missionsData = ref<MissionsData>({ data: [], currentPage: 1, lastPage: 1, total: 0 });
  const isLoading = ref<boolean>(false);
  const { useApi, error } = useApiService();

  // Fetch missions with filtering options (pagination, filters)
  async function fetchMissions(params: { filter: string; perPage: number; page: number } = { filter: '', perPage: 24, page: 1 }): Promise<void> {
    const endpoint = 'missions';
    isLoading.value = true;
    try {
      const response = await useApi<MissionsData>('GET', endpoint, null, params, isLoading, 'global missions', false);
      if (response) {
        missionsData.value = response;
      }
    } catch (err) {
      // ...existing error handling (already done in useApi)...
    } finally {
      isLoading.value = false;
    }
  }

  return {
    // ...existing code...
    useMissions,
    missionsData,
    isLoading,
    error,
    fetchMissions,
  };
});
