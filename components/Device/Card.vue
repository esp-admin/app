<template>
    <n-card :title="name" size="small" hoverable>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, distinctio ullam! Eveniet, ipsam dolorum aperiam
        accusantium ab fuga nam. Impedit eos in velit id saepe sed pariatur a neque minus.

        <div class="mt-4 flex gap-2">
            <nuxt-link :to="`/devices/${id}`">
                <n-button secondary>View</n-button>
            </nuxt-link>

            <n-button v-if="showUnlink" secondary @click="unlinkModalVisible = true">Unlink</n-button>
        </div>

        <template #header-extra>
            <DeviceStatus></DeviceStatus>
        </template>

        <n-modal preset="card" v-model:show="unlinkModalVisible" size="small" :closable="false" :mask-closable="false"
            class="max-w-xs">
            <DeviceUnlink @cancel="unlinkModalVisible = false" />
        </n-modal>
    </n-card>
</template>

<script setup lang="ts">
const name = ref("A device")
const id = ref("id_1")

const props = defineProps<{ showUnlink?: boolean }>()

const unlinkModalVisible = ref(false)

</script>