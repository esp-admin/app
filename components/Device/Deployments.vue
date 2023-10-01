<template>
  <div class="flex flex-col gap-6">
    <n-result v-if="deployments?.length === 0" class="col-span-full my-5" title="You have no deployments">
      <template #icon>
        <ResultEmpty />
      </template>
    </n-result>

    <DeploymentCard v-for="deployment of deployments" :key="deployment.id" :deployment="deployment" />
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck

const props = defineProps<{ device: Device }>()

const { find } = useDeployment(props.device.id)

const deployments = await find()

const latestDeployment = computed(() => deployments.value[0])

function updateFavicon (href:string) {
  let link = document.querySelector("link[rel~='icon']")

  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  link.href = href
}

watchEffect(() => {
  switch (latestDeployment.value?.status) {
    case 'started':
      updateFavicon('/icons/loading.svg')
      break
    case 'failed':
      updateFavicon('/icons/failed.svg')
      break
    case 'succeded':
      updateFavicon('/icons/success.svg')
      break
    default:
      updateFavicon('/favicon.ico')
  }
})

onUnmounted(() => updateFavicon('/favicon.ico'))

</script>
