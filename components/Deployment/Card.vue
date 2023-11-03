<template>
  <n-card size="small" :header-extra-style="{ padding: 0 }">
    <template #header>
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <n-text strong>
            {{ deployment.release?.version }}
          </n-text>
          <DeploymentStatus :deployment="deployment" />
        </div>
        <n-text depth="3" class="text-base">
          Created <n-time
            :time="new Date(deployment.createdAt)"
            type="relative"
          />
        </n-text>
      </div>
    </template>

    <template #header-extra>
      <div class="flex gap-2">
        <nuxt-link :to="`/projects/${deployment.release?.projectId}`">
          <TooltipIconButton
            name="ph:code"
            message="Linked project"
            secondary
          />
        </nuxt-link>

        <TooltipIconButton
          name="ph:trash"
          message="Delete deployment"
          secondary
          @click="deleteModalVisible = true"
        />
      </div>
    </template>

    <n-modal
      v-model:show="deleteModalVisible"
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm"
    >
      <DeploymentDelete :deployment="deployment" @cancel="deleteModalVisible = false" @done="onDelete" />
    </n-modal>
  </n-card>
</template>

<script setup lang="ts">
defineProps<{ deployment: Deployment }>()

const deleteModalVisible = ref(false)

function onDelete () {
  deleteModalVisible.value = false
}
</script>
