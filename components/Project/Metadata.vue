<template>
  <n-form
    :key="1"
    ref="formRef"
    :rules="rules"
    :model="model"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-form-item label="Identifier">
      <form-id :value="project.id" />
    </n-form-item>

    <n-form-item
      label="Name"
      path="name"
    >
      <n-input v-model:value="model.name" />
    </n-form-item>

    <n-form-item
      label="API key"
      path="apiKey"
    >
      <form-key v-model:value="model.apiKey" />
    </n-form-item>

    <n-form-item
      label="Repository"
      path="repository"
    >
      <n-input v-model:value="model.repository" />
    </n-form-item>

    <n-form-item
      label="Description"
      path="description"
    >
      <n-input
        v-model:value="model.description"
        type="textarea"
        autosize
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
const props = defineProps<{ project: Project }>()

const model = ref({
  name: props.project.name,
  repository: props.project.repository,
  description: props.project.description,
  apiKey: undefined,
})

const { apiErrors, formRef, onSubmit, pending, rules, reset, edited }
  = useNaiveForm(model)

apiErrors.value = {
  nameAlreadyExists: false,
}

rules.value = {
  name: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
    {
      message: ERROR_EXISTS,
      validator: () => !apiErrors.value.nameAlreadyExists,
    },
    {
      validator: (_, value) => !REGEX_SPACE_AROUND.test(value),
      message: ERROR_NO_SPACE_AROUND,
      trigger: 'input',
    },
  ],
  repository: [
    {
      type: 'url',
      message: ERROR_INVALID_URL,
    },
  ],
}

async function handleSubmit() {
  await useProject().update(props.project.id, model.value)
    .then(() => { model.value.apiKey = undefined })
    .catch((err) => {
      apiErrors.value.nameAlreadyExists = err.data.message.includes(
        'Unique constraint failed',
      )
    })
}
</script>
