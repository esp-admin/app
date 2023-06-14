<template>
    <n-form-item :label-style="{ display: 'block' }">
        <template #label>
            <div class="flex justify-between items-center">
                <span>{{ label }}</span>

                <n-tooltip trigger="click" placement="left">
                    <template #trigger>
                        <n-button text>
                            <naive-icon name="ph:question-light" :size="18" />
                        </n-button>
                    </template>
                    <span> {{ description }} </span>
                </n-tooltip>
            </div>
        </template>
        <slot></slot>
    </n-form-item>
</template>

<script setup lang="ts">
const props = defineProps<{ label: string, description: string }>()
</script>