<template>
    <n-h1 class="text-xl">Delete Project</n-h1>

    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Confirm" path="confirm">
            <n-input v-model:value="model.confirm" placeholder="Write <delete> to confirm"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="error" class="flex-1" attr-type="submit" :disabled="pending || !edited"
                :loading="pending">Delete
            </n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ project: Project }>()

const model = ref({
    confirm: "",
});

const { apiErrors, formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

apiErrors.value = {
    hasReleases: false,
    hasDevices: false
}

rules.value = {
    confirm: [
        {
            message: "Please write <delete>",
            validator: (rule, value) => value === "delete",
            trigger: "blur"
        },
        {
            message: `Make sure to remove related releases first`,
            validator: () => !apiErrors.value.hasReleases
        },
        {
            message: `Make sure to unlink devices first`,
            validator: () => !apiErrors.value.hasDevices
        },
    ],
}

async function handleSubmit() {
    const { find } = useDevice()
    const devices = await find()

    const linkedDevices = devices.value?.filter(device => device.projectId === props.project.id)

    if (linkedDevices?.length) {
        apiErrors.value.hasDevices = true
        return
    }

    const { remove } = useProject()

    await remove(props.project.id)
        .then(project => emits("done", project))
        .catch(error => {
            apiErrors.value.hasReleases = error.data?.message.includes("The change you are trying to make would violate the required relation")
        })
}

</script>