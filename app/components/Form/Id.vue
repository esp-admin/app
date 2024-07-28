<template>
  <n-input-group>
    <n-input
      :value="value"
      disabled
    />
    <button-icon
      :icon="ICON_COPY"
      @click="copy"
    />
  </n-input-group>
</template>

<script setup lang="ts">
const props = defineProps<{ value: string }>()

function copy() {
  navigator.clipboard.writeText(props.value)
  copiedToClipboard()
}
</script>
