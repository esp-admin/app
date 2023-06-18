<template>
    <naive-navbar>
        <template #start>
            <nuxt-link to="/">
                <Logo />
            </nuxt-link>
        </template>

        <template #end>
            <NuxtLink to="/auth/login" aria-label="get-started">
                <n-button type="primary" ghost>
                    Get started
                </n-button>
            </NuxtLink>
        </template>
    </naive-navbar>
</template>

 