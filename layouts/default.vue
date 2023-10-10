<template>
  <div class="page">
    <template v-if="user">
      <LazyNavbar />
      <div class="flex-1 container mx-auto mt-8 px-4">
        <slot />
      </div>
    </template>
  </div>
</template>

<script setup>
const { user } = useAuthSession()
</script>
