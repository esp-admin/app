<template>
    <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
        <n-statistic label="MQTT connection" :value="connected ? 'Connected' : 'Not connected'" />
        <n-statistic label="Total devices" :value="devices?.length || 0" />
        <n-statistic label="Total projects" :value="projects?.length || 0" />
    </div>
</template>

<script setup lang="ts">
const { connected } = useMqtt()

const { find: findDevices } = useDevice()

const { data: devices } = await findDevices()

const { find: findProjects } = useDevice()

const { data: projects } = await findProjects()
</script>