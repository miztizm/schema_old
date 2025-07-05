// stores/auth.ts

import { defineStore } from 'pinia'
import { useCookie } from '#app'
import type { User } from '~/types/user' // Define your User interface/type

//https://github.com/lewebsimple/nuxt3-fullstack/blob/a62ba31a9d1bf7dab46a4443c3dd03b48b489e1c/utils/jwt.ts

export const useAuthStore = defineStore('auth', () => {
  const { useApi } = useApiService();
  const user = ref<User | null>(null)
  const isInitialized = ref(false)
  const token = useCookie('token', { 
    path: '/', 
    sameSite: 'lax', 
    secure: process.env.NODE_ENV === 'production', 
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const loading = ref(false)

  // Function to set the token and fetch user data
  function setToken(newToken: string) {
    token.value = newToken
  }

  // Function to clear authentication data
  function clearAuth() {
    token.value = null
    user.value = null
  }

  // Function to fetch user data
  async function fetchUser() {
    loading.value = true
    try {
      const response = await useApi<{ user: User }>('GET', 'auth/user', null, {}, loading, 'fetch user')
      if (response?.user) {
        user.value = response.user
      } else {
        throw new Error('No user data received')
      }
    } catch (error: any) {
      console.error('Fetch user error:', error)
      clearAuth()
      throw error
    } finally {
      loading.value = false
    }
  }

  // Function to synchronize authentication state
  async function sync() {
    if (isInitialized.value) return;

    if (token.value) {
      try {
        await fetchUser();
      } catch (error) {
        // If there is an error fetching user, assume not authenticated
      }
    }

    isInitialized.value = true;
  }

  // Function to login
  async function login(email: string, password: string): Promise<{ ok: boolean; message: string; errors: any[] }> {
    loading.value = true
    try {
      const payload = { email, password };
      const response = await useApi<{ token?: string }>('POST', 'auth/login', null, payload, loading, 'login');
      console.log('Login response:', response)
      console.log('Token:', response.token)
      if (response.token) {
        setToken(response.token)
        await fetchUser()
        return { ok: true, message: '', errors: [] }
      }
      return {
        ok: false,
        message: response.error || 'Login failed',
        errors: []
      }
    } catch (error: any) {
      console.error('Login error:', error)
      return { ok: false, message: 'Login failed', errors: [error] }
    } finally {
      loading.value = false
    }
  }

  // Function to logout
  async function logout() {
    loading.value = true
    try {
      const response = await useApi('POST', 'auth/logout', null, {}, loading, 'logout')
      if (response.ok) {
        clearAuth()
        navigateTo('/auth')
      } else {
        console.error('Logout failed:', response.error)
        clearAuth()
        navigateTo('/auth')
      }
    } catch (error: any) {
      console.error('Logout error:', error)
      clearAuth()
      navigateTo('/auth')
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    fetchUser,
    login,
    logout,
    setToken,
    clearAuth,
    sync
  }
})