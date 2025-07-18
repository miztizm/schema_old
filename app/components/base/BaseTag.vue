<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * Determines when the tag should have a shadow.
     */
    shadow?: 'flat' | 'hover'

    /**
     * The color of the tag.
     *
     * @default 'default'
     */
    color?:
      | 'default'
      | 'default-contrast'
      | 'muted'
      | 'muted-contrast'
      | 'light'
      | 'dark'
      | 'black'
      | 'primary'
      | 'info'
      | 'success'
      | 'warning'
      | 'danger'

    /**
     * The radius of the tag.
     *
     * @since 2.0.0
     * @default 'lg'
     */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'

    /**
     * The size of the tag.
     *
     * @default 'md'
     */
    size?: 'sm' | 'md'

    /**
     * The variant of the tag.
     *
     * @since 2.0.0
     * @default 'solid'
     */
    variant?: 'solid' | 'outline' | 'pastel'
  }>(),
  {
    variant: undefined,
    color: undefined,
    rounded: undefined,
    size: undefined,
    shadow: undefined,
  },
)

const color = props.color ?? 'color'
const rounded = props.rounded ?? 'rounded'
const size = props.size ?? 'size'
const variant = props.variant ?? 'variant'


const variants = {
  solid: 'nui-tag-solid',
  pastel: 'nui-tag-pastel',
  outline: 'nui-tag-outline',
}

const radiuses = {
  none: '',
  sm: 'nui-tag-rounded-sm',
  md: 'nui-tag-rounded-md',
  lg: 'nui-tag-rounded-lg',
  full: 'nui-tag-rounded-full',
}

const colors = {
  default: 'nui-tag-default',
  'default-contrast': 'nui-tag-default-contrast',
  muted: 'nui-tag-muted',
  'muted-contrast': 'nui-tag-muted-contrast',
  light: 'nui-tag-light',
  dark: 'nui-tag-dark',
  black: 'nui-tag-black',
  primary: 'nui-tag-primary',
  info: 'nui-tag-info',
  success: 'nui-tag-success',
  warning: 'nui-tag-warning',
  danger: 'nui-tag-danger',
}

const sizes = {
  sm: 'nui-tag-sm',
  md: 'nui-tag-md',
}

const shadows = {
  flat: 'nui-tag-shadow',
  hover: 'nui-tag-shadow-hover',
}

const classes = computed(() => [
  'nui-tag',
  sizes[size],          // Corrected from size.value
  radiuses[rounded],    // Corrected from rounded.value
  variants[variant],    // Corrected from variant.value
  colors[color],        // Corrected from color.value
  props.shadow && shadows[props.shadow],
])

</script>

<template>
  <span :class="classes">
    <slot></slot>
  </span>
</template>
