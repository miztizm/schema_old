<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * The HTML element or component name to use for the paragraph.
     *
     * @default 'p'
     */
    as?: string
    
    /**
     * The lead of the paragraph.
     *
     * @default 'normal'
     */
    lead?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
    
    /**
     * The size of the paragraph.
     *
     * @default 'xl'
     */
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
    
    /**
     * The weight of the paragraph.
     *
     * @default 'semibold'
     */
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  }>(),
  {
    as: 'p',
    size: 'xl',
    lead: 'none',
    weight: 'normal',
  }
)

const sizes = {
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

const weights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

const leads = {
  none: 'mb-0',
  tight: 'mb-1',
  snug: 'mb-2',
  normal: 'mb-4',
  relaxed: 'mb-6',
  loose: 'mb-8',
}

const classes = computed(() => [
  sizes[props.size],
  weights[props.weight],
  leads[props.lead],
].filter(Boolean).join(' '))
</script>

<template>
  <component :is="props.as" :class="classes">
    <slot></slot>
  </component>
</template>
