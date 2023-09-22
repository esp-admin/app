<template>
  <div class="my-4">
    <n-result status="404" title="Not Found">
      <template #footer>
        <nuxt-link to="/">
          <n-button>Back home</n-button>
        </nuxt-link>
      </template>
    </n-result>
  </div>
</template>

<script setup>
definePageMeta({ auth: false })
</script>
