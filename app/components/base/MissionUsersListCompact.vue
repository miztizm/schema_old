<script setup lang="ts">
const props = defineProps<{
  actions?: boolean;
  pendingUsers: Array<{
    id: number;
    username: string;
    avatar?: string;
    role: string;
  }>;
}>();
</script>

<template>
  <div class="mb-2 space-y-5">
    <div
      v-for="user in props.pendingUsers"
      :key="user.id"
      class="flex items-center gap-3"
    >
      <BaseAvatar
        :src="user.avatar ? 'https://api.schema.cx/storage/avatars/' + user.avatar : 'https://api.schema.cx/storage/avatars/default.png'"
        :text="user.username"
        rounded="md"
        class="bg-primary-100 dark:bg-primary-500/20 text-primary-500 shrink-0"
      />
      <div>
        <BaseHeading
          as="h4"
          size="sm"
          weight="semibold"
          lead="tight"
          class="text-muted-800 dark:text-red-400"
        >
          <span>{{ user.username }}</span>
        </BaseHeading>
        <BaseParagraph size="xs">
          <span class="text-muted-400 dark:text-gray-400">
            xxx
          </span>
        </BaseParagraph>
      </div>
      <div v-if="props.actions" class="ms-auto flex items-center">
        <NuxtLink
          :to="`/profile/${user.username}`"
          class="scale-75"
        >
          <BaseButtonIcon rounded="lg" muted>
            <Icon name="ph:address-book-duotone" class="size-5" />
          </BaseButtonIcon>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
