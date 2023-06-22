<template>
    <div class="flex gap-4">
        <n-button type="primary" attr-type="submit" :loading="loading" :disabled="disabled">Save</n-button>
        <n-button secondary attr-type="button" @click="$emit('reset')" :disabled="disabled">Reset</n-button>
    </div>
</template>

<script setup lang="ts">
defineProps<{ loading?: boolean, disabled?: boolean }>()
defineEmits(["reset"])
</script>