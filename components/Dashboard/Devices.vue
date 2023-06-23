<template>
    <ChartBase :options="chartOptions" :height="240" :width="240">
    </ChartBase>
</template>

<script setup lang="ts">

const { find } = useDevice()

const { data: devices } = await find()

const chartOptions = computed<HighchartsOptions>(() => ({
    title: {
        text: "Devices"
    },
    series: [
        {
            type: 'pie',
            name: 'Devices',
            data: [{
                name: 'Connected',
                y: devices.value?.filter(device => device.status === 'connected').length,
                color: "#22c55e",
            }, {
                name: 'Unregistered',
                y: devices.value?.filter(device => device.status === 'unregistered').length,
                color: "#a8a29e"
            }, {
                name: 'Disconnected',
                y: devices.value?.filter(device => device.status === 'disconnected').length,
                color: "#ef4444"
            }],
            dataLabels: {
                enabled: false
            },
            showInLegend: false,
        }]
}))
</script>