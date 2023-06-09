<template>
    <div>
        <div class="grid md:grid-cols-3 gap-6">
            <n-text class="col-span-full text-xl font-semibold">Devices</n-text>

            <div class="col-span-full flex gap-4">
                <n-input>
                    <template #prefix>
                        <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                    </template>
                </n-input>

                <n-button type="primary" @click="createModalVisible = true">
                    Create device
                </n-button>
            </div>

            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
            <DeviceCard></DeviceCard>
        </div>

        <n-modal preset="card" v-model:show="createModalVisible" size="small" :closable="false" class="max-w-xs">
            <DeviceCreate></DeviceCreate>
        </n-modal>
    </div>
</template>

<script setup>
const createModalVisible = ref(false)
</script>