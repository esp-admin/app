<template>
  <n-input-group>
    <n-input :placeholder="placeholder" disabled />

    <n-tooltip>
      <template #trigger>
        <n-button v-show="!value" @click="refresh">
          <template #icon>
            <naive-icon name="ph:arrows-clockwise" />
          </template>
        </n-button>
      </template>
      Refresh
    </n-tooltip>

    <n-tooltip>
      <template #trigger>
        <n-button v-show="value" @click="cancel">
          <template #icon>
            <naive-icon name="ph:x" />
          </template>
        </n-button>
      </template>
      Cancel
    </n-tooltip>

    <n-tooltip>
      <template #trigger>
        <n-button v-show="value" :type="copied ? 'success': 'default'" @click="copy">
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
