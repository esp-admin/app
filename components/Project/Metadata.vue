<template>
  <n-form :key="1" ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="model.name" />
    </n-form-item>

    <n-form-item label="Repository" path="repository">
      <n-input v-model:value="model.repository" />
    </n-form-item>

    <n-form-item label="Description" path="description">
      <n-input v-model:value="model.description" type="textarea" autosize />
    </n-form-item>

    <FormButtons :loading="pending" :disabled="!edited || pending" @reset="reset" />
  </n-form>
</template>

<script setup lang="ts">
const props = defineProps<{ project: Project }>()

const model = ref({
  name: props.project.name,
  repository: props.project.repository,
  description: props.project.description
})

const { apiErrors, formRef, onSubmit, pending, rules, reset, edited } = useNaiveForm(model)

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
      validator: (_, value) => !REGEX_SPACE_AROUND.test(value),
      message: 'Should not contain leading or trailing space',
      trigger: 'blur'
    }
  ],
  repository: [
    {
      type: 'url'
    }
  ]
}

async function handleSubmit () {
  const { update } = useProject()

  await update(props.project.id, model.value)
    .catch((error) => {
      apiErrors.value.nameAlreadyExists = error.data.message === 'Unique constraint failed on Project_name_userId_key'
    })
}
</script>
