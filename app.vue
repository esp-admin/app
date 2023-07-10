<template>
  <naive-config :theme-config="themeConfig" :hljs="hljs">
    <client-only>
      <n-notification-provider placement="bottom-right">
        <NotificationNetwork></NotificationNetwork>
        <NotificationMqtt></NotificationMqtt>
      </n-notification-provider>
    </client-only>

    <nuxt-loading-indicator :color="themeConfig.light?.common?.primaryColor" :height="3" />

    <n-message-provider>
      <nuxt-layout>
        <nuxt-page />
      </nuxt-layout>
    </n-message-provider>

  </naive-config>
</template>

<script setup lang="ts">
import { ThemeConfig } from "@bg-dev/nuxt-naiveui"
import { theme } from "#tailwind-config";
import hljs from 'highlight.js/lib/core'

hljs.configure({ classPrefix: "" })

hljs.registerLanguage('realtime', () => ({
  contains: [
    {
      className: 'bg-blue-600 text-white p-1',
      begin: /info/,
    },
    {
      className: 'bg-red-500 text-white p-1',
      begin: /error/,
    },
    {
      className: 'bg-amber-500 text-white p-1',
      begin: /warn/,
    },
    {
      className: 'bg-green-500 text-white p-1',
      begin: /success/,
    }
  ],
}))

const themeConfig = ref<ThemeConfig>({
  shared: {
    common: {
      fontFamily: theme.fontFamily.sans[0],

      fontSizeMini: theme.fontSize.xs[0],
      fontSizeTiny: theme.fontSize.xs[0],
      fontSizeSmall: theme.fontSize.sm[0],
      fontSizeMedium: theme.fontSize.base[0],
      fontSizeLarge: theme.fontSize.lg[0],
      fontSizeHuge: theme.fontSize.xl[0],
      fontSize: theme.fontSize.base[0],

      fontWeight: theme.fontWeight.light,
      fontWeightStrong: theme.fontWeight.medium,

      heightMini: theme.height[7],
      heightTiny: theme.height[8],
      heightSmall: theme.height[9],
      heightMedium: theme.height[10],
      heightLarge: theme.height[11],
      heightHuge: theme.height[12],

      lineHeight: theme.lineHeight.normal,

      borderRadius: theme.borderRadius.md,
      borderRadiusSmall: theme.borderRadius.sm,
    },
    Tabs: {
      tabFontSizeMedium: theme.fontSize.base[0],
    },
    Form: {
      labelFontSizeTopMedium: theme.fontSize.base[0],
      feedbackPadding: theme.padding[2],
      labelFontWeight: theme.fontWeight.medium
    },
    Input: {
      heightMedium: theme.height[10],
      fontSizeMedium: theme.fontSize.base[0],
    },
    Button: {
      heightMedium: theme.height[10],
      fontSizeMedium: theme.fontSize.base[0],
    },
    Card: {
      fontSizeMedium: theme.fontSize.base[0],
    },
    Avatar: {
      heightMedium: theme.height[10],
      fontSize: theme.fontSize.base[0],
    },
    ColorPicker: {
      heightMedium: theme.height[10],
      fontSizeMedium: theme.fontSize.base[0],
    },
    Dropdown: {
      optionHeightMedium: theme.height[10],
      fontSizeMedium: theme.fontSize.base[0],
    },
    Radio: {
      buttonHeightMedium: theme.height[10],
      fontSizeMedium: theme.fontSize.base[0],
    },
    Skeleton: {
      heightMedium: theme.height[10],
    },
    Tag: {
      heightMedium: theme.height[10],
      fontSizeMedium: theme.fontSize.base[0],
    },
    Result: {
      fontSizeMedium: theme.fontSize.base[0],
      titleFontSizeMedium: theme.fontSize.lg[0],
    },
    Menu: {
      fontSize: theme.fontSize.base[0],
      titleFontSizeMedium: theme.fontSize.base[0]
    },
    Alert: {
      fontSize: theme.fontSize.base[0],
    },
    Statistic: {
      valueFontSize: theme.fontSize.base[0],
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
      warningColorSuppl: theme.colors.amber[800],
    },
    Card: {
      borderColor: theme.colors.zinc[300],
    },
    List: {
      color: theme.colors.white,
    },
    Tooltip: {
      color: theme.colors.zinc[50],
      textColor: theme.colors.zinc[700],
    },
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
      warningColorSuppl: theme.colors.amber[700],
    },
    Card: {
      borderColor: theme.colors.zinc[700],
      textColor: theme.colors.zinc[200],
    },
    Tooltip: {
      color: theme.colors.zinc[800],
    },
    List: {
      color: theme.colors.zinc[900],
    }
  },
})

useSeoMeta({
  description: 'A platform for remote management of ESP microcontrollers',
  ogTitle: 'ESP Admin',
  ogDescription: 'A platform for remote management of ESP microcontrollers',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: 'ESP Admin',
  twitterDescription: 'A platform for remote management of ESP microcontrollers',
  twitterImage: '[twitter:image]',
  twitterCard: 'summary'
})

useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ]
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}


.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
