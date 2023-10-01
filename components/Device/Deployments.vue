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

const props = defineProps<{ device: Device }>()

const { find } = useDeployment(props.device.id)

const deployments = await find()

const latestDeployment = computed(() => deployments.value[0])

watchEffect(() => {
  const link = document.querySelector("link[rel~='icon']")
  if (!link) { return }

  let href = '/favicon.ico'

  switch (latestDeployment.value?.status) {
    case 'started':
      href = '/icons/loading.svg'
      break
    case 'failed':
      href = '/icons/failed.svg'
      break
    case 'succeded':
      href = '/icons/success.svg'
      break
  }

  // @ts-ignore
  link.href = href
})

</script>
