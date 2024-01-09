<template>
  <div :style="{ width: `${width}px`, height: `${height}px` }">
    <ChartHighcharts :options="options" :height="height" :width="width" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
    options: HighchartsOptions,
    height?: number,
    width?: number
}>()
</script>
