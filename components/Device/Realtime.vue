<template>
    <div>
        <div class="flex gap-4">
            <n-button secondary>Restart</n-button>

            <n-button v-for="projectCommand of projectCommands" secondary @click="handleCommand(projectCommand)">
                {{ projectCommand.key }}
            </n-button>
        </div>

        <n-card class="mt-4">
            <n-log language="realtime" :loading="false" :log="logsString" :line-height="1.5" />
        </n-card>
    </div>
</template>

<script setup lang="ts">
interface Command {
    key: string, value: string
}

const props = defineProps<{ device: Device }>()

const projectCommands = ref<Command[]>([])

if (props.device.projectId) {
    const { findOne } = useProject()
    const { data: project } = await findOne(props.device.projectId)

    if (project.value?.commands) {
        projectCommands.value = project.value.commands as { key: string, value: string }[]
    }
}

const { logs } = useDevice()

logs.value = []

const logsString = computed(() => logs.value.map(log => `${log.type} - ${log.payload}`).join("\n"))


function handleCommand(command: Command) {
    alert(JSON.stringify(command))
}

onUnmounted(() => logs.value = [])
</script>