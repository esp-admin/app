<template>
  <n-form
    ref="formRef"
    :model="model"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-dynamic-input
      v-model:value="model"
      #="{ index }"
      :on-create="() => ({ key: '', value: '' })"
      class="mb-4"
    >
      <div class="flex gap-4 flex-1 items-baseline">
        <n-form-item
          class="flex-1"
          ignore-path-change
          :show-label="false"
          :path="`[${index}].key`"
          :rule="rules.key"
        >
          <n-input
            v-model:value="model[index].key"
            placeholder="Key"
            @keydown.enter.prevent
          />
        </n-form-item>

        <n-form-item
          class="flex-1"
          ignore-path-change
          :show-label="false"
        >
          <n-input
            v-model:value="model[index].value"
            placeholder="Description"
            @keydown.enter.prevent
          />
        </n-form-item>
      </div>
    </n-dynamic-input>

    <FormButtons
      :loading="pending"
      :disabled="!edited || pending"
      @reset="reset"
    />
  </n-form>
</template>

<script setup lang="ts">
import { destr } from 'destr'

const props = defineProps<{ project: Project }>()

const model = ref(destr<{ key: string, value: string }[]>(props.project.variables))

const { formRef, onSubmit, pending, rules, reset, edited } = useNaiveForm(model)

rules.value = {
  key: [
    {
      required: true,
      message: ERROR_REQUIRED,
    },
    {
      trigger: 'input',
      message: ERROR_NO_SPACE,
      validator: (_, value) => !REGEX_SPACE.test(value),
    },
  ],
}

async function handleSubmit() {
  const { update } = useProject()

  await update(props.project.id, {
    variables: JSON.stringify(model.value),
  })
}
</script>
