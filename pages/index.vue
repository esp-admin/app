<template>
    <div>
        <naive-navbar>
            <template #start>
                <NuxtLink to="/" class="flex items-center gap-3">
                    <NaiveIcon name="logos:nuxt-icon" :size="25"></NaiveIcon>
                    <n-text strong>ESP Admin</n-text>
                </NuxtLink>
            </template>

            <template #end>
                <NuxtLink to="/auth/login" aria-label="get-started">
                    <n-button type="primary">
                        Get started
                    </n-button>
                </NuxtLink>
            </template>
        </naive-navbar>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false, middleware: "guest", colorMode: "light" });
</script>