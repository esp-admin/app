<template>
  <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="onSubmit(handleSubmit)">
    <n-form-item label="Confirm" path="confirm">
      <n-input v-model:value="model.confirm" placeholder="confirm" />
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
        Delete release
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(['cancel', 'done'])

const props = defineProps<{ release: Release }>()

const model = ref({
  confirm: ''
})

const { formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

rules.value = {
  confirm: [
    {
      message: ERROR_CONFIRM_REQUIRED,
      validator: (_, value) => value === 'confirm',
      trigger: 'input'
    }
  ]
}

async function handleSubmit () {
  const { remove } = useRelease(props.release.projectId)

  await remove(props.release.id)
    .then(async (release) => {
      const { remove } = useUpload()

      await remove([props.release.downloadPath])

      emits('done', release)
    })
}

</script>
