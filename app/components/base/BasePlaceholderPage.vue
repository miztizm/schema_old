<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * The title of the placeholder.
     */
    title: string

    /**
     * The subtitle of the placeholder.
     */
    subtitle?: string

    /**
     * The size of the featured image.
     *
     * @default 'md'
     */
    imageSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

    /**
     * Optional CSS classes to apply to different elements.
     */
    classes?: {
      /**
       * CSS classes for the card wrapper.
       */
      wrapper?: string | string[]

      /**
       * CSS classes for the inner container.
       */
      inner?: string | string[]

      /**
       * CSS classes for the image container.
       */
      img?: string | string[]

      /**
       * CSS classes for the content area.
       */
      content?: string | string[]

      /**
       * CSS classes for the title element.
       */
      title?: string | string[]

      /**
       * CSS classes for the subtitle element.
       */
      subtitle?: string | string[]
    }
  }>(),
  {
    subtitle: undefined,
    imageSize: 'md',
    classes: () => ({}),
  },
)

const imageSizes = {
  xs: 'w-16 h-16',
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-40 h-40',
  xl: 'w-48 h-48',
}
</script>

<template>
  <UPage
    :ui="{
      base: 'text-center min-h-[calc(100vh-var(--header-height))]',
      body: { padding: 'px-4 py-12 sm:p-12' },
      ...props.classes?.wrapper,
    }"
  >
    <div
      class="flex flex-col items-center justify-center space-y-6"
      :class="props.classes?.inner"
    >
      <div
        v-if="'image' in $slots"
        class="flex items-center justify-center text-primary-500 dark:text-primary-400"
        :class="[imageSizes[imageSize], props.classes?.img]"
      >
        <slot name="image" />
      </div>

      <div
        class="flex flex-col items-center space-y-2"
        :class="props.classes?.content"
      >
        <h3
          class="text-2xl font-semibold text-gray-900 dark:text-white"
          :class="props.classes?.title"
        >
          {{ title }}
        </h3>

        <p
          v-if="subtitle"
          class="text-lg text-gray-500 dark:text-gray-400"
          :class="props.classes?.subtitle"
        >
          {{ subtitle }}
        </p>

        <div class="mt-4">
          <slot />
        </div>
      </div>
    </div>
  </UPage>
</template>
