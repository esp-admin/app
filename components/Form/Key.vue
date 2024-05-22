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
      :type="copied ? 'success' : 'default'"
      @click="copy"
    />
  </n-input-group>
</template>

<script setup lang="ts">
const props = defineProps<{ value?: string }>()
const emits = defineEmits(['update:value'])

const placeholder = computed(() => {
  if (props.value && copied.value) {
    return 'Key copied to clipboard'
  }
  else if (props.value && !copied.value) {
    return 'Please copy the new Key'
  }
  return 'Key cannot be displayed'
})

const copied = ref(false)

function refresh() {
  const newValue = generateRandomString(30)
  emits('update:value', newValue)
}

function copy() {
  navigator.clipboard.writeText(props.value!)
  copied.value = true
}

function cancel() {
  copied.value = false
  emits('update:value')
}
</script>
