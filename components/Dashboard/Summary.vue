<template>
    <div class="grid md:grid-cols-4 grid-cols-2 gap-4">
        <n-statistic label="MQTT connection" :value="connected ? 'Connected' : 'Not connected'" />
    </div>
</template>

<script setup lang="ts">
const { connected } = useMqtt()
</script>