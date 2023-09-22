<template>
  <div>
    <div class="flex gap-2 items-center mb-4">
      <naive-icon name="ph:user" />
      <n-text class="col-span-full text-lg" strong>
        Account
      </n-text>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="profile" tab="Profile">
        <AccountProfile class="mt-4" />
      </n-tab-pane>

      <n-tab-pane v-if="user?.provider === 'default'" name="security" tab="Security">
        <AccountPassword class="mt-4" />
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
