<template>
    <div class="page">
        <Navbar></Navbar>
        <main class="flex-1"></main>
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    auth: false,
    middleware: "guest",
    colorMode: "light",
    layout: false
});
</script>
