<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /**
     * The URL of the image to display.
     */
    src?: string
    /**
     * The alt text for the image.
     */
    alt?: string
    /**
     * The URL of a dark version of the image (displayed in dark mode).
     */
    srcDark?: string
    /**
     * The URL of a badge to display on top of the avatar.
     */
    badgeSrc?: string
    /**
     * Fallback text when no image is provided.
     */
    text?: string
    /**
     * Applies an SVG mask from one of the presets (requires `rounded` to be `none`).
     */
    mask?: 'hex' | 'hexed' | 'deca' | 'blob' | 'diamond'
    /**
     * Whether to show a dot indicator (or specify its color).
     */
    dot?: boolean | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'pink' | 'yellow'
    /**
     * Whether to show a ring around the avatar (or specify its color).
     */
    ring?: boolean | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'pink' | 'yellow'
    /**
     * The color theme for the avatar fallback.
     *
     * @default 'white'
     */
    color?: 'white' | 'muted' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'pink' | 'yellow' | 'indigo' | 'violet'
    /**
     * The border radius of the avatar.
     *
     * @default 'full'
     */
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
    /**
     * The size of the avatar.
     *
     * @default 'sm'
     */
    size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
    /**
     * Optional additional CSS classes for inner elements.
     */
    classes?: {
      /**
       * Classes for the outer wrapper.
       */
      wrapper?: string | string[]
      /**
       * Classes for the inner container.
       */
      inner?: string | string[]
      /**
       * Classes for the image element.
       */
      img?: string | string[]
      /**
       * Classes for the badge container.
       */
      badge?: string | string[]
      /**
       * Classes for the dot indicator.
       */
      dot?: string | string[]
    }
  }>(),
  {
    src: undefined,
    srcDark: undefined,
    badgeSrc: undefined,
    text: '?',
    size: 'sm',
    color: 'white',
    rounded: 'full',
    mask: undefined,
    dot: false,
    ring: false,
    classes: () => ({}),
  }
)

// Tailwind-based mappings
const sizes: Record<string, string> = {
  xxs: 'w-6 h-6 text-xs',
  xs: 'w-8 h-8 text-xs',
  sm: 'w-10 h-10 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-24 h-24 text-2xl',
  '3xl': 'w-28 h-28 text-3xl',
  '4xl': 'w-32 h-32 text-4xl',
}

const radiuses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

const colorClasses: Record<string, string> = {
  white: 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-200',
  muted: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-200',
  primary: 'bg-blue-500/20 text-blue-500',
  info: 'bg-cyan-500/20 text-cyan-500',
  success: 'bg-green-500/20 text-green-500',
  warning: 'bg-yellow-500/20 text-yellow-500',
  danger: 'bg-red-500/20 text-red-500',
  pink: 'bg-pink-500/20 text-pink-500',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  indigo: 'bg-indigo-500/20 text-indigo-500',
  violet: 'bg-violet-500/20 text-violet-500',
}

const maskClasses: Record<string, string> = {
  hex: 'mask-hex',
  hexed: 'mask-hexed',
  deca: 'mask-deca',
  blob: 'mask-blob',
  diamond: 'mask-diamond',
}

const dotColors: Record<string, string> = {
  primary: 'bg-blue-500',
  success: 'bg-green-500',
  info: 'bg-cyan-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  pink: 'bg-pink-500',
  yellow: 'bg-yellow-500',
}

const ringClasses: Record<string, string> = {
  primary: 'ring-2 ring-blue-500', 
  success: 'ring-2 ring-green-500',
  info: 'ring-2 ring-cyan-500',
  warning: 'ring-2 ring-yellow-500',
  danger: 'ring-2 ring-red-500',
  pink: 'ring-2 ring-pink-500',
  yellow: 'ring-2 ring-yellow-500',
}

// Compute container classes with a creative twist (smooth hover effect!)
const containerClasses = computed(() => [
  'relative inline-flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 overflow-hidden',
  sizes[props.size!],
  radiuses[props.rounded!],
  // Fallback background when no image is provided
  !props.src ? colorClasses[props.color!] : '',
  // Apply SVG mask if specified and rounding is none
  props.mask && (props.rounded === 'none' ? radiuses['none'] : '') ? `mask ${maskClasses[props.mask]}` : '',
  // Apply ring style if enabled
  props.ring
    ? props.ring === true
      ? ringClasses['primary']
      : ringClasses[props.ring as string]
    : '',
  props.classes?.wrapper
].flat().filter(Boolean).join(' '))

// Inner container classes
const innerClasses = computed(() =>
  ['flex items-center justify-center w-full h-full', props.classes?.inner].flat().filter(Boolean).join(' ')
)

// Image element classes
const imgClasses = computed(() =>
  ['object-cover w-full h-full', radiuses[props.rounded!], props.classes?.img].flat().filter(Boolean).join(' ')
)

// Fallback text classes (centered content)
const textClasses = 'flex items-center justify-center'

// Badge container classes
const badgeClasses = computed(() =>
  ['absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2', props.classes?.badge].flat().filter(Boolean).join(' ')
)

// Dot indicator classes
const dotClasses = computed(() =>
  [
    'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white',
    props.dot === true
      ? dotColors['primary']
      : dotColors[props.dot as string] || '',
    props.classes?.dot,
  ]
    .flat()
    .filter(Boolean)
    .join(' ')
)
</script>

<template>
  <div :class="containerClasses">
    <div :class="innerClasses">
      <slot>
        <!-- Main image -->
        <img
          v-if="props.src"
          v-bind="$attrs"
          :src="props.src"
          :alt="props.alt"
          :class="[imgClasses, props.srcDark ? 'dark:hidden' : '']"
        />
        <!-- Dark mode image -->
        <img
          v-if="props.src && props.srcDark"
          v-bind="$attrs"
          :src="props.srcDark"
          :alt="props.alt"
          :class="[imgClasses, 'hidden dark:block']"
        />
        <!-- Fallback text when no image is provided -->
        <span v-if="!props.src" :class="textClasses">
          {{ props.text }}
        </span>
      </slot>
    </div>

    <!-- Badge (either via slot or badgeSrc prop) -->
    <div v-if="$slots.badge || props.badgeSrc" :class="badgeClasses">
      <slot name="badge">
        <img
          v-if="props.badgeSrc"
          :src="props.badgeSrc"
          alt=""
          class="object-cover"
        />
      </slot>
    </div>

    <!-- Dot indicator -->
    <span v-if="props.dot" :class="dotClasses"></span>
  </div>
</template>
