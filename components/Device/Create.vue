<template>
  <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="model.name" />
    </n-form-item>

    <n-form-item label="API Key" path="apiKey">
      <FormKey v-model:value="model.apiKey" />
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
      <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending || !edited" class="flex-1">
        Create device
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
const emits = defineEmits(['cancel', 'done'])

const model = ref({
  name: '',
  apiKey: ''
})

const { apiErrors, formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

apiErrors.value = {
  nameAlreadyExists: false
}

rules.value = {
  name: [
    {
      required: true,
      message: 'Please fill out this field.',
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
  apiKey: [
    {
      required: true,
      message: 'Please fill out this field.',
      trigger: 'blur'
    }
  ]
}

async function handleSubmit () {
  const { add } = useDevice()

  await add(model.value)
    .then(device => emits('done', device))
    .catch((error) => {
      apiErrors.value.nameAlreadyExists = error.data.message === 'Unique constraint failed on Device_name_userId_key'
    })
}
</script>
