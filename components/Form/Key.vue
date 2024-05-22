<template>
  <n-input-group>
    <n-input
      :placeholder="placeholder"
      disabled
    />

    <button-icon
      v-if="!value"
      :icon="ICON_RESET"
      @click="refresh"
    />

    <button-icon
      v-if="value"
      :icon="ICON_CANCEL"
      @click="cancel"
    />

    <button-icon
      v-if="value"
      :icon="ICON_COPY"
      @click="copy"
    />
  </n-input-group>
</template>

<script setup lang="ts">
const props = defineProps<{ value?: string }>()
const emits = defineEmits(['update:value'])

const placeholder = computed(() => {
  if (props.value && copied.value) {
    return 'Key copied to Clipboard'
  }
  else if (props.value && !copied.value) {
    return 'Make sure to copy the new key'
  }
  return 'Secret Key'
})

const copied = ref(false)

function refresh() {
  const newValue = generateRandomString(30)
  emits('update:value', newValue)
}

function copy() {
  if (props.value) {
    navigator.clipboard.writeText(props.value)
    copied.value = true
    copiedToClipboard()
  }
}

function cancel() {
  copied.value = false
  emits('update:value')
}
</script>
