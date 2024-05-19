<template>
  <naive-layout-sidebar
    :routes="routes"
    :drawer-routes="routes"
  >
    <template #start>
      <nuxt-link
        to="/"
        class="mx-auto my-2"
      >
        <Logo :width="114" />
      </nuxt-link>
    </template>

    <template #end>
      <div class="flex flex-col gap-8 m-2 notMobileOrTablet">
        <AccountInfo />
        <n-button
          secondary
          @click="logout"
        >
          Logout
        </n-button>
      </div>
    </template>

    <template #drawer-header>
      <AccountInfo class="mx-2" />
    </template>

    <template #drawer-footer>
      <n-button
        secondary
        block
        @click="logout"
      >
        Logout
      </n-button>
    </template>

    <div class="p-2">
      <slot />
    </div>

    <Notification />
  </naive-layout-sidebar>
</template>

<script setup lang="ts">
import type { MenuLinkRoute } from '#build/types/naiveui'

const { logout } = useAuth()

const routes: MenuLinkRoute[] = [
  {
    label: 'Dashboard',
    icon: ICON_DASH,
    path: '/',
  },
  {
    label: 'Projects',
    icon: ICON_PROJECT,
    path: '/projects',
  },
  {
    label: 'Devices',
    icon: ICON_DEVICE,
    path: '/devices',
  },
  {
    label: 'Settings',
    icon: ICON_SETTINGS,
    path: '/settings',
  },
  {
    label: 'Account',
    path: '/account',
    icon: ICON_USER,
  },
]
</script>
