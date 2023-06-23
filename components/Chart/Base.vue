<template>
    <div :style="{ width: `${width}px`, height: `${height}px` }">
        <client-only>
            <Chart :options="highchartsOptions"></Chart>
        </client-only>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'highcharts-vue'
import { defu } from 'defu'

const props = defineProps<{
    options: HighchartsOptions,
    height?: number,
    width?: number
}>()

const naiveTheme = useNaiveTheme()

const highchartsOptions = computed<HighchartsOptions>(() => defu(
    props.options,
    {
        chart: {
            height: props.height,
            width: props.width,
            backgroundColor: "transparent",
            plotBackgroundColor: "transparent",
            style: {
                fontFamily: naiveTheme.value.common?.fontFamily,
                borderRadius: naiveTheme.value.common?.borderRadius,
                fontSize: naiveTheme.value.common?.fontSize,
            },
        },

        accessibility: {
            enabled: false
        },

        title: {
            style: {
                color: naiveTheme.value?.common?.textColor1,
                fontSize: naiveTheme.value.common?.fontSize,
            }
        },

        xAxis: {
            lineColor: "#EDEDED82",
            title: {
                style: {
                    color: naiveTheme.value?.common?.textColor2,
                    fontSize: naiveTheme.value?.common?.fontSizeSmall,
                }
            },
            labels: {
                style: {
                    color: naiveTheme.value?.common?.textColor2,
                    fontSize: naiveTheme.value?.common?.fontSizeMini,
                }
            },
        },

        yAxis: {
            gridLineColor: "#DBDBDB51",
            title: {
                style: {
                    color: naiveTheme.value?.common?.textColor2,
                    fontSize: naiveTheme.value?.common?.fontSizeSmall,
                }
            },
            labels: {
                style: {
                    color: naiveTheme.value?.common?.textColor2,
                    fontSize: naiveTheme.value?.common?.fontSizeMini,
                }
            },
        },

        legend: {
            itemStyle: {
                color: naiveTheme.value?.common?.textColor2
            }
        },

        credits: {
            enabled: false,
            style: {
                fontSize: naiveTheme.value?.common?.fontSizeSmall,
            }
        }
    } as HighchartsOptions
))

</script>
