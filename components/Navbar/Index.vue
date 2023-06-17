<template>
    <naive-navbar>
        <template #start>
            <NaiveIcon name="simple-icons:espressif" :size="25" icon-color="red"></NaiveIcon>
            <n-text strong>ESP Admin</n-text>
        </template>

        <template #end>
            <NuxtLink to="/auth/login" aria-label="get-started">
                <n-button type="primary">
                    Get started
                </n-button>
            </NuxtLink>
        </template>
    </naive-navbar>
</template>

 