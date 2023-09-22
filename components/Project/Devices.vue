<template>
  <div class="grid md:grid-cols-3 gap-6">
    <div v-if="linkedDevices?.length" class="col-span-full flex gap-4">
      <n-input v-model:value="nameSearch">
        <template #prefix>
          <naive-icon name="ph:magnifying-glass" :size="16" />
        </template>
      </n-input>

      <n-button type="primary" @click="linkModalVisible = true">
        Link device
      </n-button>
    </div>

    <n-result v-else class="col-span-full my-5" title="You have no linked devices">
      <template #icon>
        <img src="~/assets/images/no-results.png" alt="no-results" width="200">
      </template>
      <template #footer>
        <n-button type="primary" @click="linkModalVisible = true">
          Link first device
        </n-button>
      </template>
    </n-result>

    <DeviceCard v-for="device of nameSearch ? filteredDevices : linkedDevices" :key="device.id" :device="device" />

    <n-modal v-model:show="linkModalVisible" preset="card" :closable="false" :mask-closable="false" class="max-w-sm">
      <DeviceLink :project="project" @cancel="linkModalVisible = false" @done="onLink" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">

const linkModalVisible = ref(false)

const props = defineProps<{ project: Project }>()

const { find } = useDevice()

const devices = await find()

const linkedDevices = computed(() => devices.value?.filter(device => device.projectId === props.project.id) || [])

const nameSearch = ref('')

const filteredDevices = computed(() => linkedDevices.value.filter(device => device.name.includes(nameSearch.value)))

function onLink () {
  linkModalVisible.value = false
}
</script>
