

<script setup lang="ts">
import { computed } from 'vue'

interface CardProps {
  /**
   * Adds a flat or on-hover shadow to the card.
   */
  shadow?: 'flat' | 'hover'
  /**
   * The color of the card.
   * @default 'default'
   */
  color?: 
    | 'default'
    | 'default-contrast'
    | 'muted'
    | 'muted-contrast'
    | 'dark'
    | 'black'
    | 'primary'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'none'
  /**
   * The radius of the card.
   * @default 'sm'
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<CardProps>(), {
  shadow: 'flat',
  color: 'default',
  rounded: 'md'
})

// Tailwind-based classes for border radius
const radii = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
}

// Tailwind-based classes for shadows
const shadows = {
  flat: 'shadow',
  hover: 'hover:shadow-lg',
}

// Tailwind-based classes for background and text colors
const colors = {
  default: '',
  'default-contrast': 'bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
  muted: '!bg-gray-100 !text-gray-900 dark:!bg-gray-700 dark:!text-gray-100',
  'muted-contrast': '!bg-gray-200 !text-gray-900 dark:!bg-gray-600 dark:!text-gray-100',
  dark: '!bg-gray-800 !text-white dark:!bg-gray-900',
  black: '!bg-black !text-white dark:!bg-gray-900',
  primary: '!bg-blue-500 !text-white dark:!bg-blue-400',
  info: '!bg-cyan-500 !text-blue dark:!bg-cyan-400',
  success: '!bg-green-500 !text-white dark:!bg-green-400',
  warning: '!bg-yellow-500 !text-white dark:!bg-yellow-400',
  danger: '!bg-red-500 !text-white dark:!bg-red-400',
  none: ''
}

// Compose all classes together
const classes = computed(() =>
  [
/*     'p-4',        */       // Basic padding
/*     'transition-shadow', */
    radii[props.rounded],
    shadows[props.shadow],
    colors[props.color]
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <UCard :class="classes">
    <!-- Conditionally render the header -->
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <!-- Default Slot -->
    <slot />

    <!-- Conditionally render the footer -->
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
