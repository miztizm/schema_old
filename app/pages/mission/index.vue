<script setup>
definePageMeta({
  title: 'Profile',
  layout: "dashboard",
  requiresAuth: true,
  middleware: "auth",
  preview: {
    title: 'Profile',
    description: 'For displaying a user profile',
    categories: ['layouts', 'profile'],
    src: '/img/screens/layouts-subpages-profile.userProfile.png',
    srcDark: '/img/screens/layouts-subpages-profile-dark.png',
    order: 75,
  },
})

const router = useRouter();
const auth = useAuthStore();

onMounted(() => {
  // Assuming the auth store has a user object with a username or similar identifier
  if (auth.user) {
    router.push(`/missions/`);
  } else {
    // Redirect to login or another appropriate page if not logged in or user info is missing
    router.push('/dashboard');
  }
});
</script>

<template>
  <!-- You can optionally show a loading indicator here while the redirect is processed -->
  <div>Redirecting...</div>
</template>
