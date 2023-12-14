<template>
  <div>
    <naive-layout-sidebar v-if="user" :routes="routes" :drawer-routes="routes">
      <template #start>
        <nuxt-link to="/">
          <Logo :width="110" class="mx-auto my-2" />
        </nuxt-link>
      </template>

      <template #end>
        <n-button secondary class="m-2 notMobileOrTablet" @click="logout">
          Logout
        </n-button>
      </template>

      <template #drawer-header>
        <AccountInfo class="mx-2" />
      </template>

      <template #drawer-footer>
        <n-button secondary block @click="logout">
          Logout
        </n-button>
      </template>

      <div class="p-2">
        <slot />
      </div>
    </naive-layout-sidebar>
  </div>
</template>

<script setup lang="ts">
import type { MenuLinkRoute } from '@bg-dev/nuxt-naiveui'

const { user } = useAuthSession()
const { logout } = useAuth()

const routes: MenuLinkRoute[] = [
  {
    label: 'Dashboard',
    icon: ICON_DASH,
    path: '/'
  },
  {
    label: 'Projects',
    icon: ICON_PROJECT,
    path: '/projects'
  },
  {
    label: 'Devices',
    icon: ICON_DEVICE,
    path: '/devices'
  },
  {
    label: 'Settings',
    icon: ICON_SETTINGS,
    path: '/settings'
  },
  {
    label: 'Account',
    path: '/account',
    icon: ICON_USER
  }
]
</script>
