<template>
  <n-form ref="formRef" :rules="rules" :model="model" @submit.prevent="() => onSubmit(handleSubmit)">
    <n-form-item label="Confirm" path="confirm">
      <n-input v-model:value="model.confirm" placeholder="Write <unlink> to confirm" />
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
        class="flex-1"
        attr-type="submit"
        :disabled="pending || !edited"
        :loading="pending"
      >
        Unlink device
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">

const emits = defineEmits(['cancel', 'done'])

const props = defineProps<{ device: Device }>()

const model = ref({
  confirm: ''
})

const { formRef, onSubmit, pending, rules, edited } = useNaiveForm(model)

rules.value = {
  confirm: [
    {
      message: 'Please write <unlink>',
      validator: (_, value) => value === 'unlink',
      trigger: 'blur'
    }
  ]
}

async function handleSubmit () {
  const { unlink } = useDevice()

  await unlink(props.device.id)
    .then(device => emits('done', device))
}

</script>
