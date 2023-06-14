<template>
    <div>
        <div class="flex gap-4">
            <n-button secondary>Restart</n-button>

            <n-button v-for="projectCommand of projectCommands" secondary @click="handleCommand(projectCommand)">
                {{ projectCommand.key }}
            </n-button>
        </div>

        <n-card class="mt-4">
            <n-log :loading="false" :log="log" :line-height="1.4" />
        </n-card>
    </div>
</template>

<script setup lang="ts">
import type { Device } from "@prisma/client"

interface ICommand {
    key: string, value: string
}

const props = defineProps<{ device: Device }>()

const projectCommands = ref<ICommand[]>([])

if (props.device.projectId) {
    const { findOne } = useProject()
    const { data: project } = await findOne(props.device.projectId)

    if (project.value?.commands) {
        projectCommands.value = project.value.commands as { key: string, value: string }[]
    }
}

const log = ref("log 1 \nlog 2 \nlog 3 \nlog 4 \nlog 5 \nlog 6 \nlog 7 \nlog 8 \nlog 9 \nlog 10 \nlog 11 \nlog 12 \nlog 13 \nlog 14 \nlog 15 \nlog 16 \n")


function handleCommand(command: ICommand) {
    alert(JSON.stringify(command))
}
</script>