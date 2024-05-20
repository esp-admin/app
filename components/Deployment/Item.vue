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
        <nuxt-link :to="`/projects/${deployment.release.projectId}`">
          <button-icon
            :icon="ICON_PROJECT"
            secondary
          />
        </nuxt-link>

        <button-icon
          :icon="ICON_DELETE"
          secondary
          @click="onDelete"
        />
      </div>
    </template>
  </n-thing>
</template>

<script setup lang="ts">
const props = defineProps<{ deployment: Deployment }>()

const dialog = useDialog()

function onDelete() {
  dialog.warning({
    title: 'Delete Deployment',
    content: 'The deployment will be permanently deleted. This action is not reversible and can not be undone.',
    positiveText: 'Confirm',
    negativeText: 'Cancel',
    onPositiveClick: async () => {
      await useDeployment(props.deployment.deviceId).remove(props.deployment.id)
    },
  })
}
</script>
