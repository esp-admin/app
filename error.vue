<template>
  <naive-config>
    <div class="page justify-center items-center">
      <n-result
        title="Oops, something went wrong"
        :status="error.statusCode?.toString()"
        :description="error.message"
      >
        <template #footer>
          <n-button type="primary" @click="handleError">
            Back home
          </n-button>
        </template>
      </n-result>
    </div>
  </naive-config>
</template>

<script setup lang="ts">
defineProps<{error:any}>()

const handleError = () => clearError({ redirect: '/' })
</script>
