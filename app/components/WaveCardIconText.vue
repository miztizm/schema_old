<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    text: string
    icon: string
    indicator?: boolean
  }>(),
  {
    title: undefined,
  },
)
</script>

<template>
  <div>
    <div class="mb-1 flex items-center justify-between">
      <BaseHeading
        as="h2"
        size="md"
        weight="bold"
        lead="tight"
        class="text-muted-800 dark:text-white"
      >
        <span>{{ props.title }}</span>
      </BaseHeading>

      <div class="relative" style="bottom:0.8rem;left:0.8rem">
        <Icon :name="props.icon" class="text-gray-400 dark:text-gray-500 size-6" />
        <div v-if="indicator" class="absolute -end-0 top-0.5">
          <span class="relative flex size-2">
            <span
              class="bg-green-400 absolute inline-flex size-full animate-ping rounded-full opacity-75"
            />
            <span
              class="bg-green-500 relative inline-flex size-2 rounded-full"
            />
          </span>
        </div>
      </div>
    </div>
    <div>
      <BaseParagraph class="text-gray-400 dark:text-gray-400" lead="none" size="sm">
          {{ props.text }}
      </BaseParagraph>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
