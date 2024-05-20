<template>
  <naive-config>
    <div class="naive-page flex flex-col justify-center items-center">
      <n-result
        title="Oops, something went wrong"
        :status="status"
        :description="error.message"
      >
        <template #footer>
          <n-button
            type="primary"
            @click="handleError"
          >
            Back home
          </n-button>
        </template>
      </n-result>
    </div>
  </naive-config>
</template>

<script setup lang="ts">
import type { ResultProps } from 'naive-ui'
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const status = computed(() => props.error.statusCode?.toString() as ResultProps['status'])

const handleError = () => clearError({ redirect: '/' })
</script>
