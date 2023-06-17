<template>
  <naive-config :theme-config="themeConfig">

    <client-only>
      <n-notification-provider placement="bottom-right">
        <NotificationNetwork />
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
//@ts-nocheck
import { ThemeConfig } from "@bg-dev/nuxt-naiveui"
import { theme } from "#tailwind-config";

const themeConfig = ref<ThemeConfig>({
  shared: {
    common: {
      fontFamily: theme.fontFamily.sans,
      fontFamilyMono: theme.fontFamily.mono,

      fontSizeMini: theme.fontSize.xs,
      fontSizeTiny: theme.fontSize.xs,
      fontSizeSmall: theme.fontSize.sm,
      fontSizeMedium: theme.fontSize.base,
      fontSizeLarge: theme.fontSize.lg,
      fontSizeHuge: theme.fontSize.xl,
      fontSize: theme.fontSize.base,

      fontWeight: theme.fontWeight.medium,
      fontWeightStrong: theme.fontWeight.semibold,

      heightMini: theme.height[5],
      heightTiny: theme.height[6],
      heightSmall: theme.height[7],
      heightMedium: theme.height[9],
      heightLarge: theme.height[9],
      heightHuge: theme.height[10],

      lineHeight: theme.lineHeight.normal,

      borderRadius: theme.borderRadius.md,
      borderRadiusSmall: theme.borderRadius.sm,
    },
    Form: {
      feedbackPadding: theme.padding[2],
    },
    Tabs: {
      tabFontSizeMedium: theme.fontSize.base,
    }
  },

  light: {
    common: {
      textColorBase: theme.colors.zinc[800],
      textColor1: theme.colors.zinc[800],
      textColor2: theme.colors.zinc[700],
      textColor3: theme.colors.zinc[600],
      textColorDisabled: theme.colors.zinc[600],

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

      borderColor: theme.colors.gray[300],
    },
    Card: {
      borderColor: theme.colors.gray[300]
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
      borderColor: theme.colors.zinc[700]
    },
    Tooltip: {
      color: theme.colors.zinc[800],
    }
  },
})

useSeoMeta({
  description: '[description]',
  ogTitle: '[og:title]',
  ogDescription: '[og:description]',
  ogImage: '[og:image]',
  ogUrl: '[og:url]',
  twitterTitle: '[twitter:title]',
  twitterDescription: '[twitter:description]',
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
</style>
