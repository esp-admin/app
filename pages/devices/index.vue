<template>
    <div>
        <div class="grid md:grid-cols-3 gap-6">

            <div class="flex gap-2 items-center">
                <naive-icon name="ph:cpu"></naive-icon>
                <n-text class="col-span-full text-lg" strong>
                    Devices
                </n-text>
            </div>

            <div v-if="devices?.length" class="col-span-full flex gap-4">
                <n-input @input="searchDebounce">
                    <template #prefix>
                        <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                    </template>
                </n-input>

                <n-button type="primary" @click="createModalVisible = true">
                    Create device
                </n-button>
            </div>

            <n-result v-else class="col-span-full my-5" status="info" title="You have no devices">
                <template #footer>
                    <n-button type="primary" @click="createModalVisible = true">Create first device</n-button>
                </template>
            </n-result>

            <DeviceCard v-for="device of nameSearch ? filteredDevices : devices" :device="device"></DeviceCard>

        </div>

        <n-modal preset="card" v-model:show="createModalVisible" :closable="false" :mask-closable="false" class="max-w-xs"
            title="Create device" segmented>
            <DeviceCreate @cancel="createModalVisible = false" @done="onCreate"></DeviceCreate>
        </n-modal>
    </div>
</template>

<script setup lang="ts">

const createModalVisible = ref(false)
const nameSearch = ref("")

const { find } = useDevice()

const { data: devices } = await find()

const searchDebounce = inputDebounce((value: string) => nameSearch.value = value, 500)

const filteredDevices = computed(() => devices.value?.filter(device => device.name.includes(nameSearch.value)))

async function onCreate(device: Device) {
    createModalVisible.value = false;
    navigateTo(`/devices/${device.id}`)
}
</script>