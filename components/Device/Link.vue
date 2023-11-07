<template>
  <n-form ref="formRef" :model="model" @submit.prevent="onSubmit(handleSubmit)">
    <n-form-item label="Name">
      <n-select v-model:value="model.selectedDeviceId" :options="selectOptions" />
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
      <n-button type="primary" class="flex-1" attr-type="submit" :loading="pending" :disabled="pending || !edited">
        Link device
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import type { SelectOption } from 'naive-ui'

const model = ref({
  selectedDeviceId: ''
})

const { formRef, onSubmit, pending, edited } = useNaiveForm(model)

const props = defineProps<{ project: Project }>()

const emits = defineEmits(['cancel', 'done'])

const { find } = useDevice()

const devices = await find()

const unlinkedDevices = computed(() => devices.value?.filter(device => device.projectId === null) ?? [])

const selectOptions = computed<SelectOption[]>(() => unlinkedDevices.value.map(device => ({
  label: device.name,
  value: device.id
})))

async function handleSubmit () {
  const { link } = useDevice()

  await link(model.value.selectedDeviceId, props.project.id)
    .then(device => emits('done', device))
}
</script>
