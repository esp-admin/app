<template>
    <div v-if="user" class="flex items-center gap-3">
        <s3-image :src="user.picture" class="w-10 h-10 object-contain rounded-full ring-2" />

        <div class="flex flex-col text-base">
            <n-text strong>{{ user.name }}</n-text>
            <n-text :depth="3">{{ user.email }}</n-text>
        </div>
    </div>
</template>

<script setup lang="ts">
const { useUser } = useAuthSession()
const user = useUser()
</script>