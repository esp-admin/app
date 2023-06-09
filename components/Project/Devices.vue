<template>
    <div class="grid md:grid-cols-3 gap-6">
        <div class="col-span-full flex gap-4">
            <n-input>
                <template #prefix>
                    <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                </template>
            </n-input>

            <n-button type="primary" @click="linkModalVisible = true">
                Link device
            </n-button>
        </div>

        <DeviceCard show-unlink></DeviceCard>
        <DeviceCard show-unlink></DeviceCard>
        <DeviceCard show-unlink></DeviceCard>

        <n-modal preset="card" v-model:show="linkModalVisible" size="small" :closable="false" class="max-w-xs">
            <DeviceLink />
        </n-modal>
    </div>
</template>

<script setup>
const linkModalVisible = ref(false)
</script>