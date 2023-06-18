<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item>
            <n-upload :custom-request="(e) => file = e.file.file">
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
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="primary" class="flex-1" attr-type="submit" :loading="pending" :disabled="pending">
                Create
            </n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const props = defineProps<{ project: Project }>()

const file = ref<File | null>()

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
    if (file.value) {
        const { upload, getPublicUrl } = useS3Object()

        const { getAccessToken } = useAuthSession()

        const accessToken = await getAccessToken()

        const { data } = await upload({
            files: [file.value],
            authorization: `Bearer ${accessToken}`
        })

        if (data.value) {
            model.value.downloadUrl = getPublicUrl(data.value[0].url)
        }
    }

    if (!model.value.downloadUrl) {
        return
    }

    const { add } = useRelease(props.project.id)

    const { data: release, error } = await add(model.value)

    if (error.value) {
        apiErrors.value.versionAlreadyExists = error.value.data?.message.includes("Unique constraint failed on the constraint: `Project_name_key`")
    }
    else {
        emits("done", release.value)
    }
}
</script>