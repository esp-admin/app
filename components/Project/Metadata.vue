<template>
    <n-form :key="1" ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <n-form-item label="Repository" path="repository">
            <n-input v-model:value="model.repository"></n-input>
        </n-form-item>

        <n-form-item label="Description" path="description">
            <n-input type="textarea" autosize v-model:value="model.description"></n-input>
        </n-form-item>

        <FormButtons @reset="reset" :loading="pending" :disabled="!edited || pending"></FormButtons>
    </n-form>
</template>

<script setup lang="ts">
const props = defineProps<{ project: Project }>()

const model = ref({
    name: props.project.name,
    repository: props.project.repository,
    description: props.project.description
});

const { apiErrors, formRef, onSubmit, pending, rules, reset, edited } = useNaiveForm(model)

apiErrors.value = {
    nameAlreadyExists: false,
}

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
        {
            validator: (rule, value) => !/^\s|\s$/.test(value),
            message: "Should not start or end with a whitespace",
            trigger: "blur"
        }
    ],
}

async function handleSubmit() {
    const { update } = useProject()

    await update(props.project.id, model.value)
}
</script>