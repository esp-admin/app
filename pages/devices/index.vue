<template>
  <div>
    <n-result v-if="!devices?.length" title="No devices found">
      <template #icon>
        <ResultEmpty />
      </template>
      <template #footer>
        <n-button type="primary" @click="createModalVisible = true">
          Create first device
        </n-button>
      </template>
    </n-result>

    <div v-else class="grid md:grid-cols-3 gap-8">
      <n-page-header title="Devices" class="col-span-full">
        <template #avatar>
          <naive-icon :name="ICON_DEVICE" :size="20" />
        </template>
      </n-page-header>

      <div class="col-span-full flex gap-4">
        <n-input v-model:value="nameSearch" placeholder="Search by name">
          <template #prefix>
            <naive-icon :name="ICON_SEARCH" :size="16" />
          </template>
        </n-input>

        <n-button type="primary" @click="createModalVisible = true">
          Create device
        </n-button>
      </div>

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
