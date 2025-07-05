<script setup lang="ts">
// Define props with default values; comments describe each default.
/**
 * The HTML tag to use (e.g. `h1`, `h2`, etc.).
 *
 * @default 'p'
 */
   
/**
 * The size of the heading.
 *
 * @default 'xl'
 */
   
/**
 * The spacing below the heading.
 *
 * @default 'normal'
 */
   
/**
 * The weight of the heading.
 *
 * @default 'semibold'
 */
const props = withDefaults(
  defineProps<{
    as?: string
    size?:
      | 'xs'
      | 'sm'
      | 'md'
      | 'lg'
      | 'xl'
      | '2xl'
      | '3xl'
      | '4xl'
      | '5xl'
      | '6xl'
      | '7xl'
      | '8xl'
      | '9xl'
    lead?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  }>(),
  {
    as: 'p',
    size: 'xl',
    lead: 'normal',
    weight: 'semibold',
  }
)

// Tailwind-based mappings for heading sizes
const sizes: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
  '7xl': 'text-7xl',
  '8xl': 'text-8xl',
  '9xl': 'text-9xl',
}

// Tailwind-based mappings for font weights
const weights: Record<string, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

// Tailwind-based mappings for bottom margin (lead spacing)
const leads: Record<string, string> = {
  none: '',
  tight: 'mb-1',
  snug: 'mb-2',
  normal: 'mb-4',
  relaxed: 'mb-6',
  loose: 'mb-8',
}

const classes = computed(() =>
  [
    sizes[props.size],
    weights[props.weight],
    leads[props.lead],
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <component :is="props.as" :class="classes">
    <slot></slot>
  </component>
</template>
