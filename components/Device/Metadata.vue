<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <n-form-item label="API key" path="apiKey">
            <n-input v-model:value="model.apiKey"></n-input>
        </n-form-item>

        <n-form-item label="Description" path="description">
            <n-input type="textarea" v-model:value="model.description"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset" :disabled="pending">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">
const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm()

const props = defineProps<{ device: Device }>()

apiErrors.value = {
    nameAlreadyExists: false,
}

const model = ref<Partial<Device>>({
    name: props.device.name,
    apiKey: props.device.apiKey,
    description: props.device.description
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
    apiKey: [
        {
            required: true,
            message: "Please input API key",
            trigger: "blur",
        },
    ],
}

async function handleSubmit() {
    const { update } = useDevice()

    const { data, error } = await update(props.device.id, model.value)
}
</script>