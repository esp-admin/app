<template>
  <div>
    <n-result v-if="success" status="success" title="Done" description="Password is successfully reset">
      <template #footer>
        <nuxt-link to="/auth/login" class="no-underline">
          <n-button type="primary">
            Go back to login
          </n-button>
        </nuxt-link>
      </template>
    </n-result>

    <n-result
      v-else-if="failure"
      status="error"
      title="Failed to reset password"
      description="You do not have permission"
    >
      <template #footer>
        <nuxt-link to="/auth/login" class="no-underline">
          <n-button type="primary">
            Go back to login
          </n-button>
        </nuxt-link>
      </template>
    </n-result>

    <div v-else>
      <n-form ref="formRef" :model="model" :rules="rules" @submit.prevent="onSubmit(handleSubmit)">
        <n-form-item label="Password" path="password" :show-require-mark="false">
          <n-input
            v-model:value="model.password"
            type="password"
            show-password-on="click"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-form-item label="Confirm Password" path="passwordConfirm" :show-require-mark="false">
          <n-input
            v-model:value="model.passwordConfirm"
            type="password"
            show-password-on="click"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-button attr-type="submit" block :disabled="pending" :loading="pending" type="primary">
          <template #icon>
            <naive-icon name="ph:arrows-counter-clockwise-duotone" />
          </template>
          Change password
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<script  setup lang="ts">

definePageMeta({
  middleware: 'guest',
  auth: false,
  layout: 'auth'
})

const { formRef, pending, rules, onSubmit } = useNaiveForm()
const { resetPassword } = useAuth()

const success = ref(false)
const failure = ref(false)

const model = ref({
  password: '',
  passwordConfirm: ''
})

rules.value = {
  password: [
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
  const { error } = await resetPassword(model.value.password)

  if (error.value) {
    failure.value = true
  } else {
    success.value = true
  }
}
</script>
