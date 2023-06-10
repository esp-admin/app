<template>
    <n-form>
        <n-form-item label="Name">
            <n-input></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="error" class="flex-1">Delete device</n-button>
        </div>
    </n-form>
</template>

<script setup>
defineEmits(["cancel", "done"])
</script>