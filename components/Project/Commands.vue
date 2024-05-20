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
            placeholder="Name"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          class="flex-1"
          ignore-path-change
          :show-label="false"
          :path="`[${index}].value`"
          :rule="rules.value"
        >
          <n-input
            v-model:value="model[index].value"
            placeholder="Value"
            @keydown.enter.prevent
          />
        </n-form-item>
      </div>
    </n-dynamic-input>

    <form-buttons
      :loading="pending"
      :disabled="!edited || pending"
      @reset="reset"
    />
  </n-form>
</template>

<script setup lang="ts">
import { destr, safeDestr } from 'destr'

const props = defineProps<{ project: Project }>()

const model = ref(
  destr<{ key: string, value: string }[]>(props.project.commands),
)

const { formRef, onSubmit, pending, rules, edited, reset }
  = useNaiveForm(model)

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
  value: [
    {
      trigger: 'input',
      message: ERROR_INVALID_JSON,
      validator(_, value) {
        try {
          safeDestr(value)
          return true
        }
        catch (_) {
          return false
        }
      },
    },
  ],
}

async function handleSubmit() {
  const { update } = useProject()

  await update(props.project.id, {
    commands: JSON.stringify(model.value),
  })
}
</script>
