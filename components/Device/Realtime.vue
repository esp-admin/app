<template>
    <div>
        <div class="flex gap-4">
            <n-button secondary>Restart</n-button>

            <n-button v-for="command of commands" secondary>
                {{ command.name }}
            </n-button>
        </div>

        <n-card class="mt-4">
            <n-log :loading="loading" :log="log" line-height="1.4" />
        </n-card>
    </div>
</template>

<script setup>
const commands = ref([
    {
        name: "Command 1",
        payload: "{}"
    },
    {
        name: "Command 2",
        payload: "{}"
    },
    {
        name: "Command 3",
        payload: "{}"
    },
])

const log = ref("log 1 \nlog 2 \nlog 3 \nlog 4 \nlog 5 \nlog 6 \nlog 7 \nlog 8 \nlog 9 \nlog 10 \nlog 11 \nlog 12 \nlog 13 \nlog 14 \nlog 15 \nlog 16 \n")
</script>