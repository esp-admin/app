<template>
  <naive-navbar :routes="routes" :drawer-routes="drawerRoutes" menu-placement="left">
    <template #start>
      <nuxt-link to="/">
        <Logo />
      </nuxt-link>
    </template>

    <template v-if="!isMobileOrTablet" #end>
      <LazyNavbarDropdown />
    </template>

    <template #drawer-header>
      <AccountInfo class="mx-2" />
    </template>

    <template #drawer-footer>
      <n-button secondary block @click="logout">
        Logout
      </n-button>
    </template>
  </naive-navbar>
</template>

<script setup lang="ts">
import type { NavbarRoute } from '@bg-dev/nuxt-naiveui'

const { logout } = useAuth()
const { isMobileOrTablet } = useNaiveDevice()

const routes: NavbarRoute[] = [
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
  }
]

const drawerRoutes: NavbarRoute[] = [
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
