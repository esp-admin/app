<template>
  <div class="text-center">
    <n-result
      v-if="$route.query.error"
      status="error"
      title="Failed to login"
      :description="$route.query.error.toString()"
    >
      <template #footer>
        <nuxt-link
          to="/auth/login"
          class="no-underline"
        >
          <n-button type="primary">
            Go back to login
          </n-button>
        </nuxt-link>
      </template>
    </n-result>

    <n-spin
      v-else
      size="large"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  colorMode: 'light',
})
</script>
