<template>
  <n-h1 class="text-xl">
    Create new Device
  </n-h1>

  <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
    <n-form-item label="Name" path="name">
      <n-input v-model:value="model.name" />
    </n-form-item>

    <n-form-item label="API Key" path="apiKey">
      <n-input v-model:value="model.apiKey" />
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
        Create
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
      message: 'Please input device name',
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
      message: 'Please input api key',
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
  const { add } = useDevice()

  await add(model.value)
    .then(device => emits('done', device))
    .catch((error) => {
      apiErrors.value.nameAlreadyExists = error.data?.message.includes('Unique constraint failed on the constraint: `Device_name_key`')
    })
}
</script>
