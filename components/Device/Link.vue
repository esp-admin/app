<template>
    <n-form ref="formRef" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name">
            <n-select :options="options" v-model:value="selectedDeviceId"></n-select>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="primary" class="flex-1" attr-type="submit" :loading="pending" :disabled="pending">Link
                device</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
import type { Device, Project } from "@prisma/client"
import type { SelectOption } from "naive-ui"
import type { H3Error } from "h3"

const { formRef, onSubmit, pending } = useNaiveForm()

const props = defineProps<{ project: Project }>()

const emits = defineEmits(["cancel", "done"])

const { data: devices } = await useAsyncData<Device[]>(() => useAuthFetch("/api/devices", {
    query: {
        unlinked: true
    }
}))

const options = computed<SelectOption[]>(() => devices.value ? devices.value.map(device => ({
    label: device.name,
    value: device.id
})) : [])

const selectedDeviceId = ref()

async function handleSubmit() {
    const { data: device, error } = await useAsyncData<Device, H3Error>(() => useAuthFetch(`/api/devices/${selectedDeviceId.value}/link`, {
        method: "PATCH",
        body: {
            projectId: props.project.id
        }
    }))

    if (error.value) {
    }
    else {
        emits("done", device.value)
    }
}
</script>