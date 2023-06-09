<template>
    <n-card :title="name" size="small" hoverable>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, distinctio ullam! Eveniet, ipsam dolorum aperiam
        accusantium ab fuga nam. Impedit eos in velit id saepe sed pariatur a neque minus.

        <div class="mt-4 flex">
            <nuxt-link :to="`/projects/${id}`">
                <n-button secondary>View</n-button>
            </nuxt-link>
        </div>
    </n-card>
</template>

<script setup>
const name = ref("A project")
const id = ref("id_1")
</script>