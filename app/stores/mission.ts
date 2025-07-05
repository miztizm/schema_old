import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApiService } from '@/composables/useApiService'
import type { Ref } from 'vue'

/* --- Type Definitions --- */
export interface MissionProfile {
  slug: string;
  title: string;
  subtitle: string;
  proof_files?: number;
  user_mission_status?: string;
  // ...other properties as needed
  [key: string]: any;
}

export interface Role {
  id: number;
  slug: string;
  title: string;
  icon?: string;
  messages_count?: number;
  is_optional?: boolean;
  has_role?: boolean;
  open_slots?: number;
  pulses_cost?: number;
  [key: string]: any;
}

export interface Thread {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  icon?: string;
  messages_count: number;
  [key: string]: any;
}

export interface Message {
  id: number;
  description: string;
  created_at: string;
  user_id: number;
  [key: string]: any;
}

export interface Proof {
  id: number;
  status: string;
  type: string;
  text?: string;
  created_at: string;
  file_path?: string;
  [key: string]: any;
}

export interface Pagination<T> {
  data: T[];
  currentPage: number;
  lastPage: number;
  total: number;
}

/* --- Reactive State --- */
export const useMissionStore = defineStore('useMission', () => {
  const useMission: Ref<MissionProfile | null> = ref(null)
  const roles: Ref<Pagination<Role>> = ref({ data: [], currentPage: 1, lastPage: 1, total: 0 })
  const threads: Ref<Pagination<Thread>> = ref({ data: [], currentPage: 1, lastPage: 1, total: 0 })
  const messages: Ref<Pagination<Message>> = ref({ data: [], currentPage: 1, lastPage: 1, total: 0 })
  const proofs: Ref<Pagination<Proof>> = ref({ data: [], currentPage: 1, lastPage: 1, total: 0 })

  const isLoadingMission = ref<boolean>(false)
  const isLoadingRoles = ref<boolean>(false)
  const isLoadingThreads = ref<boolean>(false)
  const isLoadingMessages = ref<boolean>(false)
  const isLoadingProofs = ref<boolean>(false)
  const isLoadingAcceptMission = ref<boolean>(false)
  const isLoadingCompleteMission = ref<boolean>(false)
  const isPostingThread = ref<boolean>(false)
  const isPostingReply = ref<boolean>(false)
  const activeThread = ref<Thread | null>(null)
  const isLoadingProof = ref<boolean>(false)

  const { useApi } = useApiService()

  /* --- Fetch Functions --- */
  async function fetchMissionProfile(slug: string): Promise<void> {
    const endpoint = `mission/${slug}`
    isLoadingMission.value = true
    try {
      await useApi<MissionProfile>('GET', endpoint, useMission, {}, isLoadingMission, 'mission profile', false)
    } finally {
      isLoadingMission.value = false
    }
  }

  async function fetchMissionRoles(
    slug: string,
    { page = 1, perPage = 10, filter = '' } : { page?: number; perPage?: number; filter?: string } = {}
  ): Promise<void> {
    const endpoint = `mission/${slug}/roles`
    await useApi<Pagination<Role>>(
      'GET',
      endpoint,
      roles,
      { page, perPage, filter },
      isLoadingRoles,
      'mission roles',
      false
    )
  }

  async function fetchMissionThreads(
    slug: string,
    { page = 1, perPage = 10, filter = '' } : { page?: number; perPage?: number; filter?: string } = {}
  ): Promise<void> {
    const endpoint = `mission/${slug}/board/threads`
    await useApi<Pagination<Thread>>(
      'GET',
      endpoint,
      threads,
      { page, perPage, filter },
      isLoadingThreads,
      'mission threads',
      false
    )
  }

  async function fetchMissionMessages(
    slug: string,
    threadSlug: string,
    { page = 1, perPage = 10, filter = '' } : { page?: number; perPage?: number; filter?: string } = {}
  ): Promise<void> {
    const endpoint = `mission/${slug}/board/thread/${threadSlug}`
    await useApi<Pagination<Message>>(
      'GET',
      endpoint,
      messages,
      { page, perPage, filter },
      isLoadingMessages,
      'thread messages',
      false
    )
  }

  /* --- Action Functions --- */
  async function acceptMission(slug: string): Promise<void> {
    const endpoint = `mission/${slug}/accept`
    isLoadingAcceptMission.value = true
    try {
      await useApi<any>('POST', endpoint, null, {}, isLoadingAcceptMission, 'accept mission', false)
      console.log('Mission accepted successfully!')
    } finally {
      isLoadingAcceptMission.value = false
    }
  }

  async function completeMission(slug: string): Promise<void> {
    const endpoint = `mission/${slug}/complete`
    isLoadingCompleteMission.value = true
    try {
      await useApi<any>('POST', endpoint, null, {}, isLoadingCompleteMission, 'complete mission', false)
      console.log('Mission completed successfully!')
    } finally {
      isLoadingCompleteMission.value = false
    }
  }

  async function submitNewThread(slug: string, payload: Partial<Thread>): Promise<void> {
    const endpoint = `mission/${slug}/board/threads`
    isPostingThread.value = true
    try {
      await useApi<Thread>('POST', endpoint, null, payload, isPostingThread, 'posting new thread', false)
    } finally {
      isPostingThread.value = false
    }
  }

  async function submitThreadReply(slug: string, threadSlug: string, payload: { content: string }): Promise<{ data: Message } | null> {
    isPostingReply.value = true
    try {
      const endpoint = `mission/${slug}/board/thread/${threadSlug}/replies`
      return await useApi<{ data: Message }>('POST', endpoint, null, payload, isPostingReply, 'posting reply', false)
    } finally {
      isPostingReply.value = false
    }
  }

  async function deleteMessage(slug: string, threadSlug: string, messageId: number): Promise<void> {
    const endpoint = `mission/${slug}/board/thread/${threadSlug}/messages/${messageId}`
    await useApi<any>('DELETE', endpoint, null, {}, isLoadingMessages, 'delete message', false)
  }

  async function submitProof(missionSlug: string, payload: any): Promise<any> {
    const endpoint = `mission/${missionSlug}/proofs`
    isLoadingProof.value = true
    try {
      const response = await useApi<any>('POST', endpoint, proofs, payload, isLoadingProof, 'submit proof', false)
      if (response) {
        console.log('Proof submitted successfully:', response)
        // Update proof count if necessary:
        if (useMission.value) {
          useMission.value.proof_files = (useMission.value.proof_files || 0) + 1
        }
        // Optionally show a success toast
      }
      return response
    } finally {
      isLoadingProof.value = false
    }
  }

  async function fetchMissionProofs(
    missionSlug: string,
    { page = 1, perPage = 10, filter = '' } : { page?: number; perPage?: number; filter?: string } = {}
  ): Promise<void> {
    const endpoint = `mission/${missionSlug}/proofs/files`
    await useApi<Pagination<Proof>>(
      'GET',
      endpoint,
      proofs,
      { page, perPage, filter },
      isLoadingProofs,
      'fetch proofs by mission',
      false
    )
  }

  async function deleteThread(missionSlug: string, threadId: number): Promise<void> {
    const endpoint = `mission/${missionSlug}/board/threads/${threadId}`
    try {
      await useApi<any>('DELETE', endpoint, null, {}, isLoadingThreads, 'delete thread', false)
      // Refresh threads list after deletion
      await fetchMissionThreads(missionSlug, { page: threads.value.currentPage, perPage: 10 })
      // If the deleted thread was active, update activeThread accordingly
      if (activeThread.value && activeThread.value.id === threadId) {
        if (threads.value.data.length > 0) {
          activeThread.value = threads.value.data[0]
          await fetchMissionMessages(missionSlug, activeThread.value.slug, { page: 1, perPage: 10 })
        } else {
          activeThread.value = null
          messages.value.data = []
        }
      }
      console.log('Thread deleted successfully!')
    } catch (err) {
      console.error('Error deleting thread:', err)
      throw err
    }
  }

  return {
    useMission,
    roles,
    threads,
    messages,
    proofs,
    isLoadingMission,
    isLoadingProofs,
    isLoadingRoles,
    isLoadingThreads,
    isLoadingMessages,
    isLoadingAcceptMission,
    isLoadingCompleteMission,
    isPostingThread,
    isPostingReply,
    activeThread,
    isLoadingProof,
    fetchMissionProfile,
    fetchMissionRoles,
    fetchMissionThreads,
    fetchMissionProofs,
    fetchMissionMessages,
    deleteThread,
    deleteMessage,
    submitNewThread,
    submitThreadReply,
    acceptMission,
    completeMission,
    submitProof,
  }
})
