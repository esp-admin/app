<template>
  <div>
    <div class="flex gap-4">
      <n-button secondary @click="handleRestart">
        restart
      </n-button>

      <n-button v-for="projectCommand of projectCommands" :key="projectCommand.key" secondary @click="handleCommand(projectCommand)">
        {{ projectCommand.key }}
      </n-button>
    </div>

    <n-card class="mt-4">
      <n-log
        ref="logInst"
        language="realtime"
        :loading="false"
        :log="logsString"
        :line-height="1.7"
        :rows="10"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { LogInst } from 'naive-ui'

interface Command {
    key: string, value: string
}

const logInst = ref<LogInst>()

const props = defineProps<{ device: Device }>()

const { $mqtt } = useNuxtApp()

const projectCommands = ref<Command[]>([])

if (props.device.projectId) {
  const { findOne } = useProject()
  const project = await findOne(props.device.projectId)

  if (project.value?.commands) {
    projectCommands.value = project.value.commands as { key: string, value: string }[]
  }
}

const { logs } = useLog(props.device.id)

const logsString = computed(() => logs.value.map(log => `${log.type} - ${log.payload}`).join('\n'))

function handleRestart () {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'restart',
    retain: false,
    payload: ''
  })
}

function handleCommand (command: Command) {
  $mqtt.publish({
    deviceId: props.device.id,
    action: 'command',
    type: 'custom',
    retain: false,
    payload: JSON.stringify(command)
  })
}

onMounted(() => {
  enableLog()

  watch(logsString, () =>
    nextTick(() => logInst.value?.scrollTo({ position: 'bottom', slient: true }))
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
