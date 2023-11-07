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

      <TooltipIconButton
        :disabled="device.status !== 'connected'"
        icon="ph:arrow-counter-clockwise"
        message="Restart device"
        secondary
        @click="handleRestart"
      />

      <TooltipIconButton
        :disabled="logs.length === 0"
        icon="ph:trash"
        message="Clear logs"
        secondary
        @click="logs = []"
      />
    </div>

    <n-card class="mt-4" :theme-overrides="{borderColor: cardBorderColor}">
      <n-log
        ref="logInst"
        language="realtime"
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
import type { LogInst } from 'naive-ui'

const logInst = ref<LogInst>()

const props = defineProps<{ device: Device }>()

const cardBorderColor = computed(() => props.device.status === 'connected' ? '#22c55e' : '#ef4444')

const projectCommands = ref<{key: string, value: string}[]>([])

if (props.device.projectId) {
  const { findOne } = useProject()
  const project = await findOne(props.device.projectId)
  projectCommands.value = destr(project.value?.commands)
}

const { logs } = useLog(props.device.id)

const logsString = computed(() => logs.value.map(log => `${log.type} - ${log.payload}`).join('\n'))

const { $mqtt } = useNuxtApp()

function handleRestart () {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'restart',
    retain: false,
    payload: ''
  })
}

function handleCommand (command:object) {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'custom',
    retain: false,
    payload: JSON.stringify(command)
  })
}

onMounted(() => {
  scrollToBottom()

  enableLog()

  watch(logsString, () =>
    nextTick(() => scrollToBottom())
  )
})

if (process.client) {
  window.onbeforeunload = () => {
    disableLog()
  }
}

onUnmounted(() => {
  disableLog()
})

function scrollToBottom () {
  logInst.value?.scrollTo({ position: 'bottom' })
}

function enableLog () {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'log',
    payload: 'on',
    retain: false
  })
}

function disableLog () {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'log',
    payload: 'off',
    retain: false
  })
}
</script>
