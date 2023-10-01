<template>
  <div>
    <div class="flex gap-4">
      <div class="flex-1">
        <n-button v-for="projectCommand of projectCommands" :key="projectCommand.key" secondary @click="handleCommand(projectCommand)">
          {{ projectCommand.key }}
        </n-button>
      </div>

      <n-tooltip>
        <template #trigger>
          <n-button secondary circle @click="handleRestart">
            <template #icon>
              <naive-icon name="ph:arrow-counter-clockwise" />
            </template>
          </n-button>
        </template>
        Restart device
      </n-tooltip>

      <n-tooltip>
        <template #trigger>
          <n-button secondary circle @click="clear">
            <template #icon>
              <naive-icon name="ph:trash" />
            </template>
          </n-button>
        </template>
        Clear logs
      </n-tooltip>
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

const { logs, clear } = useLog(props.device.id)

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
  logInst.value?.scrollTo({ position: 'bottom', slient: true })
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
