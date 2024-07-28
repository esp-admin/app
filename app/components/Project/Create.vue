<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="model"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-form-item
      label="Name"
      path="name"
    >
      <n-input v-model:value="model.name" />
    </n-form-item>

    <div class="flex gap-4">
      <n-button
        secondary
        class="flex-1"
        attr-type="button"
        :disabled="pending"
        @click="$emit('cancel')"
      >
        Cancel
      </n-button>
      <n-button
        type="primary"
        attr-type="submit"
        :loading="pending"
        :disabled="pending || !edited"
        class="flex-1"
      >
        Create project
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
const emits = defineEmits(['cancel', 'done'])

const model = ref<Partial<Project>>({
  name: '',
})

const { apiErrors, formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

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
}

async function handleSubmit() {
  await useProject().add(model.value)
    .then(project => emits('done', project))
    .catch((err) => {
      apiErrors.value.nameAlreadyExists = err.data.message.includes('Unique constraint failed')
    })
}
</script>
