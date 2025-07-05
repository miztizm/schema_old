<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    icon?: string
    picture?: string
    avatar?: string
    badge?: string
    initials?: string
    label?: string
    hideLabel?: boolean
    trimSubtitle?: boolean // New prop for controlling subtitle trimming
  }>(),
  {
    subtitle: undefined,
    icon: undefined,
    picture: undefined,
    avatar: undefined,
    badge: undefined,
    initials: undefined,
    label: undefined,
    trimSubtitle: false, // Default to false so the full subtitle is shown by default
  },
)
import DOMPurify from 'dompurify';

const trimmedSubtitle = computed(() => {
  if (props.trimSubtitle && props.subtitle) {
    const sanitized = DOMPurify.sanitize(props.subtitle); // Ensure sanitized before trimming
    return sanitized.length > 55 ? `${sanitized.substring(0, 55)}...` : sanitized;
  }
  return props.subtitle ? DOMPurify.sanitize(props.subtitle) : '';
});
</script>

<template>
  <div
    class="relative mb-4 flex grow items-start gap-4 px-6 sm:mb-0 sm:px-2"
    :class="props.picture && !props.avatar && !props.icon ? '' : 'h-full'"
  >
    <span
      v-if="props.label"
      class="text-muted-400 dark:text-primary-600 absolute hidden font-sans text-xs font-medium uppercase sm:-top-10 sm:start-2 sm:block"
      :class="props.hideLabel ? 'sm:hidden' : ''"
    >
      {{ props.label }}
    </span>
    <BaseAvatar
      v-if="
        (props.avatar && !props.icon && !props.picture) ||
          (props.initials && !props.icon && !props.picture)
      "
      :src="props.avatar"
      :badge-src="props.badge"
      :text="props.initials"
      class="bg-primary-600/20 text-primary-500"
      size="md"
    />
    <BaseIconBox
      v-else-if="props.icon && !props.avatar && !props.picture"
      :icon="props.icon"
      size="sm"
      class="bg-primary-600/20 text-primary-500 dark:bg-primary-900/50 dark:text-primary-300"
      color="none"
    >
      <Icon :name="props.icon" class="size-5" />
    </BaseIconBox>
    <div
      v-else-if="props.picture && !props.avatar && !props.icon"
      class="relative shrink-0"
    >
      <img
        :src="props.picture"
        :alt="props.title"
        class="size-10 rounded-lg object-cover"
      >
    </div>

    <div>
      <BaseHeading
       v-if="props.title"
        as="h4"
        size="xs"
        weight="medium"
        lead="tight"
        class="text-gray-700 dark:text-primary-400 mb-1"
      >
        <span>{{ props.title }}</span>

        <!-- <NuxtLink to="/mission/{{ props.slug }}" class="text-primary-500 dark:text-primary-400">
                    <span>{{ props.title }}</span>
                  </NuxtLink> -->
      </BaseHeading>
      <BaseParagraph
        size="xs"
        lead="tight"
        class="markdown text-muted-500 dark:!text-primary-500 md:!text-xs"
      >
        <span v-html="trimmedSubtitle"></span>
      </BaseParagraph>
    </div>
  </div>
</template>
