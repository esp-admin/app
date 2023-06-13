<template>
    <naive-navbar>
        <template #start>
            <NuxtLink to="/" class="flex items-center gap-3">
                <NaiveIcon name="simple-icons:espressif" :size="25" icon-color="red"></NaiveIcon>
                <n-text strong>ESP Admin</n-text>
            </NuxtLink>
        </template>

        <template #end>
            <NuxtLink to="https://github.com/becem-gharbi/esp-admin" aria-label="github" target="_blank">
                <n-button type="default">
                    <NaiveIcon name="mdi:github"></NaiveIcon>
                </n-button>
            </NuxtLink>

            <NuxtLink to="/auth/login" aria-label="get-started">
                <n-button>
                    Get started
                </n-button>
            </NuxtLink>
        </template>
    </naive-navbar>
</template>