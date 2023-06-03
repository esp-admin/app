<template>
    <div class="page-center">
        <div class="w-full sm:max-w-xs p-4">
            <slot></slot>

            <n-card class="mt-4" size="small">
                <div class="flex items-center justify-center gap-2">
                    <NaiveIcon name="ph:house"></NaiveIcon>
                    <div>
                        Go to
                        <NuxtLink to="/" class="no-underline">
                            <n-text type="primary"> Home page</n-text>
                        </NuxtLink>
                    </div>
                </div>
            </n-card>
        </div>
    </div>
</template>