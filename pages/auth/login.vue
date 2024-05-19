<template>
  <n-form
    ref="formRef"
    :rules="rules"
    :model="model"
    @submit.prevent="onSubmit(handleSubmit)"
  >
    <n-form-item
      label="Email"
      path="email"
      :show-require-mark="false"
    >
      <n-input
        v-model:value="model.email"
        :input-props="{ autocomplete: 'username' }"
      />
    </n-form-item>

    <n-form-item
      path="password"
      :show-require-mark="false"
      :label-style="{ display: 'block' }"
    >
      <template #label>
        <span>Password</span>
        <nuxt-link
          to="/auth/request-password-reset"
          class="no-underline float-right"
        >
          <n-text type="primary">
            Forgot password?
          </n-text>
        </nuxt-link>
      </template>
      <n-input
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :input-props="{ autocomplete: 'current-password' }"
      />
    </n-form-item>

    <div class="flex flex-col gap-4">
      <n-button
        attr-type="submit"
        block
        :loading="pending"
        :disabled="pending"
        type="primary"
      >
        Login
      </n-button>

      <n-button
        v-if="$config.public.oauth.google"
        block
        @click="loginWithProvider('google')"
      >
        <template #icon>
          <naive-icon :name="ICON_GOOGLE" />
        </template>
        Continue with Google
      </n-button>

      <n-button
        v-if="$config.public.oauth.github"
        block
        @click="loginWithProvider('github')"
      >
        <template #icon>
          <naive-icon :name="ICON_GITHUB" />
        </template>
        Continue with Github
      </n-button>

      <nuxt-link to="/auth/register">
        <n-button
          attr-type="button"
          block
        >
          <template #icon>
            <naive-icon name="ph:user-plus" />
          </template>
          Create Account
        </n-button>
      </nuxt-link>
    </div>
  </n-form>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'guest',
  auth: false,
  layout: 'auth',
  colorMode: 'light',
})

const { formRef, rules, pending, apiErrors, onSubmit } = useNaiveForm()
const { login, loginWithProvider } = useAuth()

const model = ref({
  email: '',
  password: '',
})

apiErrors.value = {
  wrongCredentials: false,
  invalidProvider: false,
  accountNotVerified: false,
  accountSuspended: false,
}

rules.value = {
  email: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
    {
      type: 'email',
      message: ERROR_INVALID_EMAIL,
    },
    {
      message: 'Wrong credentials',
      validator: () => !apiErrors.value.wrongCredentials,
    },
    {
      message: 'Your account is not verified',
      validator: () => !apiErrors.value.accountNotVerified,
    },
    {
      message: 'Your account is suspended',
      validator: () => !apiErrors.value.accountSuspended,
    },
  ],
  password: [
    {
      required: true,
      message: ERROR_REQUIRED,
      trigger: 'input',
    },
  ],
}

async function handleSubmit() {
  await login({
    email: model.value.email,
    password: model.value.password,
  }).catch((error) => {
    apiErrors.value.wrongCredentials = error.data.message === 'wrong-credentials'
    apiErrors.value.accountNotVerified = error.data.message === 'account-not-verified'
    apiErrors.value.accountSuspended = error.data.message === 'account-suspended'
  })
}
</script>
