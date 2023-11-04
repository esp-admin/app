<template>
  <div>
    <n-page-header title="Account" class="mb-8">
      <template #avatar>
        <naive-icon name="ph:user" />
      </template>
    </n-page-header>

    <n-tabs type="line">
      <n-tab-pane name="profile" tab="Profile">
        <AccountProfile class="mt-4" />
      </n-tab-pane>

      <n-tab-pane v-if="user?.provider === 'default'" name="security" tab="Security">
        <n-message-provider>
          <AccountPassword class="mt-4" />
        </n-message-provider>
      </n-tab-pane>

      <n-tab-pane name="preferences" tab="Preferences">
        <AccountPreferences class="mt-4" />
      </n-tab-pane>

      <n-tab-pane name="Sessions" tab="Sessions">
        <AccountSessions class="mt-4" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
const { user } = useAuthSession()
</script>
