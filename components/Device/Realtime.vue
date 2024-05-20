<template>
  <div>
    <div class="flex gap-2">
      <div class="flex-1 flex gap-2 flex-wrap">
        <n-button
          v-for="projectCommand of projectCommands"
          :key="projectCommand.key"
          secondary
          :disabled="device.status !== 'connected'"
          @click="handleCommand(projectCommand)"
        >
          {{ projectCommand.key }}
        </n-button>
      </div>

      <ButtonIcon
        :disabled="device.status !== 'connected'"
        :icon="ICON_RESET"
        secondary
        @click="handleRestart"
      />

      <ButtonIcon
        :disabled="logs.length === 0"
        :icon="ICON_ERASE"
        secondary
        @click="logs = []"
      />
    </div>

    <n-card
      class="mt-4"
      :theme-overrides="{ borderColor: cardBorderColor }"
    >
      <n-log
        ref="logInst"
        language="realtime"
        :hljs="hljs"
        :loading="false"
        :log="logsString"
        :line-height="2"
        :rows="10"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { destr } from 'destr'
import hljs from 'highlight.js/lib/core'
import type { LogInst } from 'naive-ui'

const props = defineProps<{ device: Device }>()

hljs.configure({ classPrefix: '' })

hljs.registerLanguage('realtime', () => ({
  contains: [
    {
      className: 'bg-blue-600 text-white p-1',
      begin: /info/,
    },
    {
      className: 'bg-red-500 text-white p-1',
      begin: /error/,
    },
    {
      className: 'bg-amber-500 text-white p-1',
      begin: /warn/,
    },
    {
      className: 'bg-green-500 text-white p-1',
      begin: /success/,
    },
  ],
}))

const logInst = ref<LogInst>()

const cardBorderColor = computed(() =>
  props.device.status === 'connected' ? '#22c55e' : '#ef4444',
)

const projectCommands = ref<{ key: string, value: string }[]>([])

if (props.device.projectId) {
  const { findOne } = useProject()
  const project = await findOne(props.device.projectId)
  projectCommands.value = destr(project.value?.commands)
}

const logs = useLog(props.device.id).find()

const logsString = computed(() =>
  logs.value.map(log => `${log.type} - ${log.payload}`).join('\n'),
)

const { $mqtt } = useNuxtApp()

function handleRestart() {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'restart',
    retain: false,
    payload: '',
  })
}

function handleCommand(command: object) {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'custom',
    retain: false,
    payload: JSON.stringify(command),
  })
}

onMounted(() => {
  scrollToBottom()

  enableLog()

  watch(logsString, () => nextTick(() => scrollToBottom()))
})

if (import.meta.client) {
  window.onbeforeunload = () => {
    disableLog()
  }
}

onUnmounted(() => {
  disableLog()
})

function scrollToBottom() {
  logInst.value?.scrollTo({ position: 'bottom' })
}

function enableLog() {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'log',
    payload: 'on',
    retain: true,
  })
}

function disableLog() {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'log',
    payload: 'off',
    retain: true,
  })
}
</script>
