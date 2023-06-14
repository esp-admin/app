<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Version" path="version">
            <n-input v-model:value="model.version"></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="error" class="flex-1" attr-type="submit" :disabled="pending" :loading="pending">Delete
                release</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(["cancel", "done"])

const props = defineProps<{ release: Release, projectId: Project["id"] }>()

const { formRef, onSubmit, pending, rules } = useNaiveForm()

const model = ref({
    version: "",
});

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
        emits("done", release.value)
    }
}

</script>