<template>
  <div class="page justify-center items-center">
    <NuxtLink to="/">
      <Logo :width="110" />
    </NuxtLink>

    <n-text class="text-xl font-semibold mb-8 mt-2">
      {{ title }}
    </n-text>

    <div class="w-full max-w-sm p-7 sm:shadow-lg sm:border-zinc-100 sm:border sm:rounded-md">
      <slot />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const title = computed(() => {
  switch (route.name) {
    case 'auth-login':
      return 'Login to your account'

    case 'auth-register':
      return 'Create your account'

    case 'auth-request-password-reset':
      return 'Request password reset'

    case 'auth-reset-password':
      return 'Reset your password'

    case 'auth-verify-email':
      return 'Email verification'

    case 'auth-callback':
      return 'Social login'
  }
})
</script>
