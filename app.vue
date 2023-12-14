<template>
  <naive-config :theme-config="themeConfig" :hljs="hljs">
    <n-loading-bar-provider>
      <naive-loading-bar navigation />
    </n-loading-bar-provider>

    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </naive-config>
</template>

<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import type { ThemeConfig } from '@bg-dev/nuxt-naiveui'
import { theme } from '#tailwind-config'

hljs.configure({ classPrefix: '' })

hljs.registerLanguage('realtime', () => ({
  contains: [
    {
      className: 'bg-blue-600 text-white p-1',
      begin: /info/
    },
    {
      className: 'bg-red-500 text-white p-1',
      begin: /error/
    },
    {
      className: 'bg-amber-500 text-white p-1',
      begin: /warn/
    },
    {
      className: 'bg-green-500 text-white p-1',
      begin: /success/
    }
  ]
}))

const themeConfig = ref<ThemeConfig>({
  shared: {
    common: {
      fontFamily: theme.fontFamily.sans[0],

      fontWeight: theme.fontWeight.light,
      fontWeightStrong: theme.fontWeight.medium,

      lineHeight: theme.lineHeight.normal,

      borderRadius: theme.borderRadius.md,
      borderRadiusSmall: theme.borderRadius.sm
    },
    Form: {
      feedbackPadding: theme.padding[2],
      labelFontWeight: theme.fontWeight.medium
    },
    Result: {
      titleFontSizeMedium: theme.fontSize.lg[0]
    },
    Menu: {
      titleFontSizeMedium: theme.fontSize.base[0]
    },
    Statistic: {
      valueFontSize: theme.fontSize.sm,
      labelFontSize: theme.fontSize.sm
    },
    Notification: {
      padding: theme.padding[4],
      titleFontSize: theme.fontSize.lg
    },
    Card: {
      titleFontSizeMedium: theme.fontSize.xl[0],
      titleFontSizeSmall: theme.fontSize.lg[0],
      titleFontWeight: theme.fontWeight.medium,
      boxShadow: theme.boxShadow.lg
    },
    LoadingBar: {
      height: '3px',
      colorLoading: theme.colors.blue[600]
    }
  },

  light: {
    common: {
      textColorBase: theme.colors.zinc[800],
      textColor1: theme.colors.zinc[700],
      textColor2: theme.colors.zinc[600],
      textColor3: theme.colors.zinc[400],
      textColorDisabled: theme.colors.zinc[600],

      bodyColor: theme.colors.white,
      borderColor: theme.colors.zinc[300],
      cardColor: theme.colors.zinc[50],
      inputColor: theme.colors.zinc[50],

      primaryColor: theme.colors.blue[600],
      primaryColorHover: theme.colors.blue[500],
      primaryColorPressed: theme.colors.blue[700],
      primaryColorSuppl: theme.colors.blue[800],

      errorColor: theme.colors.red[600],
      errorColorHover: theme.colors.red[500],
      errorColorPressed: theme.colors.red[700],
      errorColorSuppl: theme.colors.red[800],

      successColor: theme.colors.green[600],
      successColorHover: theme.colors.green[500],
      successColorPressed: theme.colors.green[700],
      successColorSuppl: theme.colors.green[800],

      warningColor: theme.colors.amber[600],
      warningColorHover: theme.colors.amber[500],
      warningColorPressed: theme.colors.amber[700],
      warningColorSuppl: theme.colors.amber[800]
    },
    Card: {
      borderColor: theme.colors.zinc[300]
    },
    List: {
      color: theme.colors.white
    },
    Tooltip: {
      color: theme.colors.zinc[50],
      textColor: theme.colors.zinc[700]
    },
    Pagination: {
      itemColorActiveHover: theme.colors.blue[600],
      itemColorActive: theme.colors.blue[600],
      itemTextColorActive: theme.colors.white
    }
  },

  dark: {
    common: {
      textColorBase: theme.colors.zinc[200],
      textColor1: theme.colors.zinc[200],
      textColor2: theme.colors.zinc[300],
      textColor3: theme.colors.zinc[400],
      textColorDisabled: theme.colors.zinc[500],

      bodyColor: theme.colors.zinc[900],
      borderColor: theme.colors.zinc[700],
      cardColor: theme.colors.zinc[800],
      inputColor: theme.colors.zinc[800],

      primaryColor: theme.colors.blue[400],
      primaryColorHover: theme.colors.blue[300],
      primaryColorPressed: theme.colors.blue[600],
      primaryColorSuppl: theme.colors.blue[700],

      errorColor: theme.colors.red[400],
      errorColorHover: theme.colors.red[300],
      errorColorPressed: theme.colors.red[600],
      errorColorSuppl: theme.colors.red[700],

      successColor: theme.colors.green[400],
      successColorHover: theme.colors.green[300],
      successColorPressed: theme.colors.green[600],
      successColorSuppl: theme.colors.green[700],

      warningColor: theme.colors.amber[400],
      warningColorHover: theme.colors.amber[300],
      warningColorPressed: theme.colors.amber[600],
      warningColorSuppl: theme.colors.amber[700]
    },
    Card: {
      borderColor: theme.colors.zinc[700],
      textColor: theme.colors.zinc[200]
    },
    Tooltip: {
      color: theme.colors.zinc[800]
    },
    List: {
      color: theme.colors.zinc[900]
    },
    Input: {
      borderSuccess: theme.colors.green[400]
    },
    Pagination: {
      itemColorActiveHover: theme.colors.blue[400],
      itemColorActive: theme.colors.blue[400],
      itemTextColorActive: theme.colors.zinc[900]
    }
  }
})

useSeoMeta({
  description: 'Remote management of ESP microcontrollers',
  ogTitle: 'ESP Admin',
  ogDescription: 'Remote management of ESP microcontrollers',
  ogImage: '/poster.png',
  ogUrl: 'https://esp-admin.tn',
  twitterTitle: 'ESP Admin',
  twitterDescription: 'Remote management of ESP microcontrollers',
  twitterImage: '/favicon.ico',
  twitterCard: 'summary'
})
</script>
