<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Webhook URL" path="webhookUrl">
            <n-input v-model:value="model.webhookUrl"></n-input>
        </n-form-item>

        <n-form-item label="Bugsnag URL" path="bugsnagUrl">
            <n-input v-model:value="model"></n-input>
        </n-form-item>

        <n-form-item label="Username" path="username">
            <n-input v-model:value="model.username"></n-input>
        </n-form-item>

        <n-form-item label="Password" path="password">
            <n-input v-model:value="model.password"></n-input>
        </n-form-item>

        <n-form-item label="Certificate" path="certificate">
            <n-input type="textarea" autosize v-model:value="model.certificate"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const { apiErrors, formRef, onSubmit, pending, rules } = useNaiveForm()

const { find } = useReport()

const { data: report } = await find()

const model = ref<Partial<Report>>({
    bagsnagKey: report.value?.bagsnagKey,
    webhookUrl: report.value?.webhookUrl
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
    const { add, update } = useMqtt()

    if (mqtt.value) {
        const { data, error } = await update(model.value)

    }
    else {
        const { data, error } = await add(model.value)

    }
}
</script>