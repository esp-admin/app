<template>
  <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="onSubmit(handleSubmit)">
    <n-form-item label="Report by webhook" path="webhookEnable" label-placement="left">
      <n-checkbox v-model:checked="model.webhookEnable" />
    </n-form-item>

    <n-form-item label="Webhook URL" path="webhookUrl">
      <n-input v-model:value="model.webhookUrl" />
    </n-form-item>

    <n-form-item label="Report by email" path="emailEnable" label-placement="left">
      <n-checkbox v-model:checked="model.emailEnable" />
    </n-form-item>

    <n-form-item label="Email" path="emailAddress">
      <n-input v-model:value="model.emailAddress" />
    </n-form-item>

    <FormButtons :loading="pending" :disabled="!edited || pending" @reset="reset" />
  </n-form>
</template>

<script setup lang="ts">

const { find } = useReport()

const report = await find()

const model = ref<Partial<Report>>({
  webhookEnable: report.value?.webhookEnable || false,
  webhookUrl: report.value?.webhookUrl,
  emailEnable: report.value?.emailEnable || false,
  emailAddress: report.value?.emailAddress
})

const { formRef, onSubmit, pending, rules, edited, reset } = useNaiveForm(model)

rules.value = {
  webhookUrl: [
    {
      message: 'Webhook URL required if enabled',
      validator: (_, value) => model.value.webhookEnable ? !!value : true
    },
    {
      type: 'url',
      message: ERROR_INVALID_URL
    }
  ],
  emailAddress: [
    {
      type: 'email',
      message: ERROR_INVALID_EMAIL
    },
    {
      message: 'Email address required if enabled',
      validator: (_, value) => model.value.emailEnable ? !!value : true
    }
  ]
}

async function handleSubmit () {
  const { add, update } = useReport()

  if (report.value) {
    await update(model.value)
  } else {
    await add(model.value)
  }
}
</script>
