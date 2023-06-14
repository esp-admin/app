<template>
    <div>
        <div class="grid md:grid-cols-3 gap-6">

            <div class="flex gap-2 items-center">
                <naive-icon name="ph:cpu"></naive-icon>
                <n-text class="col-span-full text-xl font-semibold">
                    Devices
                </n-text>
            </div>

            <div class="col-span-full flex gap-4">
                <n-input @input="searchDebounce">
                    <template #prefix>
                        <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                    </template>
                </n-input>

                <n-button type="primary" @click="createModalVisible = true">
                    Create device
                </n-button>
            </div>

            <DeviceCard v-for="device of devices" :device="device"></DeviceCard>

        </div>

        <n-modal preset="card" v-model:show="createModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <DeviceCreate @cancel="createModalVisible = false" @done="onCreate"></DeviceCreate>
        </n-modal>
    </div>
</template>

<script setup lang="ts">

const createModalVisible = ref(false)
const nameSearch = ref("")

const { find } = useDevice()

const { data: devices } = await find()

const searchDebounce = inputDebounce((value: string) => nameSearch.value = value, 1000)

async function onCreate(device: Device) {
    createModalVisible.value = false;
    navigateTo(`/devices/${device.id}`)
}
</script>