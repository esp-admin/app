<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="error" class="flex-1" attr-type="submit" :disabled="pending" :loading="pending">Delete
                project</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ project: Project }>()

const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm()

apiErrors.value = {
    containsReleases: false,
}

const model = ref({
    name: "",
});

rules.value = {
    name: [
        {
            required: true,
            message: "Please input project name",
            trigger: "blur",
        },
        {
            message: `Name should be ${props.project.name}`,
            validator: (rule, value) => value === props.project.name
        },
        {
            message: `Make sure to remove related releases first`,
            validator: () => !apiErrors.value.containsReleases
        },
    ],
}

async function handleSubmit() {
    const { remove } = useProject()

    const { data, error } = await remove(props.project.id)

    if (error.value) {
        apiErrors.value.containsReleases = error.value.data?.message.includes("The change you are trying to make would violate the required relation")
    }
    else {
        // Unlink all devices linked to the deleted project

        const { find, findOne } = useDevice()
        const { data: devices } = await find()
        devices.value?.forEach(async (device) => {
            if (device.projectId === props.project.id) {
                device.projectId = null
                const { data } = await findOne(device.id)
                if (data.value) {
                    data.value.projectId = null
                }
            }
        })

        emits("done", data.value)
    }
}

</script>