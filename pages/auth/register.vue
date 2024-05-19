<template>
  <div>
    <n-result v-if="success" status="success" title="Email verification is sent" description="Please check your inbox" />

    <div v-else>
      <n-form ref="formRef" :model="model" :rules="rules" @submit.prevent="onSubmit(handleSubmit)">
        <n-form-item label="First name" path="firstName">
          <n-input v-model:value="model.firstName" />
        </n-form-item>

        <n-form-item label="Last name" path="lastName">
          <n-input v-model:value="model.lastName" />
        </n-form-item>

        <n-form-item label="Email" path="email">
          <n-input v-model:value="model.email" :input-props="{ autocomplete: 'username' }" />
        </n-form-item>

        <n-form-item label="Password" path="password">
          <n-input
            v-model:value="model.password"
            type="password"
            show-password-on="click"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-form-item label="Confirm Password" path="passwordConfirm">
          <n-input
            v-model:value="model.passwordConfirm"
            type="password"
            show-password-on="click"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-button type="primary" attr-type="submit" block :disabled="pending" :loading="pending">
          Register
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<script  setup lang="ts">

definePageMeta({
  middleware: 'guest',
  auth: false,
  layout: 'auth',
  colorMode: 'light'
})

const { formRef, pending, rules, onSubmit, apiErrors } = useNaiveForm()
const { register, requestEmailVerify } = useAuth()
const success = ref(false)

apiErrors.value = {
  emailAlreadyExists: false
}

const model = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  firstName: '',
  lastName: ''
})

rules.value = {
  firstName: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input'
    }
  ],
  lastName: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input'
    }
  ],
  email: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input'
    },
    {
      validator: () => !apiErrors.value.emailAlreadyExists,
      message: ERROR_EXISTS,
      trigger: 'input'
    },
    {
      type: 'email',
      message: ERROR_INVALID_EMAIL
    }
  ],
  password: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input'
    },
    {
      validator: (_, value) => REGEX_PASSWORD.test(value),
      message: ERROR_INVALID_PASSWORD,
      trigger: 'input'
    }
  ],
  passwordConfirm: [
    {
      validator: (_, value) => value === model.value.password,
      message: ERROR_MATCH_PASSWORD,
      trigger: 'input'
    }
  ]
}

async function handleSubmit () {
  await register({
    email: model.value.email,
    password: model.value.password,
    name: model.value.firstName + ' ' + model.value.lastName
  }).then(async () => {
    await requestEmailVerify(model.value.email)
    success.value = true
  }).catch(async (error) => {
    apiErrors.value.emailAlreadyExists = error.data.message.includes('email-used-with')
    if (error.data.message === 'account-not-verified') {
      await requestEmailVerify(model.value.email)
      success.value = true
    }
  })
}
</script>
