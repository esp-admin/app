<template>
  <div>
    <n-page-header
      title="Settings"
      class="mb-8"
    >
      <template #avatar>
        <naive-icon
          :name="ICON_SETTINGS"
          :size="20"
        />
      </template>
    </n-page-header>

    <n-tabs type="line">
      <n-tab-pane
        name="mqtt"
        tab="MQTT"
      >
        <SettingsMqtt class="mt-4" />
      </n-tab-pane>

      <n-tab-pane
        name="report"
        tab="Report"
      >
        <SettingsReport class="mt-4" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
