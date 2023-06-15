<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="URI WS" path="uriWS">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="URI TCP" path="uriTCP">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="Username" path="username">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="Password" path="password">
            <n-input></n-input>
        </n-form-item>

        <n-form-item label="Certificate" path="certificate">
            <n-input type="textarea" autosize></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm()

apiErrors.value = {
    unableToConnect: false,
}

const model = ref<Partial<Mqtt>>({
    password: "",
    username: "",
    uriTCP: "",
    uriWS: "",
    certificate: ""
});

rules.value = {
    uriWS: [
        {
            required: true,
            message: "Please enter borker's Websockets URI",
            trigger: "blur",
        },
        {
            message: "Unable to connect",
            validator: () => !apiErrors.value.unableToConnect
        },
    ],
    username: [
        {
            required: true,
            message: "Please enter username",
            trigger: "blur",
        },
    ],
    password: [
        {
            required: true,
            message: "Please enter password",
            trigger: "blur",
        },
    ],
}


async function handleSubmit() {
}
</script>