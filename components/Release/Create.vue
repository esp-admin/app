<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item>
            <n-upload>
                <n-upload-dragger>
                    <div>
                        <naive-icon name="ph:upload" :size="28"></naive-icon>
                    </div>

                    <n-text class="text-sm" :depth="2">
                        Click or drag a firmware.bin to this area to upload
                    </n-text>
                </n-upload-dragger>
            </n-upload>
        </n-form-item>

        <n-form-item label="Version" path="version">
            <n-input v-model:value="model.version"></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="primary" class="flex-1" attr-type="submit" :loading="pending" :disabled="pending">Create
                release</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const props = defineProps<{ project: Project }>()

const emits = defineEmits(["cancel", "done"])

const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm()

apiErrors.value = {
    versionAlreadyExists: false,
}

const model = ref<Partial<Release>>({
    version: "",
    downloadUrl: "",
});

rules.value = {
    version: [
        {
            required: true,
            message: "Please input project version",
            trigger: "blur",
        },
        {
            message: "Version already used",
            validator: () => !apiErrors.value.versionAlreadyExists
        },
    ],
}


async function handleSubmit() {
    const { addRelease } = useProject()

    const { data: project, error } = await addRelease(props.project.id, model.value)

    if (error.value) {
        apiErrors.value.versionAlreadyExists = error.value.data?.message.includes("Unique constraint failed on the constraint: `Project_name_key`")
    }
    else {
        emits("done", project.value)
    }
}
</script>