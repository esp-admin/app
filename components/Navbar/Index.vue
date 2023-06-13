<template>
    <naive-navbar>
        <template #start>
            <NaiveIcon name="simple-icons:espressif" :size="25" icon-color="red"></NaiveIcon>
            <n-text strong>ESP Admin</n-text>
        </template>

        <template #end>
            <NuxtLink to="https://github.com/becem-gharbi/esp-admin" aria-label="github" target="_blank">
                <n-button type="default" size="small">
                    <NaiveIcon name="mdi:github"></NaiveIcon>
                </n-button>
            </NuxtLink>

            <NuxtLink to="/auth/login" aria-label="get-started">
                <n-button size="small" type="primary">
                    Get started
                </n-button>
            </NuxtLink>
        </template>
    </naive-navbar>
</template>