<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Name" path="name">
            <n-input v-model:value="model.name"></n-input>
        </n-form-item>

        <n-form-item label="Mac" path="mac">
            <n-input v-model:value="model.mac"></n-input>
        </n-form-item>

        <n-form-item label="API Key" path="apiKey">
            <n-input v-model:value="model.apiKey"></n-input>
        </n-form-item>

        <div class="flex gap-2">
            <n-button secondary class="flex-1" attr-type="button" @click="$emit('cancel')">Cancel</n-button>
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending" class="flex-1">Create
                device</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(["cancel", "done"])

const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm()

apiErrors.value = {
    nameAlreadyExists: false,
    macAlreadyExists: false,
}

const model = ref({
    name: "",
    apiKey: "",
    mac: ""
});

rules.value = {
    name: [
        {
            required: true,
            message: "Please input device name",
            trigger: "blur",
        },
        {
            message: "Name already used",
            validator: () => !apiErrors.value.nameAlreadyExists
        },
    ],
    mac: [
        {
            required: true,
            message: "Please input device MAC",
            trigger: "blur",
        },
        {
            message: "MAC already used",
            validator: () => !apiErrors.value.macAlreadyExists
        },
    ],
    apiKey: [
        {
            required: true,
            message: "Please input api key",
            trigger: "blur",
        },
    ],
}

async function handleSubmit() {
    const { add } = useDevice()

    const { data: device, error } = await add(model.value)

    if (error.value) {
        apiErrors.value.nameAlreadyExists = error.value.data?.message.includes("Unique constraint failed on the constraint: `Device_name_key`")
        apiErrors.value.macAlreadyExists = error.value.data?.message.includes("Unique constraint failed on the constraint: `Device_mac_key`")
    }
    else {
        emits("done", device.value)
    }
}
</script>