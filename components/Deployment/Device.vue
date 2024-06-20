<template>
  <n-thing>
    <template #avatar>
      <deployment-status
        :deployment="deployment"
        :size="23"
      />
    </template>

    <template #header>
      <title-date
        :title="deployment.release.version"
        :created-at="deployment.createdAt"
      />
    </template>

    <template #header-extra>
      <div class="flex gap-2">
        <n-button-group>
          <button-icon
            :icon="ICON_PROJECT"
            @click="navigateTo(`/projects/${deployment.release.projectId}`)"
          />

          <button-icon
            :icon="ICON_DELETE"
            @click="onDelete"
          />
        </n-button-group>
      </div>
    </template>
  </n-thing>
</template>

<script setup lang="ts">
const props = defineProps<{ deployment: Deployment }>()

const dialog = useDialog()

function onDelete() {
  dialog.error({
    title: 'Delete Deployment',
    content: 'This deployment will be permanently deleted. This action is not reversible and can not be undone.',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    showIcon: false,
    onPositiveClick: async () => {
      await useDeployment(props.deployment.deviceId).remove(props.deployment.id)
    },
  })
}
</script>
