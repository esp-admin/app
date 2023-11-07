<template>
  <n-tooltip>
    <template #trigger>
      <n-button
        :secondary="secondary"
        :circle="circle"
        :type="type"
        :size="size"
        :disabled="disabled"
        @click="$emit('click')"
      >
        <template #icon>
          <naive-icon :name="icon" />
        </template>
      </n-button>
    </template>
    {{ message }}
  </n-tooltip>
</template>

<script setup lang="ts">
defineProps<{
    icon: string,
    message: string,
    circle?: boolean,
    secondary?: boolean,
    disabled?: boolean,
    size?: 'tiny' | 'small' | 'medium' | 'large',
    type?: 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error'
}>()

defineEmits(['click'])
</script>
