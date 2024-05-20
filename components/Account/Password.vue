<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    @submit.prevent="onSubmit(handleChangePassword)"
  >
    <n-form-item
      label="Current password"
      path="currentPassword"
    >
      <n-input
        v-model:value="model.currentPassword"
        type="password"
        show-password-on="click"
        :input-props="{ autocomplete: 'current-password' }"
      />
    </n-form-item>

    <n-form-item
      label="New password"
      path="newPassword"
    >
      <n-input
        v-model:value="model.newPassword"
        type="password"
        show-password-on="click"
        :input-props="{ autocomplete: 'new-password' }"
      />
    </n-form-item>

    <form-buttons
      :loading="pending"
      :disabled="pending || !edited"
      @reset="reset"
    />
  </n-form>
</template>

<script setup lang="ts">
const { changePassword } = useAuth()

const model = ref({
  currentPassword: '',
  newPassword: '',
})

const { formRef, onSubmit, pending, rules, apiErrors, edited, reset } = useNaiveForm(model)

apiErrors.value = {
  wrongPassword: false,
}

rules.value = {
  currentPassword: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
    {
      validator: () => !apiErrors.value.wrongPassword,
      message: 'Wrong password',
      trigger: 'input',
    },
  ],
  newPassword: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
    {
      validator: (_, value) => REGEX_PASSWORD.test(value),
      message: ERROR_INVALID_PASSWORD,
      trigger: 'input',
    },
  ],
}

async function handleChangePassword() {
  await changePassword(model.value)
    .catch((error) => {
      apiErrors.value.wrongPassword = error.data.message === 'wrong-password'
    })
}
</script>
