<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    shape?: 'straight' | 'rounded' | 'curved' | 'full'
    labels: string[]
    reverse?: boolean
  }>(),
  {
    shape: 'rounded',
    title: undefined,
  },
)

const activeTab = ref('tab-1')
</script>

<template>
  <div>
    <div
      class="mb-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row"
      :class="props.reverse && 'sm:flex-row-reverse'"
    >
      <slot name="left" />
      <slot name="right">
        <div class="w-full sm:w-auto">
          <div
            class="dark:bg-primary-900 relative flex h-9 w-full bg-white sm:w-40"
            :class="[
              props.shape === 'rounded' ? 'rounded-md' : '',
              props.shape === 'curved' ? 'rounded-xl' : '',
              props.shape === 'full' ? 'rounded-full' : '',
            ]"
          >
            <button
              type="button"
              class="nui-focus relative z-10 flex flex-1 cursor-pointer items-center justify-center font-sans text-sm transition-colors duration-300"
              :class="[
                activeTab === 'tab-1' ? 'text-white' : 'text-primary-400',
                props.shape === 'rounded' ? 'rounded-md' : '',
                props.shape === 'curved' ? 'rounded-xl' : '',
                props.shape === 'full' ? 'rounded-full' : '',
              ]"
              @click="activeTab = 'tab-1'"
            >
              {{ props.labels?.at(0) }}
            </button>
            <button
              type="button"
              class="nui-focus relative z-10 flex flex-1 cursor-pointer items-center justify-center font-sans text-sm transition-colors duration-300"
              :class="[
                activeTab === 'tab-2' ? 'text-white' : 'text-primary-400',
                props.shape === 'rounded' ? 'rounded-md' : '',
                props.shape === 'curved' ? 'rounded-xl' : '',
                props.shape === 'full' ? 'rounded-full' : '',
              ]"
              @click="activeTab = 'tab-2'"
            >
              {{ props.labels?.at(1) }}
            </button>
            <div
              class="bg-primary-500 absolute start-0 top-0 h-full w-1/2 transition-all duration-300 ease-in-out "
              :class="[
                activeTab === 'tab-1' ? 'ms-0' : 'ms-[50%]',
                props.shape === 'rounded' ? 'rounded-md' : '',
                props.shape === 'curved' ? 'rounded-xl' : '',
                props.shape === 'full' ? 'rounded-full' : '',
              ]"
            />
          </div>
        </div>
      </slot>
    </div>
    <div>
      <div v-if="activeTab === 'tab-1'">
        <slot name="tab-1" />
      </div>
      <div v-else-if="activeTab === 'tab-2'">
        <slot name="tab-2" />
      </div>
    </div>
    <slot />
  </div>
</template>
