<template>
  <n-input-group>
    <n-input :placeholder="placeholder" disabled />

    <n-tooltip>
      <template #trigger>
        <n-button v-show="!key" @click="refresh">
          <template #icon>
            <naive-icon name="ph:arrows-clockwise" />
          </template>
        </n-button>
      </template>
      Refresh
    </n-tooltip>

    <n-tooltip>
      <template #trigger>
        <n-button v-show="key" @click="cancel">
          <template #icon>
            <naive-icon name="ph:x" />
          </template>
        </n-button>
      </template>
      Cancel
    </n-tooltip>

    <n-tooltip>
      <template #trigger>
        <n-button v-show="key" :type="copied ? 'success': 'default'" @click="copy">
          <template #icon>
            <naive-icon name="ph:copy" />
          </template>
        </n-button>
      </template>
      Copy
    </n-tooltip>
  </n-input-group>
</template>

<script setup lang="ts">
import * as randomstring from 'randomstring'

defineProps<{ value?: string }>()

const emits = defineEmits(['update:value'])

const key = ref()

const placeholder = computed(() => {
  if (key.value && copied.value) {
    return 'Key copied to clipboard'
  } else if (key.value && !copied.value) {
    return 'Please copy the new Key'
  }
  return 'Key cannot be displayed'
})

const copied = ref(false)

function refresh () {
  key.value = randomstring.generate(20)
  emits('update:value', key.value)
}

function copy () {
  navigator.clipboard.writeText(key.value)
  copied.value = true
}

function cancel () {
  key.value = undefined
  copied.value = false
  emits('update:value')
}
</script>
