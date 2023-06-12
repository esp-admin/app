<template>
    <div>
        <naive-navbar>
            <template #start>
                <nuxt-link to="/" class="flex items-center gap-3">
                    <naive-icon name="simple-icons:espressif" :size="25" icon-color="red"></naive-icon>
                    <n-text strong>ESP Admin</n-text>
                </nuxt-link>
            </template>

            <template #end>
                <nuxt-link to="https://github.com/becem-gharbi/esp-admin" aria-label="github" target="_blank">
                    <n-button type="default">
                        <naive-icon name="mdi:github"></naive-icon>
                    </n-button>
                </nuxt-link>

                <nuxt-link to="/auth/login" aria-label="get-started">
                    <n-button>
                        Get started
                    </n-button>
                </nuxt-link>
            </template>
        </naive-navbar>
    </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false, middleware: "guest", colorMode: "light" });
</script>