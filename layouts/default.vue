<template>
  <div class="page">
    <template v-if="user">
      <Navbar />

      <Notification />

      <div class="flex-1 container mx-auto mt-6 mb-4 p-4">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup>
const { user } = useAuthSession()
</script>
