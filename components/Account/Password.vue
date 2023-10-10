<template>
  <n-form ref="formRef" :model="model" :rules="rules" @submit.prevent="() => onSubmit(handleChangePassword)">
    <n-form-item label="Current password" path="currentPassword">
      <n-input v-model:value="model.currentPassword" type="password" show-password-on="click" />
    </n-form-item>

    <n-form-item label="New password" path="newPassword">
      <n-input v-model:value="model.newPassword" type="password" show-password-on="click" />
    </n-form-item>

    <FormButtons :loading="pending" :disabled="pending || !edited" @reset="reset" />
  </n-form>
</template>

<script setup lang="ts">
const { changePassword } = useAuth()

const message = useMessage()

const model = ref({
  currentPassword: '',
  newPassword: ''
})

const { formRef, onSubmit, pending, rules, apiErrors, edited, reset } = useNaiveForm(model)

apiErrors.value = {
  wrongPassword: false
}

rules.value = {
  currentPassword: [
    {
      required: true,
      message: 'Please fill out this field.',
      trigger: 'blur'
    },
    {
      validator: () => !apiErrors.value.wrongPassword,
      message: 'Wrong password',
      trigger: 'input'
    }
  ],
  newPassword: [
    {
      required: true,
      message: 'Please fill out this field.',
      trigger: 'input'
    }
  ]
}

async function handleChangePassword () {
  await changePassword(model.value)
    .then(() => {
      message.success('Your password is changed')
    }).catch((error) => {
      apiErrors.value.wrongPassword = error.data.message === 'wrong-password'
    })
}
</script>
