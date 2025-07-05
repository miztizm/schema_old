<script setup>
const props = defineProps({
  currentWave: {
    type: Object,
    required: true,
  },
});

</script>

<template>

  <BaseCard rounded="lg">
    <template #header>
        <WaveCardIconText
        :title="`Wave ${currentWave?.id || 'N/A'} - ${currentWave?.event || 'No event available.'}`"
        icon="ph:globe-duotone"
        :text="` ${currentWave?.description || 'No description available.'}`"
        indicator
        />
      </template>
         <!-- Widget -->
         <DashWaveListCompact :currentWave="currentWave" />
      </BaseCard>

</template>

<style scoped>
/* Optional custom styles for the widget */
</style>
