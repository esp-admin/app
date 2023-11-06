<template>
  <div :style="{ width: `${width}px`, height: `${height}px` }">
    <client-only>
      <Chart :options="highchartsOptions" />
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

const naiveTheme = useThemeVars()

const highchartsOptions = computed<HighchartsOptions>(() => defu(
  props.options,
    {
      chart: {
        height: props.height,
        width: props.width,
        backgroundColor: 'transparent',
        plotBackgroundColor: 'transparent',
        style: {
          fontFamily: naiveTheme.value.fontFamily,
          fontSize: naiveTheme.value.fontSize
        }
      },

      accessibility: {
        enabled: false
      },

      title: {
        style: {
          color: naiveTheme.value.textColor1,
          fontSize: naiveTheme.value.fontSize
        }
      },

      xAxis: {
        lineColor: '#EDEDED82',
        title: {
          style: {
            color: naiveTheme.value.textColor2,
            fontSize: naiveTheme.value.fontSizeSmall
          }
        },
        labels: {
          style: {
            color: naiveTheme.value.textColor2,
            fontSize: naiveTheme.value.fontSizeMini
          }
        }
      },

      yAxis: {
        gridLineColor: '#DBDBDB51',
        title: {
          style: {
            color: naiveTheme.value.textColor2,
            fontSize: naiveTheme.value.fontSizeSmall
          }
        },
        labels: {
          style: {
            color: naiveTheme.value.textColor2,
            fontSize: naiveTheme.value.fontSizeMini
          }
        }
      },

      legend: {
        itemStyle: {
          color: naiveTheme.value.textColor2
        }
      },

      credits: {
        enabled: false,
        style: {
          fontSize: naiveTheme.value.fontSizeSmall
        }
      }
    } as HighchartsOptions
))

</script>
