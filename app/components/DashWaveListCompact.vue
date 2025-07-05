<script setup>
const props = defineProps({
  currentWave: {
    type: Object,
    required: true,
  },
});

const formattedEndDate = computed(() => {
  return props.currentWave?.endDate
    ? new Date(props.currentWave.endDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No end date available';
});

const daysLeft = computed(() => {
  if (!props.currentWave?.endDate) return null;
  const endDate = new Date(props.currentWave.endDate);
  const today = new Date();
  const diffInDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffInDays > 0 ? diffInDays : 0;
});

const isEndingSoon = computed(() => {
  return daysLeft.value !== null && daysLeft.value <= 7 && daysLeft.value > 0;
});

const hasEnded = computed(() => {
  return daysLeft.value === 0;
});

const progressPercentage = computed(() => {
  if (!props.currentWave?.capacity || !props.currentWave?.usedCapacity) return 0;
  return Math.min(
    (props.currentWave.usedCapacity / props.currentWave.capacity) * 100,
    100
  );
});

// Map registered users to an array of objects with tooltip and src properties.
const registeredUsers = computed(() => {
  return props.currentWave?.registeredUsers?.map((user) => ({
    tooltip: user.username,
    src: user.avatar
      ? `https://api.schema.cx/storage/avatars/${user.avatar}`
      : 'https://api.schema.cx/storage/avatars/default.jpg',
  })) || []
})
</script>

<template>

    <!-- Avatars -->
    <div v-if="currentWave?.registeredUsers"  class="mt-4 mb-4 flex items-center justify-between">
    <!-- UAvatarGroup and UAvatar are Nuxt UI components styled with Tailwind -->
    <UAvatarGroup size="sm" :max="15">
      <UAvatar
        v-for="(user, index) in registeredUsers"
        :key="index"
        :src="user.src"
        :alt="user.tooltip"
        v-bind="{ 'data-tooltip': user.tooltip }"
      />
    </UAvatarGroup>
  </div>

    <!-- Wave Information -->
    <div>
      <BaseParagraph size="xs">
  <span class="text-gray-500 dark:text-gray-500 text-xs">
    <div>
      <span class="text-gray-500 font-bold">Capacity: </span>
      <span class="text-gray-400 font-bold">
        {{ currentWave?.usedCapacity || 0 }} / {{ currentWave?.capacity || 'N/A' }}
      </span>
      <div class="mt-2 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          :style="{ width: `${progressPercentage}%` }"
          class="h-2 rounded-full bg-gray-300"
        ></div>
      </div>
    </div>
    <br />

    <div v-if="hasEnded" class="text-red-700 font-bold">
      This wave has ended.
    </div>
    <div v-else-if="isEndingSoon" class="text-yellow-500 font-bold">
      Only {{ daysLeft }} day(s) left! The wave ends soon!
    </div>
    <div v-else class="text-gray-500">
      <span>The wave ends on </span>
      <span class="text-slate-500 font-bold">{{ formattedEndDate }}</span>.
    </div>
    <br />

    <span v-if="currentWave?.lastWinner && currentWave?.lastWinner !== 'false'" class="font-semibold text-gray-600 dark:text-gray-400">
  The last wave's winner of the special title was:
  <BaseUserProfile :username="`${currentWave.lastWinner}`" />
</span>
  </span>
</BaseParagraph>


      <!-- View More Details Button -->
 <!--      <div class="mt-4">
        <BaseButton color="primary" rounded="md" class="w-full" @click="$emit('viewDetails', currentWave)">
          View Wave Details
        </BaseButton>
      </div> -->
    </div>
</template>
