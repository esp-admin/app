<template>
    <div>
        <div v-if="user">
            <NavbarMain :user="user"></NavbarMain>
            <div class="container mx-auto my-8 px-4">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup>
const { useUser } = useAuthSession()
const user = useUser()
</script>