<template>
  <div>
    <n-page-header
      title="Account"
      class="mb-8"
    >
      <template #avatar>
        <naive-icon
          :name="ICON_USER"
          :size="20"
        />
      </template>
    </n-page-header>

    <n-tabs type="line">
      <n-tab-pane
        name="profile"
        tab="Profile"
      >
        <account-profile class="mt-4" />
      </n-tab-pane>

      <n-tab-pane
        v-if="user?.provider === 'default'"
        name="security"
        tab="Security"
      >
        <account-password class="mt-4" />
      </n-tab-pane>

      <n-tab-pane
        name="preferences"
        tab="Preferences"
      >
        <account-preferences class="mt-4" />
      </n-tab-pane>

      <n-tab-pane
        name="Sessions"
        tab="Sessions"
      >
        <account-sessions class="mt-4" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
const { user } = useAuthSession()
</script>
