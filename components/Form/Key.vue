<template>
  <n-input-group>
    <n-input :placeholder="placeholder" disabled />

    <TooltipIconButton
      v-if="!value"
      name="ph:arrows-clockwise"
      message="Refresh"
      @click="refresh"
    />

    <TooltipIconButton
      v-if="value"
      name="ph:x"
      message="Cancel"
      @click="cancel"
    />

    <TooltipIconButton
      v-if="value"
      name="ph:copy"
      message="Copy"
      :type="copied ? 'success' : 'default'"
      @click="copy"
    />
  </n-input-group>
</template>

<script setup lang="ts">
import * as randomstring from 'randomstring'

const props = defineProps<{ value?: string }>()

const emits = defineEmits(['update:value'])

const placeholder = computed(() => {
  if (props.value && copied.value) {
    return 'Key copied to clipboard'
  } else if (props.value && !copied.value) {
    return 'Please copy the new Key'
  }
  return 'Key cannot be displayed'
})

const copied = ref(false)

function refresh () {
  const newValue = randomstring.generate(20)
  emits('update:value', newValue)
}

function copy () {
  navigator.clipboard.writeText(props.value!)
  copied.value = true
}

function cancel () {
  copied.value = false
  emits('update:value')
}
</script>
