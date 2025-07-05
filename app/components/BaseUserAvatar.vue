<template>
  <UAvatar
    :src="avatarUrl"
    :alt="alt"
    :size="size"
    :rounded="rounded"
    :chip-color="chipColor"
    :chip-text="chipText"
    :chip-position="chipPosition"
    :icon="icon"
  />
</template>

<script>


export default {
  props: {
    /**
     * Custom avatar variable. If not provided, falls back to auth.user.avatar.
     */
    src: {
      type: String,
      default: null,
    },
    /**
     * Avatar size. Accepts values such as '2xs', 'xs', 'sm', 'md', 'lg', 'xl', etc.
     */
    size: {
      type: String,
      default: '2xl',
    },
    /**
     * Controls the border radius of the avatar.
     */
    rounded: {
      type: String,
      default: 'full',
    },
    /**
     * Alternative text for the avatar image.
     */
    alt: {
      type: String,
      default: 'Avatar',
    },
    /**
     * Chip color to be shown on the avatar (e.g. 'primary', 'violet').
     */
    chipColor: {
      type: String,
      default: null,
    },
    /**
     * Text to be displayed inside the chip.
     */
    chipText: {
      type: [String, Number],
      default: null,
    },
    /**
     * Position of the chip. Options: 'top-right', 'bottom-right', 'top-left', 'bottom-left'.
     */
    chipPosition: {
      type: String,
      default: 'top-right',
    },
    /**
     * Icon name (from Iconify) to be displayed over the avatar.
     */
    icon: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const auth = useAuthStore();

    // Compute the avatar URL dynamically: use the provided prop, or fall back to auth.user.avatar.
    const avatarUrl = computed(() => {
      const avatar = props.src || auth.user?.avatar;
      return avatar
        ? `https://api.schema.cx/storage/avatars/${avatar}`
        : 'https://api.schema.cx/storage/avatars/default.png';
    });

    console.log(avatarUrl);  

    return {
      avatarUrl,
      // All other props (alt, size, rounded, chipColor, chipText, chipPosition, icon) are automatically available.
    };
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
