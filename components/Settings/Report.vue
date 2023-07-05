<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Webhook URL" path="webhookUrl">
            <n-input v-model:value="model.webhookUrl"></n-input>
        </n-form-item>

        <n-form-item label="Bugsnag Key" path="bugsnagUrl">
            <n-input v-model:value="model.bugsnagKey"></n-input>
        </n-form-item>

        <FormButtons @reset="reset" :loading="pending" :disabled="!edited || pending"></FormButtons>

    </n-form>
</template>

<script setup lang="ts">

const { find } = useReport()

const report = await find()

const model = ref<Partial<Report>>({
    bugsnagKey: report.value?.bugsnagKey,
    webhookUrl: report.value?.webhookUrl
});

const { formRef, onSubmit, pending, rules, edited, reset } = useNaiveForm(model)

async function handleSubmit() {
    const { add, update } = useReport()

    if (report.value) {
        await update(model.value)
    }
    else {
        await add(model.value)
    }
}
</script>