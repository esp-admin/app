<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <n-form-item label="Repository" path="repository">
            <n-input v-model:value="model.repository"></n-input>
        </n-form-item>

        <n-form-item label="Description" path="description">
            <n-input type="textarea" autosize v-model:value="model.description"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
import type { Project } from "@prisma/client"
const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm()

const props = defineProps<{ project: Project }>()

apiErrors.value = {
    nameAlreadyExists: false,
}

const model = ref<Partial<Project>>({
    name: props.project.name,
    repository: props.project.repository,
    description: props.project.description
});

rules.value = {
    name: [
        {
            required: true,
            message: "Please input project name",
            trigger: "blur",
        },
        {
            message: "Name already used",
            validator: () => !apiErrors.value.nameAlreadyExists
        },
    ],
}

async function handleSubmit() {
    const { update } = useProject()

    const { data, error } = await update(props.project.id, model.value)
}
</script>