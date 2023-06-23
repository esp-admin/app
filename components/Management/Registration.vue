<template>
    <ChartBase :options="chartOptions" :height="300"></ChartBase>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const { listUsers } = useAuthAdmin()

const { data: users } = await useAsyncData(() => listUsers({
    select: {
        createdAt: true,
    },
    orderBy: {
        createdAt: "asc"
    }
}))

const chartOptions = computed<HighchartsOptions>(() => ({
    chart: {
        zooming: {
            type: "x"
        }
    },
    title: {
        text: "",
    },
    yAxis: {
        title: {
            text: ""
        }
    },
    xAxis: {
        type: "datetime",
    },
    series: [{
        type: 'column',
        data: chartData.value,
        marker: {
            enabled: false
        },
    }],
    legend: {
        enabled: false
    },
    tooltip: {
        enabled: false
    }
}))

const chartData = computed(() => {
    const counts = users.value?.reduce((acc: Record<string, number>, curr) => {
        const date = dayjs(curr.createdAt).format("DD/MM/YYYY")
        if (!acc[date]) {
            acc[date] = 1;
        } else {
            acc[date]++;
        }
        return acc;
    }, {});

    const data = Object.keys(counts as {}).reduce((acc: number[][], curr) => {
        const x = dayjs(curr, "DD/MM/YYYY").toDate().getTime()
        const y = counts![curr]
        acc.push([x, y])
        return acc
    }, [])

    return data
})
</script>