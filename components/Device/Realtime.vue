<template>
  <div>
    <div class="flex gap-4">
      <div class="flex-1 flex gap-2 flex-wrap">
        <n-button v-for="projectCommand of projectCommands" :key="projectCommand.key" secondary @click="handleCommand(projectCommand)">
          {{ projectCommand.key }}
        </n-button>
      </div>

      <TooltipIconButton name="ph:arrow-counter-clockwise" message="Restart device" secondary @click="handleRestart" />

      <TooltipIconButton name="ph:trash" message="Clear logs" secondary @click="clear" />
    </div>

    <n-card class="mt-4">
      <n-log
        ref="logInst"
        language="realtime"
        :loading="device.status === 'connected'"
        :log="logsString"
        :line-height="1.7"
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

const projectCommands = ref<{key: string, value: string}[]>([])

if (props.device.projectId) {
  const { findOne } = useProject()
  const { data: project } = await findOne(props.device.projectId)
  projectCommands.value = destr(project.value?.commands)
}

const { logs, clear } = useLog(props.device.id)

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
