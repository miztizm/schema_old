<script setup lang="ts">
const auth = useAuthStore()

const items = computed(() => {
  // Group 1: Account information
  const groups = [
    [
      {
        label: auth.user?.username,
        description: auth.user?.title,
        disabled: true,
        slot: 'account'
      }
    ],
    // Group 2: Primary navigation options
    [
      {
        label: 'Profile',
        icon: 'i-ph-user-circle-duotone',
        to: `/profile/${auth.user?.username}`
      },
      {
        label: 'Settings',
        icon: 'i-ph-gear-six-duotone',
        to: '/account'
      }
    ],
    // Group 3: Secondary navigation options
    [
      {
        label: 'Changelog',
        icon: 'i-heroicons-megaphone'
      }
    ]
  ]

  // Group 4: Conditional and global actions
  const group4 = []
  if (auth.user?.roles?.includes('master')) {
    group4.push({
      label: 'Control Panel',
      icon: 'i-ph-alien-duotone',
      to: '/cp'
    })
  }
  group4.push({
    label: 'Sign Out',
    icon: 'i-ph-sign-out-duotone',
    click: () => auth.logout()
  })

  groups.push(group4)
  return groups
})
</script>

<template>
  <UDropdown
  :items="items"
  :ui="{
    container: '!mt-0.5',
    rounded: 'rounded-md',
    item: { 
      disabled: 'cursor-text select-text',
      active: 'dark:bg-primary-500/20',
      padding: 'px-3 py-2'
    },
    width: 'w-48',
    ring: 'ring-1 ring-gray-200 dark:ring-gray-800/45',
    background: 'bg-white dark:bg-gray-950/95 bg-clip-padding backdrop-filter backdrop-blur-lg'
  }"
  :popper="{ placement: 'bottom-end' }"
>
<BaseUserAvatar
    size="xs"
    rounded="md"
    class="ml-2 cursor-pointer dark:hover:bg-gray-800/60 transition-colors duration-200"
  />


    <template #account="{ item }">
      <div class="text-left">
        <p class="truncate font-medium text-md">
         <!--  {{ item.label }}     --> <BaseUserProfile class="line-clamp-1" size="md" />
        </p>
        <p  v-if="item.description" class="truncate text-xs">
          {{ item.description }}
        </p>
     
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate text-xs">{{ item.label }}</span>
      <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </UDropdown>
</template>