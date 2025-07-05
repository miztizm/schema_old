<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * Applies an SVG mask from the available presets (requires `rounded` to be set to `none`).
     */
    mask?: 'hex' | 'hexed' | 'deca' | 'blob' | 'diamond'
    /**
     * Whether the icon box should have a border.
     */
    bordered?: boolean
    /**
     * The color of the box.
     *
     * @default 'default'
     */
    color?:
      | 'default'
      | 'default-contrast'
      | 'muted'
      | 'muted-contrast'
      | 'dark'
      | 'black'
      | 'light'
      | 'primary'
      | 'info'
      | 'success'
      | 'warning'
      | 'danger'
      | 'none'
    /**
     * The border radius of the icon box.
     *
     * @default 'sm'
     */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    /**
     * The size of the icon box.
     *
     * @default 'xs'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    /**
     * The variant of the box.
     *
     * @default 'solid'
     */
    variant?: 'solid' | 'outline' | 'pastel'
  }>(),
  {
    variant: 'solid',
    color: 'default',
    size: 'xs',
    rounded: 'sm',
    mask: undefined,
    bordered: false,
  }
)

// Border radius mapping
const roundedClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

// Size mapping (using width and height classes)
const sizeClasses: Record<string, string> = {
  xs: 'nui-box-xs',
  sm: 'nui-box-sm',
  md: 'nui-box-md',
  lg: 'nui-box-lg',
  xl: 'nui-box-xl',
  '2xl': 'nui-box-2xl',
}

const variants = {
  solid: 'nui-box-solid',
  pastel: 'nui-box-pastel',
  outline: 'nui-box-outline',
}

const colors = {
  none: '',
  default: 'nui-box-default',
  'default-contrast': 'nui-box-default-contrast',
  muted: 'nui-box-muted',
  'muted-contrast': 'nui-box-muted-contrast',
  light: 'nui-box-light',
  dark: 'nui-box-dark',
  black: 'nui-box-black',
  primary: 'nui-box-primary',
  info: 'nui-box-info',
  success: 'nui-box-success',
  warning: 'nui-box-warning',
  danger: 'nui-box-danger',
}


// Color mappings for the different variants
/* const solidColors: Record<string, string> = {
  none: '',
  default: 'bg-gray-200 text-gray-900',
  'default-contrast': 'bg-gray-300 text-gray-900',
  muted: 'bg-gray-400 text-gray-900',
  'muted-contrast': 'bg-gray-500 text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-800 text-white',
  black: 'bg-black text-white',
  primary: 'bg-blue-500 text-white',
  info: 'bg-cyan-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  danger: 'bg-red-500 text-white',
} */

/* const outlineColors: Record<string, string> = {
  none: '',
  default: 'border border-gray-200 text-gray-900 bg-transparent',
  'default-contrast': 'border border-gray-300 text-gray-900 bg-transparent',
  muted: 'border border-gray-400 text-gray-900 bg-transparent',
  'muted-contrast': 'border border-gray-500 text-gray-900 bg-transparent',
  light: 'border border-gray-100 text-gray-900 bg-transparent',
  dark: 'border border-gray-800 text-white bg-transparent',
  black: 'border border-black text-white bg-transparent',
  primary: 'border border-blue-500 text-blue-500 bg-transparent',
  info: 'border border-cyan-500 text-cyan-500 bg-transparent',
  success: 'border border-green-500 text-green-500 bg-transparent',
  warning: 'border border-yellow-500 text-yellow-500 bg-transparent',
  danger: 'border border-red-500 text-red-500 bg-transparent',
}

const pastelColors: Record<string, string> = {
  none: '',
  default: 'bg-gray-100 text-gray-900',
  'default-contrast': 'bg-gray-200 text-gray-900',
  muted: 'bg-gray-200 text-gray-900',
  'muted-contrast': 'bg-gray-300 text-gray-900',
  light: 'bg-gray-50 text-gray-900',
  dark: 'bg-gray-700 text-white',
  black: 'bg-gray-800 text-white',
  primary: 'bg-blue-100 text-blue-700',
  info: 'bg-cyan-100 text-cyan-700',
  success: 'bg-success-100 text-success-700 dark:bg-success-700 dark:text-success-100',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
} */

// Compute the color class based on the variant and color props
/* const variantColorClass = computed(() => {
  const variantVal = props.variant || 'solid'
  const colorVal = props.color || 'default'
  if (variantVal === 'solid') {
    return solidColors[colorVal] || ''
  } else if (variantVal === 'outline') {
    return outlineColors[colorVal] || ''
  } else if (variantVal === 'pastel') {
    return pastelColors[colorVal] || ''
  }
  return ''
})
 */
// Apply an extra border if `bordered` is true and the variant isn't already outlining a border
const borderedClass = computed(() => {
  return props.bordered && props.variant !== 'outline'
    ? 'border border-gray-300'
    : ''
})

// Mapping for mask classes (applied only when `rounded` is set to `none`)
const maskClasses: Record<string, string> = {
  hex: 'nui-mask nui-mask-hex',
  hexed: 'nui-mask nui-mask-hexed',
  deca: 'nui-mask nui-mask-deca',
  blob: 'nui-mask nui-mask-blob',
  diamond: 'nui-mask nui-mask-diamond',
}

// Compose all classes
const classes = computed(() =>
  [
    'nui-icon-box',
    // Border radius
    roundedClasses[props.rounded || 'sm'],
    // Size (width & height)
    sizeClasses[props.size || 'xs'],
    // Color + variant classes
    variants[props.variant || 'solid'],
    colors[props.color || 'default'],
    // Optional border
    borderedClass.value,
    // If no rounding is applied and a mask is set, use the mask classes
    props.rounded === 'none' && props.mask ? maskClasses[props.mask] : '',
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
