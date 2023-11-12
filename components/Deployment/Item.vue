<template>
  <n-thing>
    <template #avatar>
      <DeploymentStatus :deployment="deployment" :size="24" />
    </template>

    <template #header>
      <TitleDate :title="deployment.release.version" :created-at="deployment.createdAt" />
    </template>

    <template #header-extra>
      <div class="flex gap-2">
        <nuxt-link :to="`/projects/${deployment.release.projectId}`">
          <ButtonIcon :icon="ICON_PROJECT" secondary />
        </nuxt-link>

        <ButtonIcon
          :icon="ICON_DELETE"
          secondary
          @click="deleteModalVisible = true"
        />
      </div>
    </template>
  </n-thing>

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
</template>

<script setup lang="ts">
defineProps<{ deployment: Deployment }>()

const deleteModalVisible = ref(false)

function onDelete () {
  deleteModalVisible.value = false
}
</script>
