<template>
    <n-form ref="formRef" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name">
            <n-tree-select :options="options" v-model:value="model.selectedDeviceId"></n-tree-select>
        </n-form-item>

        <div class="flex gap-4">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="primary" class="flex-1" attr-type="submit" :loading="pending" :disabled="pending || !edited">
                Link
            </n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
import type { TreeOption } from "naive-ui"

const model = ref({
    selectedDeviceId: ""
})

const { formRef, onSubmit, pending, edited } = useNaiveForm(model)

const props = defineProps<{ project: Project }>()

const emits = defineEmits(["cancel", "done"])

const { find } = useDevice()

const devices = await find()

const unlinkedDevices = computed(() => devices.value?.filter(device => device.projectId === null))

const options = computed<TreeOption[]>(() => unlinkedDevices.value ? unlinkedDevices.value.map(device => ({
    label: device.name,
    key: device.id
})) : [])

async function handleSubmit() {
    const { link } = useDevice()

    await link(model.value.selectedDeviceId, props.project.id)
        .then(device => emits("done", device))
}
</script>