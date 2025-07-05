<script setup lang="ts">
import { computed, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    shadow?: 'flat' | 'hover'
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'dark' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none'
    rounded?: 'none' | 'sm' | 'md' | 'lg'
  }>(),
  {
    rounded: 'sm',
    shadow: 'flat',
    color: 'default',
  }
)

const radiuses: Record<string, string> = {
  none: '',
  sm: 'nui-card-rounded-sm',
  md: 'nui-card-rounded-md',
  lg: 'nui-card-rounded-lg',
}

const colors: Record<string, string> = {
  default: 'nui-card-default',
  'default-contrast': 'nui-card-default-contrast',
  muted: 'nui-card-muted',
  'muted-contrast': 'nui-card-muted-contrast',
  dark: 'nui-card-dark',
  black: 'nui-card-black',
  primary: 'nui-card-primary',
  info: 'nui-card-info',
  success: 'nui-card-success',
  warning: 'nui-card-warning',
  danger: 'nui-card-danger',
  none: '',
}

const shadows: Record<string, string> = {
  flat: 'nui-card-shadow',
  hover: 'nui-card-shadow-hover',
}

const classes = computed(() =>
  [
    'nui-card',
    radiuses[props.rounded],
    colors[props.color],
    props.shadow && shadows[props.shadow],
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div class="p-6" :class="classes">
    <slot></slot>
  </div>
</template>
