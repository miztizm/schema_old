<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { useNinjaButton } from '~/composables/buttons'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    href?: string
    rel?: string
    target?: string
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
    color?: 'default' | 'default-contrast' | 'muted' | 'muted-contrast' | 'light' | 'dark' | 'black' | 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'none'
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    to: undefined,
    href: undefined,
    rel: '',
    target: '',
    type: 'button',
    size: 'md',
    color: 'default',
    rounded: 'sm',
    loading: false,
    disabled: false,
  }
)

const radiuses: Record<string, string> = {
  none: '',
  sm: 'nui-button-rounded-sm',
  md: 'nui-button-rounded-md',
  lg: 'nui-button-rounded-lg',
  full: 'nui-button-rounded-full',
}

const sizes: Record<string, string> = {
  sm: 'nui-button-sm',
  md: 'nui-button-md',
  lg: 'nui-button-lg',
  xl: 'nui-button-xl',
}

const colors: Record<string, string> = {
  default: 'nui-button-default',
  'default-contrast': 'nui-button-default-contrast',
  muted: 'nui-button-muted',
  'muted-contrast': 'nui-button-muted-contrast',
  light: 'nui-button-light',
  dark: 'nui-button-dark',
  black: 'nui-button-black',
  primary: 'nui-button-primary',
  info: 'nui-button-info',
  success: 'nui-button-success',
  warning: 'nui-button-warning',
  danger: 'nui-button-danger',
  none: '',
}

const classes = computed(() =>
  [
    'nui-button-icon',
    props.loading ? 'nui-button-loading' : '',
    radiuses[props.rounded!],
    sizes[props.size!],
    colors[props.color!],
    props.disabled ? 'opacity-50 cursor-not-allowed' : ''
  ].filter(Boolean).join(' ')
)

const { attributes, is } = useNinjaButton(props)
</script>

<template>
  <component :is="is" v-bind="attributes" :class="classes">
    <slot v-if="!props.loading"></slot>
    <BasePlaceload v-else class="size-4 rounded-md" />
  </component>
</template>
