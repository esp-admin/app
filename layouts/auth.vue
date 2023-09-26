<template>
  <div class="page justify-center items-center p-7">
    <NuxtLink to="/">
      <Logo :width="115" />
    </NuxtLink>

    <n-text class="text-lg font-medium mb-8 mt-1" depth="3">
      {{ title }}
    </n-text>

    <div class="w-full max-w-sm sm:p-6 sm:shadow-md sm:border-zinc-100 sm:dark:border-zinc-800 sm:border sm:rounded-md">
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
