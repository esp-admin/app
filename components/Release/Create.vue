<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item>
            <n-upload :custom-request="(e) => file = e.file.file" accept=".bin">
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

        <div class="flex gap-4">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="primary" class="flex-1" attr-type="submit" :loading="pending" :disabled="pending || !edited">
                Create
            </n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const props = defineProps<{ project: Project }>()

const file = ref<File | null>()

const emits = defineEmits(["cancel", "done"])

const model = ref<Partial<Release>>({
    version: "",
    downloadUrl: "",
});

const { apiErrors, formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

apiErrors.value = {
    versionAlreadyExists: false,
    uploadFailed: false
}

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
        {
            message: "Unable to upload firmware",
            validator: () => !apiErrors.value.uploadFailed
        },
        {
            validator: (rule, value) => /^(\d+)\.(\d+)\.(\d+)(?:-([\w-.]+))?(?:\+([\w-.]+))?$/.test(value),
            message: "Should be in format x.y.z or x.y.z-suffix",
            trigger: "blur"
        }
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
        apiErrors.value.uploadFailed = true
    }

    const { add } = useRelease(props.project.id)

    await add(model.value)
        .then(async release => {
            const { publish } = useMqtt()

            const { find } = useDevice()

            const devices = await find()

            const linkedDevices = devices.value?.filter(device => device.projectId === props.project.id) || []

            for (let device of linkedDevices) {
                publish({
                    deviceId: device.id,
                    action: "command",
                    type: "update",
                    retained: true,
                    payload: JSON.stringify({
                        releaseId: release.id,
                        version: release.version,
                        downloadUrl: release.downloadUrl,
                    })
                })
            }

            emits("done", release)
        }).catch(error => {
            apiErrors.value.versionAlreadyExists = error.data?.message.includes("Unique constraint failed on the constraint: `Project_name_key`")
        })
}
</script>