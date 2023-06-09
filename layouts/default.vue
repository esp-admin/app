<template>
    <div>
        <naive-navbar v-if="user" :routes="routes" drawer-closable menu-placement="right">
            <template #start>
                <NuxtLink to="/home" class="flex items-center gap-3">
                    <NaiveIcon name="simple-icons:espressif" :size="25" icon-color="red"></NaiveIcon>
                    <n-text strong>ESP Admin</n-text>
                </NuxtLink>
            </template>

            <template #end v-if="!isMobileOrTablet">
                <n-dropdown trigger="click" :options="dropdownOptions" :style="{ padding: '8px' }" @select="handleSelect">
                    <S3Image v-if="user?.picture" :src="user.picture"
                        class="w-7 h-7 object-contain rounded-full ring-2 cursor-pointer" />
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

        <div class="container mx-auto my-8 px-4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NaiveIcon, AccountInfo } from "#components"
import { NavbarRoute } from "@bg-dev/nuxt-naiveui"
import type { DropdownOption } from "naive-ui"

const { useUser } = useAuthSession()
const { logout } = useAuth()
const { isMobileOrTablet } = useNaiveDevice()
const user = useUser()

const routes = ref<NavbarRoute[]>([
    {
        label: "Projects",
        icon: "ph:app-window",
        path: "/projects"
    },
    {
        label: "Devices",
        icon: "ph:cpu",
        path: "/devices"
    },
    {
        label: "Settings",
        icon: "ph:gear",
        path: "/settings"
    },
])

if (isMobileOrTablet) {
    routes.value.push({
        label: "Account",
        path: "/account",
        icon: 'ph:user'
    })
}

const dropdownOptions = ref<DropdownOption[]>([])

watch(user, (newUser, oldUser) => {
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
            label: 'About',
            key: 'about',
            icon: () => h(NaiveIcon, { name: 'ph:question' }),
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
        dropdownOptions.value.splice(3, 0, {
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
            await logout()
            break
        case 'account':
            return navigateTo('/account')
        case 'management':
            return navigateTo('/management')
        case 'about':
            return window.open('https://github.com/becem-gharbi/esp-admin')
    }
}
</script>