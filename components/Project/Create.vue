<template>
  <n-h1 class="text-xl">
    Create new Project
  </n-h1>

  <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
    <n-form-item label="Name" path="name">
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
      <n-button type="primary" attr-type="submit" :loading="pending" :disabled="pending || !edited" class="flex-1">
        Create
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(['cancel', 'done'])

const model = ref<Partial<Project>>({
  name: ''
})

const { apiErrors, formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

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
      message: 'Should not contain leading or trailing space',
      trigger: 'blur'
    }
  ]
}

async function handleSubmit () {
  const { add } = useProject()

  await add(model.value)
    .then(project => emits('done', project))
    .catch((_) => {
      apiErrors.value.nameAlreadyExists = true
    })
}
</script>
