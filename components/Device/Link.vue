<template>
    <n-form ref="formRef" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name">
            <n-tree-select :options="options" v-model:value="selectedDeviceId"></n-tree-select>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="primary" class="flex-1" attr-type="submit" :loading="pending" :disabled="pending">Link
                device</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
import type { TreeOption } from "naive-ui"

const { formRef, onSubmit, pending } = useNaiveForm()

const props = defineProps<{ project: Project }>()

const emits = defineEmits(["cancel", "done"])

const { find } = useDevice()
const { data: devices } = await find()

const unlinkedDevices = computed(() => devices.value?.filter(device => device.projectId === null))

const options = computed<TreeOption[]>(() => unlinkedDevices.value ? unlinkedDevices.value.map(device => ({
    label: device.name,
    key: device.id
})) : [])

const selectedDeviceId = ref()

async function handleSubmit() {
    const { link } = useDevice()

    const { data: device, error } = await link(selectedDeviceId.value, props.project.id)

    if (error.value) {
    }
    else {
        emits("done", device.value)
    }
}
</script>