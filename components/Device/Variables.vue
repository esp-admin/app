<template>
  <n-form ref="formRef" :model="model" @submit.prevent="onSubmit(handleSubmit)">
    <FormItem
      v-for="projectVariable of projectVariables"
      :key="projectVariable.key"
      :label="projectVariable.key"
      :description="projectVariable.value"
    >
      <n-input v-model:value="model[projectVariable.key]" />
    </FormItem>

    <FormButtons v-if="projectVariables?.length" :loading="pending" :disabled="!edited || pending" @reset="reset" />

    <n-result v-else class="col-span-full my-5" title="No variables found">
      <template #icon>
        <ResultEmpty />
      </template>
    </n-result>
  </n-form>
</template>

<script setup lang="ts">
import { destr } from 'destr'

const props = defineProps<{ device: Device }>()

const model = ref(destr<Record<string, string>>(props.device.variables))

model.value ||= {}

const { formRef, onSubmit, pending, edited, reset } = useNaiveForm(model)

const projectVariables = ref<{ key: string, value: string }[]>([])

if (props.device.projectId) {
  const { findOne } = useProject()
  const project = await findOne(props.device.projectId)

  projectVariables.value = destr<{ key: string, value: string }[]>(project.value?.variables)

  if (!projectVariables.value) {
    model.value = {}
  }

  Object.keys(model.value).forEach((key) => {
    if (projectVariables.value.find(el => el.key === key) === undefined) {
      delete model.value[key]
    }
  })
}

async function handleSubmit () {
  const { update } = useDevice()

  await update(props.device.id, { variables: JSON.stringify(model.value) })
    .then(() => {
      const { $mqtt } = useNuxtApp()

      $mqtt.publish({
        deviceId: props.device.id,
        action: 'command',
        type: 'config',
        payload: JSON.stringify(model.value),
        retain: true
      })
    })
}
</script>
