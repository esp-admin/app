<template>
  <div>
    <n-page-header title="Devices" class="mb-8">
      <template #avatar>
        <naive-icon name="ph:cpu" />
      </template>
    </n-page-header>

    <div class="grid md:grid-cols-3 gap-8">
      <div v-if="devices?.length" class="col-span-full flex gap-4">
        <n-input v-model:value="nameSearch" placeholder="Search by name">
          <template #prefix>
            <naive-icon name="ph:magnifying-glass" :size="16" />
          </template>
        </n-input>

        <n-button type="primary" @click="createModalVisible = true">
          Create device
        </n-button>
      </div>

      <n-result v-else class="col-span-full" title="No devices found">
        <template #icon>
          <ResultEmpty />
        </template>
        <template #footer>
          <n-button type="primary" @click="createModalVisible = true">
            Create first device
          </n-button>
        </template>
      </n-result>

      <DeviceItem v-for="device of filteredDevices" :key="device.id" :device="device" />
    </div>

    <n-modal
      v-model:show="createModalVisible"
      bordered
      preset="card"
      :closable="false"
      :mask-closable="false"
      class="max-w-sm"
    >
      <DeviceCreate @cancel="createModalVisible = false" @done="onCreate" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">

const createModalVisible = ref(false)
const nameSearch = ref('')

const { find } = useDevice()

const devices = await find()

const filteredDevices = filteredArrayByKey(devices, 'name', nameSearch)

async function onCreate (device: Device) {
  createModalVisible.value = false
  await navigateTo(`/devices/${device.id}`)
}
</script>
