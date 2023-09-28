<template>
  <n-input-group>
    <n-input disabled :placeholder="placeholder" />

    <n-button v-if="!key" @click="refresh">
      <template #icon>
        <naive-icon name="ph:arrows-clockwise" />
      </template>
    </n-button>

    <n-button v-if="key" @click="copy">
      <template #icon>
        <naive-icon name="ph:copy" />
      </template>
    </n-button>

    <n-button v-if="key" @click="cancel">
      <template #icon>
        <naive-icon name="ph:arrow-counter-clockwise" />
      </template>
    </n-button>
  </n-input-group>
</template>

<script setup lang="ts">
import * as randomstring from 'randomstring'

defineProps<{ value: string }>()

const emits = defineEmits(['update:value'])

const key = ref()

const message = useMessage()

const placeholder = computed(() => key.value ? 'Please copy new value' : 'Value cannot be displayed')

function refresh () {
  key.value = randomstring.generate(20)
  message.warning('Key update active')
  emits('update:value', key.value)
}

function copy () {
  navigator.clipboard.writeText(key.value)
  message.success('Key copied to clipboard')
}

function cancel () {
  key.value = undefined
  message.info('Key update canceled')
  emits('update:value')
}
</script>
