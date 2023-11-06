<template>
  <div class="page">
    <template v-if="user">
      <LazyNavbar />

      <client-only>
        <Notification />
      </client-only>

      <n-loading-bar-provider>
        <div class="flex-1 container mx-auto mt-8 px-4">
          <slot />
        </div>
      </n-loading-bar-provider>
    </template>
  </div>
</template>

<script setup>
const { user } = useAuthSession()
</script>
