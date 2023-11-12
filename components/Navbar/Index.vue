<template>
  <naive-navbar :routes="routes" :drawer-routes="drawerRoutes" menu-placement="left">
    <template #start>
      <nuxt-link to="/">
        <Logo />
      </nuxt-link>
    </template>

    <template v-if="!isMobileOrTablet" #end>
      <n-dropdown
        :style="{ padding: '8px', minWidth: '200px' }"
        trigger="click"
        :options="dropdownOptions"
        @select="handleSelect"
      >
        <img
          :src="user!.picture"
          class="notMobileOrTablet w-9 h-9 object-cover rounded-full ring-2 cursor-pointer"
          alt="avatar"
        >
      </n-dropdown>
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
import type { DropdownOption } from 'naive-ui'
import { NaiveIcon, AccountInfo } from '#components'

const { logout } = useAuth()
const { user } = useAuthSession()
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

const dropdownOptions: DropdownOption[] = [
  {
    key: 'header',
    type: 'render',
    render: () => h(AccountInfo)
  },
  {
    key: 'divider',
    type: 'divider'
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: () => h(NaiveIcon, { name: ICON_SETTINGS })
  },
  {
    label: 'Account',
    key: 'account',
    icon: () => h(NaiveIcon, { name: ICON_USER })
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: () => h(NaiveIcon, { name: ICON_LOGOUT })
  }
]

function handleSelect (key: string) {
  switch (key) {
    case 'logout':
      return logout()
    case 'account':
      return navigateTo('/account')
    case 'settings':
      return navigateTo('/settings')
  }
}
</script>
