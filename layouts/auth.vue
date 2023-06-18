<template>
    <div class="page justify-center items-center">
        <div class="w-full sm:max-w-xs p-8">
            <slot />

            <!-- <n-card class="mt-4" size="small">
                <div class="flex items-center justify-center gap-2">
                    <naive-icon name="ph:house"></naive-icon>
                    <div>
                        Go to
                        <NuxtLink to="/" class="no-underline">
                            <n-text type="primary"> Home page</n-text>
                        </NuxtLink>
                    </div>
                </div>
            </n-card> -->
        </div>
    </div>
</template>