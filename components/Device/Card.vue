<template>
    <n-card :title="device.name" size="small" hoverable>

        <div class="mt-4 flex gap-2">
            <nuxt-link :to="`/devices/${device.id}`">
                <n-button secondary>View</n-button>
            </nuxt-link>

            <n-button v-if="showUnlink" secondary @click="unlinkModalVisible = true">Unlink</n-button>
        </div>

        <template #header-extra>
            <DeviceStatus :device="device"></DeviceStatus>
        </template>

        <n-modal preset="card" v-model:show="unlinkModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <DeviceUnlink @cancel="unlinkModalVisible = false" />
        </n-modal>
    </n-card>
</template>

<script setup lang="ts">
import type { Device } from "@prisma/client"

defineProps<{ device: Device, showUnlink?: boolean }>()

const unlinkModalVisible = ref(false)
</script>