<template>
  <NuxtLink
    :to="`/profile/${username}`"
    class="profile-link font-semibold"
    :class="[textSizeClass, roleClass]"
  >
    {{ username }}
  </NuxtLink>
</template>

<script>

export default {
  props: {
    // Prop for text size
    size: {
      type: String,
      default: 'xs', // Default size is 'xs'
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value),
    },
    // Prop for custom username, defaults to the logged-in user's username
    username: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const auth = useAuthStore()

    // Compute the username dynamically based on the username prop or auth.user.username
    const username = computed(
      () => props.username || auth.user?.username || 'anonymous'
    )

    // Compute the text size class dynamically based on the size prop
    const textSizeClass = computed(() => {
      switch (props.size) {
        case 'sm':
          return 'text-sm'
        case 'md':
          return 'text-md'
        case 'lg':
          return 'text-lg'
        case 'xl':
          return 'text-xl'
        case '2xl':
          return 'text-2xl'
        case '3xl':
          return 'text-3xl'
        case '4xl':
          return 'text-4xl'
        default:
          return 'text-xs'
      }
    })

    // Compute the role-based class
    //text-pink-500 dark:text-pink-600
    const roleClass = computed(() => {
  if (auth.user?.roles?.includes('master')) {
    return 'text-yellow-600 dark:text-yellow-600'; // Master
  } else if (auth.user?.roles?.includes('admin')) {
    return 'text-blue-600 dark:text-blue-700'; // Admin (Architect)
  } else if (auth.user?.roles?.includes('agent')) {
    return 'text-teal-500 dark:text-teal-600'; // Agent (Moderator)
  } else if (auth.user?.roles?.includes('patron')) {
    return 'text-purple-500 dark:text-purple-600'; // Guardian
  } else if (auth.user?.roles?.includes('partner')) {
    return 'text-green-500 dark:text-green-600'; // Ally
  } else if (auth.user?.roles?.includes('citizen')) {
    return 'text-red-500 dark:text-red-600'; // Citizen
  } else if (auth.user?.roles?.includes('tourist')) {
    return 'text-gray-900 dark:text-gray-300'; // Tourist
  } else if (auth.user?.roles?.includes('moderator')) {
    return 'text-indigo-500 dark:text-indigo-600'; // Moderator
  } else if (auth.user?.roles?.includes('meta')) {
    return 'text-red-500 dark:text-red-600'; // Meta Citizen
  } else {
    return 'text-gray-500 dark:text-gray-400'; // Default (Unknown Role)
  }
});

    return {
      username,
      textSizeClass,
      roleClass,
    }
  },
}
</script>

<style scoped>
/* Add custom styles here if needed */
.profile-link {
  text-decoration: none;
}
</style>
