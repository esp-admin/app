<template>
  <naive-navbar :routes="routes" :drawer-routes="drawerRoutes" menu-placement="center">
    <template #start>
      <nuxt-link to="/">
        <Logo />
      </nuxt-link>
    </template>

    <template v-if="!isMobileOrTablet" #end>
      <LazyDropdown
        trigger="click"
        :options="dropdownOptions"
        :style="{ padding: '8px', minWidth: '200px' }"
        @select="handleSelect"
      >
        <img
          :src="user!.picture"
          class="notMobileOrTablet w-9 h-9 object-cover rounded-full ring-2 cursor-pointer"
        >
      </LazyDropdown>
    </template>

    <template #drawer-header>
      <AccountInfo class="mx-2" />
    </template>

    <template #drawer-footer>
      <n-button secondary block @click="async () => await logout()">
        Logout
      </n-button>
    </template>
  </naive-navbar>
</template>

<script setup lang="ts">
import type { NavbarRoute } from '@bg-dev/nuxt-naiveui'
import type { DropdownOption } from 'naive-ui'
import { NaiveIcon, AccountInfo } from '#components'

const LazyDropdown = defineAsyncComponent(() => import('naive-ui/es/dropdown/src/Dropdown'))

const { logout } = useAuth()
const { user } = useAuthSession()
const { isMobileOrTablet } = useNaiveDevice()

const routes: NavbarRoute[] = [
  {
    label: 'Dashboard',
    icon: 'ph:activity',
    path: '/'
  },
  {
    label: 'Projects',
    icon: 'ph:code',
    path: '/projects'
  },
  {
    label: 'Devices',
    icon: 'ph:cpu',
    path: '/devices'
  }
]

const drawerRoutes: NavbarRoute[] = [
  {
    label: 'Dashboard',
    icon: 'ph:activity',
    path: '/'
  },
  {
    label: 'Projects',
    icon: 'ph:code',
    path: '/projects'
  },
  {
    label: 'Devices',
    icon: 'ph:cpu',
    path: '/devices'
  },
  {
    label: 'Settings',
    icon: 'ph:gear',
    path: '/settings'
  },
  {
    label: 'Account',
    path: '/account',
    icon: 'ph:user'
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
    icon: () => h(NaiveIcon, { name: 'ph:gear' })
  },
  {
    label: 'Account',
    key: 'account',
    icon: () => h(NaiveIcon, { name: 'ph:user' })
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: () => h(NaiveIcon, { name: 'ph:sign-out' })
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
