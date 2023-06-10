<template>
    <n-form>
        <n-form-item>
            <n-upload>
                <n-upload-dragger>
                    <div>
                        <naive-icon name="ph:upload" :size="28"></naive-icon>
                    </div>

                    <n-text class="text-sm" :depth="2">
                        Click or drag a firmware.bin to this area to upload
                    </n-text>
                </n-upload-dragger>
            </n-upload>
        </n-form-item>

        <n-form-item label="Version">
            <n-input></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="primary" class="flex-1">Create release</n-button>
        </div>
    </n-form>
</template>

<script setup>
defineEmits(["cancel", "done"])
</script>