<template>
    <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
        <n-form-item label="Webhook URL" path="webhookUrl">
            <n-input v-model:value="model.webhookUrl"></n-input>
        </n-form-item>

        <n-form-item label="Bugsnag Key" path="bugsnagUrl">
            <n-input v-model:value="model.bugsnagKey"></n-input>
        </n-form-item>

        <div class="flex gap-4">
            <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending">Save</n-button>
            <n-button secondary attr-type="reset">Reset</n-button>
        </div>
    </n-form>
</template>

<script setup lang="ts">

const { formRef, onSubmit, pending, rules } = useNaiveForm()

const { find } = useReport()

const { data: report } = await find()

const model = ref<Partial<Report>>({
    bugsnagKey: report.value?.bugsnagKey,
    webhookUrl: report.value?.webhookUrl
});


async function handleSubmit() {
    const { add, update } = useReport()

    if (report.value) {
        const { data, error } = await update(model.value)

    }
    else {
        const { data, error } = await add(model.value)

    }
}
</script>