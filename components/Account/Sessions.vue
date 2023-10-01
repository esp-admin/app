<template>
  <n-list>
    <n-list-item v-for="session of sessions" :key="session.id">
      <n-thing>
        <template #avatar>
          <n-tag size="small" :type="session.current ? 'success' : 'warning'">
            {{ session.current ? 'Current' : 'Active' }}
          </n-tag>
        </template>

        <template #header>
          <n-text strong class="text-base">
            {{
              [
                session.ua && UAParser.UAParser(session.ua).browser.name,
                session.ua && UAParser.UAParser(session.ua).os.name,
                session.ua && UAParser.UAParser(session.ua).device.model
              ]
                .join(' ')
            }}
          </n-text>

          <n-text depth="3" class="text-base">
            • <n-time
              :time="new Date(session.updatedAt)"
              type="relative"
            />
          </n-text>
        </template>

        <template #header-extra>
          <TooltipIconButton
            name="ph:trash"
            size="small"
            type="error"
            secondary
            :disabled="session.current"
            message="Delete session"
            circle
            @click="() => handleSessionRevoke(session.id)"
          />
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import UAParser from 'ua-parser-js'

const { getAllSessions, revokeSession } = useAuthSession()

const { data: sessions } = await useAsyncData(getAllSessions)

async function handleSessionRevoke (id: string) {
  try {
    await revokeSession(id)

    sessions.value = sessions.value!.filter(el => el.id !== id)
  } catch (error) {
    // console.error(error)
  }
}
</script>
