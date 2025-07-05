<script setup lang="ts">
const props = defineProps<{
  rounded?: 'none' | 'sm' | 'md' | 'lg'
  spaced?: boolean
  condensed?: boolean
  link?: string // Add a new optional link prop
}>()
</script>

<template>
  <div
    :rounded="props.rounded"
    class="relative bg-gray-100/20 hover:bg-primary-100/70 dark:bg-primary-950 cursor-pointer dark:hover:bg-primary-950/70 rounded-md hover:rounded-lg"
    :class="[
      props.spaced ? 'px-2 py-6 sm:py-4' : 'py-6 sm:py-2',
      props.condensed
        ? 'top-px first:rounded-t-lg last:rounded-b-lg [&:not(:first-child)]:border-t-0'
        : '',
    ]"
  >
    <!-- Wrap content in a conditional link -->
    <template v-if="props.link">
      <a :href="props.link" class="block w-full">
        <slot />
        <div class="flex w-full flex-col sm:flex-row sm:items-center">
          <slot name="start" />
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
            <slot name="end" />
          </div>
        </div>
      </a>
    </template>
    <template v-else>
      <slot />
      <div class="flex w-full flex-col sm:flex-row sm:items-center">
        <slot name="start" />
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <slot name="end" />
        </div>
      </div>
    </template>
  </div>
</template>
