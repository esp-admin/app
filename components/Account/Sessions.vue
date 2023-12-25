<template>
  <n-list bordered show-divider>
    <n-list-item v-for="session of sessions" :key="session.id">
      <n-thing>
        <template #avatar>
          <n-tooltip trigger="hover">
            <template #trigger>
              <naive-icon
                :name="ICON_CHECK"
                :icon-color="session.current ? '#22c55e' : '#f59e0b'"
                :size="23"
              />
            </template>
            {{ session.current ? 'Current session': 'Active session' }}
          </n-tooltip>
        </template>

        <template #header>
          <TitleDate
            :title=" [
              session.ua && UAParser.UAParser(session.ua).browser.name,
              session.ua && UAParser.UAParser(session.ua).os.name,
              session.ua && UAParser.UAParser(session.ua).device.model
            ]
              .join(' ')"
            :updated-at="session.updatedAt"
          />
        </template>

        <template #header-extra>
          <ButtonIcon
            :icon="ICON_DELETE"
            secondary
            :disabled="session.current"
            @click="handleSessionRevoke(session.id)"
          />
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import UAParser from 'ua-parser-js'

const { getAllSessions } = useAuthSession()

const lb = useLoadingIndicator()

lb.start()

const sessions = ref(await getAllSessions())

lb.finish()

async function handleSessionRevoke (id: string) {
  const { revokeSession } = useAuthSession()

  await revokeSession(id)

  removeArrayElByKey(sessions.value, 'id', id)
}
</script>
