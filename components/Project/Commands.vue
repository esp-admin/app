<template>
    <n-form>
        <n-dynamic-input v-model:value="value" preset="pair" key-placeholder="Name" value-placeholder="Payload"
            class="mb-4" />

        <div class="flex gap-4">
            <n-button type="primary">Save</n-button>
            <n-button type="primary" secondary>Reset</n-button>
        </div>
    </n-form>
</template>

<script setup>
const value = ref()
</script>