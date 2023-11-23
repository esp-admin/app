<template>
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

<script setup lang="ts">
import type { DropdownOption } from 'naive-ui'
import { AccountInfo, NaiveIcon } from '#components'

const { user } = useAuthSession()
const { logout } = useAuth()

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
