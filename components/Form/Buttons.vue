<template>
  <div class="flex gap-4">
    <n-button type="primary" attr-type="submit" :loading="loading" :disabled="disabled">
      Save
    </n-button>
    <n-button secondary attr-type="reset" :disabled="disabled" @click="$emit('reset')">
      Reset
    </n-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ loading?: boolean, disabled?: boolean }>()
defineEmits(['reset'])
</script>
