<template>
  <n-form-item :label-style="{ display: 'block' }">
    <template #label>
      <div class="flex justify-between items-center">
        <span>{{ label }}</span>

        <n-tooltip v-if="description" trigger="click" placement="left">
          <template #trigger>
            <n-button text>
              <naive-icon :name="ICON_UNKNOWN" :size="20" />
            </n-button>
          </template>
          <span> {{ description }} </span>
        </n-tooltip>
      </div>
    </template>
    <slot />
  </n-form-item>
</template>

<script setup lang="ts">
defineProps<{ label: string, description: string }>()
</script>
