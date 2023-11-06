<template>
  <div class="flex flex-col gap-5">
    <div v-for="session of sessions" :key="session.id" class="flex justify-between">
      <TitleDate
        :title=" [
          session.ua && UAParser.UAParser(session.ua).browser.name,
          session.ua && UAParser.UAParser(session.ua).os.name,
          session.ua && UAParser.UAParser(session.ua).device.model
        ]
          .join(' ')"

        :updated-at="session.updatedAt"
      >
        <template #icon>
          <n-tag size="small" :type="session.current ? 'success' : 'warning'">
            {{ session.current ? 'Current' : 'Active' }}
          </n-tag>
        </template>
      </TitleDate>

      <TooltipIconButton
        icon="ph:trash"
        type="error"
        secondary
        :disabled="session.current"
        message="Delete session"
        @click="handleSessionRevoke(session.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UAParser from 'ua-parser-js'

const { getAllSessions } = useAuthSession()

const { data: sessions } = await useAsyncData(getAllSessions)

async function handleSessionRevoke (id: string) {
  const { revokeSession } = useAuthSession()

  await revokeSession(id)

  sessions.value = sessions.value!.filter(el => el.id !== id)
}
</script>
