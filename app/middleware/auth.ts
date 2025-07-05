// middleware/auth.ts

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth; 
  // Ensure user data and token are synchronized
  await authStore.sync()

  console.log('Auth Middleware - Route info:', {
    path: to.path,
    requiresAuth,
    isAuthenticated: authStore.isAuthenticated
  })

  if (!authStore.isAuthenticated) {
    console.log('Auth Middleware - Redirecting to login')
    return navigateTo('/auth')
  }

  console.log('Auth Middleware - Access granted:', to.path)
})