<template>
  <n-form ref="formRef" :rules="rules" :model="model" autocomplete="off" @submit.prevent="() => onSubmit(handleSubmit)">
    <n-form-item label="Identifier">
      <n-input :value="device.id" disabled />
    </n-form-item>

    <n-form-item label="Name" path="name">
      <n-input v-model:value="model.name" />
    </n-form-item>

    <n-form-item label="API key" path="apiKey">
      <n-input v-model:value="model.apiKey" type="password" show-password-on="click" :input-props="{ autocomplete: 'off' }" />
    </n-form-item>

    <n-form-item label="Description" path="description">
      <n-input v-model:value="model.description" type="textarea" autosize />
    </n-form-item>

    <FormButtons :loading="pending" :disabled="!edited || pending" @reset="reset" />
  </n-form>
</template>

<script setup lang="ts">
const props = defineProps<{ device: Device }>()

const model = ref({
  name: props.device.name,
  apiKey: props.device.apiKey,
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
      message: 'Please input project name',
      trigger: 'blur'
    },
    {
      message: 'Name already used',
      validator: () => !apiErrors.value.nameAlreadyExists
    },
    {
      validator: (_, value) => !/^\s|\s$/.test(value),
      message: 'Should not start or end with a whitespace',
      trigger: 'blur'
    }
  ],
  apiKey: [
    {
      required: true,
      message: 'Please input API key',
      trigger: 'blur'
    },
    {
      validator: (_, value) => /(?=.*[a-z])(?=.*[0-9])(?=.{6,})/.test(value),
      message: 'At least 6 characters, 1 lowercase, 1 number',
      trigger: 'blur'
    }
  ]
}

async function handleSubmit () {
  const { update } = useDevice()

  await update(props.device.id, model.value)
}
</script>
