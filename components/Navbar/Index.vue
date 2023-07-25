<template>
    <naive-navbar :routes="routes" drawer-closable menu-placement="left" class="font-medium">
        <template #start>
            <nuxt-link to="/">
                <Logo />
            </nuxt-link>
        </template>

        <template #end v-if="!isMobileOrTablet">
            <n-dropdown trigger="click" :options="dropdownOptions" :style="{ padding: '8px' }" @select="handleSelect">
                <img v-if="user.picture" :src="user.picture"
                    class="notMobileOrTablet w-9 h-9 object-cover rounded-full ring-2 cursor-pointer" />
            </n-dropdown>
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
import { NaiveIcon, AccountInfo } from "#components"
import { NavbarRoute } from "@bg-dev/nuxt-naiveui"
import type { DropdownOption } from "naive-ui"

const props = defineProps<{ user: User }>()

const { logout } = useAuth()
const { isMobileOrTablet } = useNaiveDevice()

const routes = ref<NavbarRoute[]>([
    {
        label: "Dashboard",
        icon: "ph:activity",
        path: "/"
    },
    {
        label: "Projects",
        icon: "ph:code",
        path: "/projects"
    },
    {
        label: "Devices",
        icon: "ph:cpu",
        path: "/devices"
    }
])

if (isMobileOrTablet) {
    routes.value.push(
        {
            label: "Settings",
            icon: "ph:gear",
            path: "/settings"
        },
        {
            label: "Account",
            path: "/account",
            icon: 'ph:user'
        })
}

const dropdownOptions = ref<DropdownOption[]>([])

watch(props.user, (newUser, oldUser) => {
    if (!newUser || newUser.role === oldUser?.role) {
        return
    }

    dropdownOptions.value = [
        {
            key: 'header',
            type: 'render',
            render: () => h(AccountInfo)
        },
        {
            key: 'divider',
            type: 'divider',
        },
        {
            label: 'Settings',
            key: 'settings',
            icon: () => h(NaiveIcon, { name: 'ph:gear' }),
        },
        {
            label: 'Account',
            key: 'account',
            icon: () => h(NaiveIcon, { name: 'ph:user' }),
        },
        {
            label: 'Logout',
            key: 'logout',
            icon: () => h(NaiveIcon, { name: 'ph:sign-out' }),
        }
    ]

    if (newUser.role === "admin") {
        dropdownOptions.value.splice(2, 0, {
            label: 'Management',
            key: 'management',
            icon: () => h(NaiveIcon, { name: 'ph:users' }),
        })

        if (isMobileOrTablet) {
            routes.value.push({
                label: "Management",
                path: "/management",
                icon: 'ph:users'
            })
        }
    }
}, { immediate: true })


async function handleSelect(key: string) {
    switch (key) {
        case 'logout':
            return logout()
        case 'account':
            return navigateTo('/account')
        case 'management':
            return navigateTo('/management')
        case 'settings':
            return navigateTo('/settings')
    }
}
</script>