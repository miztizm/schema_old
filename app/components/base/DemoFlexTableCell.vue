<script setup lang="ts">
const props = defineProps<{
  label?: string
  hideLabel?: boolean
  tabletHidden?: boolean
  useLabelAppend?: Boolean
}>()

</script>

<template>
  <div
    class="relative flex h-8 items-center justify-end px-6 sm:h-10 sm:justify-center sm:px-2"
    :class="props.tabletHidden && 'ptablet:hidden'"
  >
    <span
      v-if="props.label"
      class="label-base text-muted-400 dark:text-primary-600 absolute start-8 top-1/2 mx-auto -translate-y-1/2 sm:inset-x-0 sm:-top-10 sm:-translate-y-1 z-20 flex items-center justify-center"
      :class="[
    props.hideLabel ? 'sm:hidden' : '',
    props.useLabelAppend ? 'group inline-flex' : 'text-center font-sans text-xs font-medium uppercase'
  ]"
    >
    <span
      :class="[
        'text-center',
        'font-sans',
        'text-xs',
        'font-medium',
        'uppercase',
      ]"
    > {{ props.label }}  </span>  <slot name="label-append" />
    </span>

    <slot />
  </div>
</template>


