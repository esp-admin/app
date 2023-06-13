<template>
  <naive-config :theme-config="themeConfig">

    <client-only>
      <n-notification-provider placement="bottom-right">
        <NotificationNetwork />
      </n-notification-provider>
    </client-only>

    <nuxt-layout>
      <nuxt-loading-indicator :color="themeConfig.light?.common?.primaryColor" />

      <n-message-provider>

        <div v-if="loggedIn">
          <NavbarMain></NavbarMain>
          <div class="container mx-auto my-8 px-4">
            <nuxt-page></nuxt-page>
          </div>
        </div>

        <nuxt-page v-else></nuxt-page>

      </n-message-provider>
    </nuxt-layout>

  </naive-config>
</template>

<script setup lang="ts">
import { ThemeConfig } from "@bg-dev/nuxt-naiveui"
import { theme } from "#tailwind-config";

const { useUser } = useAuthSession()
const user = useUser()
const loggedIn = computed(() => !!user.value)

const themeConfig = ref<ThemeConfig>({
  shared: {
    common: {
      fontFamily: theme.fontFamily.sans,
      lineHeight: theme.lineHeight.normal,
      borderRadius: "4px"
    },
  },

  light: {
    common: {
      primaryColor: theme.colors.blue[600],
      primaryColorHover: theme.colors.blue[500],
      primaryColorPressed: theme.colors.blue[700],
      borderColor: theme.colors.gray[300],
    },
    Card: {
      borderColor: theme.colors.gray[300]
    }
  },

  dark: {
    common: {
      primaryColor: theme.colors.blue[500],
      primaryColorHover: theme.colors.blue[400],
      primaryColorPressed: theme.colors.blue[600],
      borderColor: theme.colors.gray[800],
    },
    Card: {
      borderColor: theme.colors.gray[800]
    }
  },

  mobileOrTablet: {
    Tabs: {
      tabFontSizeMedium: "16px"
    }
  }
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