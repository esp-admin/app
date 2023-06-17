<template>
    <n-list>
        <n-list-item v-for="session of sessions">
            <n-thing>
                <template #avatar>
                    <n-tag :type="session.current ? 'success' : 'warning'">
                        {{ session.current ? 'Current' : 'Active' }}
                    </n-tag>
                </template>

                <template #header>
                    {{
                        [
                            session.ua && UAParser(session.ua).browser.name,
                            session.ua && UAParser(session.ua).os.name,
                            session.ua && UAParser(session.ua).device.model
                        ]
                            .join(' ') }}
                </template>

                <template #description>
                    <n-text depth="3"><n-time :time="new Date(session.updatedAt)" type="relative" /></n-text>
                </template>

                <template #header-extra>
                    <n-button circle size="small" type="error" secondary @click="() => handleSessionRevoke(session.id)"
                        :disabled="session.current">
                        <template #icon>
                            <NaiveIcon name="ph:trash-simple"></NaiveIcon>
                        </template>
                    </n-button>
                </template>
            </n-thing>
        </n-list-item>
    </n-list>
</template>

<script setup lang="ts">
import { UAParser } from "ua-parser-js"

const { getAllSessions, revokeSession } = useAuthSession()

const { data: sessions } = await useAsyncData(getAllSessions)

async function handleSessionRevoke(id: string) {
    try {
        await revokeSession(id)

        sessions.value = sessions.value!.filter(el => el.id !== id)
    } catch (error) {
        console.error(error)
    }
}
</script>