<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="model"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-form-item
      path="webhookUrl"
    >
      <template #label>
        Webhook <n-checkbox
          v-model:checked="model.webhookEnable"
          class="ml-2"
        />
      </template>
      <n-input
        v-model:value="model.webhookUrl"
        placeholder="Webhook URL"
      />
    </n-form-item>

    <n-form-item
      path="emailAddress"
    >
      <template #label>
        Email <n-checkbox
          v-model:checked="model.emailEnable"
          class="ml-2"
        />
      </template>
      <n-input
        v-model:value="model.emailAddress"
        placeholder="Email address"
      />
    </n-form-item>

    <form-buttons
      :loading="pending"
      :disabled="!edited || pending"
      @reset="reset"
    />
  </n-form>
</template>

<script setup lang="ts">
const lb = useLoadingIndicator()

lb.start()

const report = await useReport().find()

lb.finish()

const model = ref<Partial<Report>>({
  webhookEnable: report.value?.webhookEnable || false,
  webhookUrl: report.value?.webhookUrl,
  emailEnable: report.value?.emailEnable || false,
  emailAddress: report.value?.emailAddress,
})

const { formRef, onSubmit, pending, rules, edited, reset }
  = useNaiveForm(model)

rules.value = {
  webhookUrl: [
    {
      message: ERROR_REQUIRED,
      validator: (_, value) => (model.value.webhookEnable ? !!value : true),
    },
    {
      type: 'url',
      message: ERROR_INVALID_URL,
    },
  ],
  emailAddress: [
    {
      type: 'email',
      message: ERROR_INVALID_EMAIL,
    },
    {
      message: ERROR_REQUIRED,
      validator: (_, value) => (model.value.emailEnable ? !!value : true),
    },
  ],
}

async function handleSubmit() {
  if (report.value) {
    await useReport().update(model.value)
  }
  else {
    await useReport().add(model.value)
  }
}
</script>
