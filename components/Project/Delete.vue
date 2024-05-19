<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="model"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-form-item
      label="Confirm"
      path="confirm"
    >
      <n-input
        v-model:value="model.confirm"
        placeholder="confirm"
      />
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
        type="error"
        class="flex-1"
        attr-type="submit"
        :disabled="pending || !edited"
        :loading="pending"
      >
        Delete project
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
const emits = defineEmits(['cancel', 'done'])

const props = defineProps<{ project: Project }>()

const model = ref({
  confirm: '',
})

const { apiErrors, formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

apiErrors.value = {
  hasDevices: false,
}

rules.value = {
  confirm: [
    {
      message: ERROR_CONFIRM_REQUIRED,
      validator: (_, value) => value === 'confirm',
      trigger: 'input',
    },
    {
      message: 'Make sure to unlink devices first',
      validator: () => !apiErrors.value.hasDevices,
    },
  ],
}

async function handleSubmit() {
  const { findLinked } = useDevice()

  const linkedDevices = await findLinked(props.project.id)

  if (linkedDevices.value?.length) {
    apiErrors.value.hasDevices = true
    return
  }

  const { remove } = useProject()

  await remove(props.project.id)

  emits('done')
}
</script>
