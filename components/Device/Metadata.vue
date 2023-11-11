<template>
  <n-form ref="formRef" :rules="rules" :model="model" autocomplete="off" @submit.prevent="onSubmit(handleSubmit)">
    <n-form-item label="Identifier">
      <n-input :value="device.id" disabled />
    </n-form-item>

    <n-form-item label="Name" path="name">
      <n-input v-model:value="model.name" />
    </n-form-item>

    <n-form-item label="API key" path="apiKey">
      <FormKey v-model:value="model.apiKey" />
    </n-form-item>

    <n-form-item label="Description" path="description">
      <n-input v-model:value="model.description" type="textarea" :rows="2" />
    </n-form-item>

    <FormButtons :loading="pending" :disabled="!edited || pending" @reset="reset" />
  </n-form>
</template>

<script setup lang="ts">
const props = defineProps<{ device: Device }>()

const model = ref({
  name: props.device.name,
  apiKey: undefined,
  description: props.device.description
})

const { apiErrors, formRef, onSubmit, pending, rules, edited, reset } = useNaiveForm(model)

apiErrors.value = {
  nameAlreadyExists: false
}

rules.value = {
  name: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input'
    },
    {
      message: ERROR_EXISTS,
      validator: () => !apiErrors.value.nameAlreadyExists
    },
    {
      validator: (_, value) => !REGEX_SPACE_AROUND.test(value),
      message: ERROR_NO_SPACE_AROUND,
      trigger: 'input'
    }
  ]
}

async function handleSubmit () {
  const { update } = useDevice()

  await update(props.device.id, model.value).catch((error) => {
    apiErrors.value.nameAlreadyExists = error.data.message.includes('Unique constraint failed')
  })
}
</script>
