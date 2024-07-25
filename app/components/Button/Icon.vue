<template>
  <n-button>
    <template #icon>
      <naive-icon :name="icon" />
    </template>
  </n-button>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'naive-ui'

interface Props extends /* @vue-ignore */ ButtonProps {
  icon: string
}

defineProps<Props>()
</script>
