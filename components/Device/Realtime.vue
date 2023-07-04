<template>
    <div>
        <div class="flex gap-4">
            <n-button secondary @click="handleRestart">restart</n-button>

            <n-button v-for="projectCommand of projectCommands" secondary @click="handleCommand(projectCommand)">
                {{ projectCommand.key }}
            </n-button>
        </div>

        <n-card class="mt-4">
            <n-log ref="logInst" language="realtime" :loading="false" :log="logsString" :line-height="1.7" :rows="10" />
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

const { publish } = useMqtt()

const projectCommands = ref<Command[]>([])

if (props.device.projectId) {
    const { findOne } = useProject()
    const { data: project } = await findOne(props.device.projectId)

    if (project.value?.commands) {
        projectCommands.value = project.value.commands as { key: string, value: string }[]
    }
}

const { logs } = useDevice()

const logsString = computed(() => logs.value.map(log => `${log.type} - ${log.payload}`).join("\n"))

function handleRestart() {
    publish({
        deviceId: props.device.id,
        action: "command",
        type: "restart",
        retained: false,
        payload: ""
    })
}

function handleCommand(command: Command) {
    publish({
        deviceId: props.device.id,
        action: "command",
        type: "custom",
        retained: false,
        payload: JSON.stringify(command)
    })
}

onMounted(() => {
    logs.value = []

    publish({
        deviceId: props.device.id,
        action: "command",
        type: "debug",
        payload: "on",
        retained: false,
    })

    watch(logsString, () =>
        nextTick(() => logInst.value?.scrollTo({ position: 'bottom', slient: true }))
    )
})

onUnmounted(() => {
    logs.value = []
    publish({
        deviceId: props.device.id,
        action: "command",
        type: "debug",
        payload: "off",
        retained: false,
    })
})
</script>