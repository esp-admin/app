<template>
  <n-card size="small">
    <template #header>
      <TitleDate :title="deployment.release.version" :created-at="deployment.createdAt">
        <template #icon>
          <DeploymentStatus :deployment="deployment" />
        </template>
      </TitleDate>
    </template>

    <template #header-extra>
      <div class="flex gap-2">
        <nuxt-link :to="`/projects/${deployment.release.projectId}`">
          <TooltipIconButton
            icon="ph:code"
            message="Linked project"
            secondary
          />
        </nuxt-link>

        <TooltipIconButton
          icon="ph:trash"
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
