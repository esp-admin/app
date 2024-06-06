<template>
  <n-list
    bordered
    show-divider
  >
    <n-list-item
      v-for="session of sessions"
      :key="session.id"
    >
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
          <title-date
            :title=" [
              session.userAgent && UAParser.UAParser(session.userAgent).browser.name,
              session.userAgent && UAParser.UAParser(session.userAgent).os.name,
              session.userAgent && UAParser.UAParser(session.userAgent).device.model,
            ]
              .join(' ')"
            :updated-at="session.updatedAt"
          />
        </template>

        <template #header-extra>
          <button-icon
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

const lb = useLoadingIndicator()

lb.start()

const { data: sessions } = await useAsyncData('account-sessions',
  () => useAuthSession().getAllSessions(),
)

lb.finish()

async function handleSessionRevoke(id: string) {
  await useAuthSession().revokeSession(id)

  removeArrayElByKey(sessions.value ?? [], 'id', id)
}
</script>
