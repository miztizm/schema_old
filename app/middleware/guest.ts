// middleware/guest.ts

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth; 
  console.log('Requires authentication:', requiresAuth ? 'Yes' : 'No');

  // Ensure synchronization for consistency
  await authStore.sync()

  console.log('Guest Middleware - Route info:', {
    path: to.path,
    requiresAuth,
    isAuthenticated: authStore.isAuthenticated
  })

  if (authStore.isAuthenticated && !requiresAuth) {
    console.log('Guest Middleware - Redirecting authenticated user to dashboard')
    return navigateTo('/dash')
  }

  console.log('Guest Middleware - Access granted:', to.path)
})