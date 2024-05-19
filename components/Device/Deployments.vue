<template>
  <div class="flex flex-col gap-8">
    <n-result
      v-if="!deployments?.length"
      class="col-span-full"
      title="No deployments found"
    >
      <template #icon>
        <ResultEmpty />
      </template>
    </n-result>

    <n-list
      v-else
      bordered
      show-divider
    >
      <n-list-item
        v-for="deployment of deploymentsPaginated"
        :key="deployment.id"
      >
        <DeploymentItem :deployment="deployment" />
      </n-list-item>

      <template
        v-if="pageCount > 1"
        #footer
      >
        <n-pagination
          v-model:page="page"
          :page-count="pageCount"
          class="my-1"
        />
      </template>
    </n-list>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ device: Device }>()

const { find } = useDeployment(props.device.id)

const lb = useLoadingIndicator()

lb.start()

const deployments = await find()

lb.finish()

const { output: deploymentsPaginated, page, pageCount } = usePagination(deployments)

const latestDeployment = computed(() => deployments.value && deployments.value[0])

function updateFavicon(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel~=\'icon\']')

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
