<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Version" path="version">
            <n-input v-model:value="model.version"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')"
                :disabled="pending">Cancel</n-button>
            <n-button type="error" class="flex-1" attr-type="submit" :disabled="pending || !edited" :loading="pending">Delete
                release</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ release: Release, projectId: Project["id"] }>()

const model = ref({
    version: "",
});

const { formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

rules.value = {
    version: [
        {
            required: true,
            message: "Please input release version",
            trigger: "blur",
        },
        {
            message: `Version should be ${props.release.version}`,
            validator: (rule, value) => value === props.release.version
        },
    ],
}

async function handleSubmit() {
    const { remove } = useRelease(props.projectId)

    const { data: release, error } = await remove(props.release.id)

    if (error.value) {

    }
    else {
        const { remove } = useS3Object()


        const { getAccessToken } = useAuthSession()

        const accessToken = await getAccessToken()

        await remove({
            url: props.release.downloadUrl,
            authorization: `Bearer ${accessToken}`
        })

        emits("done", release.value)
    }
}

</script>