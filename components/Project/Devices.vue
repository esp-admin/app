<template>
    <div class="grid md:grid-cols-3 gap-6">
        <div class="col-span-full flex gap-4">
            <n-input @input="searchDebounce">
                <template #prefix>
                    <naive-icon name="ph:magnifying-glass" :size="16"></naive-icon>
                </template>
            </n-input>

            <n-button type="primary" @click="linkModalVisible = true">
                Link device
            </n-button>
        </div>

        <DeviceCard v-for="device of nameSearch ? filteredDevices : linkedDevices" :device="device"></DeviceCard>

        <n-modal preset="card" v-model:show="linkModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <DeviceLink @cancel="linkModalVisible = false" @done="onLink" :project="project" />
        </n-modal>
    </div>
</template>

<script setup lang="ts">

const linkModalVisible = ref(false)

const props = defineProps<{ project: Project }>()

const { find } = useDevice()
const { data: devices } = await find()

const nameSearch = ref()

const searchDebounce = inputDebounce((value: string) => nameSearch.value = value, 500)

const linkedDevices = computed(() => devices.value?.filter(device => device.projectId === props.project.id))

const filteredDevices = computed(() => linkedDevices.value?.filter(device => device.name.includes(nameSearch.value)))

function onLink() {
    linkModalVisible.value = false
}
</script>