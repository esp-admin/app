<template>
  <div :style="{ width: `${width}px`, height: `${height}px` }">
    <chart-highcharts
      :options="options"
      :height="height"
      :width="width"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  options: HighchartsOptions
  height?: number
  width?: number
}>()
</script>
